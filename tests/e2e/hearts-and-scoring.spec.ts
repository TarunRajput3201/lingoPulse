import { test, expect } from '@playwright/test';
import { MAX_HEARTS, REFILL_INTERVAL_MS, HeartService } from '../../backend/src/services/heartService';
import {
  CharacterId,
  CHARACTER_PROFILES,
  getCharacterForQuestion,
  getCharacterQuote,
} from '../../mobile/src/components/character/Character3DRegistry';

test.describe('LingoPulse E2E: Hearts System, 50% Passing Threshold & Best Score Tracking', () => {
  const API_URL = 'http://localhost:5050/api';

  test('TC-HEARTS-01: User registers with 100 max hearts and GET /api/auth/hearts returns 100 hearts and 0s countdown', async ({ request }) => {
    const id = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const uniqueEmail = `hearts_test_${id}@lingopulse.com`;
    const regRes = await request.post(`${API_URL}/auth/register`, {
      data: {
        username: `user_${id}`,
        email: uniqueEmail,
        password: 'Password123!',
        displayName: 'Heart Tester',
        nativeLanguage: 'en',
        targetLanguage: 'es',
        learningLevel: 'beginner',
      },
    });

    expect(regRes.status()).toBe(201);
    const regData = await regRes.json();
    expect(regData.user.hearts).toBe(100);
    expect(regData.user.maxHearts).toBe(100);

    const token = regData.tokens.accessToken;

    // Check GET /api/auth/hearts
    const heartsRes = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(heartsRes.status()).toBe(200);
    const heartsData = await heartsRes.json();
    expect(heartsData.hearts).toBe(100);
    expect(heartsData.maxHearts).toBe(100);
    expect(heartsData.nextHeartInSeconds).toBe(0);
  });

  test('TC-HEARTS-02: 10-Minute Regeneration accurate timestamp remainder & capping at 100', () => {
    // 10 minutes = 600,000 ms
    expect(REFILL_INTERVAL_MS).toBe(600000);
    expect(MAX_HEARTS).toBe(100);

    // Mock user with 95 hearts, 25 minutes elapsed (should regenerate 2 hearts and have 5 min remainder)
    const mockUser: any = {
      hearts: 95,
      maxHearts: 100,
      lastHeartRefillAt: new Date(Date.now() - 25 * 60 * 1000),
    };

    const status = HeartService.refreshHearts(mockUser);
    expect(status.hearts).toBe(97);
    expect(mockUser.hearts).toBe(97);
    // Remaining time towards 98th heart should be approx 5 minutes (300 seconds)
    expect(status.nextHeartInSeconds).toBeGreaterThanOrEqual(295);
    expect(status.nextHeartInSeconds).toBeLessThanOrEqual(305);

    // If 1000 minutes elapsed, should cap at 100 hearts and 0 nextHeartInSeconds
    const offlineUser: any = {
      hearts: 80,
      maxHearts: 100,
      lastHeartRefillAt: new Date(Date.now() - 1000 * 60 * 1000),
    };
    const cappedStatus = HeartService.refreshHearts(offlineUser);
    expect(cappedStatus.hearts).toBe(100);
    expect(offlineUser.hearts).toBe(100);
    expect(cappedStatus.nextHeartInSeconds).toBe(0);
  });

  test('TC-PASSING-01: Section Passing Rules - Below 50% fails, 50% and above passes', async ({ request }) => {
    const id = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const uniqueEmail = `pass_test_${id}@lingopulse.com`;
    const regRes = await request.post(`${API_URL}/auth/register`, {
      data: {
        username: `pass_${id}`,
        email: uniqueEmail,
        password: 'Password123!',
        displayName: 'Scoring Learner',
        nativeLanguage: 'en',
        targetLanguage: 'es',
        learningLevel: 'beginner',
      },
    });
    const { tokens } = await regRes.json();
    const token = tokens.accessToken;

    // Fetch Spanish course path
    const courseRes = await request.get(`${API_URL}/courses/path/en-es`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(courseRes.status()).toBe(200);
    const courseData = await courseRes.json();
    const firstLessonId = courseData.units[0].lessons[0].id || courseData.units[0].lessons[0]._id;

    // Attempt 1: Score 40% (Below 50%) -> should NOT pass
    const failRes = await request.post(`${API_URL}/lessons/complete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId: firstLessonId,
        accuracy: 40,
        xpEarned: 5,
        heartsLost: 1,
        timeSpentSeconds: 60,
      },
    });
    expect(failRes.status()).toBe(200);
    const failData = await failRes.json();
    expect(failData.passed).toBe(false);
    expect(failData.requiresRepeat).toBe(true);
    expect(failData.accuracyPercentage).toBe(40);
    expect(failData.bestScore).toBe(40);
    expect(failData.attemptsCount).toBe(1);

    // Attempt 2: Score 50% (Exactly passing threshold) -> should PASS
    const passRes = await request.post(`${API_URL}/lessons/complete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId: firstLessonId,
        accuracy: 50,
        xpEarned: 15,
        heartsLost: 0,
        timeSpentSeconds: 55,
      },
    });
    expect(passRes.status()).toBe(200);
    const passData = await passRes.json();
    expect(passData.passed).toBe(true);
    expect(passData.requiresRepeat).toBe(false);
    expect(passData.accuracyPercentage).toBe(50);
    expect(passData.bestScore).toBe(50);
    expect(passData.attemptsCount).toBe(2);
  });

  test('TC-SCORING-02: Best Score Tracking - Lower subsequent attempt never overwrites higher best score', async ({ request }) => {
    const id = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const uniqueEmail = `bestscore_${id}@lingopulse.com`;
    const regRes = await request.post(`${API_URL}/auth/register`, {
      data: {
        username: `best_${id}`,
        email: uniqueEmail,
        password: 'Password123!',
        displayName: 'Best Score Learner',
        nativeLanguage: 'en',
        targetLanguage: 'es',
        learningLevel: 'beginner',
      },
    });
    const { tokens } = await regRes.json();
    const token = tokens.accessToken;

    const courseRes = await request.get(`${API_URL}/courses/path/en-es`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const courseData = await courseRes.json();
    const lessonId = courseData.units[0].lessons[0].id || courseData.units[0].lessons[0]._id;

    // Attempt 1: High score of 90%
    const attempt1 = await request.post(`${API_URL}/lessons/complete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId,
        accuracy: 90,
        xpEarned: 20,
        heartsLost: 0,
        timeSpentSeconds: 50,
      },
    });
    const data1 = await attempt1.json();
    expect(data1.bestScore).toBe(90);
    expect(data1.passed).toBe(true);

    // Attempt 2: Retry with low score of 35% (e.g. learner testing distractors)
    const attempt2 = await request.post(`${API_URL}/lessons/complete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId,
        accuracy: 35,
        xpEarned: 0,
        heartsLost: 2,
        timeSpentSeconds: 40,
      },
    });
    const data2 = await attempt2.json();
    // CRITICAL: bestScore MUST remain 90%, NOT 35%
    expect(data2.bestScore).toBe(90);
    expect(data2.accuracyPercentage).toBe(35);
    expect(data2.attemptsCount).toBe(2);
    expect(data2.attemptsHistory.length).toBe(2);
    expect(data2.attemptsHistory[0].score).toBe(90);
    expect(data2.attemptsHistory[1].score).toBe(35);

    // Attempt 3: Retry with new personal best of 100%
    const attempt3 = await request.post(`${API_URL}/lessons/complete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lessonId,
        accuracy: 100,
        xpEarned: 25,
        heartsLost: 0,
        timeSpentSeconds: 45,
      },
    });
    const data3 = await attempt3.json();
    expect(data3.bestScore).toBe(100);
    expect(data3.attemptsCount).toBe(3);
    expect(data3.attemptsHistory.length).toBe(3);
  });

  test('TC-3D-RIG-01: Redesigned 3D Characters - Profile registry, roles, and mood reactions for all 5 characters', () => {
    const characterIds: CharacterId[] = ['maya', 'leo', 'elena', 'kael', 'pip'];

    characterIds.forEach((charId) => {
      const profile = CHARACTER_PROFILES[charId];
      expect(profile).toBeDefined();
      expect(profile.name.length).toBeGreaterThan(0);
      expect(profile.role.length).toBeGreaterThan(0);
      expect(profile.accentColor).toMatch(/^#[0-9A-Fa-f]{6}$/);

      // Verify quotes across emotional states
      const introQuote = getCharacterQuote(charId, 'intro');
      const correctQuote = getCharacterQuote(charId, 'correct');
      const mistakeQuote = getCharacterQuote(charId, 'mistake');

      expect(introQuote.length).toBeGreaterThan(0);
      expect(correctQuote.length).toBeGreaterThan(0);
      expect(mistakeQuote.length).toBeGreaterThan(0);
    });
  });
});
