import { test, expect } from '@playwright/test';

test.describe('End-to-End Learner Journeys', () => {
  test.describe.configure({ mode: 'serial' });

  const timestamp = Date.now();
  const beginnerUser = {
    email: `learner_beginner_${timestamp}@lingopulse.com`,
    password: 'Password123!',
    username: `alex_${timestamp}`,
    displayName: 'Alex Beginner',
    targetLanguage: 'es',
    learningLevel: 'beginner',
  };

  let beginnerToken = '';
  let spanishCourseId = '';
  let lesson1Id = '';
  let lesson2Id = '';

  test('Journey 1: Beginner Journey - Registration to First Perfect Lesson & Unlocking', async ({ request }) => {
    // 1. Register new learner
    const regRes = await request.post('/api/auth/register', {
      data: beginnerUser,
    });
    expect(regRes.status()).toBe(201);
    const regData = await regRes.json();
    beginnerToken = regData.tokens.accessToken;
    expect(regData.user.hearts).toBe(5);
    expect(regData.user.totalXp).toBe(0);

    // 2. Complete guided onboarding
    const onbRes = await request.post('/api/auth/onboarding', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
      data: {
        targetLanguage: 'es',
        learningLevel: 'beginner',
        dailyGoalMinutes: 10,
      },
    });
    expect(onbRes.status()).toBe(200);

    // 3. Fetch courses and Spanish course path
    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    const coursesData = await coursesRes.json();
    const spanish = coursesData.courses.find((c: any) => c.code === 'es-en');
    spanishCourseId = spanish._id || spanish.id;

    const pathRes = await request.get(`/api/courses/${spanishCourseId}/path`, {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    expect(pathRes.status()).toBe(200);
    const pathData = await pathRes.json();

    const unit1 = pathData.units[0];
    const lesson1 = unit1.lessons[0];
    const lesson2 = unit1.lessons[1];
    lesson1Id = lesson1.id;
    lesson2Id = lesson2.id;

    expect(lesson1.isLocked).toBe(false);
    expect(lesson1.isCurrent).toBe(true);
    expect(lesson2.isLocked).toBe(true); // Locked until lesson 1 completes

    // 4. Fetch Lesson 1 details and exercises
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    expect(lessonRes.status()).toBe(200);
    const lessonData = await lessonRes.json();
    const exercises = lessonData.exercises;
    expect(exercises.length).toBe(5);

    // 5. Submit correct answers for each exercise
    const attempts = [];
    for (const ex of exercises) {
      let answer: any;
      if (ex.type === 'MULTIPLE_CHOICE') answer = 'opt-1'; // 'Hola'
      else if (ex.type === 'TRANSLATION') answer = 'Buenos días';
      else if (ex.type === 'WORD_ORDER') answer = ['Mucho', 'gusto'];
      else if (ex.type === 'FILL_IN_THE_BLANK') answer = 'Cómo';
      else if (ex.type === 'TRUE_FALSE') answer = true;

      const submitRes = await request.post('/api/lessons/submit-answer', {
        headers: { Authorization: `Bearer ${beginnerToken}` },
        data: {
          exerciseId: ex.id,
          userAnswer: answer,
          durationMs: 1200,
        },
      });

      expect(submitRes.status()).toBe(200);
      const submitData = await submitRes.json();
      expect(submitData.isCorrect).toBe(true);
      expect(submitData.heartsRemaining).toBe(5);

      attempts.push({
        exerciseId: ex.id,
        isCorrect: true,
        userAnswer: answer,
        durationMs: 1200,
      });
    }

    // 6. Complete Lesson 1
    const completeRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
      data: {
        lessonId: lesson1Id,
        attempts,
      },
    });

    expect(completeRes.status()).toBe(200);
    const completeData = await completeRes.json();
    expect(completeData.success).toBe(true);
    expect(completeData.accuracyPercentage).toBe(100);
    expect(completeData.xpAwarded).toBe(20); // 15 base + 5 perfect bonus
    expect(completeData.newStreak).toBe(1);

    // Check unlocked achievements
    const achCodes = completeData.unlockedAchievements.map((a: any) => a.code);
    expect(achCodes).toContain('FIRST_LESSON');
    expect(achCodes).toContain('PERFECT_ACCURACY');

    // 7. Verify Lesson 2 is now unlocked!
    const updatedPathRes = await request.get(`/api/courses/${spanishCourseId}/path`, {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    const updatedPath = await updatedPathRes.json();
    const updatedLesson2 = updatedPath.units[0].lessons[1];
    expect(updatedLesson2.isLocked).toBe(false);
  });

  test('Journey 2: Returning Learner Journey - Preserves Progress & Streak', async ({ request }) => {
    // 1. Sign in with existing learner
    const loginRes = await request.post('/api/auth/login', {
      data: {
        email: 'learner@lingopulse.com',
        password: 'LearnerPassword123!',
      },
    });
    expect(loginRes.status()).toBe(200);
    const loginData = await loginRes.json();
    const token = loginData.tokens.accessToken;

    expect(loginData.user.username).toBe('learner_alex');
    expect(loginData.user.totalXp).toBeGreaterThanOrEqual(45);
    expect(loginData.user.currentStreak).toBeGreaterThanOrEqual(2);

    // 2. Fetch Spanish course path
    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const coursesData = await coursesRes.json();
    const spanish = coursesData.courses.find((c: any) => c.code === 'es-en');
    const sId = spanish._id || spanish.id;

    const pathRes = await request.get(`/api/courses/${sId}/path`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(pathRes.status()).toBe(200);
    const pathData = await pathRes.json();
    expect(pathData.units.length).toBe(2);
  });

  test('Journey 3: Mistake Recovery Journey - Error Detection, Heart Loss & Practice Recovery', async ({ request }) => {
    // 1. Fetch Lesson 2
    const lessonRes = await request.get(`/api/lessons/${lesson2Id}`, {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    expect(lessonRes.status()).toBe(200);
    const lessonData = await lessonRes.json();
    const waterExercise = lessonData.exercises.find((ex: any) => ex.type === 'MULTIPLE_CHOICE');
    expect(waterExercise).toBeDefined();

    // 2. Deliberately submit incorrect answer ('water-opt-3' = La leche)
    const mistakeRes = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
      data: {
        exerciseId: waterExercise.id,
        userAnswer: 'water-opt-3',
        durationMs: 1500,
      },
    });
    expect(mistakeRes.status()).toBe(200);
    const mistakeData = await mistakeRes.json();

    expect(mistakeData.isCorrect).toBe(false);
    expect(mistakeData.correctAnswer).toBe('El agua');
    expect(mistakeData.explanation).toContain('El agua');
    expect(mistakeData.heartsRemaining).toBe(4); // Heart deducted from 5 to 4

    // 3. Verify attempt was logged in Practice Mistakes
    const mistakesRes = await request.get('/api/practice/mistakes', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    expect(mistakesRes.status()).toBe(200);
    const mistakesData = await mistakesRes.json();
    expect(mistakesData.totalMistakesToReview).toBeGreaterThanOrEqual(1);

    const loggedExercise = mistakesData.practiceItems.find((p: any) => p.id === waterExercise.id);
    expect(loggedExercise).toBeDefined();

    // 4. Complete Practice to recover heart and earn XP
    const practiceCompleteRes = await request.post('/api/practice/complete', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
      data: {
        resolvedExerciseIds: [waterExercise.id],
      },
    });
    expect(practiceCompleteRes.status()).toBe(200);
    const practiceData = await practiceCompleteRes.json();
    expect(practiceData.success).toBe(true);
    expect(practiceData.heartsRemaining).toBe(5); // Heart restored back to 5!
    expect(practiceData.totalXp).toBeGreaterThanOrEqual(30); // 20 + 10 practice XP
  });

  test('Journey 4: Long-Term Progression Journey - Checkpoint Unlock & Prerequisite Enforcement', async ({ request }) => {
    // Check initial Unit 2 lock state
    const pathRes = await request.get(`/api/courses/${spanishCourseId}/path`, {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    const pathData = await pathRes.json();
    const unit1Lessons = pathData.units[0].lessons;
    const checkpoint1 = unit1Lessons[2];
    const unit2Lesson4 = pathData.units[1].lessons[0];

    // Unit 2 is locked until Checkpoint 1 of Unit 1 is completed
    expect(unit2Lesson4.isLocked).toBe(true);

    // Complete Lesson 2
    await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
      data: {
        lessonId: lesson2Id,
        attempts: [{ exerciseId: 'dummy', isCorrect: true, durationMs: 500 }],
      },
    });

    // Complete Checkpoint 1
    const cpCompleteRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${beginnerToken}` },
      data: {
        lessonId: checkpoint1.id,
        attempts: [{ exerciseId: 'dummy', isCorrect: true, durationMs: 500 }],
      },
    });
    expect(cpCompleteRes.status()).toBe(200);

    // Verify Unit 2 Lesson 4 is now unlocked!
    const postCpPathRes = await request.get(`/api/courses/${spanishCourseId}/path`, {
      headers: { Authorization: `Bearer ${beginnerToken}` },
    });
    const postCpData = await postCpPathRes.json();
    const unlockedUnit2Lesson = postCpData.units[1].lessons[0];
    expect(unlockedUnit2Lesson.isLocked).toBe(false);

    // Verify course completion percentage increased proportionally (3 of 5 lessons completed = 60%)
    expect(postCpData.course.completionPercentage).toBe(60);
  });
});
