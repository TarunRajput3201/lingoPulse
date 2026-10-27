import { test, expect } from '@playwright/test';

test.describe('Navigation & Curriculum Tree API Suite', () => {
  const timestamp = Date.now();
  const testUser = {
    email: `nav_tester_${timestamp}@lingopulse.com`,
    password: 'SafePassword123!',
    username: `nav_tester_${timestamp}`,
    displayName: 'Nav Tester',
    targetLanguage: 'es',
    learningLevel: 'beginner',
  };

  let token = '';
  let courseId = '';

  test.beforeAll(async ({ request }) => {
    const regRes = await request.post('/api/auth/register', { data: testUser });
    const regData = await regRes.json();
    token = regData.tokens.accessToken;
  });

  test('TC-NAV-01: Fetches published course catalog with language metadata', async ({ request }) => {
    const res = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();

    expect(Array.isArray(body.courses)).toBe(true);
    expect(body.courses.length).toBeGreaterThanOrEqual(1);

    const spanishCourse = body.courses.find((c: any) => c.code === 'es-en');
    expect(spanishCourse).toBeDefined();
    expect(spanishCourse.title).toContain('Spanish');
    expect(spanishCourse.fromLanguage).toBe('en');
    expect(spanishCourse.toLanguage).toBe('es');
    expect(spanishCourse.flagIcon).toBe('🇪🇸');
    courseId = spanishCourse._id || spanishCourse.id;
  });

  test('TC-NAV-02: Generates learning tree hierarchy with units and lessons', async ({ request }) => {
    const res = await request.get(`/api/courses/${courseId}/path`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();

    expect(body.course).toBeDefined();
    expect(Array.isArray(body.units)).toBe(true);
    expect(body.units.length).toBeGreaterThanOrEqual(2);

    const unit1 = body.units[0];
    expect(unit1.unitNumber).toBe(1);
    expect(unit1.lessons.length).toBeGreaterThanOrEqual(2);
  });

  test('TC-NAV-03: Enforces lesson unlocking order (Lesson 1 unlocked, Lesson 2 locked for fresh user)', async ({ request }) => {
    const res = await request.get(`/api/courses/${courseId}/path`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    const unit1 = body.units[0];

    const lesson1 = unit1.lessons[0];
    const lesson2 = unit1.lessons[1];

    expect(lesson1.isLocked).toBe(false);
    expect(lesson1.isCurrent).toBe(true);
    expect(lesson2.isLocked).toBe(true);
    expect(lesson2.isCompleted).toBe(false);
  });
});
