import { Platform } from 'react-native';

// In Android emulator, localhost is 10.0.2.2. On iOS simulator or web, it's localhost.
const DEFAULT_HOST = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_HOST;

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
