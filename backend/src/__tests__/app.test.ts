import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../app';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Unit } from '../models/Unit';
import { Lesson } from '../models/Lesson';
import { Exercise } from '../models/Exercise';
import { Progress } from '../models/Progress';

const app = createApp();

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/lingopulse_test';
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await User.deleteMany({ email: /test.*@lingopulse.com/ });
  await mongoose.disconnect();
});

describe('LingoPulse Health & Auth API', () => {
  const testUser = {
    email: 'test_student@lingopulse.com',
    password: 'Password123!',
    username: 'test_student',
    displayName: 'Test Learner',
    targetLanguage: 'es',
    learningLevel: 'beginner' as const,
  };

  let token = '';

  it('GET /api/health should return healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('POST /api/auth/register should register a new learner', async () => {
    await User.deleteOne({ email: testUser.email });

    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.tokens.accessToken).toBeDefined();
    token = res.body.tokens.accessToken;
  });

  it('POST /api/auth/login should authenticate learner and return token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body.tokens.accessToken).toBeDefined();
    expect(res.body.user.hearts).toBe(5);
  });

  it('GET /api/auth/profile should return learner profile with valid token', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe(testUser.username);
  });
});
