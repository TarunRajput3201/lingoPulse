import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../app';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Unit } from '../models/Unit';
import { Lesson } from '../models/Lesson';
import { Exercise } from '../models/Exercise';
import { seedDatabase } from '../seed/seedCourses';

const app = createApp();

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/lingopulse_test';
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }

  // Ensure test database has all 10 courses seeded
  const count = await Course.countDocuments();
  if (count < 10) {
    await seedDatabase({ preserveUsers: true });
  }
});

afterAll(async () => {
  await User.deleteMany({ email: /test_isolation.*@lingopulse.com/ });
  await mongoose.disconnect();
});

describe('Multilingual Isolation & Cross-Language Guard Regression Tests', () => {
  let token = '';
  let frenchCourse: any;
  let spanishCourse: any;
  let frenchLesson: any;
  let spanishLesson: any;

  beforeAll(async () => {
    // Clean up previous test user if exists
    await User.deleteMany({ email: 'test_isolation@lingopulse.com' });

    // Register test user
    const res = await request(app).post('/api/auth/register').send({
      email: 'test_isolation@lingopulse.com',
      password: 'Password123!',
      username: 'test_isolation',
      displayName: 'Isolation Tester',
      targetLanguage: 'fr',
      learningLevel: 'beginner',
    });
    token = res.body.tokens?.accessToken || '';

    // Find French & Spanish courses
    frenchCourse = await Course.findOne({ toLanguage: 'fr' });
    spanishCourse = await Course.findOne({ toLanguage: 'es' });

    if (frenchCourse) {
      const frenchUnit = await Unit.findOne({ courseId: frenchCourse._id });
      if (frenchUnit) {
        frenchLesson = await Lesson.findOne({ unitId: frenchUnit._id });
      }
    }

    if (spanishCourse) {
      const spanishUnit = await Unit.findOne({ courseId: spanishCourse._id });
      if (spanishUnit) {
        spanishLesson = await Lesson.findOne({ unitId: spanishUnit._id });
      }
    }
  });

  it('French course path returns French metadata and units', async () => {
    const res = await request(app)
      .get('/api/courses/path/en-fr')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.course).toBeDefined();
    expect(res.body.course.toLanguage).toBe('fr');
    expect(res.body.course.code).toBe(frenchCourse.code);
    expect(res.body.units).toBeDefined();
    expect(res.body.units.length).toBeGreaterThan(0);
  });

  it('Positive: Requesting French lesson with expectedLanguage=fr succeeds with French exercises', async () => {
    if (!frenchLesson) return;
    const res = await request(app)
      .get(`/api/lessons/${frenchLesson._id}?expectedLanguage=fr`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.lesson).toBeDefined();
    expect(res.body.exercises).toBeDefined();
    expect(res.body.exercises.length).toBeGreaterThan(0);
  });

  it('Negative: Requesting Spanish lesson with expectedLanguage=fr is rejected with CROSS_LANGUAGE_VIOLATION (BUG-001 Prevention)', async () => {
    if (!spanishLesson) return;
    const res = await request(app)
      .get(`/api/lessons/${spanishLesson._id}?expectedLanguage=fr`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('CROSS_LANGUAGE_VIOLATION');
  });

  it('Negative: Requesting Spanish lesson with French courseId is rejected with CROSS_LANGUAGE_VIOLATION', async () => {
    if (!spanishLesson || !frenchCourse) return;
    const res = await request(app)
      .get(`/api/lessons/${spanishLesson._id}?courseId=${frenchCourse._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('CROSS_LANGUAGE_VIOLATION');
  });

  it('Negative: Completing Spanish lesson with mismatched French courseId is rejected with CROSS_LANGUAGE_VIOLATION', async () => {
    if (!spanishLesson || !frenchCourse) return;
    const res = await request(app)
      .post('/api/lessons/complete')
      .set('Authorization', `Bearer ${token}`)
      .send({
        lessonId: spanishLesson._id,
        courseId: frenchCourse._id,
        attempts: [],
        score: 100,
        accuracy: 100,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('CROSS_LANGUAGE_VIOLATION');
  });

  it('Enforces cross-language isolation across all 10 flagship language courses', async () => {
    const flagshipLangs = ['en', 'es', 'fr', 'ja', 'de', 'ko', 'it', 'zh', 'pt', 'hi'];

    for (const lang of flagshipLangs) {
      const course = await Course.findOne({ toLanguage: lang });
      expect(course).toBeDefined();
      expect(course?.toLanguage).toBe(lang);

      const pathRes = await request(app)
        .get(`/api/courses/path/${course?.code}`)
        .set('Authorization', `Bearer ${token}`);

      expect(pathRes.status).toBe(200);
      expect(pathRes.body.course.toLanguage).toBe(lang);

      const langRes = await request(app)
        .get(`/api/courses/path/${lang}`)
        .set('Authorization', `Bearer ${token}`);

      expect(langRes.status).toBe(200);
      expect(langRes.body.course.toLanguage).toBe(lang);
    }
  });
});
