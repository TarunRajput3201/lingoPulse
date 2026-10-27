import { test, expect } from '@playwright/test';

test.describe('Authentication & Session Management Suite', () => {
  test.describe.configure({ mode: 'serial' });

  const timestamp = Date.now();
  const testUser = {
    email: `auth_tester_${timestamp}@lingopulse.com`,
    password: 'SafePassword123!',
    username: `auth_tester_${timestamp}`,
    displayName: 'Auth Tester',
    targetLanguage: 'es',
    learningLevel: 'beginner',
  };

  let authToken = '';

  test('TC-AUTH-01: Registers a new learner with correct initial state (5 hearts, 0 XP)', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: testUser,
    });
    expect(res.status()).toBe(201);
    const body = await res.json();

    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(testUser.email);
    expect(body.user.username).toBe(testUser.username);
    expect(body.user.hearts).toBe(5);
    expect(body.user.totalXp).toBe(0);
    expect(body.user.currentStreak).toBe(0);
    expect(body.tokens?.accessToken).toBeTruthy();
    authToken = body.tokens.accessToken;
  });

  test('TC-AUTH-02: Rejects registration with duplicate email', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: testUser,
    });
    expect(res.status()).toBe(409);
    const body = await res.json();
    expect(body.message).toMatch(/already exists|taken/i);
  });

  test('TC-AUTH-03: Authenticates successfully with valid credentials', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.tokens?.accessToken).toBeTruthy();
    expect(body.user.email).toBe(testUser.email);
  });

  test('TC-AUTH-04: Rejects login with incorrect password', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: {
        email: testUser.email,
        password: 'WrongPassword!',
      },
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toMatch(/invalid|incorrect/i);
  });

  test('TC-AUTH-05: Retrieves learner profile when authenticated with Bearer token', async ({ request }) => {
    const res = await request.get('/api/auth/profile', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.user.id || body.user._id).toBeTruthy();
    expect(body.user.email).toBe(testUser.email);
    expect(body.user.hearts).toBe(5);
  });

  test('TC-AUTH-06: Rejects profile request when unauthenticated or missing token', async ({ request }) => {
    const res = await request.get('/api/auth/profile');
    expect(res.status()).toBe(401);
  });
});
