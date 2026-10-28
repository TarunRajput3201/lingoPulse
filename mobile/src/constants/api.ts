import { Platform } from 'react-native';

// Production Render API as authoritative cloud backend
const PRODUCTION_API_URL = 'https://lingopulse-api-84f2.onrender.com';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || PRODUCTION_API_URL;

export const ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  PROFILE: `${API_BASE_URL}/api/auth/profile`,
  ONBOARDING: `${API_BASE_URL}/api/auth/onboarding`,
  DELETE_ACCOUNT: `${API_BASE_URL}/api/auth/account`,
  COURSES: `${API_BASE_URL}/api/courses`,
  COURSE_PATH: (courseId: string) => `${API_BASE_URL}/api/courses/${courseId}/path`,
  LESSON: (lessonId: string) => `${API_BASE_URL}/api/lessons/${lessonId}`,
  SUBMIT_ANSWER: `${API_BASE_URL}/api/lessons/submit-answer`,
  COMPLETE_LESSON: `${API_BASE_URL}/api/lessons/complete`,
  PRACTICE_MISTAKES: `${API_BASE_URL}/api/practice/mistakes`,
  COMPLETE_PRACTICE: `${API_BASE_URL}/api/practice/complete`,
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard/weekly`,
  ACHIEVEMENTS: `${API_BASE_URL}/api/achievements`,
};
