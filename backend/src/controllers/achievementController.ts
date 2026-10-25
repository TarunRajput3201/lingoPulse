import { Response } from 'express';
import { Achievement, UserAchievement } from '../models/Achievement';
import { AuthenticatedRequest } from '../middleware/auth';

export const getAchievements = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user!._id;

  const [allAchievements, userAchievements] = await Promise.all([
    Achievement.find().sort({ tier: 1, targetCount: 1 }),
    UserAchievement.find({ userId }),
  ]);

  const userAchMap = new Map<string, any>();
  userAchievements.forEach((ua) => {
    userAchMap.set(ua.achievementId.toString(), ua);
  });

  const formattedAchievements = allAchievements.map((ach) => {
    const ua = userAchMap.get(ach._id.toString());
    return {
      id: ach._id.toString(),
      code: ach.code,
      title: ach.title,
      description: ach.description,
      iconName: ach.iconName,
      tier: ach.tier,
      progress: ua ? ua.progress : 0,
      maxProgress: ach.targetCount,
      isUnlocked: ua ? ua.isUnlocked : false,
      unlockedAt: ua?.unlockedAt?.toISOString(),
      xpReward: ach.xpReward,
    };
  });

  res.json({ achievements: formattedAchievements });
};
