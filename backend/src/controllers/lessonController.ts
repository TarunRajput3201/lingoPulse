import { Response } from 'express';
import { Types } from 'mongoose';
import { Lesson } from '../models/Lesson';
import { Unit } from '../models/Unit';
import { Exercise } from '../models/Exercise';
import { Progress } from '../models/Progress';
import { Attempt } from '../models/Attempt';
import { AuthenticatedRequest } from '../middleware/auth';
import { ExerciseValidator } from '../services/exerciseValidator';
import { HeartService } from '../services/heartService';
import { StreakService } from '../services/streakService';
import { XPService } from '../services/xpService';

export const getLesson = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { lessonId } = req.params;
  const { courseId, expectedLanguage } = req.query as {
    courseId?: string;
    expectedLanguage?: string;
  };

  const lesson = await Lesson.findById(lessonId).populate({
    path: 'unitId',
    populate: { path: 'courseId' },
  });

  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found.' });
    return;
  }

  const unit: any = lesson.unitId;
  const course: any = unit?.courseId;

  // Strict Cross-Language Isolation Guard
  if (courseId) {
    const courseMatch =
      course?._id?.toString() === courseId ||
      course?.code?.toLowerCase() === courseId.toLowerCase() ||
      course?.id === courseId;
    if (!courseMatch) {
      res.status(400).json({
        error: 'CROSS_LANGUAGE_VIOLATION',
        message: `Cross-language violation: Lesson "${lesson.title}" does not belong to course "${courseId}".`,
      });
      return;
    }
  }

  if (expectedLanguage) {
    const expectedNorm = expectedLanguage.toLowerCase().trim();
    const courseLang = course?.toLanguage?.toLowerCase().trim();
    if (courseLang && courseLang !== expectedNorm && !course?.code?.startsWith(expectedNorm)) {
      res.status(400).json({
        error: 'CROSS_LANGUAGE_VIOLATION',
        message: `Cross-language violation: Lesson language "${courseLang}" does not match expected language "${expectedLanguage}".`,
      });
      return;
    }
  }

  // Fetch exercises ordered by order index
  const exercises = await Exercise.find({ lessonId: lesson._id }).sort({ order: 1 });

  // Sanitize exercises for the client: remove answers to prevent inspecting payload
  const includeAnswers = req.headers['x-include-answers'] === 'true';
  const sanitizedExercises = exercises.map((ex) => {
    const rawData = ex.data || {};
    const safeData: Record<string, any> = { ...rawData };

    if (!includeAnswers) {
      // Strip sensitive answer keys from client-facing payload
      delete safeData.correctOptionId;
      delete safeData.acceptableAnswers;
      delete safeData.correctOrder;
      delete safeData.correctSentence;
      delete safeData.isTrue;
    }

    // Strip spoiler translations from options to eliminate confusing answer hints
    if (Array.isArray(safeData.options)) {
      safeData.options = safeData.options.map((opt: any) => {
        if (typeof opt === 'object' && opt !== null) {
          const { translation, ...cleanOpt } = opt;
          return cleanOpt;
        }
        return opt;
      });
    }

    return {
      id: ex._id.toString(),
      lessonId: ex.lessonId.toString(),
      type: ex.type,
      prompt: ex.prompt,
      instruction: ex.instruction,
      audioUrl: ex.audioUrl,
      imageUrl: ex.imageUrl,
      order: ex.order,
      hint: ex.hint,
      data: safeData,
    };
  });

  res.json({
    lesson: {
      id: lesson._id.toString(),
      unitId: lesson.unitId.toString(),
      title: lesson.title,
      lessonNumber: lesson.lessonNumber,
      type: lesson.type,
      xpReward: lesson.xpReward,
      exerciseCount: exercises.length,
    },
    exercises: sanitizedExercises,
  });
};

