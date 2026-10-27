import { test, expect } from '@playwright/test';

test.describe('Gamification, Streaks & XP Mechanics Suite', () => {
  const timestamp = Date.now();
  const gamifyUser = {
    email: `streak_master_${timestamp}@lingopulse.com`,
    password: 'SafePassword123!',
    username: `streak_master_${timestamp}`,
    displayName: 'Streak Master',
    targetLanguage: 'es',
    learningLevel: 'beginner',
  };

  let token = '';
  let lesson1Id = '';

  test.beforeAll(async ({ request }) => {
    const regRes = await request.post('/api/auth/register', { data: gamifyUser });
    const regData = await regRes.json();
    token = regData.tokens.accessToken;

    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const coursesData = await coursesRes.json();
    const spanish = coursesData.courses.find((c: any) => c.code === 'es-en');

    const pathRes = await request.get(`/api/courses/${spanish._id}/path`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const pathData = await pathRes.json();
    lesson1Id = pathData.units[0].lessons[0].id;
  });

  test('TC-GAM-01: Heart Floor: Repeated mistakes clamp at 0 and never drop negative', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const lessonData = await lessonRes.json();
    const exId = lessonData.exercises[0].id;

    // Fail 6 times intentionally
    let finalHearts = 5;
    for (let i = 0; i < 6; i++) {
      const res = await request.post('/api/lessons/submit-answer', {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          exerciseId: exId,
          userAnswer: 'wrong_value_force_failure',
        },
      });
      const data = await res.json();
      finalHearts = data.heartsRemaining;
    }

    expect(finalHearts).toBe(0);
  });

  test('TC-GAM-02: Practice Recovery: Resolving mistake restores heart', async ({ request }) => {
    const mistakesRes = await request.get('/api/practice/mistakes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { practiceItems } = await mistakesRes.json();
    expect(practiceItems.length).toBeGreaterThanOrEqual(1);

    const resolveRes = await request.post('/api/practice/complete', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        resolvedExerciseIds: [practiceItems[0].id],
      },
    });
    expect(resolveRes.status()).toBe(200);
    const body = await resolveRes.json();
    expect(body.heartsRemaining).toBeGreaterThanOrEqual(1);
    expect(body.totalXp).toBeGreaterThanOrEqual(10);
  });

  test('TC-GAM-03: Lesson Completion: Awards full lesson XP reward', async ({ request }) => {
    const completeRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId: lesson1Id,
        attempts: [
          { exerciseId: 'dummy-1', isCorrect: true, durationMs: 1000 },
          { exerciseId: 'dummy-2', isCorrect: true, durationMs: 900 },
        ],
      },
    });
    expect(completeRes.status()).toBe(200);
    const body = await completeRes.json();
    expect(body.success).toBe(true);
    expect(body.xpAwarded).toBe(20); // 15 base XP + 5 perfect accuracy bonus
    expect(body.totalXp).toBeGreaterThanOrEqual(25);
    expect(body.newStreak || body.streak).toBeGreaterThanOrEqual(1);
  });
});
