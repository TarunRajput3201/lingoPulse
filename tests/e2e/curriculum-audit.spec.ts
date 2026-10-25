import { test, expect } from '@playwright/test';

test.describe('LingoPulse Curriculum Quality & Progression Audit', () => {
  test.describe.configure({ mode: 'serial' });

  let authToken = '';
  let spanishCourseId = '';
  let frenchCourseId = '';

  test.beforeAll(async ({ request }) => {
    // Authenticate with demo learner
    const loginRes = await request.post('/api/auth/login', {
      data: {
        email: 'learner@lingopulse.com',
        password: 'LearnerPassword123!',
      },
    });
    expect(loginRes.ok()).toBeTruthy();
    const loginData = await loginRes.json();
    authToken = loginData.tokens.accessToken;

    // Preload course IDs
    const coursesRes = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const coursesData = await coursesRes.json();
    const spanish = coursesData.courses.find((c: any) => c.code === 'es-en');
    spanishCourseId = spanish._id || spanish.id;

    const french = coursesData.courses.find((c: any) => c.code === 'fr-en');
    frenchCourseId = french._id || french.id;
  });

  test('Curriculum Audit: Courses listing returns published CEFR courses', async ({ request }) => {
    const res = await request.get('/api/courses', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.courses.length).toBeGreaterThanOrEqual(2);

    const spanish = data.courses.find((c: any) => c.code === 'es-en');
    expect(spanish).toBeDefined();
    expect(spanish.title).toBe('Spanish Essentials');
    expect(spanish.totalUnits).toBe(2);
    expect(spanish.totalLessons).toBe(5);

    const french = data.courses.find((c: any) => c.code === 'fr-en');
    expect(french).toBeDefined();
    expect(french.title).toBe('French Foundations');
    expect(french.totalUnits).toBe(1);
    expect(french.totalLessons).toBe(2);
  });

  test('Spanish Course Hierarchy: Validates CEFR A1 unit & checkpoint structure', async ({ request }) => {
    const res = await request.get(`/api/courses/${spanishCourseId}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();

    expect(data.units.length).toBe(2);

    // Unit 1
    const unit1 = data.units[0];
    expect(unit1.title).toContain('Greetings & Basics');
    expect(unit1.lessons.length).toBe(3);
    expect(unit1.lessons[0].title).toBe('Basic Greetings');
    expect(unit1.lessons[0].type).toBe('standard');
    expect(unit1.lessons[1].title).toBe('Food & Drinks');
    expect(unit1.lessons[2].title).toContain('Checkpoint 1');
    expect(unit1.lessons[2].type).toBe('checkpoint');

    // Unit 2
    const unit2 = data.units[1];
    expect(unit2.title).toContain('Travel & Directions');
    expect(unit2.lessons.length).toBe(2);
    expect(unit2.lessons[0].title).toBe('Where is the Train?');
    expect(unit2.lessons[1].title).toContain('Checkpoint 2');
    expect(unit2.lessons[1].type).toBe('checkpoint');

    // Verify initial locking progression: Lesson 1 is unlocked
    expect(unit1.lessons[0].isLocked).toBe(false);
  });

  test('French Course Hierarchy: Validates CEFR A1 salutations & café unit', async ({ request }) => {
    const res = await request.get(`/api/courses/${frenchCourseId}/path`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();

    expect(data.units.length).toBe(1);
    const unit1 = data.units[0];
    expect(unit1.title).toContain('Salutations & Café');
    expect(unit1.lessons.length).toBe(2);
    expect(unit1.lessons[0].title).toBe('French Greetings & Courtesy');
    expect(unit1.lessons[1].title).toContain('Checkpoint');
  });

  test('Admin CMS UI: Verifies course curriculum and exercise builder views', async ({ page }) => {
    await page.goto('http://localhost:5180');

    // Confirm Admin UI brand header
    await expect(page.getByRole('heading', { name: 'LingoPulse' })).toBeVisible();
    await expect(page.getByText('CMS & Admin')).toBeVisible();

    // Navigate to Course Curriculum tab
    await page.getByRole('button', { name: 'Course Curriculum' }).click();
    await expect(page.getByRole('heading', { name: 'Curriculum Hierarchy' })).toBeVisible();
    await expect(page.getByText('Spanish Essentials', { exact: true })).toBeVisible({ timeout: 10000 });

    // Navigate to Exercise Builder tab
    await page.getByRole('button', { name: 'Exercise Builder' }).click();
    await expect(page.getByRole('heading', { name: 'Interactive Exercise Authoring' })).toBeVisible();
    await expect(page.getByText('Learner Mobile Preview')).toBeVisible({ timeout: 10000 });
  });
});