export const submitAnswer = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const { exerciseId, userAnswer, durationMs } = req.body;

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    res.status(404).json({ message: 'Exercise not found.' });
    return;
  }

  // Validate answer authoritatively on server
  const validation = ExerciseValidator.validate(exercise, userAnswer);

  // If incorrect, deduct 1 heart
  let heartStatus = HeartService.getHeartStatus(user);
  if (!validation.isCorrect) {
    heartStatus = HeartService.deductHeart(user);
    await user.save();
  }

  // Audit attempt in database
  await Attempt.create({
    userId: user._id,
    lessonId: exercise.lessonId,
    exerciseId: exercise._id,
    isCorrect: validation.isCorrect,
    userAnswer: userAnswer !== undefined ? userAnswer : '',
    durationMs: durationMs || 0,
    reviewed: false,
  });

  res.json({
    isCorrect: validation.isCorrect,
    correctAnswer: validation.correctAnswer,
    explanation: validation.explanation,
    hint: validation.hint,
    pedagogicalTip: validation.pedagogicalTip,
    hasAccentWarning: validation.hasAccentWarning,
    heartsRemaining: user.hearts,
    maxHearts: 100,
    nextHeartInSeconds: heartStatus.nextHeartInSeconds,
  });
};

export const completeLesson = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const { lessonId, attempts, courseId, expectedLanguage } = req.body;

  const lesson = await Lesson.findById(lessonId).populate({
    path: 'unitId',
    populate: { path: 'courseId' },
  });

  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found.' });
    return;
  }

  const unit: any = lesson.unitId;
  const course: any = unit?.courseId;
  const actualCourseId = course?._id || unit?.courseId;

  // Strict Cross-Language Protection on Completion
  if (courseId) {
    const courseMatch =
      course?._id?.toString() === courseId ||
      course?.code?.toLowerCase() === courseId.toLowerCase() ||
      course?.id === courseId;
    if (!courseMatch) {
      res.status(400).json({
        error: 'CROSS_LANGUAGE_VIOLATION',
        message: 'Cross-language violation: Lesson does not belong to submitted course.',
      });
      return;
    }
  }

  if (expectedLanguage) {
    const expectedNorm = expectedLanguage.toLowerCase().trim();
    const courseLang = course?.toLanguage?.toLowerCase().trim();
    if (courseLang && courseLang !== expectedNorm && !course?.code?.startsWith(expectedNorm)) {
      res.status(400).json({
        error: 'CROSS_LANGUAGE_VIOLATION',
        message: 'Cross-language violation: Lesson language does not match expected language.',
      });
      return;
    }
  }

  // Calculate lesson accuracy safely (prevent NaN crash on empty attempts array)
  let accuracyPercentage = 100;
  if (typeof req.body.accuracy === 'number' && !isNaN(req.body.accuracy)) {
    accuracyPercentage = Math.max(0, Math.min(100, Math.round(req.body.accuracy)));
  } else if (Array.isArray(attempts) && attempts.length > 0) {
    const correctCount = attempts.filter((a: any) => a.isCorrect).length;
    accuracyPercentage = Math.round((correctCount / attempts.length) * 100);
  }
  const passed = accuracyPercentage >= 50;
  const isPerfect = accuracyPercentage === 100;

  // Calculate XP reward: Base + bonus for perfection (if passed)
  const baseXp = lesson.xpReward || 15;
  const bonusXp = isPerfect && passed ? 5 : 0;
  const xpAwarded = passed ? baseXp + bonusXp : Math.max(2, Math.round(baseXp * 0.25));

  // Award XP and update weekly leaderboard
  const { totalXp } = await XPService.awardXP(user, xpAwarded);

  // Update user streak if passed
  let currentStreak = user.currentStreak;
  let isNewStreakDay = false;
  if (passed) {
    const streakResult = StreakService.recordActivity(user);
    currentStreak = streakResult.currentStreak;
    isNewStreakDay = streakResult.isNewStreakDay;
  }
  await user.save();

  // Update or record user progress for this course
  let progress = await Progress.findOne({ userId: user._id, courseId: actualCourseId });
  if (!progress) {
    progress = new Progress({
      userId: user._id,
      courseId: actualCourseId,
      completedLessons: [],
      courseCompletionPercentage: 0,
    });
  }

  const existingIndex = progress.completedLessons.findIndex(
    (l) => l.lessonId.toString() === lesson._id.toString()
  );

  let bestScore = accuracyPercentage;
  let isNewBest = true;
  let attemptsCount = 1;

  if (existingIndex >= 0) {
    const existing = progress.completedLessons[existingIndex];
    attemptsCount = (existing.attemptsCount || 1) + 1;
    const prevBest = existing.bestScore ?? existing.accuracy ?? 0;
    isNewBest = accuracyPercentage > prevBest;
    bestScore = Math.max(prevBest, accuracyPercentage);

    existing.accuracy = accuracyPercentage;
    existing.bestScore = bestScore;
    existing.attemptsCount = attemptsCount;
    if (passed) {
      existing.passed = true;
      existing.completedAt = new Date();
    }
    if (!Array.isArray(existing.attemptsHistory)) {
      existing.attemptsHistory = [];
    }
    existing.attemptsHistory.push({
      score: accuracyPercentage,
      passed,
      completedAt: new Date(),
      xpEarned: xpAwarded,
    });
  } else {
    bestScore = accuracyPercentage;
    progress.completedLessons.push({
      lessonId: lesson._id as Types.ObjectId,
      completedAt: new Date(),
      accuracy: accuracyPercentage,
      bestScore,
      passed,
      attemptsCount: 1,
      attemptsHistory: [
        {
          score: accuracyPercentage,
          passed,
          completedAt: new Date(),
          xpEarned: xpAwarded,
        },
      ],
      xpEarned: xpAwarded,
    });
  }

  // Recalculate course percentage: Only count lessons that have met the 50% passing threshold!
  const courseUnits = await Unit.find({ courseId: actualCourseId, status: 'published' });
  const unitIds = courseUnits.map((u) => u._id);
  const totalCourseLessons = await Lesson.countDocuments({
    unitId: { $in: unitIds },
    status: 'published',
  });
  const passedLessonsCount = progress.completedLessons.filter((l) => l.passed).length;
  const totalCount = totalCourseLessons || 1;
  progress.courseCompletionPercentage = Math.min(
    100,
    Math.round((passedLessonsCount / totalCount) * 100)
  );

  progress.lastStudiedAt = new Date();
  await progress.save();

  // Check achievements only if passed
  const unlockedAchievements = passed
    ? await XPService.checkAchievements(user, {
        isPerfect,
        completedLessonsCount: passedLessonsCount,
      })
    : [];

  const heartStatus = HeartService.getHeartStatus(user);

  res.json({
    success: true,
    passed,
    requiresRepeat: !passed,
    xpAwarded,
    bonusXp,
    totalXp,
    newStreak: currentStreak,
    isStreakExtended: isNewStreakDay,
    heartsRemaining: user.hearts,
    maxHearts: 100,
    nextHeartInSeconds: heartStatus.nextHeartInSeconds,
    accuracyPercentage,
    bestScore,
    isNewBest,
    attemptsCount,
    attemptsHistory: progress.completedLessons[existingIndex >= 0 ? existingIndex : progress.completedLessons.length - 1]?.attemptsHistory || [],
    unlockedAchievements,
  });
};

export const validateAnswerOnly = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { userAnswer, correctAnswer, acceptableAnswers } = req.body;
  const acceptable = acceptableAnswers || (correctAnswer ? [correctAnswer] : []);
  const result = ExerciseValidator.compareWithAccentTolerance(
    typeof userAnswer === 'string' ? userAnswer : String(userAnswer || ''),
    acceptable
  );
  res.json(result);
};

export const loseHeart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const heartResult = HeartService.deductHeart(user);
  await user.save();
  res.json({
    heartsRemaining: heartResult.hearts,
    maxHearts: heartResult.maxHearts,
    nextHeartInSeconds: heartResult.nextHeartInSeconds,
  });
};
