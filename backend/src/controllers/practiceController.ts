import { Response } from 'express';
import { Attempt } from '../models/Attempt';
import { Exercise } from '../models/Exercise';
import { AuthenticatedRequest } from '../middleware/auth';
import { HeartService } from '../services/heartService';
import { XPService } from '../services/xpService';

export const getPracticeMistakes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user!._id;

  // Find recent incorrect attempts that haven't been resolved
  const incorrectAttempts = await Attempt.find({
    userId,
    isCorrect: false,
    reviewed: false,
  })
    .sort({ createdAt: -1 })
    .limit(10);

  const exerciseIds = [...new Set(incorrectAttempts.map((a) => a.exerciseId))];
  const exercises = await Exercise.find({ _id: { $in: exerciseIds } });

  const sanitizedExercises = exercises.map((ex) => {
    const rawData = ex.data || {};
    const safeData: Record<string, any> = { ...rawData };
    delete safeData.correctOptionId;
    delete safeData.acceptableAnswers;
    delete safeData.correctOrder;
    delete safeData.correctSentence;

    return {
      id: ex._id.toString(),
      lessonId: ex.lessonId.toString(),
      type: ex.type,
      prompt: ex.prompt,
      instruction: ex.instruction,
      audioUrl: ex.audioUrl,
      imageUrl: ex.imageUrl,
      hint: ex.hint,
      data: safeData,
    };
  });

  res.json({
    practiceItems: sanitizedExercises,
    totalMistakesToReview: sanitizedExercises.length,
  });
};

export const completePractice = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const { resolvedExerciseIds } = req.body;

  if (Array.isArray(resolvedExerciseIds) && resolvedExerciseIds.length > 0) {
    await Attempt.updateMany(
      { userId: user._id, exerciseId: { $in: resolvedExerciseIds } },
      { $set: { reviewed: true } }
    );
  }

  // Refill 1 heart as reward for practicing!
  const newHearts = HeartService.addHeart(user);
  await user.save();

  // Award 10 Practice XP
  const { totalXp } = await XPService.awardXP(user, 10);

  res.json({
    success: true,
    message: 'Practice complete! You recovered 1 heart and earned 10 XP.',
    heartsRemaining: newHearts,
    totalXp,
  });
};
