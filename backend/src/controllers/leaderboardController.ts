import { Response } from 'express';
import { LeaderboardEntry } from '../models/Leaderboard';
import { AuthenticatedRequest } from '../middleware/auth';
import { XPService } from '../services/xpService';

export const getWeeklyLeaderboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const currentUserId = req.user!._id.toString();
  const yearWeek = XPService.getYearWeekString();

  const entries = await LeaderboardEntry.find({ yearWeek })
    .sort({ weeklyXp: -1 })
    .limit(50)
    .populate('userId', 'displayName username avatarUrl');

  let userInTop50 = false;
  const formattedLeaderboard = entries.map((entry: any, index: number) => {
    const isCurrentUser = entry.userId?._id?.toString() === currentUserId;
    if (isCurrentUser) userInTop50 = true;

    return {
      rank: index + 1,
      userId: entry.userId?._id?.toString() || entry.userId,
      displayName: entry.userId?.displayName || entry.userId?.username || 'Learner',
      avatarUrl: entry.userId?.avatarUrl,
      weeklyXp: entry.weeklyXp,
      isCurrentUser,
      league: entry.league,
    };
  });

  // If current user is not in top 50, fetch user's own ranking
  let currentUserRank = null;
  if (!userInTop50) {
    const myEntry = await LeaderboardEntry.findOne({ userId: currentUserId, yearWeek });
    if (myEntry) {
      const higherCount = await LeaderboardEntry.countDocuments({
        yearWeek,
        weeklyXp: { $gt: myEntry.weeklyXp },
      });
      currentUserRank = {
        rank: higherCount + 1,
        userId: currentUserId,
        displayName: req.user!.displayName,
        avatarUrl: req.user!.avatarUrl,
        weeklyXp: myEntry.weeklyXp,
        isCurrentUser: true,
        league: myEntry.league,
      };
    }
  }

  res.json({
    yearWeek,
    leaderboard: formattedLeaderboard,
    currentUserRank,
  });
};
