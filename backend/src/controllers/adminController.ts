import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { Unit } from '../models/Unit';
import { Lesson } from '../models/Lesson';
import { Exercise } from '../models/Exercise';
import { User } from '../models/User';
import { Progress } from '../models/Progress';

// Course CRUD
export const adminGetCourses = async (req: Request, res: Response): Promise<void> => {
  const courses = await Course.find().sort({ order: 1 });
  res.json({ courses });
};

export const adminCreateCourse = async (req: Request, res: Response): Promise<void> => {
  const { code, title, description, fromLanguage, toLanguage, flagIcon, status } = req.body;
  const course = await Course.create({
    code,
    title,
    description,
    fromLanguage: fromLanguage || 'en',
    toLanguage: toLanguage || 'es',
    flagIcon: flagIcon || '🌐',
    status: status || 'draft',
  });
  res.status(201).json({ course });
};

export const adminUpdateCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  const course = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
  if (!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }
  res.json({ course });
};

// Unit CRUD
export const adminGetUnits = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  const units = await Unit.find({ courseId }).sort({ unitNumber: 1 });
  res.json({ units });
};

export const adminCreateUnit = async (req: Request, res: Response): Promise<void> => {
  const { courseId, unitNumber, title, description, themeColor, icon, status } = req.body;
  const unit = await Unit.create({
    courseId,
    unitNumber,
    title,
    description,
    themeColor: themeColor || '#58CC02',
    icon: icon || 'sparkles',
    status: status || 'draft',
  });

  await Course.findByIdAndUpdate(courseId, { $inc: { totalUnits: 1 } });
  res.status(201).json({ unit });
};

// Lesson CRUD
export const adminGetLessons = async (req: Request, res: Response): Promise<void> => {
  const { unitId } = req.params;
  const lessons = await Lesson.find({ unitId }).sort({ lessonNumber: 1 });
  res.json({ lessons });
};

export const adminCreateLesson = async (req: Request, res: Response): Promise<void> => {
  const { unitId, lessonNumber, title, type, xpReward, order, status } = req.body;
  const lesson = await Lesson.create({
    unitId,
    lessonNumber,
    title,
    type: type || 'standard',
    xpReward: xpReward || 15,
    order: order || lessonNumber,
    status: status || 'draft',
  });

  const unit = await Unit.findById(unitId);
  if (unit) {
    await Course.findByIdAndUpdate(unit.courseId, { $inc: { totalLessons: 1 } });
  }

  res.status(201).json({ lesson });
};

// Exercise CRUD
export const adminGetExercises = async (req: Request, res: Response): Promise<void> => {
  const { lessonId } = req.params;
  const exercises = await Exercise.find({ lessonId }).sort({ order: 1 });
  res.json({ exercises });
};

export const adminCreateExercise = async (req: Request, res: Response): Promise<void> => {
  const { lessonId, type, prompt, instruction, audioUrl, imageUrl, order, hint, explanation, data } = req.body;
  const exercise = await Exercise.create({
    lessonId,
    type,
    prompt,
    instruction,
    audioUrl,
    imageUrl,
    order: order || 0,
    hint,
    explanation,
    data: data || {},
  });
  res.status(201).json({ exercise });
};

export const adminUpdateExercise = async (req: Request, res: Response): Promise<void> => {
  const { exerciseId } = req.params;
  const exercise = await Exercise.findByIdAndUpdate(exerciseId, req.body, { new: true });
  if (!exercise) {
    res.status(404).json({ message: 'Exercise not found' });
    return;
  }
  res.json({ exercise });
};

export const adminDeleteExercise = async (req: Request, res: Response): Promise<void> => {
  const { exerciseId } = req.params;
  await Exercise.findByIdAndDelete(exerciseId);
  res.json({ message: 'Exercise deleted successfully' });
};

// Analytics Overview
export const adminGetAnalytics = async (req: Request, res: Response): Promise<void> => {
  const [totalUsers, activeUsers, totalCourses, completedLessonsCount] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ currentStreak: { $gt: 0 } }),
    Course.countDocuments(),
    Progress.aggregate([
      { $unwind: '$completedLessons' },
      { $count: 'total' },
    ]),
  ]);

  res.json({
    analytics: {
      totalUsers,
      activeUsers,
      totalCourses,
      totalLessonsCompleted: completedLessonsCount[0]?.total || 0,
    },
  });
};
