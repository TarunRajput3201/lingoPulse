import { test, expect } from '@playwright/test';

test.describe('Learner Onboarding & Goal Customization Suite', () => {
  test.describe.configure({ mode: 'serial' });

  const timestamp = Date.now();
  const testUser = {
    email: `onboard_${timestamp}@lingopulse.com`,
    password: 'SafePassword123!',
    username: `onboard_${timestamp}`,
    displayName: 'Onboard Learner',
  };

  let token = '';

  test.beforeAll(async ({ request }) => {
    const regRes = await request.post('/api/auth/register', { data: testUser });
    const regData = await regRes.json();
    token = regData.tokens.accessToken;
  });

  test('TC-ONB-01: Verifies new user starts with hasCompletedOnboarding false', async ({ request }) => {
    const res = await request.get('/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(body.user.hasCompletedOnboarding).toBe(false);
  });

  test('TC-ONB-02: Successfully submits onboarding choices (French, intermediate, 15 mins daily)', async ({ request }) => {
    const res = await request.post('/api/auth/onboarding', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        targetLanguage: 'fr',
        learningLevel: 'intermediate',
        dailyGoalMinutes: 15,
        reminderTime: '20:00',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user.hasCompletedOnboarding).toBe(true);
    expect(body.user.targetLanguage).toBe('fr');
    expect(body.user.preferences.dailyGoalMinutes).toBe(15);
  });

  test('TC-ONB-03: Onboarding preferences persist across subsequent profile fetches', async ({ request }) => {
    const res = await request.get('/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    expect(body.user.hasCompletedOnboarding).toBe(true);
    expect(body.user.targetLanguage).toBe('fr');
    expect(body.user.preferences.dailyGoalMinutes).toBe(15);
  });
});
