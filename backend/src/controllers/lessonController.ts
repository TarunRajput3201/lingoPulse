import { Response } from 'express';
import { Types } from 'mongoose';
import { Lesson } from '../models/Lesson';
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

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found.' });
    return;
  }

  // Fetch exercises ordered by order index
  const exercises = await Exercise.find({ lessonId: lesson._id }).sort({ order: 1 });

  // Sanitize exercises for the client: remove answers to prevent inspecting payload
  const sanitizedExercises = exercises.map((ex) => {
    const rawData = ex.data || {};
    const safeData: Record<string, any> = { ...rawData };

    // Strip sensitive answer keys from client-facing payload
    delete safeData.correctOptionId;
    delete safeData.acceptableAnswers;
    delete safeData.correctOrder;
    delete safeData.correctSentence;
    delete safeData.isTrue;

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
  let heartsRemaining = user.hearts;
  if (!validation.isCorrect) {
    heartsRemaining = HeartService.deductHeart(user);
    await user.save();
  }

  // Audit attempt in database
  await Attempt.create({
    userId: user._id,
    lessonId: exercise.lessonId,
    exerciseId: exercise._id,
    isCorrect: validation.isCorrect,
    userAnswer,
    durationMs: durationMs || 0,
    reviewed: false,
  });

  res.json({
    isCorrect: validation.isCorrect,
    correctAnswer: validation.correctAnswer,
    explanation: validation.explanation,
    hint: validation.hint,
    heartsRemaining,
  });
};

export const completeLesson = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const { lessonId, attempts } = req.body;

  const lesson = await Lesson.findById(lessonId).populate('unitId');
  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found.' });
    return;
  }

  const unit: any = lesson.unitId;
  const courseId = unit?.courseId;

  // Calculate lesson accuracy
  const totalAttempts = Array.isArray(attempts) ? attempts.length : 1;
  const correctCount = Array.isArray(attempts)
    ? attempts.filter((a: any) => a.isCorrect).length
    : 1;
  const accuracyPercentage = Math.round((correctCount / totalAttempts) * 100);
  const isPerfect = accuracyPercentage === 100;

  // Calculate XP reward: Base + bonus for perfection
  const baseXp = lesson.xpReward || 15;
  const bonusXp = isPerfect ? 5 : 0;
  const xpAwarded = baseXp + bonusXp;

  // Award XP and update weekly leaderboard
  const { totalXp } = await XPService.awardXP(user, xpAwarded);

  // Update user streak
  const { currentStreak, isNewStreakDay } = StreakService.recordActivity(user);
  await user.save();

  // Update or record user progress for this course
  let progress = await Progress.findOne({ userId: user._id, courseId });
  if (!progress) {
    progress = new Progress({
      userId: user._id,
      courseId,
      completedLessons: [],
      courseCompletionPercentage: 0,
    });
  }

  const alreadyCompleted = progress.completedLessons.some(
    (l) => l.lessonId.toString() === lesson._id.toString()
  );

  if (!alreadyCompleted) {
    progress.completedLessons.push({
      lessonId: lesson._id as Types.ObjectId,
      completedAt: new Date(),
      accuracy: accuracyPercentage,
      xpEarned: xpAwarded,
    });

    // Recalculate course percentage
    const allUnits = await Lesson.find({ status: 'published' });
    const totalPublishedCount = allUnits.length || 1;
    progress.courseCompletionPercentage = Math.min(
      100,
      Math.round((progress.completedLessons.length / totalPublishedCount) * 100)
    );
  }

  progress.lastStudiedAt = new Date();
  await progress.save();

  // Check achievements
  const unlockedAchievements = await XPService.checkAchievements(user, {
    isPerfect,
    completedLessonsCount: progress.completedLessons.length,
  });

  res.json({
    success: true,
    xpAwarded,
    bonusXp,
    totalXp,
    newStreak: currentStreak,
    isStreakExtended: isNewStreakDay,
    heartsRemaining: user.hearts,
    accuracyPercentage,
    unlockedAchievements,
  });
};
