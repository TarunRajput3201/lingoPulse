import { Response } from 'express';
import { Course } from '../models/Course';
import { Unit } from '../models/Unit';
import { Lesson } from '../models/Lesson';
import { Progress } from '../models/Progress';
import { AuthenticatedRequest } from '../middleware/auth';

export const getCourses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const courses = await Course.find({ status: 'published' }).sort({ order: 1 });
  res.json({ courses });
};

export const getCoursePath = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { courseId } = req.params;
  const userId = req.user!._id;

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404).json({ message: 'Course not found.' });
    return;
  }

  // Fetch or initialize user progress for this course
  let progress = await Progress.findOne({ userId, courseId: course._id });
  if (!progress) {
    progress = new Progress({
      userId,
      courseId: course._id,
      completedLessons: [],
      courseCompletionPercentage: 0,
    });
    await progress.save();
  }

  const completedLessonIdSet = new Set(
    progress.completedLessons.map((l) => l.lessonId.toString())
  );

  // Fetch all published units
  const units = await Unit.find({ courseId: course._id, status: 'published' }).sort({ unitNumber: 1 });

  let foundCurrentLesson = false;
  let allPreviousCompleted = true;

  const structuredUnits = [];
  for (const unit of units) {
    const lessons = await Lesson.find({ unitId: unit._id, status: 'published' }).sort({ lessonNumber: 1 });

    const lessonSummaries = lessons.map((lesson) => {
      const lessonIdStr = lesson._id.toString();
      const isCompleted = completedLessonIdSet.has(lessonIdStr);

      let isLocked = false;
      let isCurrent = false;

      if (isCompleted) {
        isLocked = false;
      } else if (allPreviousCompleted) {
        // First incomplete lesson in the whole sequence
        isLocked = false;
        if (!foundCurrentLesson) {
          isCurrent = true;
          foundCurrentLesson = true;
        }
        allPreviousCompleted = false; // Next ones must be locked
      } else {
        isLocked = true;
      }

      return {
        id: lessonIdStr,
        unitId: unit._id.toString(),
        title: lesson.title,
        lessonNumber: lesson.lessonNumber,
        type: lesson.type,
        xpReward: lesson.xpReward,
        isCompleted,
        isLocked,
        isCurrent,
      };
    });

    structuredUnits.push({
      id: unit._id.toString(),
      courseId: course._id.toString(),
      unitNumber: unit.unitNumber,
      title: unit.title,
      description: unit.description,
      themeColor: unit.themeColor,
      icon: unit.icon,
      lessons: lessonSummaries,
    });
  }

  res.json({
    course: {
      id: course._id.toString(),
      code: course.code,
      title: course.title,
      description: course.description,
      fromLanguage: course.fromLanguage,
      toLanguage: course.toLanguage,
      flagIcon: course.flagIcon,
      totalUnits: course.totalUnits,
      totalLessons: course.totalLessons,
      completionPercentage: progress.courseCompletionPercentage,
    },
    units: structuredUnits,
  });
};
