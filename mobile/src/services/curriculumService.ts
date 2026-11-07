import {
  STATIC_COURSES,
  STATIC_ACHIEVEMENTS,
  getStaticCourses,
  getStaticCourseById,
  getStaticCourseByLanguage,
  getStaticLessonById,
  validateLocalAnswer,
  COURSE_CATALOG_SUMMARIES,
  StaticCourse,
  StaticLesson,
  StaticExercise,
} from '../data/staticCurriculum';
import { StorageService } from './storageService';
import { ProgressiveLearningEngine, StepPedagogy } from './progressiveLearningEngine';

const COMPLETED_LESSONS_KEY = 'lingopulse_completed_lessons';
const MISTAKES_KEY = 'lingopulse_mistakes';
const HEARTS_KEY = 'lingopulse_local_hearts';
const LAST_HEART_REFILL_KEY = 'lingopulse_last_heart_refill';
const XP_KEY = 'lingopulse_local_xp';
const STREAK_KEY = 'lingopulse_local_streak';
const LAST_ACTIVE_KEY = 'lingopulse_local_last_active';

export const MAX_HEARTS = 100;
export const GUEST_MAX_HEARTS = 10;
export const REFILL_INTERVAL_MS = 10 * 60 * 1000; // 1 heart every 10 minutes

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

export interface SectionAttemptHistory {
  score: number;
  passed: boolean;
  date: string;
  xpEarned: number;
}

export interface HeartStatus {
  hearts: number;
  maxHearts: number;
  nextHeartInSeconds: number;
  lastHeartRefillAt: string;
}

