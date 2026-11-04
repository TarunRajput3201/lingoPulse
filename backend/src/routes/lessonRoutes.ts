import { Router } from 'express';
import { getLesson, submitAnswer, completeLesson, validateAnswerOnly, loseHeart } from '../controllers/lessonController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/:lessonId', authenticate, getLesson);
router.post('/submit-answer', authenticate, submitAnswer);
router.post('/complete', authenticate, completeLesson);
router.post('/validate-answer', authenticate, validateAnswerOnly);
router.post('/lose-heart', authenticate, loseHeart);

export default router;
