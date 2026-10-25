import { test, expect } from '@playwright/test';

test.describe('Linguistic Quality, Accent Tolerance & Anti-Cheat Sanitization', () => {
  test.describe.configure({ mode: 'serial' });
  let authToken = '';
  let lesson1Id = '';
  let lesson4Id = '';

  test.beforeAll(async ({ request }) => {
    const timestamp = Date.now();
    const regRes = await request.post('/api/auth/register', {
      data: {
        email: `quality_tester_${timestamp}@lingopulse.com`,
        password: 'Password123!',
        username: `qual_test_${timestamp}`,
        displayName: 'Quality Tester',
        targetLanguage: 'es',
        learningLevel: 'beginner',
      },
    });
    const regData = await regRes.json();
    authToken = regData.tokens.accessToken;

    // Fetch Spanish course path
    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const coursesData = await coursesRes.json();
    const spanish = coursesData.courses.find((c: any) => c.code === 'es-en');
    const pathRes = await request.get(`/api/courses/${spanish._id}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const pathData = await pathRes.json();
    lesson1Id = pathData.units[0].lessons[0].id;
    lesson4Id = pathData.units[1].lessons[0].id;
  });

  test('Accent Tolerance: Accepting omitted diacritics with pedagogical guidance (no heart loss)', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const lessonData = await lessonRes.json();
    const translationEx = lessonData.exercises.find((ex: any) => ex.type === 'TRANSLATION');
    expect(translationEx).toBeDefined();

    // 1. Submit answer omitting accent mark ("buenos dias" instead of "Buenos días")
    const res = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        exerciseId: translationEx.id,
        userAnswer: 'buenos dias',
      },
    });

    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.isCorrect).toBe(true); // Must be marked correct!
    expect(data.hasAccentWarning).toBe(true); // Must flag accent reminder
    expect(data.pedagogicalTip).toContain('Buenos días');
    expect(data.heartsRemaining).toBe(5); // Hearts preserved!
  });

  test('Punctuation & Case Normalization: Inverted Spanish punctuation handling', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const lessonData = await lessonRes.json();
    const fillBlankEx = lessonData.exercises.find((ex: any) => ex.type === 'FILL_IN_THE_BLANK');
    expect(fillBlankEx).toBeDefined();

    // Submit lowercase without accent: 'como'
    const res = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        exerciseId: fillBlankEx.id,
        userAnswer: 'como',
      },
    });

    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.isCorrect).toBe(true);
    expect(data.hasAccentWarning).toBe(true);
  });

  test('Regional Vocabulary Flexibility: Accepts both "el boleto" and "el billete"', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson4Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const lessonData = await lessonRes.json();
    const ticketEx = lessonData.exercises.find((ex: any) => ex.type === 'TRANSLATION');
    expect(ticketEx).toBeDefined();

    // Submit Peninsular Spanish variant: 'el billete por favor'
    const res = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        exerciseId: ticketEx.id,
        userAnswer: 'el billete por favor',
      },
    });

    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.isCorrect).toBe(true);
  });

  test('Anti-Cheat Sanitization: Ensures client exercise payload does NOT leak answer keys', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const lessonData = await lessonRes.json();

    for (const ex of lessonData.exercises) {
      // Must not leak authoritative answer fields
      expect(ex.data?.correctOptionId).toBeUndefined();
      expect(ex.data?.acceptableAnswers).toBeUndefined();
      expect(ex.data?.correctOrder).toBeUndefined();
      expect(ex.data?.correctSentence).toBeUndefined();

      // Must provide necessary client display data
      expect(ex.prompt).toBeDefined();
      expect(ex.type).toBeDefined();
    }
  });

  test('Speech Pronunciation: Validates phonetics above 70% threshold with guidance', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const lessonData = await lessonRes.json();

    // We test a speaking exercise directly via submit-answer
    // First, let's fetch Checkpoint 1 which has a speaking exercise
    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const coursesData = await coursesRes.json();
    const spanish = coursesData.courses.find((c: any) => c.code === 'es-en');
    const pathRes = await request.get(`/api/courses/${spanish._id}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const pathData = await pathRes.json();
    const checkpoint1Id = pathData.units[0].lessons[2].id;

    const cpRes = await request.get(`/api/lessons/${checkpoint1Id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const cpData = await cpRes.json();
    const speakEx = cpData.exercises.find((ex: any) => ex.type === 'SPEAKING_PRONUNCIATION');
    expect(speakEx).toBeDefined();

    // 1. Submit accurate speech input: "por favor"
    const passRes = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        exerciseId: speakEx.id,
        userAnswer: 'por favor',
      },
    });
    expect(passRes.status()).toBe(200);
    const passData = await passRes.json();
    expect(passData.isCorrect).toBe(true);

    // 2. Submit mismatched speech input: "adios"
    const failRes = await request.post('/api/lessons/submit-answer', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        exerciseId: speakEx.id,
        userAnswer: 'adios',
      },
    });
    expect(failRes.status()).toBe(200);
    const failData = await failRes.json();
    expect(failData.isCorrect).toBe(false);
    expect(failData.hint).toContain('fah-VOR'); // Phonetic guide supplied!
  });
});
