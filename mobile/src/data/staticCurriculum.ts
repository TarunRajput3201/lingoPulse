// ============================================================================
// LingoPulse - Built-in Static Curriculum
// Contains all offline courses, units, lessons, exercises, achievements,
// and Spaced Repetition System (SRS) integration.
// ============================================================================

import {
  ALL_COURSES,
  ENGLISH_COURSE,
  SPANISH_COURSE,
  FRENCH_COURSE,
  JAPANESE_COURSE,
  GERMAN_COURSE,
  KOREAN_COURSE,
  ITALIAN_COURSE,
  MANDARIN_COURSE,
  PORTUGUESE_COURSE,
  HINDI_COURSE,
  getCourseByCode,
  getCourseByLanguage,
  getCourseById,
} from './courses';

export interface ExerciseOption {
  id: string;
  text: string;
  translation?: string;
}

export interface MatchingPair {
  id: string;
  leftText: string;
  rightText: string;
}

export interface ExerciseData {
  correctOptionId?: string;
  options?: (ExerciseOption | string | any)[];
  acceptableAnswers?: string[];
  sentenceWithBlank?: string;
  scrambledWords?: string[];
  correctOrder?: string[];
  fullSentence?: string;
  statement?: string;
  isTrue?: boolean;
  transcript?: string;
  phraseToSpeak?: string;
  phoneticGuide?: string;
  sourcePrompt?: string;
  wordBank?: string[];
  correctSentence?: string[];
  acceptableSentences?: string[];
  audioUrl?: string;
  pairs?: MatchingPair[];
}

export interface StaticExercise {
  id: string;
  lessonId: string;
  type:
    | 'MULTIPLE_CHOICE'
    | 'TRANSLATION'
    | 'WORD_ORDER'
    | 'FILL_IN_THE_BLANK'
    | 'MATCHING_PAIRS'
    | 'LISTENING_COMPREHENSION'
    | 'SPEAKING_PRONUNCIATION'
    | 'TRUE_FALSE'
    | 'SENTENCE_CONSTRUCTION';
  prompt: string;
  instruction: string;
  audioUrl?: string;
  imageUrl?: string;
  order: number;
  hint?: string;
  explanation: string;
  data: ExerciseData;
}

export interface StaticLesson {
  id: string;
  unitId: string;
  lessonNumber: number;
  title: string;
  type: 'standard' | 'checkpoint' | 'review';
  xpReward: number;
  order: number;
  status: 'published';
  exercises: StaticExercise[];
}

export interface StaticUnit {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  description: string;
  themeColor: string;
  icon: string;
  status: 'published';
  lessons: StaticLesson[];
}

export interface StaticCourse {
  _id: string;
  id: string;
  code: string;
  title: string;
  description: string;
  fromLanguage: string;
  toLanguage: string;
  flagIcon: string;
  level?: string;
  status: 'published';
  order: number;
  totalUnits: number;
  totalLessons: number;
  units: StaticUnit[];
}

export interface StaticAchievement {
  id: string;
  code: string;
  title: string;
  description: string;
  iconName: string;
  tier: number;
  targetCount: number;
  xpReward: number;
}

// ----------------------------------------------------------------------------
// 1. Achievements Catalog
// ----------------------------------------------------------------------------
export const STATIC_ACHIEVEMENTS: StaticAchievement[] = [
  {
    id: 'ach-1',
    code: 'FIRST_LESSON',
    title: 'First Step',
    description: 'Complete your very first lesson',
    iconName: 'footprints',
    tier: 1,
    targetCount: 1,
    xpReward: 20,
  },
  {
    id: 'ach-2',
    code: 'STREAK_3',
    title: 'Consistency',
    description: 'Maintain a 3-day learning streak',
    iconName: 'flame',
    tier: 1,
    targetCount: 3,
    xpReward: 50,
  },
  {
    id: 'ach-3',
    code: 'STREAK_7',
    title: 'Unstoppable',
    description: 'Reach a 7-day learning streak',
    iconName: 'zap',
    tier: 2,
    targetCount: 7,
    xpReward: 100,
  },
  {
    id: 'ach-4',
    code: 'XP_100',
    title: 'Century Club',
    description: 'Earn 100 total XP',
    iconName: 'sparkles',
    tier: 1,
    targetCount: 100,
    xpReward: 30,
  },
  {
    id: 'ach-5',
    code: 'XP_500',
    title: 'Master Scholar',
    description: 'Earn 500 total XP',
    iconName: 'crown',
    tier: 2,
    targetCount: 500,
    xpReward: 150,
  },
  {
    id: 'ach-6',
    code: 'PERFECT_ACCURACY',
    title: 'Flawless Mind',
    description: 'Complete a lesson with 100% accuracy',
    iconName: 'target',
    tier: 1,
    targetCount: 1,
    xpReward: 40,
  },
];

