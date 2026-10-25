import { Router } from 'express';
import { getWeeklyLeaderboard } from '../controllers/leaderboardController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/weekly', authenticate, getWeeklyLeaderboard);

export default router;
