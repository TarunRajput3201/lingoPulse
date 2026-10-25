import { Router } from 'express';
import {
  adminGetCourses,
  adminCreateCourse,
  adminUpdateCourse,
  adminGetUnits,
  adminCreateUnit,
  adminGetLessons,
  adminCreateLesson,
  adminGetExercises,
  adminCreateExercise,
  adminUpdateExercise,
  adminDeleteExercise,
  adminGetAnalytics,
} from '../controllers/adminController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';

const router = Router();

// Require auth and admin for all endpoints
router.use(authenticate, requireAdmin);

router.get('/analytics', adminGetAnalytics);

// Courses
router.get('/courses', adminGetCourses);
router.post('/courses', adminCreateCourse);
router.put('/courses/:courseId', adminUpdateCourse);

// Units
router.get('/courses/:courseId/units', adminGetUnits);
router.post('/units', adminCreateUnit);

// Lessons
router.get('/units/:unitId/lessons', adminGetLessons);
router.post('/lessons', adminCreateLesson);

// Exercises
router.get('/lessons/:lessonId/exercises', adminGetExercises);
router.post('/exercises', adminCreateExercise);
router.put('/exercises/:exerciseId', adminUpdateExercise);
router.delete('/exercises/:exerciseId', adminDeleteExercise);

export default router;
