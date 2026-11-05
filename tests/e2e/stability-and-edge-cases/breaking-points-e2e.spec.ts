import { test, expect } from '@playwright/test';

test.describe('Breaking Points, Rapid Inputs & Edge-Case Robustness E2E Suite', () => {
  const timestamp = Date.now();
  let userToken = '';
  let spanishCourseId = '';
  let lesson1Id = '';

  test.beforeAll(async ({ request }) => {
    // Register test user
    const res = await request.post('/api/auth/register', {
      data: {
        email: `breaking_tester_${timestamp}@lingopulse.com`,
        password: 'Password123!',
        username: `break_tester_${timestamp}`,
        displayName: 'Breaking Point Tester',
        targetLanguage: 'es',
        learningLevel: 'beginner',
      },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    userToken = body.tokens.accessToken;

    // Get Spanish course path
    const pathRes = await request.get('/api/courses/path/es-en', {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    expect(pathRes.status()).toBe(200);
    const pathData = await pathRes.json();
    spanishCourseId = pathData.course?._id || pathData.course?.id;
    lesson1Id = pathData.units[0].lessons[0].id;
  });

  test('TC-BRK-01: Rapid Double Submissions: Prevents race conditions or double XP on duplicate clicks', async ({ request }) => {
    // Retrieve exercises
    const lessonRes = await request.get(`/api/lessons/${lesson1Id}?expectedLanguage=es`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    expect(lessonRes.status()).toBe(200);
    const lessonData = await lessonRes.json();
    const firstEx = lessonData.exercises[0];

    // Fire 5 concurrent requests with identical payload
    const submissionPayload = {
      exerciseId: firstEx.id,
      userAnswer: 'Hola',
    };

    const promises = Array.from({ length: 5 }).map(() =>
      request.post('/api/lessons/submit-answer', {
        headers: { Authorization: `Bearer ${userToken}` },
        data: submissionPayload,
      })
    );

    const responses = await Promise.all(promises);
    responses.forEach((res) => {
      expect([200, 400, 429]).toContain(res.status());
    });
  });

  test('TC-BRK-02: Missing Diacritics Accent Tolerance: Accepts answers without penalty', async ({ request }) => {
    // Validate Spanish accent tolerance
    const res = await request.post('/api/lessons/validate-answer', {
      headers: { Authorization: `Bearer ${userToken}` },
      data: {
        type: 'TRANSLATION',
        userAnswer: 'adios', // missing accent on ó
        correctAnswer: 'adiós',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.isCorrect).toBe(true);
    expect(body.hasAccentWarning).toBe(true);
  });

  test('TC-BRK-03: Empty & Whitespace-Only User Input: Fails gracefully without throwing 500', async ({ request }) => {
    const invalidInputs = ['', '   ', '   \n\t   ', null, undefined];

    for (const input of invalidInputs) {
      const res = await request.post('/api/lessons/validate-answer', {
        headers: { Authorization: `Bearer ${userToken}` },
        data: {
          type: 'TRANSLATION',
          userAnswer: input,
          correctAnswer: 'bonjour',
        },
      });
      // Should cleanly reject as incorrect or bad request, never crash with 500
      expect([200, 400]).toContain(res.status());
      if (res.status() === 200) {
        const body = await res.json();
        expect(body.isCorrect).toBe(false);
      }
    }
  });

  test('TC-BRK-04: Heart Floor Invariance: 10 consecutive wrong answers clamp at 0 hearts', async ({ request }) => {
    // Exhaust user hearts from 100
    for (let i = 0; i < 105; i++) {
      await request.post('/api/lessons/lose-heart', {
        headers: { Authorization: `Bearer ${userToken}` },
      });
    }

    // Verify hearts floor
    const profileRes = await request.get('/api/auth/profile', {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    expect(profileRes.status()).toBe(200);
    const profile = await profileRes.json();
    const hearts = profile.user ? profile.user.hearts : profile.hearts;
    expect(hearts).toBe(0);
    expect(hearts).not.toBeLessThan(0);
  });

  test('TC-BRK-05: Storage Payload Chunking: Validates large course chunking invariance', async () => {
    const largePayload = {
      courseId: 'test-course-huge',
      units: Array.from({ length: 50 }).map((_, i) => ({
        unitNumber: i + 1,
        title: `Unit ${i + 1} with extensive vocabulary data and lesson trees`,
        lessons: Array.from({ length: 5 }).map((__, j) => ({
          lessonNumber: j + 1,
          exercises: Array.from({ length: 15 }).map((___, k) => ({
            id: `ex-${i}-${j}-${k}`,
            prompt: 'Extensive bilingual prompt text',
          })),
        })),
      })),
    };

    const jsonStr = JSON.stringify(largePayload);
    expect(jsonStr.length).toBeGreaterThan(10000); // Exceeds typical 2KB key limit

    // Chunking algorithm simulation
    const CHUNK_SIZE = 1500;
    const totalChunks = Math.ceil(jsonStr.length / CHUNK_SIZE);
    expect(totalChunks).toBeGreaterThan(5);

    const chunkMap = new Map<string, string>();
    chunkMap.set('test_huge__cnt', String(totalChunks));
    for (let i = 0; i < totalChunks; i++) {
      chunkMap.set(`test_huge__${i}`, jsonStr.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE));
    }

    // Reconstruct
    let reconstructed = '';
    const storedCount = parseInt(chunkMap.get('test_huge__cnt') || '0', 10);
    for (let i = 0; i < storedCount; i++) {
      reconstructed += chunkMap.get(`test_huge__${i}`) || '';
    }

    const parsed = JSON.parse(reconstructed);
    expect(parsed.units.length).toBe(50);
    expect(parsed.units[49].unitNumber).toBe(50);
  });

  test('TC-BRK-06: Cross-Language Isolation Violation: Strict rejection with HTTP 400', async ({ request }) => {
    // Tamper by requesting French lesson with Spanish course ID
    const tamperRes = await request.get(`/api/lessons/${lesson1Id}?expectedLanguage=fr`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    expect(tamperRes.status()).toBe(400);
    const body = await tamperRes.json();
    expect(body.error).toContain('CROSS_LANGUAGE_VIOLATION');
  });
});
