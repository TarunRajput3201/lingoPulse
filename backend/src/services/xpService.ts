import { IUser } from '../models/User';
import { LeaderboardEntry } from '../models/Leaderboard';
import { Achievement, UserAchievement, IAchievement } from '../models/Achievement';

export class XPService {
  /**
   * Returns ISO Year-Week string e.g. "2026-W43"
   */
  public static getYearWeekString(date: Date = new Date()): string {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  }

  /**
   * Adds XP to user and updates weekly leaderboard entry.
   */
  public static async awardXP(user: IUser, amount: number): Promise<{ totalXp: number; weeklyXp: number }> {
    user.totalXp = (user.totalXp || 0) + amount;
    await user.save();

    const yearWeek = this.getYearWeekString();

    const leaderboardDoc = await LeaderboardEntry.findOneAndUpdate(
      { userId: user._id, yearWeek },
      { $inc: { weeklyXp: amount } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return {
      totalXp: user.totalXp,
      weeklyXp: leaderboardDoc.weeklyXp,
    };
  }

  /**
   * Checks for any new achievements unlocked by this user.
   */
  public static async checkAchievements(
    user: IUser,
    context: { isPerfect: boolean; completedLessonsCount: number }
  ): Promise<any[]> {
    const allAchievements = await Achievement.find();
    const newlyUnlocked: any[] = [];

    for (const ach of allAchievements) {
      let userAch = await UserAchievement.findOne({
        userId: user._id,
        achievementId: ach._id,
      });

      if (!userAch) {
        userAch = new UserAchievement({
          userId: user._id,
          achievementId: ach._id,
          progress: 0,
          isUnlocked: false,
        });
      }

      if (userAch.isUnlocked) continue;

      let currentProgress = 0;
      switch (ach.code) {
        case 'FIRST_LESSON':
          currentProgress = context.completedLessonsCount >= 1 ? 1 : 0;
          break;
        case 'STREAK_3':
          currentProgress = user.currentStreak;
          break;
        case 'STREAK_7':
          currentProgress = user.currentStreak;
          break;
        case 'XP_100':
          currentProgress = user.totalXp;
          break;
        case 'XP_500':
          currentProgress = user.totalXp;
          break;
        case 'PERFECT_ACCURACY':
          currentProgress = context.isPerfect ? 1 : 0;
          break;
        default:
          break;
      }

      userAch.progress = Math.min(ach.targetCount, Math.max(userAch.progress, currentProgress));

      if (userAch.progress >= ach.targetCount && !userAch.isUnlocked) {
        userAch.isUnlocked = true;
        userAch.unlockedAt = new Date();
        user.totalXp += ach.xpReward;
        await user.save();
        newlyUnlocked.push({
          id: ach._id.toString(),
          code: ach.code,
          title: ach.title,
          description: ach.description,
          xpReward: ach.xpReward,
          iconName: ach.iconName,
        });
      }

      await userAch.save();
    }

    return newlyUnlocked;
  }
}
