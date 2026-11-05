import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  completeOnboarding,
  deleteAccount,
  getHearts,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/hearts', authenticate, getHearts);
router.post('/onboarding', authenticate, completeOnboarding);
router.delete('/account', authenticate, deleteAccount);

export default router;
