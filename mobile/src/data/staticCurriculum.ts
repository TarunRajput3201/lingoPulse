// ============================================================================
// LingoPulse - Built-in Static Curriculum
// Contains all offline courses, units, lessons, exercises, achievements,
// and Spaced Repetition System (SRS) integration.
// ============================================================================

import {
  ALL_COURSES,
  getAllCourses,
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
  COURSE_CATALOG_SUMMARIES,
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
  targetText?: string;
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
    | 'IMAGE_SELECT'
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
  COURSE_CATALOG_SUMMARIES,
};

// ----------------------------------------------------------------------------
// 3. Curriculum Helper Functions
// ----------------------------------------------------------------------------
export const getStaticCourses = (): StaticCourse[] => {
  return getAllCourses();
};

export const getStaticCourseById = (courseId: string): StaticCourse | undefined => {
  if (!courseId) return undefined;
  return getCourseById(courseId) || getAllCourses().find((c) => c._id === courseId || c.id === courseId || c.code === courseId);
};

export const getStaticCourseByLanguage = (targetLang?: string): StaticCourse | undefined => {
  return getCourseByLanguage(targetLang);
};

export const getStaticLessonById = (
  lessonId: string,
  preferredLanguage?: string
): { lesson: StaticLesson; exercises: StaticExercise[]; course: StaticCourse } | null => {
  if (!lessonId) return null;

  // 1. If preferred language or candidate exists, search that course first
  const candidateLangs = [
    preferredLanguage,
    'es', 'fr', 'en', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'hi'
  ].filter(Boolean) as string[];

  // First pass: exact match on lesson.id or _id
  for (const lang of candidateLangs) {
    const course = getCourseByLanguage(lang);
    if (!course) continue;
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId || (lesson as any)._id === lessonId || lesson.id.endsWith(lessonId)) {
          return {
            lesson,
            exercises: lesson.exercises || [],
            course,
          };
        }
      }
    }
  }

  // Second pass: full search across all courses
  for (const course of getAllCourses()) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId || (lesson as any)._id === lessonId || (lesson as any).staticId === lessonId) {
          return {
            lesson,
            exercises: lesson.exercises || [],
            course,
          };
        }
      }
    }
  }

  // Third pass: if lessonId is a MongoDB 24-char ObjectId or numeric index,
  // gracefully fallback to the first lesson of the target or default course
  const fallbackLang = preferredLanguage || 'es';
  const fallbackCourse = getCourseByLanguage(fallbackLang) || getAllCourses()[0];
  if (fallbackCourse && fallbackCourse.units?.[0]?.lessons?.[0]) {
    const fallbackLesson = fallbackCourse.units[0].lessons[0];
    return {
      lesson: fallbackLesson,
      exercises: fallbackLesson.exercises || [],
      course: fallbackCourse,
    };
  }

  return null;
};

// Normalization for answers (accents, punctuation, case, whitespace)
export const normalizeText = (text: any): string => {
  if (typeof text !== 'string') {
    if (text === null || text === undefined) return '';
    if (typeof text === 'number' || typeof text === 'boolean') return String(text);
    return '';
  }
  return text
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
): { isCorrect: boolean; explanation?: string; correctAnswer?: string } => {
  try {
    if (!exercise) return { isCorrect: true };
    const type = exercise.type;
    const data = exercise.data || {};

    switch (type) {
      case 'IMAGE_SELECT':
      case 'MULTIPLE_CHOICE': {
        if (typeof userAnswer === 'string') {
          const matchesId = userAnswer === data.correctOptionId;
          const correctOpt = Array.isArray(data.options)
            ? data.options.find((o: any) => o && o.id === data.correctOptionId)
            : undefined;
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
        const userNorm = normalizeText(userAnswer);
        const acceptable = Array.isArray(data.acceptableAnswers)
          ? data.acceptableAnswers
          : typeof data.acceptableAnswers === 'string'
          ? [data.acceptableAnswers]
          : [];
        const isCorrect = acceptable.some((ans: string) => normalizeText(ans) === userNorm);
        return { isCorrect, explanation: exercise.explanation };
      }

      case 'WORD_ORDER': {
        const targetSentence =
          data.fullSentence ||
          (Array.isArray(data.correctOrder) ? data.correctOrder.join(' ') : '') ||
          '';
        const userSentence = Array.isArray(userAnswer)
          ? userAnswer.join(' ')
          : String(userAnswer || '');
        const isCorrect = normalizeText(userSentence) === normalizeText(targetSentence);
        return { isCorrect, explanation: exercise.explanation };
      }

      case 'SENTENCE_CONSTRUCTION': {
        const target =
          (Array.isArray(data.correctSentence) ? data.correctSentence.join(' ') : '') ||
          String(data.fullSentence || '');
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
        const pairs: Array<{ id: string; leftText: string; rightText: string }> = data.pairs || [];
        if (!pairs.length) {
          return { isCorrect: true, explanation: exercise.explanation };
        }
        if (!userAnswer) {
          return { isCorrect: false, explanation: exercise.explanation };
        }
        let correctCount = 0;
        if (Array.isArray(userAnswer)) {
          pairs.forEach((pair) => {
            const found = userAnswer.find(
              (u: any) =>
                u &&
                (u.leftId === pair.id || normalizeText(u.leftId) === normalizeText(pair.leftText)) &&
                (u.rightId === pair.id || normalizeText(u.rightId) === normalizeText(pair.rightText))
            );
            if (found) correctCount++;
          });
        } else if (typeof userAnswer === 'object' && userAnswer !== null) {
          pairs.forEach((pair) => {
            const userRight = userAnswer[pair.id] ?? userAnswer[pair.leftText];
            if (userRight !== undefined) {
              const matchedById = String(userRight).trim() === String(pair.id).trim();
              const matchedByText =
                normalizeText(String(userRight)) === normalizeText(pair.rightText);
              if (matchedById || matchedByText) correctCount++;
            }
          });
        }
        const isCorrect = correctCount === pairs.length;
        return { isCorrect, explanation: exercise.explanation };
      }

      case 'LISTENING_COMPREHENSION': {
        const matchesId = userAnswer === data.correctOptionId;
        const correctOpt = Array.isArray(data.options)
          ? data.options.find((o: any) => o && o.id === data.correctOptionId)
          : undefined;
        const matchesText =
          correctOpt && normalizeText(correctOpt.text) === normalizeText(userAnswer);
        return {
          isCorrect: Boolean(matchesId || matchesText),
          explanation: exercise.explanation,
        };
      }

      case 'SPEAKING_PRONUNCIATION': {
        if (!userAnswer || typeof userAnswer !== 'string') {
          return { isCorrect: false, explanation: exercise.explanation };
        }
        const acceptable = [...(exercise.data?.acceptableAnswers || [])];
        if (exercise.data?.targetText) {
          acceptable.push(exercise.data.targetText);
        }
        if (acceptable.length > 0) {
          const normUser = normalizeText(userAnswer);
          const isMatch = acceptable.some((ans) => normalizeText(ans) === normUser);
          return {
            isCorrect: isMatch,
            correctAnswer: acceptable[0],
            explanation: exercise.explanation,
          };
        }
        return { isCorrect: true, explanation: exercise.explanation };
      }

      default:
        return { isCorrect: true, explanation: exercise.explanation };
    }
  } catch {
    return { isCorrect: false, explanation: exercise?.explanation };
  }
};

// Re-export Spaced Repetition System (SRS)
export * from './srsEngine';
