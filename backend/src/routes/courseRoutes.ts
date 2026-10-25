import { Router } from 'express';
import { getCourses, getCoursePath } from '../controllers/courseController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getCourses);
router.get('/:courseId/path', authenticate, getCoursePath);

export default router;
