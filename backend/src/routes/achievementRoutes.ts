import { Router } from 'express';
import { getAchievements } from '../controllers/achievementController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAchievements);

export default router;
