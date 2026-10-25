import { Router } from 'express';
import { getLesson, submitAnswer, completeLesson } from '../controllers/lessonController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/:lessonId', authenticate, getLesson);
router.post('/submit-answer', authenticate, submitAnswer);
router.post('/complete', authenticate, completeLesson);

export default router;
