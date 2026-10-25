/**
 * LingoPulse Shared Types & Contracts
 * Production-ready types shared between Mobile, Backend, and Admin CMS.
 */

// ==========================================
// User & Auth
// ==========================================

export type UserRole = 'learner' | 'admin' | 'creator';

export type LearningLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced';

export type DailyGoalMinutes = 5 | 10 | 15 | 20;

export interface UserPreferences {
  dailyGoalMinutes: DailyGoalMinutes;
  soundEffects: boolean;
  hapticFeedback: boolean;
  dailyReminder: boolean;
  reminderTime: string; // "HH:MM" e.g., "19:00"
  theme: 'light' | 'dark' | 'system';
  timezone: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  nativeLanguage: string;
  targetLanguage: string;
  learningLevel: LearningLevel;
  preferences: UserPreferences;
  hearts: number;
  maxHearts: number;
  lastHeartRefillAt: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // "YYYY-MM-DD"
  hasCompletedOnboarding: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: UserProfile;
  tokens: AuthTokens;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  displayName?: string;
  nativeLanguage?: string;
  targetLanguage?: string;
  dailyGoalMinutes?: DailyGoalMinutes;
  learningLevel?: LearningLevel;
  timezone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OnboardingPayload {
  targetLanguage: string;
  learningLevel: LearningLevel;
  dailyGoalMinutes: DailyGoalMinutes;
  reminderTime?: string;
}

// ==========================================
// Courses, Units, Lessons & Exercises
// ==========================================

export type PublishStatus = 'draft' | 'published' | 'archived';

export interface Course {
  id: string;
  code: string; // e.g., "es-en" (Spanish for English speakers)
  title: string;
  description: string;
  fromLanguage: string; // "en"
  toLanguage: string; // "es"
  flagIcon: string;
  status: PublishStatus;
  order: number;
  totalUnits: number;
  totalLessons: number;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  description: string;
  themeColor: string; // Hex color e.g., "#58CC02"
  icon: string;
  status: PublishStatus;
  lessons?: LessonSummary[];
}

export type LessonType = 'standard' | 'checkpoint' | 'review' | 'assessment';

export interface LessonSummary {
  id: string;
  unitId: string;
  title: string;
  lessonNumber: number;
  type: LessonType;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  accuracyRate?: number;
  exerciseCount: number;
}

export interface LessonDetail extends LessonSummary {
  exercises: Exercise[];
}

export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'FILL_IN_THE_BLANK'
  | 'TRANSLATION'
  | 'WORD_ORDER'
  | 'SENTENCE_CONSTRUCTION'
  | 'MATCHING_PAIRS'
  | 'IMAGE_SELECT'
  | 'LISTENING_COMPREHENSION'
  | 'TRUE_FALSE'
  | 'SPEAKING_PRONUNCIATION';

export interface ExerciseOption {
  id: string;
  text: string;
  translation?: string;
  audioUrl?: string;
  imageUrl?: string;
}

export interface MatchingPair {
  id: string;
  leftText: string;
  rightText: string;
  leftAudioUrl?: string;
  rightAudioUrl?: string;
}

export interface ExerciseBase {
  id: string;
  lessonId: string;
  type: ExerciseType;
  prompt: string;
  instruction?: string;
  audioUrl?: string;
  imageUrl?: string;
  order: number;
  hint?: string;
  explanation?: string;
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'MULTIPLE_CHOICE';
  options: ExerciseOption[];
  correctOptionId: string;
}

export interface FillInTheBlankExercise extends ExerciseBase {
  type: 'FILL_IN_THE_BLANK';
  sentenceWithBlank: string; // e.g. "Yo ___ una manzana."
  options?: string[]; // Multiple choice options if word bank is used
  acceptableAnswers: string[]; // e.g. ["como"]
}

export interface TranslationExercise extends ExerciseBase {
  type: 'TRANSLATION';
  sourceText: string;
  targetLanguage: string;
  acceptableAnswers: string[];
  wordTokens?: string[]; // Optional clickable tokens for scaffolding
}

export interface WordOrderExercise extends ExerciseBase {
  type: 'WORD_ORDER';
  scrambledWords: string[];
  correctOrder: string[];
  fullSentence: string;
}

export interface SentenceConstructionExercise extends ExerciseBase {
  type: 'SENTENCE_CONSTRUCTION';
  sourcePrompt: string;
  wordBank: string[]; // pool of words including distractors
  correctSentence: string[];
}

export interface MatchingPairsExercise extends ExerciseBase {
  type: 'MATCHING_PAIRS';
  pairs: MatchingPair[];
}

export interface ImageSelectExercise extends ExerciseBase {
  type: 'IMAGE_SELECT';
  options: ExerciseOption[];
  correctOptionId: string;
}

export interface ListeningComprehensionExercise extends ExerciseBase {
  type: 'LISTENING_COMPREHENSION';
  audioUrl: string;
  transcript: string;
  slowAudioUrl?: string;
  options: ExerciseOption[];
  correctOptionId: string;
}

export interface TrueFalseExercise extends ExerciseBase {
  type: 'TRUE_FALSE';
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface SpeakingPronunciationExercise extends ExerciseBase {
  type: 'SPEAKING_PRONUNCIATION';
  phraseToSpeak: string;
  phoneticGuide?: string;
  referenceAudioUrl: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | FillInTheBlankExercise
  | TranslationExercise
  | WordOrderExercise
  | SentenceConstructionExercise
  | MatchingPairsExercise
  | ImageSelectExercise
  | ListeningComprehensionExercise
  | TrueFalseExercise
  | SpeakingPronunciationExercise;

// ==========================================
// Lesson Execution & Answer Submission
// ==========================================

export interface SubmitAnswerRequest {
  exerciseId: string;
  userAnswer: string | string[] | { [key: string]: string };
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctAnswer: string | string[] | { [key: string]: string };
  explanation?: string;
  hint?: string;
  pedagogicalTip?: string;
  hasAccentWarning?: boolean;
  heartsRemaining: number;
}

export interface ExerciseAttemptSummary {
  exerciseId: string;
  isCorrect: boolean;
  userAnswer: any;
  durationMs: number;
}

export interface CompleteLessonRequest {
  lessonId: string;
  attempts: ExerciseAttemptSummary[];
  startedAt: string;
  completedAt: string;
}

export interface CompleteLessonResponse {
  success: boolean;
  xpAwarded: number;
  bonusXp: number;
  totalXp: number;
  newStreak: number;
  isStreakExtended: boolean;
  heartsRemaining: number;
  accuracyPercentage: number;
  nextLessonId?: string;
  unlockedAchievements?: Achievement[];
}

// ==========================================
// Gamification: Streaks, Hearts, Leaderboard
// ==========================================

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  streakFreezeAvailable: boolean;
  weeklyHistory: { date: string; completed: boolean }[];
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  iconName: string;
  tier: 1 | 2 | 3;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  weeklyXp: number;
  isCurrentUser: boolean;
}

export interface PracticeMistakeItem {
  id: string;
  exercise: Exercise;
  mistakeCount: number;
  lastAttemptedAt: string;
}

// ==========================================
// Constants & Color Tokens
// ==========================================

export const APP_THEME = {
  primary: '#58CC02', // Lively Green
  primaryDark: '#46A302',
  secondary: '#1CB0F6', // Sky Blue
  secondaryDark: '#1899D6',
  accent: '#FF4B4B', // Coral Red (Error, Hearts)
  accentDark: '#EA2B2B',
  gold: '#FFC800', // Gold/Yellow (XP, Streaks)
  goldDark: '#E5A500',
  purple: '#CE82FF', // Gem/Milestone
  purpleDark: '#A855F7',
  charcoal: '#3C3C3C',
  grayBackground: '#F7F7F7',
  grayBorder: '#E5E5E5',
  grayText: '#777777',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
};

export const MAX_HEARTS = 5;
export const HEART_REFILL_MINUTES = 30;
export const BASE_LESSON_XP = 15;
export const PERFECT_LESSON_BONUS_XP = 5;
