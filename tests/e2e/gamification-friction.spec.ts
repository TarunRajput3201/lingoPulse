import { test, expect } from '@playwright/test';

test.describe('Gamification Mechanics & Frictionless Engagement', () => {
  test.describe.configure({ mode: 'serial' });
  const timestamp = Date.now();
  const gamifyUser = {
    email: `gamify_${timestamp}@lingopulse.com`,
    password: 'Password123!',
    username: `streak_hero_${timestamp}`,
    displayName: 'Streak Hero',
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

  test('Heart Floor & Ceiling: Never drops below 0 or exceeds maxHearts', async ({ request }) => {
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const lessonData = await lessonRes.json();
    const exId = lessonData.exercises[0].id;

    // Fail 6 times intentionally
    let lastHeartCount = 5;
    for (let i = 0; i < 6; i++) {
      const res = await request.post('/api/lessons/submit-answer', {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          exerciseId: exId,
          userAnswer: 'wrong_answer',
        },
      });
      const data = await res.json();
      lastHeartCount = data.heartsRemaining;
    }

    // Must never fall below 0
    expect(lastHeartCount).toBe(0);

    // Practice to recover hearts
    for (let i = 0; i < 6; i++) {
      await request.post('/api/practice/complete', {
        headers: { Authorization: `Bearer ${token}` },
        data: { resolvedExerciseIds: [exId] },
      });
    }

    // Check profile
    const profileRes = await request.get('/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profile = await profileRes.json();
    // Cannot exceed maxHearts (5)
    expect(profile.user.hearts).toBe(5);
  });

  test('Streak Idempotency: Multiple lessons on same calendar day maintain single day streak increment', async ({ request }) => {
    // Complete lesson 1 first time today
    const firstRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId: lesson1Id,
        attempts: [{ exerciseId: 'dummy', isCorrect: true, durationMs: 100 }],
      },
    });
    const firstData = await firstRes.json();
    expect(firstData.newStreak).toBe(1);

    // Complete lesson 1 second time today
    const secondRes = await request.post('/api/lessons/complete', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId: lesson1Id,
        attempts: [{ exerciseId: 'dummy', isCorrect: true, durationMs: 100 }],
      },
    });
    const secondData = await secondRes.json();
    // Streak must remain 1 for the same day (no false inflation)
    expect(secondData.newStreak).toBe(1);
    expect(secondData.isStreakExtended).toBe(false);
  });

  test('Weekly Leaderboard: User XP accumulates and appears on weekly leaderboard', async ({ request }) => {
    const leaderRes = await request.get('/api/leaderboard/weekly', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(leaderRes.status()).toBe(200);
    const leaderData = await leaderRes.json();

    expect(Array.isArray(leaderData.leaderboard)).toBe(true);
    expect(leaderData.leaderboard.length).toBeGreaterThan(0);

    // Verify current user entry exists on leaderboard
    const userEntry = leaderData.leaderboard.find(
      (e: any) => e.isCurrentUser || e.username === gamifyUser.username || e.displayName === gamifyUser.displayName
    );
    expect(userEntry).toBeDefined();
    expect(userEntry.weeklyXp).toBeGreaterThanOrEqual(10);
  });
});
