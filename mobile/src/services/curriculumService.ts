import {
  STATIC_COURSES,
  STATIC_ACHIEVEMENTS,
  getStaticCourses,
  getStaticCourseById,
  getStaticCourseByLanguage,
  getStaticLessonById,
  validateLocalAnswer,
  StaticCourse,
  StaticLesson,
  StaticExercise,
} from '../data/staticCurriculum';
import { StorageService } from './storageService';

const COMPLETED_LESSONS_KEY = 'lingopulse_completed_lessons';
const MISTAKES_KEY = 'lingopulse_mistakes';
const HEARTS_KEY = 'lingopulse_local_hearts';
const XP_KEY = 'lingopulse_local_xp';
const STREAK_KEY = 'lingopulse_local_streak';
const LAST_ACTIVE_KEY = 'lingopulse_local_last_active';

export interface LocalMistake {
  id: string;
  exerciseId: string;
  prompt: string;
  instruction: string;
  userAnswer: string;
  targetAnswer: string;
  explanation: string;
  language: string;
  date: string;
}

export const CurriculumService = {
  // 1. Get Course Catalog
  async getCourses(): Promise<StaticCourse[]> {
    return getStaticCourses();
  },

  // 2. Get Learning Path with dynamic progression (unlocked/completed states)
  async getLearningPath(
    courseId?: string,
    targetLang?: string
  ): Promise<{
    course: StaticCourse;
    units: Array<{
      id: string;
      unitNumber: number;
      title: string;
      description: string;
      themeColor: string;
      icon: string;
      lessons: Array<{
        id: string;
        lessonNumber: number;
        title: string;
        type: string;
        xpReward: number;
        order: number;
        isUnlocked: boolean;
        isCompleted: boolean;
        isCurrent: boolean;
      }>;
    }>;
  }> {
    const course = courseId
      ? getStaticCourseById(courseId) || getStaticCourseByLanguage(targetLang)
      : getStaticCourseByLanguage(targetLang);

    const completedLessons = await StorageService.getJSON<string[]>(COMPLETED_LESSONS_KEY, []);

    let foundCurrent = false;

    const units = course.units.map((unit, unitIdx) => {
      const lessons = unit.lessons.map((lesson, lessonIdx) => {
        const isCompleted = completedLessons.includes(lesson.id);

        // First lesson of unit 1 is always unlocked
        let isUnlocked = false;
        if (unitIdx === 0 && lessonIdx === 0) {
          isUnlocked = true;
        } else {
          // Unlocked if previous lesson in same unit is completed, or previous unit is done
          const prevLessonInUnit = unit.lessons[lessonIdx - 1];
          if (prevLessonInUnit) {
            isUnlocked = completedLessons.includes(prevLessonInUnit.id);
          } else {
            // First lesson of next unit unlocks when last lesson of prev unit is done
            const prevUnit = course.units[unitIdx - 1];
            if (prevUnit && prevUnit.lessons.length > 0) {
              const lastLessonOfPrevUnit = prevUnit.lessons[prevUnit.lessons.length - 1];
              isUnlocked = completedLessons.includes(lastLessonOfPrevUnit.id);
            }
          }
        }

        // Current is the first unlocked but incomplete lesson
        let isCurrent = false;
        if (!foundCurrent && isUnlocked && !isCompleted) {
          isCurrent = true;
          foundCurrent = true;
        }

        return {
          id: lesson.id,
          lessonNumber: lesson.lessonNumber,
          title: lesson.title,
          type: lesson.type,
          xpReward: lesson.xpReward,
          order: lesson.order,
          isUnlocked,
          isCompleted,
          isCurrent,
        };
      });

      return {
        id: unit.id,
        unitNumber: unit.unitNumber,
        title: unit.title,
        description: unit.description,
        themeColor: unit.themeColor,
        icon: unit.icon,
        lessons,
      };
    });

    return { course, units };
  },

  // 3. Get Specific Lesson and its Exercises
  async getLesson(
    lessonId: string
  ): Promise<{ lesson: StaticLesson; exercises: StaticExercise[]; course: StaticCourse } | null> {
    return getStaticLessonById(lessonId);
  },

  // 4. Validate Answer locally
  async submitAnswer(
    lessonId: string,
    exerciseId: string,
    userAnswer: any
  ): Promise<{
    isCorrect: boolean;
    explanation?: string;
    heartsRemaining: number;
  }> {
    const lessonData = getStaticLessonById(lessonId);
    if (!lessonData) {
      return { isCorrect: true, heartsRemaining: 5 };
    }

    const exercise = lessonData.exercises.find((e) => e.id === exerciseId);
    if (!exercise) {
      return { isCorrect: true, heartsRemaining: 5 };
    }

    const { isCorrect, explanation } = validateLocalAnswer(exercise, userAnswer);

    let hearts = await StorageService.getJSON<number>(HEARTS_KEY, 5);

    if (!isCorrect) {
      hearts = Math.max(0, hearts - 1);
      await StorageService.setJSON(HEARTS_KEY, hearts);

      // Save mistake for practice drill
      const mistakes = await StorageService.getJSON<LocalMistake[]>(MISTAKES_KEY, []);
      const newMistake: LocalMistake = {
        id: `mistake-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        exerciseId,
        prompt: exercise.prompt,
        instruction: exercise.instruction,
        userAnswer: typeof userAnswer === 'string' ? userAnswer : JSON.stringify(userAnswer),
        targetAnswer:
          exercise.data.acceptableAnswers?.[0] ||
          exercise.data.fullSentence ||
          exercise.explanation ||
          'Correct form',
        explanation: exercise.explanation,
        language: lessonData.course.toLanguage,
        date: new Date().toISOString(),
      };
      await StorageService.setJSON(MISTAKES_KEY, [newMistake, ...mistakes]);
    }

    return {
      isCorrect,
      explanation,
      heartsRemaining: hearts,
    };
  },

  // 5. Complete Lesson
  async completeLesson(
    lessonId: string,
    xpReward: number
  ): Promise<{
    success: boolean;
    totalXp: number;
    streak: number;
    hearts: number;
  }> {
    // 1. Mark completed
    const completed = await StorageService.getJSON<string[]>(COMPLETED_LESSONS_KEY, []);
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      await StorageService.setJSON(COMPLETED_LESSONS_KEY, completed);
    }

    // 2. Add XP
    let currentXp = await StorageService.getJSON<number>(XP_KEY, 0);
    currentXp += xpReward;
    await StorageService.setJSON(XP_KEY, currentXp);

    // 3. Update Streak
    const today = new Date().toISOString().split('T')[0];
    const lastActive = await StorageService.getItem(LAST_ACTIVE_KEY);
    let streak = await StorageService.getJSON<number>(STREAK_KEY, 0);

    if (lastActive !== today) {
      streak += 1;
      await StorageService.setJSON(STREAK_KEY, streak);
      await StorageService.setItem(LAST_ACTIVE_KEY, today);
    }

    const hearts = await StorageService.getJSON<number>(HEARTS_KEY, 5);

    // Also update cached user if one exists
    const cachedUser = await StorageService.getUserCache();
    if (cachedUser) {
      cachedUser.totalXp = currentXp;
      cachedUser.currentStreak = streak;
      cachedUser.hearts = hearts;
      await StorageService.setUserCache(cachedUser);
    }

    return {
      success: true,
      totalXp: currentXp,
      streak,
      hearts,
    };
  },

  // 6. Practice Mistakes
  async getMistakes(): Promise<LocalMistake[]> {
    return await StorageService.getJSON<LocalMistake[]>(MISTAKES_KEY, []);
  },

  async resolveMistake(mistakeId: string): Promise<{ heartsRemaining: number }> {
    const mistakes = await StorageService.getJSON<LocalMistake[]>(MISTAKES_KEY, []);
    const remaining = mistakes.filter((m) => m.id !== mistakeId);
    await StorageService.setJSON(MISTAKES_KEY, remaining);

    // Restore 1 heart
    let hearts = await StorageService.getJSON<number>(HEARTS_KEY, 5);
    hearts = Math.min(5, hearts + 1);
    await StorageService.setJSON(HEARTS_KEY, hearts);

    const cachedUser = await StorageService.getUserCache();
    if (cachedUser) {
      cachedUser.hearts = hearts;
      await StorageService.setUserCache(cachedUser);
    }

    return { heartsRemaining: hearts };
  },

  // 7. Refill Hearts with XP or Free
  async refillHearts(): Promise<number> {
    await StorageService.setJSON(HEARTS_KEY, 5);
    const cachedUser = await StorageService.getUserCache();
    if (cachedUser) {
      cachedUser.hearts = 5;
      await StorageService.setUserCache(cachedUser);
    }
    return 5;
  },

  // 8. Achievements
  getAchievements() {
    return STATIC_ACHIEVEMENTS;
  },
};