export const CurriculumService = {
  // 1. Get Course Catalog (Lightweight summaries for zero startup bloat)
  async getCourses(): Promise<StaticCourse[]> {
    return (COURSE_CATALOG_SUMMARIES as unknown) as StaticCourse[];
  },

  // 2. Get Learning Path with dynamic progression (unlocked/completed states & best scores)
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
        bestScore: number;
        hasAttempted: boolean;
        pedagogy?: StepPedagogy;
      }>;
    }>;
  }> {
    const resolvedCourse =
      (courseId ? getStaticCourseById(courseId) : undefined) ||
      (targetLang ? getStaticCourseByLanguage(targetLang) : undefined) ||
      getStaticCourseByLanguage('es') ||
      getStaticCourseByLanguage('en');

    if (!resolvedCourse) {
      throw new Error(`[CurriculumService] Course not found for id: "${courseId}" or targetLang: "${targetLang}"`);
    }

    const courseCode = resolvedCourse.code.toLowerCase().trim();
    const courseProgressKey = `lingopulse_completed_lessons_${courseCode}`;
    const bestScoresKey = `lingopulse_best_scores_${courseCode}`;

    const [completedLessons, bestScores] = await Promise.all([
      StorageService.getJSON<string[]>(courseProgressKey, []),
      StorageService.getJSON<Record<string, number>>(bestScoresKey, {}),
    ]);

    let foundCurrent = false;

    const units = resolvedCourse.units.map((unit, unitIdx) => {
      const lessons = unit.lessons.map((lesson, lessonIdx) => {
        // Section is completed ONLY if it was passed with score >= 50%
        const isCompleted = completedLessons.includes(lesson.id);
        const bestScore = bestScores[lesson.id] ?? 0;
        const hasAttempted = bestScores[lesson.id] !== undefined;

        // First lesson of unit 1 is always unlocked
        let isUnlocked = false;
        if (unitIdx === 0 && lessonIdx === 0) {
          isUnlocked = true;
        } else {
          // Unlocked if previous lesson in same unit passed (>= 50%), or previous unit is fully passed
          const prevLessonInUnit = unit.lessons[lessonIdx - 1];
          if (prevLessonInUnit) {
            isUnlocked = completedLessons.includes(prevLessonInUnit.id);
          } else {
            // First lesson of next unit unlocks when last lesson of prev unit is passed
            const prevUnit = resolvedCourse.units[unitIdx - 1];
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

        const pedagogy = ProgressiveLearningEngine.getStepPedagogy(unit.unitNumber, lesson.lessonNumber);

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
          bestScore,
          hasAttempted,
          pedagogy,
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

    return { course: resolvedCourse, units };
  },

  // 3. Get Specific Lesson and its Exercises
  async getLesson(
    lessonId: string,
    preferredLanguage?: string
  ): Promise<{ lesson: StaticLesson; exercises: StaticExercise[]; course: StaticCourse } | null> {
    const activeLang = preferredLanguage || (await StorageService.getItem('lingopulse_active_target_lang')) || undefined;
    return getStaticLessonById(lessonId, activeLang || undefined);
  },

  // 4. Validate Answer locally
  async submitAnswer(
    lessonId: string,
    exerciseId: string,
    userAnswer: any,
    fallbackExercise?: StaticExercise
  ): Promise<{
    isCorrect: boolean;
    explanation?: string;
    heartsRemaining: number;
    maxHearts: number;
    nextHeartInSeconds: number;
  }> {
    try {
      const activeLang = (await StorageService.getItem('lingopulse_active_target_lang')) || undefined;
      const lessonData = getStaticLessonById(lessonId, activeLang);
      const exercise = lessonData?.exercises.find((e) => e.id === exerciseId) || fallbackExercise;
      if (!exercise) {
        const heartStat = await this.getHeartsStatus();
        return {
          isCorrect: true,
          heartsRemaining: heartStat.hearts,
          maxHearts: MAX_HEARTS,
          nextHeartInSeconds: heartStat.nextHeartInSeconds,
        };
      }

      const { isCorrect, explanation } = validateLocalAnswer(exercise, userAnswer);

      let heartStat = await this.getHeartsStatus();

      if (!isCorrect) {
        heartStat = await this.deductHeart();

        // Save mistake for practice drill
        const mistakes = await StorageService.getJSON<LocalMistake[]>(MISTAKES_KEY, []);
        const targetAns =
          exercise.data?.acceptableAnswers?.[0] ||
          exercise.data?.fullSentence ||
          (Array.isArray(exercise.data?.options) && exercise.data?.correctOptionId
            ? exercise.data.options.find((o: any) => o && o.id === exercise.data.correctOptionId)?.text
            : undefined) ||
          exercise.explanation ||
          'Correct form';

        const newMistake: LocalMistake = {
          id: `mistake-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          exerciseId,
          prompt: exercise.prompt || '',
          instruction: exercise.instruction || '',
          userAnswer: typeof userAnswer === 'string' ? userAnswer : JSON.stringify(userAnswer),
          targetAnswer: typeof targetAns === 'string' ? targetAns : JSON.stringify(targetAns),
          explanation: exercise.explanation || '',
          language: lessonData?.course?.toLanguage || 'es',
          date: new Date().toISOString(),
        };
        // Cap mistakes list to 50 items
        const updatedMistakes = [newMistake, ...mistakes].slice(0, 50);
        await StorageService.setJSON(MISTAKES_KEY, updatedMistakes).catch(() => {});
      }

      return {
        isCorrect,
        explanation,
        heartsRemaining: heartStat.hearts,
        maxHearts: MAX_HEARTS,
        nextHeartInSeconds: heartStat.nextHeartInSeconds,
      };
    } catch {
      return {
        isCorrect: true,
        explanation: 'Completed',
        heartsRemaining: MAX_HEARTS,
        maxHearts: MAX_HEARTS,
        nextHeartInSeconds: 0,
      };
    }
  },

  // 5. Complete Lesson with Passing Rules (50% threshold) and Best Score Tracking
  async completeLesson(
    lessonId: string,
    xpReward: number,
    accuracy = 100
  ): Promise<{
    success: boolean;
    passed: boolean;
    requiresRepeat: boolean;
    accuracy: number;
    bestScore: number;
    isNewBest: boolean;
    totalXp: number;
    streak: number;
    hearts: number;
    maxHearts: number;
    nextHeartInSeconds: number;
  }> {
    const passed = accuracy >= 50;
    const requiresRepeat = !passed;

    const activeLang = (await StorageService.getItem('lingopulse_active_target_lang')) || undefined;
    const lessonData = getStaticLessonById(lessonId, activeLang);
    const courseCode = lessonData?.course.code?.toLowerCase().trim() || activeLang || 'default';
    const courseProgressKey = `lingopulse_completed_lessons_${courseCode}`;
    const bestScoresKey = `lingopulse_best_scores_${courseCode}`;
    const historyKey = `lingopulse_history_${lessonId}`;

    // 1. Best Score Tracking: NEVER overwrite a higher score with a lower one
    const bestScores = await StorageService.getJSON<Record<string, number>>(bestScoresKey, {});
    const previousBest = bestScores[lessonId] ?? 0;
    const isNewBest = accuracy > previousBest;
    const bestScore = Math.max(previousBest, accuracy);
    bestScores[lessonId] = bestScore;
    await StorageService.setJSON(bestScoresKey, bestScores);

    // 2. Track individual attempt history separately
    const history = await StorageService.getJSON<SectionAttemptHistory[]>(historyKey, []);
    const awardedXp = passed ? xpReward : Math.max(2, Math.round(xpReward * 0.25));
    history.push({
      score: accuracy,
      passed,
      date: new Date().toISOString(),
      xpEarned: awardedXp,
    });
    await StorageService.setJSON(historyKey, history);

    // 3. Section Passing Rule: Only unlock next section if score >= 50%
    const completed = await StorageService.getJSON<string[]>(courseProgressKey, []);
    if (passed && !completed.includes(lessonId)) {
      completed.push(lessonId);
      await StorageService.setJSON(courseProgressKey, completed);
    }

    // 4. Add XP
    let currentXp = await StorageService.getJSON<number>(XP_KEY, 0);
    currentXp += awardedXp;
    await StorageService.setJSON(XP_KEY, currentXp);

    // 5. Update Streak (if passed)
    const today = new Date().toISOString().split('T')[0];
    const lastActive = await StorageService.getItem(LAST_ACTIVE_KEY);
    let streak = await StorageService.getJSON<number>(STREAK_KEY, 0);

    if (passed && lastActive !== today) {
      streak += 1;
      await StorageService.setJSON(STREAK_KEY, streak);
      await StorageService.setItem(LAST_ACTIVE_KEY, today);
    }

    const heartStat = await this.getHeartsStatus();

    // Also update cached user if one exists
    const cachedUser = await StorageService.getUserCache();
    if (cachedUser) {
      cachedUser.totalXp = currentXp;
      cachedUser.currentStreak = streak;
      cachedUser.hearts = heartStat.hearts;
      cachedUser.maxHearts = MAX_HEARTS;
      await StorageService.setUserCache(cachedUser);
    }

    return {
      success: true,
      passed,
      requiresRepeat,
      accuracy,
      bestScore,
      isNewBest,
      totalXp: currentXp,
      streak,
      hearts: heartStat.hearts,
      maxHearts: MAX_HEARTS,
      nextHeartInSeconds: heartStat.nextHeartInSeconds,
    };
  },

  // 6. Section Best Score and Attempt History Getters
  async getSectionBestScore(lessonId: string, courseCode?: string): Promise<number> {
    const code = courseCode?.toLowerCase().trim() || 'default';
    const bestScores = await StorageService.getJSON<Record<string, number>>(`lingopulse_best_scores_${code}`, {});
    return bestScores[lessonId] ?? 0;
  },

  async getSectionHistory(lessonId: string): Promise<SectionAttemptHistory[]> {
    return await StorageService.getJSON<SectionAttemptHistory[]>(`lingopulse_history_${lessonId}`, []);
  },

  // 7. Practice Mistakes
  async getMistakes(): Promise<LocalMistake[]> {
    return await StorageService.getJSON<LocalMistake[]>(MISTAKES_KEY, []);
  },

  async resolveMistake(mistakeId: string): Promise<{ heartsRemaining: number; maxHearts: number; nextHeartInSeconds: number }> {
    const mistakes = await StorageService.getJSON<LocalMistake[]>(MISTAKES_KEY, []);
    const remaining = mistakes.filter((m) => m.id !== mistakeId);
    await StorageService.setJSON(MISTAKES_KEY, remaining);

    // Restore 1 heart
    const heartStat = await this.addHeart();

    return {
      heartsRemaining: heartStat.hearts,
      maxHearts: MAX_HEARTS,
      nextHeartInSeconds: heartStat.nextHeartInSeconds,
    };
  },

  async getOrCreateCachedUser(): Promise<any> {
    let cachedUser = await StorageService.getUserCache();
    if (!cachedUser) {
      cachedUser = {
        id: 'local_learner',
        email: 'local@lingopulse.com',
        username: 'learner',
        displayName: 'Learner',
        nativeLanguage: 'en',
        targetLanguage: 'es',
        learningLevel: 'beginner',
        role: 'learner',
        isGuest: false,
        hearts: MAX_HEARTS,
        maxHearts: MAX_HEARTS,
        totalXp: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        hasCompletedOnboarding: true,
        lastHeartRefillAt: new Date().toISOString(),
        preferences: {
          dailyGoalMinutes: 10,
          soundEffects: true,
          hapticFeedback: true,
          dailyReminder: true,
          reminderTime: '19:00',
          theme: 'system',
          timezone: 'UTC',
        },
      };
      await StorageService.setUserCache(cachedUser);
    }
    return cachedUser;
  },

  // 8. Accurate 100-Heart System with 10-minute server-synced regeneration countdown
  async getHeartsStatus(): Promise<HeartStatus> {
    const cachedUser = await this.getOrCreateCachedUser();
    const isGuest = cachedUser?.role === 'guest' || Boolean(cachedUser?.isGuest);

    if (isGuest) {
      const hearts = typeof cachedUser?.hearts === 'number'
        ? Math.min(GUEST_MAX_HEARTS, Math.max(0, cachedUser.hearts))
        : GUEST_MAX_HEARTS;
      return {
        hearts,
        maxHearts: GUEST_MAX_HEARTS,
        nextHeartInSeconds: 0,
        lastHeartRefillAt: cachedUser?.lastHeartRefillAt || new Date().toISOString(),
      };
    }

    const now = Date.now();
    let hearts = typeof cachedUser?.hearts === 'number' ? cachedUser.hearts : MAX_HEARTS;
    const lastRefillRaw = cachedUser?.lastHeartRefillAt;
    const lastRefillTime = lastRefillRaw ? new Date(lastRefillRaw).getTime() : now;
    const elapsedMs = Math.max(0, now - lastRefillTime);

    if (hearts >= MAX_HEARTS) {
      hearts = MAX_HEARTS;
      if (cachedUser && (cachedUser.hearts !== MAX_HEARTS || cachedUser.maxHearts !== MAX_HEARTS)) {
        cachedUser.hearts = MAX_HEARTS;
        cachedUser.maxHearts = MAX_HEARTS;
        cachedUser.lastHeartRefillAt = new Date(now).toISOString();
        await StorageService.setUserCache(cachedUser);
      }
      return {
        hearts: MAX_HEARTS,
        maxHearts: MAX_HEARTS,
        nextHeartInSeconds: 0,
        lastHeartRefillAt: new Date(now).toISOString(),
      };
    }

    const heartsToRegenerate = Math.floor(elapsedMs / REFILL_INTERVAL_MS);

    if (heartsToRegenerate > 0) {
      const newHearts = Math.min(MAX_HEARTS, hearts + heartsToRegenerate);
      const remainderMs = elapsedMs % REFILL_INTERVAL_MS;
      const adjustedLastRefill = now - remainderMs;

      if (cachedUser) {
        cachedUser.hearts = newHearts;
        cachedUser.maxHearts = MAX_HEARTS;
        cachedUser.lastHeartRefillAt = new Date(adjustedLastRefill).toISOString();
        await StorageService.setUserCache(cachedUser);
      }

      const nextHeartInSeconds = newHearts >= MAX_HEARTS ? 0 : Math.max(0, Math.ceil((REFILL_INTERVAL_MS - remainderMs) / 1000));

      return {
        hearts: newHearts,
        maxHearts: MAX_HEARTS,
        nextHeartInSeconds,
        lastHeartRefillAt: new Date(adjustedLastRefill).toISOString(),
      };
    }

    const nextHeartInSeconds = Math.max(0, Math.ceil((REFILL_INTERVAL_MS - elapsedMs) / 1000));
    return {
      hearts,
      maxHearts: MAX_HEARTS,
      nextHeartInSeconds,
      lastHeartRefillAt: new Date(lastRefillTime).toISOString(),
    };
  },

  async getHearts(): Promise<number> {
    const status = await this.getHeartsStatus();
    return status.hearts;
  },

  async deductHeart(): Promise<HeartStatus> {
    const cachedUser = await this.getOrCreateCachedUser();
    const isGuest = cachedUser?.role === 'guest' || Boolean(cachedUser?.isGuest);

    if (isGuest) {
      const curHearts = typeof cachedUser?.hearts === 'number' ? cachedUser.hearts : GUEST_MAX_HEARTS;
      const remaining = Math.max(0, curHearts - 1);
      cachedUser.hearts = remaining;
      cachedUser.maxHearts = GUEST_MAX_HEARTS;
      await StorageService.setUserCache(cachedUser);
      return {
        hearts: remaining,
        maxHearts: GUEST_MAX_HEARTS,
        nextHeartInSeconds: 0,
        lastHeartRefillAt: new Date().toISOString(),
      };
    }

    const status = await this.getHeartsStatus();
    let hearts = status.hearts;
    const now = Date.now();

    if (hearts > 0) {
      hearts -= 1;
      cachedUser.hearts = hearts;
      cachedUser.maxHearts = MAX_HEARTS;
      if (hearts === MAX_HEARTS - 1) {
        // Just dropped below max; initialize refill start point to right now
        cachedUser.lastHeartRefillAt = new Date(now).toISOString();
      }
      await StorageService.setUserCache(cachedUser);
    }

    return await this.getHeartsStatus();
  },

  async addHeart(): Promise<HeartStatus> {
    const cachedUser = await this.getOrCreateCachedUser();
    const isGuest = cachedUser?.role === 'guest' || Boolean(cachedUser?.isGuest);

    if (isGuest) {
      const curHearts = typeof cachedUser?.hearts === 'number' ? cachedUser.hearts : GUEST_MAX_HEARTS;
      const remaining = Math.min(GUEST_MAX_HEARTS, curHearts + 1);
      cachedUser.hearts = remaining;
      cachedUser.maxHearts = GUEST_MAX_HEARTS;
      await StorageService.setUserCache(cachedUser);
      return {
        hearts: remaining,
        maxHearts: GUEST_MAX_HEARTS,
        nextHeartInSeconds: 0,
        lastHeartRefillAt: new Date().toISOString(),
      };
    }

    const status = await this.getHeartsStatus();
    let hearts = status.hearts;
    const now = Date.now();

    if (hearts < MAX_HEARTS) {
      hearts += 1;
      cachedUser.hearts = hearts;
      cachedUser.maxHearts = MAX_HEARTS;
      if (hearts >= MAX_HEARTS) {
        cachedUser.lastHeartRefillAt = new Date(now).toISOString();
      }
      await StorageService.setUserCache(cachedUser);
    }

    return await this.getHeartsStatus();
  },

  // Refill Hearts to 100 (or 10 for guest)
  async refillHearts(): Promise<HeartStatus> {
    const cachedUser = await this.getOrCreateCachedUser();
    const isGuest = cachedUser?.role === 'guest' || Boolean(cachedUser?.isGuest);
    const limit = isGuest ? GUEST_MAX_HEARTS : MAX_HEARTS;
    const now = Date.now();

    cachedUser.hearts = limit;
    cachedUser.maxHearts = limit;
    cachedUser.lastHeartRefillAt = new Date(now).toISOString();
    await StorageService.setUserCache(cachedUser);

    return {
      hearts: limit,
      maxHearts: limit,
      nextHeartInSeconds: 0,
      lastHeartRefillAt: new Date(now).toISOString(),
    };
  },

  // 9. Achievements
  getAchievements() {
    return STATIC_ACHIEVEMENTS;
  },
};