// ----------------------------------------------------------------------------
// 2. Global 10 Flagship Courses Catalog
// ----------------------------------------------------------------------------
export const STATIC_COURSES: StaticCourse[] = ALL_COURSES;

export {
  ENGLISH_COURSE,
  SPANISH_COURSE,
  FRENCH_COURSE,
  JAPANESE_COURSE,
  GERMAN_COURSE,
  KOREAN_COURSE,
  ITALIAN_COURSE,
  MANDARIN_COURSE,
  PORTUGUESE_COURSE,
  HINDI_COURSE,
};

// ----------------------------------------------------------------------------
// 3. Curriculum Helper Functions
// ----------------------------------------------------------------------------
export const getStaticCourses = (): StaticCourse[] => {
  return STATIC_COURSES;
};

export const getStaticCourseById = (courseId: string): StaticCourse | undefined => {
  if (!courseId) return undefined;
  return STATIC_COURSES.find((c) => c._id === courseId || c.id === courseId || c.code === courseId);
};

export const getStaticCourseByLanguage = (targetLang?: string): StaticCourse | undefined => {
  return getCourseByLanguage(targetLang);
};

export const getStaticLessonById = (
  lessonId: string
): { lesson: StaticLesson; exercises: StaticExercise[]; course: StaticCourse } | null => {
  for (const course of STATIC_COURSES) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId) {
          return {
            lesson,
            exercises: lesson.exercises,
            course,
          };
        }
      }
    }
  }
  return null;
};

// Normalization for answers (accents, punctuation, case, whitespace)
export const normalizeText = (text: string): string => {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:'"-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const validateLocalAnswer = (
  exercise: StaticExercise,
  userAnswer: any
): { isCorrect: boolean; explanation?: string } => {
  const { type, data } = exercise;

  switch (type) {
    case 'MULTIPLE_CHOICE': {
      if (typeof userAnswer === 'string') {
        const matchesId = userAnswer === data.correctOptionId;
        const correctOpt = data.options?.find((o: any) => o.id === data.correctOptionId);
        const matchesText =
          correctOpt && normalizeText(correctOpt.text) === normalizeText(userAnswer);
        return {
          isCorrect: Boolean(matchesId || matchesText),
          explanation: exercise.explanation,
        };
      }
      return { isCorrect: false, explanation: exercise.explanation };
    }

    case 'TRANSLATION':
    case 'FILL_IN_THE_BLANK': {
      const userNorm = normalizeText(String(userAnswer || ''));
      const acceptable = data.acceptableAnswers || [];
      const isCorrect = acceptable.some((ans) => normalizeText(ans) === userNorm);
      return { isCorrect, explanation: exercise.explanation };
    }

    case 'WORD_ORDER': {
      const targetSentence = data.fullSentence || (data.correctOrder || []).join(' ');
      const userSentence = Array.isArray(userAnswer)
        ? userAnswer.join(' ')
        : String(userAnswer || '');
      const isCorrect = normalizeText(userSentence) === normalizeText(targetSentence);
      return { isCorrect, explanation: exercise.explanation };
    }

    case 'SENTENCE_CONSTRUCTION': {
      const target = (data.correctSentence || []).join(' ');
      const userSentence = Array.isArray(userAnswer)
        ? userAnswer.join(' ')
        : String(userAnswer || '');
      const isCorrect = normalizeText(userSentence) === normalizeText(target);
      return { isCorrect, explanation: exercise.explanation };
    }

    case 'TRUE_FALSE': {
      const boolAnswer =
        typeof userAnswer === 'boolean'
          ? userAnswer
          : String(userAnswer).toLowerCase() === 'true';
      return {
        isCorrect: boolAnswer === Boolean(data.isTrue),
        explanation: exercise.explanation,
      };
    }

    case 'MATCHING_PAIRS': {
      return { isCorrect: true, explanation: exercise.explanation };
    }

    case 'LISTENING_COMPREHENSION': {
      const matchesId = userAnswer === data.correctOptionId;
      const correctOpt = data.options?.find((o: any) => o.id === data.correctOptionId);
      const matchesText =
        correctOpt && normalizeText(correctOpt.text) === normalizeText(userAnswer);
      return {
        isCorrect: Boolean(matchesId || matchesText),
        explanation: exercise.explanation,
      };
    }

    case 'SPEAKING_PRONUNCIATION': {
      return { isCorrect: true, explanation: exercise.explanation };
    }

    default:
      return { isCorrect: true, explanation: exercise.explanation };
  }
};

// Re-export Spaced Repetition System (SRS)
export * from './srsEngine';
