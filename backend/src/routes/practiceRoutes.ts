import { Router } from 'express';
import { getPracticeMistakes, completePractice } from '../controllers/practiceController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/mistakes', authenticate, getPracticeMistakes);
router.post('/complete', authenticate, completePractice);

export default router;
