import { test, expect } from '@playwright/test';

test.describe('Flagship 50-Unit Multilingual Curriculum Expansion Suite', () => {
  let authToken: string;
  let allCourses: any[] = [];

  const EXPECTED_LANGUAGES = [
    { code: 'en-es', title: 'English Academy', flag: '🇬🇧' },
    { code: 'es-en', title: 'Spanish Academy', flag: '🇪🇸' },
    { code: 'fr-en', title: 'French Academy', flag: '🇫🇷' },
    { code: 'ja-en', title: 'Japanese Academy', flag: '🇯🇵' },
    { code: 'de-en', title: 'German Academy', flag: '🇩🇪' },
    { code: 'ko-en', title: 'Korean Academy', flag: '🇰🇷' },
    { code: 'it-en', title: 'Italian Academy', flag: '🇮🇹' },
    { code: 'zh-en', title: 'Mandarin Chinese Academy', flag: '🇨🇳' },
    { code: 'pt-en', title: 'Portuguese Academy', flag: '🇵🇹' },
    { code: 'hi-en', title: 'Hindi Academy', flag: '🇮🇳' },
  ];

  test.beforeAll(async ({ request }) => {
    // Authenticate demo learner
    const loginRes = await request.post('/api/auth/login', {
      data: {
        email: 'learner@lingopulse.com',
        password: 'LearnerPassword123!',
      },
    });
    expect(loginRes.status()).toBe(200);
    const loginData = await loginRes.json();
    authToken = loginData.tokens.accessToken;

    // Fetch all courses
    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(coursesRes.status()).toBe(200);
    const data = await coursesRes.json();
    allCourses = data.courses;
  });

  test('All 10 Flagship Languages Exist with 50+ Units and 250+ Sections', async () => {
    expect(allCourses.length).toBeGreaterThanOrEqual(10);

    for (const expected of EXPECTED_LANGUAGES) {
      const course = allCourses.find((c: any) => c.code === expected.code);
      expect(course, `Course ${expected.code} should exist`).toBeDefined();
      expect(course.title).toBe(expected.title);
      expect(course.flagIcon).toBe(expected.flag);
      expect(course.totalUnits, `${expected.code} should have >= 50 units`).toBeGreaterThanOrEqual(50);
      expect(course.totalLessons, `${expected.code} should have >= 250 lessons`).toBeGreaterThanOrEqual(250);
    }
  });

  test('Course Path Hierarchy: 50 Units, Exactly 5 Sections Each, and Correct Step Structure', async ({ request }) => {
    // Test Spanish and French paths comprehensively
    for (const code of ['es-en', 'fr-en', 'ja-en', 'de-en']) {
      const course = allCourses.find((c: any) => c.code === code);
      expect(course).toBeDefined();

      const res = await request.get(`/api/courses/${course._id || course.id}/path`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      expect(res.status()).toBe(200);
      const data = await res.json();

      expect(data.units.length, `${code} units count`).toBeGreaterThanOrEqual(50);

      // Verify sample units: Unit 1, Unit 15, Unit 50
      const unit1 = data.units[0];
      expect(unit1.unitNumber).toBe(1);
      expect(unit1.lessons.length).toBe(5);

      const unit15 = data.units[14];
      expect(unit15.unitNumber).toBe(15);
      expect(unit15.lessons.length).toBe(5);

      const unit50 = data.units[49];
      expect(unit50.unitNumber).toBe(50);
      expect(unit50.lessons.length).toBe(5);

      // Verify sections are ordered 1 to 5, step 5 is checkpoint
      for (const unit of [unit1, unit15, unit50]) {
        for (let i = 0; i < 5; i++) {
          const lesson = unit.lessons[i];
          expect(lesson.lessonNumber).toBe(i + 1);
          if (i === 4) {
            expect(lesson.type).toBe('checkpoint');
          } else {
            expect(lesson.type).toBe('standard');
          }
        }
      }
    }
  });

  test('Exercise Count & Pedagogical Progression: >= 15 Varied Questions per Section', async ({ request }) => {
    // Audit Spanish Course Unit 1 (Easy) vs Unit 16 (Hard)
    const spanishCourse = allCourses.find((c: any) => c.code === 'es-en');
    const pathRes = await request.get(`/api/courses/${spanishCourse._id || spanishCourse.id}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const pathData = await pathRes.json();

    // Inspect Unit 1 Lesson 1 exercises
    const u1l1Id = pathData.units[0].lessons[0]._id || pathData.units[0].lessons[0].id;
    const u1l1Res = await request.get(`/api/lessons/${u1l1Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(u1l1Res.status()).toBe(200);
    const u1l1Data = await u1l1Res.json();
    const u1Exercises = u1l1Data.exercises || u1l1Data.lesson?.exercises || [];

    expect(u1Exercises.length, 'Unit 1 Lesson 1 exercises count').toBeGreaterThanOrEqual(15);

    // Rule: Easy units (Units 1-14) must NOT have hard SENTENCE_CONSTRUCTION exercises
    const u1SentenceExercises = u1Exercises.filter((e: any) => e.type === 'SENTENCE_CONSTRUCTION');
    expect(u1SentenceExercises.length, 'Unit 1-14 should NOT contain SENTENCE_CONSTRUCTION exercises').toBe(0);

    // Verify varied exercise types in Unit 1
    const u1Types = new Set(u1Exercises.map((e: any) => e.type));
    expect(u1Types.has('MULTIPLE_CHOICE')).toBe(true);
    expect(u1Types.has('FILL_IN_THE_BLANK')).toBe(true);
    expect(u1Types.has('MATCHING_PAIRS')).toBe(true);
    expect(u1Types.has('WORD_ORDER')).toBe(true);

    // Verify no answer spoilers in multiple choice
    const mcqExercises = u1Exercises.filter((e: any) => e.type === 'MULTIPLE_CHOICE');
    for (const mcq of mcqExercises) {
      if (mcq.data?.options) {
        for (const opt of mcq.data.options) {
          // English translation spoilers should not be present in subtext
          expect(opt.translation).toBeUndefined();
        }
      }
    }

    // Inspect Unit 16 Lesson 1 exercises (Hard, Unit 15+)
    const u16l1Id = pathData.units[15].lessons[0]._id || pathData.units[15].lessons[0].id;
    const u16l1Res = await request.get(`/api/lessons/${u16l1Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(u16l1Res.status()).toBe(200);
    const u16l1Data = await u16l1Res.json();
    const u16Exercises = u16l1Data.exercises || u16l1Data.lesson?.exercises || [];

    expect(u16Exercises.length, 'Unit 16 Lesson 1 exercises count').toBeGreaterThanOrEqual(15);

    // Rule: Unit 15+ must include SENTENCE_CONSTRUCTION
    const u16SentenceExercises = u16Exercises.filter((e: any) => e.type === 'SENTENCE_CONSTRUCTION');
    expect(u16SentenceExercises.length, 'Unit 15+ must contain SENTENCE_CONSTRUCTION exercises').toBeGreaterThanOrEqual(1);

    // Verify sentence construction requires word token reassembly
    for (const sc of u16SentenceExercises) {
      expect(sc.data.wordBank.length).toBeGreaterThanOrEqual(3);
      expect(sc.data.fullSentence).toBeDefined();
    }
  });

  test('Cumulative Learning & Spaced Revision Verification', async ({ request }) => {
    // Verify German and Japanese Unit 5 Checkpoint contains spaced repetition matching pairs
    const coursesToTest = ['de-en', 'ja-en'];
    for (const code of coursesToTest) {
      const course = allCourses.find((c: any) => c.code === code);
      const pathRes = await request.get(`/api/courses/${course._id || course.id}/path`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const pathData = await pathRes.json();

      // Step 5 (Checkpoint)
      const u1l5Id = pathData.units[0].lessons[4]._id || pathData.units[0].lessons[4].id;
      const res = await request.get(`/api/lessons/${u1l5Id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      expect(res.status()).toBe(200);
      const lessonData = await res.json();
      const exercises = lessonData.exercises || lessonData.lesson?.exercises || [];

      // Ensure matching exercises contain pairs with target words and translations
      const matchingEx = exercises.filter((e: any) => e.type === 'MATCHING_PAIRS');
      expect(matchingEx.length).toBeGreaterThanOrEqual(1);
      for (const m of matchingEx) {
        expect(m.data.pairs.length).toBeGreaterThanOrEqual(4);
      }
    }
  });
});
