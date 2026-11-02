import { test, expect } from '@playwright/test';

test.describe('Priority 1 & 9: Multilingual Data Integrity & French Isolation E2E Suite', () => {
  test.describe.configure({ mode: 'serial' });

  let authToken = '';
  let frenchCourse: any;
  let spanishCourse: any;
  let germanCourse: any;
  let frenchLesson: any;
  let spanishLesson: any;

  test.beforeAll(async ({ request }) => {
    // 1. Authenticate or register a dedicated test learner
    const regRes = await request.post('/api/auth/register', {
      data: {
        email: `tester_journey_${Date.now()}@lingopulse.com`,
        password: 'Password123!',
        username: `tester_${Date.now().toString().slice(-6)}`,
        displayName: 'Language Integrity Tester',
        targetLanguage: 'fr',
        learningLevel: 'beginner',
      },
    });

    if (regRes.ok()) {
      const regData = await regRes.json();
      authToken = regData.tokens.accessToken;
    } else {
      // Fallback to login
      const loginRes = await request.post('/api/auth/login', {
        data: {
          email: 'learner@lingopulse.com',
          password: 'LearnerPassword123!',
        },
      });
      const loginData = await loginRes.json();
      authToken = loginData.tokens.accessToken;
    }

    // 2. Fetch courses catalog
    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(coursesRes.ok()).toBeTruthy();
    const coursesData = await coursesRes.json();

    frenchCourse = coursesData.courses.find((c: any) => c.toLanguage === 'fr' || c.code === 'fr-en');
    spanishCourse = coursesData.courses.find((c: any) => c.toLanguage === 'es' || c.code === 'es-en');
    germanCourse = coursesData.courses.find((c: any) => c.toLanguage === 'de' || c.code === 'de-en');

    expect(frenchCourse).toBeDefined();
    expect(spanishCourse).toBeDefined();

    // 3. Preload French & Spanish first lessons
    const frPathRes = await request.get(`/api/courses/${frenchCourse._id}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const frPath = await frPathRes.json();
    frenchLesson = frPath.units?.[0]?.lessons?.[0];

    const esPathRes = await request.get(`/api/courses/${spanishCourse._id}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const esPath = await esPathRes.json();
    spanishLesson = esPath.units?.[0]?.lessons?.[0];

    expect(frenchLesson).toBeDefined();
    expect(spanishLesson).toBeDefined();
  });

  test('Journey A: Fresh French Selection loads authentic French exercises, never Spanish', async ({ request }) => {
    const res = await request.get(`/api/lessons/${frenchLesson.id}?expectedLanguage=fr`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.lesson).toBeDefined();
    expect(body.exercises.length).toBeGreaterThan(0);

    // Assert every exercise prompt & instruction does not contain Spanish vocabulary
    for (const ex of body.exercises) {
      const text = `${ex.prompt} ${ex.instruction || ''}`.toLowerCase();
      // Ensure no Spanish leak
      expect(text).not.toContain('hola');
      expect(text).not.toContain('buenos días');
      expect(text).not.toContain('gracias');
    }
  });

  test('Journey B: Switch from Spanish to French records progress in French isolated course', async ({ request }) => {
    // 1. Complete Spanish lesson
    const esCompRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        lessonId: spanishLesson.id,
        courseId: spanishCourse._id,
        attempts: [],
        score: 100,
        accuracy: 100,
      },
    });
    expect(esCompRes.status()).toBe(200);

    // 2. Switch to French and fetch French path
    const frPathRes = await request.get(`/api/courses/${frenchCourse._id}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(frPathRes.status()).toBe(200);
    const frPath = await frPathRes.json();

    // 3. Verify French first lesson is unlocked and not contaminated by Spanish completion
    const frFirstLesson = frPath.units[0].lessons[0];
    expect(frFirstLesson.id).toBe(frenchLesson.id);
    expect(frFirstLesson.isLocked).toBe(false);

    // 4. Complete French lesson
    const frCompRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        lessonId: frenchLesson.id,
        courseId: frenchCourse._id,
        attempts: [],
        score: 100,
        accuracy: 100,
      },
    });
    expect(frCompRes.status()).toBe(200);
  });

  test('Journey C: Direct French Deep-Link preserves French content without fallback', async ({ request }) => {
    const res = await request.get(`/api/lessons/${frenchLesson.id}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.lesson.title).toBe(frenchLesson.title);
    expect(body.exercises.length).toBeGreaterThan(0);
  });

  test('Journey D: Rapid Switch Sequence between Spanish, German, French', async ({ request }) => {
    const switchLanguages = [
      { course: spanishCourse, lang: 'es' },
      { course: germanCourse, lang: 'de' },
      { course: frenchCourse, lang: 'fr' },
    ];

    for (const item of switchLanguages) {
      if (!item.course) continue;
      const pathRes = await request.get(`/api/courses/${item.course._id}/path`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      expect(pathRes.status()).toBe(200);
      const data = await pathRes.json();
      expect(data.course.toLanguage).toBe(item.lang);
    }
  });

  test('Journey E: Cross-Language Tampering is strictly rejected with HTTP 400', async ({ request }) => {
    // Attempt to fetch Spanish lesson with expectedLanguage=fr
    const getRes = await request.get(`/api/lessons/${spanishLesson.id}?expectedLanguage=fr`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(getRes.status()).toBe(400);
    const getBody = await getRes.json();
    expect(getBody.error).toBe('CROSS_LANGUAGE_VIOLATION');

    // Attempt to complete Spanish lesson claiming French courseId
    const postRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        lessonId: spanishLesson.id,
        courseId: frenchCourse._id,
        attempts: [],
        score: 100,
        accuracy: 100,
      },
    });
    expect(postRes.status()).toBe(400);
    const postBody = await postRes.json();
    expect(postBody.error).toBe('CROSS_LANGUAGE_VIOLATION');
  });
});
