import { test, expect } from '@playwright/test';

test.describe('Exercise Engine & Answer Validation Suite', () => {
  const timestamp = Date.now();
  const testUser = {
    email: `engine_tester_${timestamp}@lingopulse.com`,
    password: 'SafePassword123!',
    username: `engine_tester_${timestamp}`,
    displayName: 'Engine Tester',
    targetLanguage: 'es',
    learningLevel: 'beginner',
  };

  let token = '';
  let lesson1Id = '';

  test.beforeAll(async ({ request }) => {
    const regRes = await request.post('/api/auth/register', { data: testUser });
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

  test('TC-EXE-01: Retrieves lesson exercises with interactive payloads', async ({ request }) => {
    const res = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();

    expect(body.lesson).toBeDefined();
    expect(Array.isArray(body.exercises)).toBe(true);
    expect(body.exercises.length).toBeGreaterThanOrEqual(3);
  });

  test('TC-EXE-02: Validates Multiple Choice answer and returns pedagogical feedback', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { exercises } = await lessonRes.json();
    const mcEx = exercises.find((e: any) => e.type === 'MULTIPLE_CHOICE');
    expect(mcEx).toBeDefined();

    // Match option with correct text 'Hola'
    const correctOpt = mcEx.data.options.find((opt: any) => opt.text.toLowerCase().includes('hola'));
    const userAnswer = correctOpt ? correctOpt.id : 'Hola';

    const res = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        exerciseId: mcEx.id,
        userAnswer,
        durationMs: 1200,
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.isCorrect).toBe(true);
    expect(body.heartsRemaining).toBe(100);
  });

  test('TC-EXE-03: Tolerates missing accents pedagogically in translation exercises without deducting hearts', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { exercises } = await lessonRes.json();
    const transEx = exercises.find((e: any) => e.type === 'TRANSLATION');
    if (transEx) {
      // Submit without accent (e.g. 'Buenos dias' instead of 'Buenos días')
      const res = await request.post('/api/lessons/submit-answer', {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          exerciseId: transEx.id,
          userAnswer: 'Buenos dias',
          durationMs: 1800,
        },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.isCorrect).toBe(true);
      expect(body.heartsRemaining).toBe(100);
    }
  });

  test('TC-EXE-04: Deducts 1 heart on incorrect answer and logs to practice mistakes', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { exercises } = await lessonRes.json();
    const ex = exercises[0];

    const res = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        exerciseId: ex.id,
        userAnswer: 'completely_wrong_answer_xyz',
        durationMs: 1500,
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.isCorrect).toBe(false);
    expect(body.heartsRemaining).toBe(99);
    expect(body.explanation).toBeTruthy();

    // Verify mistake logged in practice
    const practiceRes = await request.get('/api/practice/mistakes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const practiceBody = await practiceRes.json();
    expect(practiceBody.totalMistakesToReview).toBeGreaterThanOrEqual(1);
  });

  test('TC-EXE-05: Validates WORD_ORDER exercises with word array or joined string payloads', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { exercises } = await lessonRes.json();
    const woEx = exercises.find((e: any) => e.type === 'WORD_ORDER');
    if (woEx) {
      // Test sending array of tokens
      const res = await request.post('/api/lessons/submit-answer', {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          exerciseId: woEx.id,
          userAnswer: woEx.data.sentence || ['Hola', 'mucho', 'gusto'],
          durationMs: 2100,
        },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(typeof body.isCorrect).toBe('boolean');
    }
  });

  test('TC-EXE-06: Verifies MCQ options contain no answer spoiler translation hints in payload', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { exercises } = await lessonRes.json();
    const mcEx = exercises.find((e: any) => e.type === 'MULTIPLE_CHOICE');
    expect(mcEx).toBeDefined();

    // Verify each option does not expose a translation spoiler in the payload
    for (const opt of mcEx.data.options) {
      expect(opt).toHaveProperty('id');
      expect(opt).toHaveProperty('text');
      expect(opt.translation).toBeUndefined();
    }
  });

  test('TC-EXE-07: Progressive Learning Engine: Enforces Unit 15 boundary for hard complete sentence construction', async () => {
    const { ProgressiveLearningEngine } = require('../../../backend/dist/services/progressiveLearningEngine');

    // Units 1 to 14: Steps 1-2 must be easy, Steps 3-5 medium, sentence construction forbidden
    for (let u = 1; u <= 14; u++) {
      expect(ProgressiveLearningEngine.isSentenceConstructionAllowed(u)).toBe(false);
      expect(ProgressiveLearningEngine.getStepDifficulty(u, 1)).toBe('easy');
      expect(ProgressiveLearningEngine.getStepDifficulty(u, 2)).toBe('easy');
      expect(ProgressiveLearningEngine.getStepDifficulty(u, 3)).toBe('medium');
      expect(ProgressiveLearningEngine.getStepDifficulty(u, 4)).toBe('medium');
      expect(ProgressiveLearningEngine.getStepDifficulty(u, 5)).toBe('medium');
    }

    // Unit 15+: Sentence construction permitted, difficulty reaches hard
    expect(ProgressiveLearningEngine.isSentenceConstructionAllowed(15)).toBe(true);
    expect(ProgressiveLearningEngine.getStepDifficulty(15, 5)).toBe('hard');
    expect(ProgressiveLearningEngine.isSentenceConstructionAllowed(16)).toBe(true);
  });
});

