import { test, expect } from '@playwright/test';
import mongoose from '../../backend/node_modules/mongoose';
import { MAX_HEARTS, REFILL_INTERVAL_MS, HeartService } from '../../backend/src/services/heartService';
import { User } from '../../backend/src/models/User';
import { Exercise } from '../../backend/src/models/Exercise';
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

test.describe('Mandatory 12 Scenarios: Hearts Persistence, Background Regeneration & Guest Restrictions', () => {
  const API_URL = 'http://localhost:5050/api';

  test.beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/lingopulse');
    }
  });

  test.afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  const createUser = async (request: any, prefix: string) => {
    const id = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    const email = `${prefix}_${id}@lingopulse.com`;
    const password = 'Password123!';
    const username = `${prefix}_${id}`;
    const res = await request.post(`${API_URL}/auth/register`, {
      data: {
        username,
        email,
        password,
        displayName: `${prefix} User`,
        nativeLanguage: 'en',
        targetLanguage: 'es',
        learningLevel: 'beginner',
      },
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    return { token: data.tokens.accessToken, user: data.user, email, password, username, id: data.user.id };
  };

  test('Scenario 1: Login with 5 hearts, close the app, wait 10+ minutes, reopen: balance must be 6', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen1');
    const elevenMinutesAgo = new Date(Date.now() - 11 * 60 * 1000);
    await User.findByIdAndUpdate(id, { hearts: 5, lastHeartRefillAt: elevenMinutesAgo });

    const heartsRes = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(heartsRes.status()).toBe(200);
    const data = await heartsRes.json();
    expect(data.hearts).toBe(6);
    expect(data.maxHearts).toBe(100);
    expect(data.nextHeartInSeconds).toBeGreaterThan(500);
    expect(data.nextHeartInSeconds).toBeLessThanOrEqual(600);

    const profileRes = await request.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profileData = await profileRes.json();
    expect(profileData.user.hearts).toBe(6);
  });

  test('Scenario 2: Close the app for 30 minutes: balance must increase by 3, subject to the 100-heart cap', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen2');
    const thirtyTwoMinutesAgo = new Date(Date.now() - 32 * 60 * 1000);
    await User.findByIdAndUpdate(id, { hearts: 5, lastHeartRefillAt: thirtyTwoMinutesAgo });

    const heartsRes = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(heartsRes.status()).toBe(200);
    const data = await heartsRes.json();
    expect(data.hearts).toBe(8);
    expect(data.maxHearts).toBe(100);
    expect(data.nextHeartInSeconds).toBeGreaterThan(450);
    expect(data.nextHeartInSeconds).toBeLessThanOrEqual(500);
  });

  test('Scenario 3: Reopen repeatedly: hearts and countdown must never reset', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen3');
    const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);
    await User.findByIdAndUpdate(id, { hearts: 10, lastHeartRefillAt: twentyMinutesAgo });

    const res1 = await request.get(`${API_URL}/auth/hearts`, { headers: { Authorization: `Bearer ${token}` } });
    const data1 = await res1.json();
    expect(data1.hearts).toBe(12);

    const res2 = await request.get(`${API_URL}/auth/hearts`, { headers: { Authorization: `Bearer ${token}` } });
    const data2 = await res2.json();
    expect(data2.hearts).toBe(12);
    expect(data2.hearts).not.toBe(5);

    const res3 = await request.get(`${API_URL}/auth/hearts`, { headers: { Authorization: `Bearer ${token}` } });
    const data3 = await res3.json();
    expect(data3.hearts).toBe(12);
  });

  test('Scenario 4: Switch devices and log in: same account balance and regeneration state must appear', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen4');
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    await User.findByIdAndUpdate(id, { hearts: 20, lastHeartRefillAt: fifteenMinutesAgo });

    const dev1Res = await request.get(`${API_URL}/auth/hearts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'LingoPulse-iOS-Client/2.0',
        'X-Device-Id': 'device_ios_001',
      },
    });
    const dev1Data = await dev1Res.json();
    expect(dev1Data.hearts).toBe(21);

    const dev2Res = await request.get(`${API_URL}/auth/hearts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'LingoPulse-Android-Tablet/2.0',
        'X-Device-Id': 'device_android_002',
      },
    });
    const dev2Data = await dev2Res.json();
    expect(dev2Data.hearts).toBe(21);
    expect(Math.abs(dev2Data.nextHeartInSeconds - dev1Data.nextHeartInSeconds)).toBeLessThanOrEqual(2);
  });

  test('Scenario 5: Log out and log back in: regeneration must reflect actual elapsed time', async ({ request }) => {
    const { id, email, password } = await createUser(request, 'scen5');
    const fortyFiveMinutesAgo = new Date(Date.now() - 45 * 60 * 1000);
    await User.findByIdAndUpdate(id, { hearts: 10, lastHeartRefillAt: fortyFiveMinutesAgo });

    const loginRes = await request.post(`${API_URL}/auth/login`, {
      data: { email, password },
    });
    expect(loginRes.status()).toBe(200);
    const loginData = await loginRes.json();
    expect(loginData.user.hearts).toBe(14);
    expect(loginData.user.maxHearts).toBe(100);
  });

  test('Scenario 6: Reach 100 hearts: no further regeneration', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen6');
    const oneDayAgo = new Date(Date.now() - 24 * 3600 * 1000);
    await User.findByIdAndUpdate(id, { hearts: 100, lastHeartRefillAt: oneDayAgo });

    const heartsRes = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await heartsRes.json();
    expect(data.hearts).toBe(100);
    expect(data.maxHearts).toBe(100);
    expect(data.nextHeartInSeconds).toBe(0);
  });

  test('Scenario 7: Start with 99 hearts and wait 10 minutes: balance must become 100, never 101', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen7');
    const thirtyFiveMinutesAgo = new Date(Date.now() - 35 * 60 * 1000);
    await User.findByIdAndUpdate(id, { hearts: 99, lastHeartRefillAt: thirtyFiveMinutesAgo });

    const heartsRes = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await heartsRes.json();
    expect(data.hearts).toBe(100);
    expect(data.hearts).not.toBe(101);
    expect(data.nextHeartInSeconds).toBe(0);
  });

  test('Scenario 8: Guest starts with 10 hearts: no regeneration under any circumstances', async ({ request }) => {
    const guestDeviceId = `guest_device_spec_08_${Date.now()}`;
    const guestRes = await request.post(`${API_URL}/auth/guest`, {
      data: { deviceId: guestDeviceId },
    });
    expect([200, 201]).toContain(guestRes.status());
    const guestData = await guestRes.json();
    expect(guestData.user.hearts).toBe(10);
    expect(guestData.user.maxHearts).toBe(10);
    expect(guestData.user.isGuest).toBe(true);
    expect(guestData.user.nextHeartInSeconds).toBe(0);

    const guestToken = guestData.tokens.accessToken;
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 3600 * 1000);
    await User.findByIdAndUpdate(guestData.user.id, { hearts: 4, lastHeartRefillAt: fiveDaysAgo });

    const heartsRes = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${guestToken}` },
    });
    const heartsData = await heartsRes.json();
    expect(heartsData.hearts).toBe(4);
    expect(heartsData.maxHearts).toBe(10);
    expect(heartsData.nextHeartInSeconds).toBe(0);
  });

  test('Scenario 9: Guest consumes all 10 hearts: learning must be blocked until login/signup', async ({ request }) => {
    const guestDeviceId = `guest_device_spec_09_${Date.now()}`;
    const guestRes = await request.post(`${API_URL}/auth/guest`, {
      data: { deviceId: guestDeviceId },
    });
    const guestData = await guestRes.json();
    const guestToken = guestData.tokens.accessToken;

    await User.findByIdAndUpdate(guestData.user.id, { hearts: 0 });

    const lessonRes = await request.get(`${API_URL}/lessons/6aea1ccd94ea4363bf054a1d`, {
      headers: { Authorization: `Bearer ${guestToken}` },
    });
    expect(lessonRes.status()).toBe(403);
    const lessonErr = await lessonRes.json();
    expect(lessonErr.error).toBe('GUEST_HEARTS_EXHAUSTED');
    expect(lessonErr.requiresAuth).toBe(true);

    const submitRes = await request.post(`${API_URL}/lessons/submit-answer`, {
      headers: { Authorization: `Bearer ${guestToken}` },
      data: {
        exerciseId: '6aea1ccd94ea4363bf054a20',
        userAnswer: 'hola',
      },
    });
    expect(submitRes.status()).toBe(403);
    const submitErr = await submitRes.json();
    expect(submitErr.error).toBe('GUEST_HEARTS_EXHAUSTED');
    expect(submitErr.requiresAuth).toBe(true);
  });

  test('Scenario 10: Refresh, restart, clear frontend state, and attempt API manipulation: guest restrictions must remain enforced', async ({ request }) => {
    const guestDeviceId = `guest_device_spec_10_${Date.now()}`;
    const initRes = await request.post(`${API_URL}/auth/guest`, {
      data: { deviceId: guestDeviceId },
    });
    const initData = await initRes.json();

    await User.findByIdAndUpdate(initData.user.id, { hearts: 0 });

    const relaunchRes = await request.post(`${API_URL}/auth/guest`, {
      data: { deviceId: guestDeviceId },
    });
    expect(relaunchRes.status()).toBe(200);
    const relaunchData = await relaunchRes.json();
    expect(relaunchData.user.id).toBe(initData.user.id);
    expect(relaunchData.user.hearts).toBe(0);

    const checkHearts = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${relaunchData.tokens.accessToken}` },
    });
    const checkData = await checkHearts.json();
    expect(checkData.hearts).toBe(0);
    expect(checkData.nextHeartInSeconds).toBe(0);
  });

  test('Scenario 11: Concurrent sessions, simultaneous requests, and rapid answer submissions for race conditions', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen11');
    await User.findByIdAndUpdate(id, { hearts: 10 });

    const exercise = await Exercise.findOne();
    expect(exercise).toBeDefined();
    const exerciseId = exercise!._id.toString();

    const submissions = Array.from({ length: 5 }).map(() =>
      request.post(`${API_URL}/lessons/submit-answer`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          exerciseId,
          userAnswer: '__deliberate_incorrect_for_concurrency__',
          durationMs: 500,
        },
      })
    );

    const responses = await Promise.all(submissions);
    responses.forEach((res) => {
      expect(res.status()).toBe(200);
    });

    const heartsRes = await request.get(`${API_URL}/auth/hearts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const heartsData = await heartsRes.json();
    expect(heartsData.hearts).toBe(5);
    expect(heartsData.maxHearts).toBe(100);
  });

  test('Scenario 12: Existing users balances and learning progress are not lost during migration', async ({ request }) => {
    const { token, id } = await createUser(request, 'scen12');
    
    await User.findByIdAndUpdate(id, {
      hearts: 85,
      totalXp: 250,
      currentStreak: 7,
      longestStreak: 14,
      lastHeartRefillAt: new Date(Date.now() - 22 * 60 * 1000),
    });

    const profileRes = await request.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profileData = await profileRes.json();
    expect(profileData.user.totalXp).toBe(250);
    expect(profileData.user.currentStreak).toBe(7);
    expect(profileData.user.longestStreak).toBe(14);
    expect(profileData.user.hearts).toBe(87);
    expect(profileData.user.maxHearts).toBe(100);
  });
});

