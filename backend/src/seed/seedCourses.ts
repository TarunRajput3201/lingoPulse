import mongoose from 'mongoose';
import { ENV } from '../config/env';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Unit } from '../models/Unit';
import { Lesson } from '../models/Lesson';
import { Exercise } from '../models/Exercise';
import { Achievement } from '../models/Achievement';
import { generateAllCourses } from '../services/curriculum';

export const seedDatabase = async (options: { preserveUsers?: boolean } = {}) => {
  console.log('🌱 Starting LingoPulse Database Seeding...');
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(ENV.MONGO_URI);
  }

  // Clear existing curriculum collections
  const clearPromises: Promise<any>[] = [
    Course.deleteMany({}),
    Unit.deleteMany({}),
    Lesson.deleteMany({}),
    Exercise.deleteMany({}),
    Achievement.deleteMany({}),
  ];

  if (!options.preserveUsers) {
    clearPromises.push(User.deleteMany({}));
  }

  await Promise.all(clearPromises);
  console.log('🧹 Cleared existing curriculum records.');

  // 1. Seed Achievements
  const achievements = await Achievement.create([
    {
      code: 'FIRST_LESSON',
      title: 'First Step',
      description: 'Complete your very first lesson',
      iconName: 'footprints',
      tier: 1,
      targetCount: 1,
      xpReward: 20,
    },
    {
      code: 'STREAK_3',
      title: 'Consistency',
      description: 'Maintain a 3-day learning streak',
      iconName: 'flame',
      tier: 1,
      targetCount: 3,
      xpReward: 50,
    },
    {
      code: 'STREAK_7',
      title: 'Unstoppable',
      description: 'Reach a 7-day learning streak',
      iconName: 'zap',
      tier: 2,
      targetCount: 7,
      xpReward: 100,
    },
    {
      code: 'XP_100',
      title: 'Century Club',
      description: 'Earn 100 total XP',
      iconName: 'sparkles',
      tier: 1,
      targetCount: 100,
      xpReward: 30,
    },
    {
      code: 'XP_500',
      title: 'Master Scholar',
      description: 'Earn 500 total XP',
      iconName: 'crown',
      tier: 2,
      targetCount: 500,
      xpReward: 150,
    },
    {
      code: 'PERFECT_ACCURACY',
      title: 'Flawless Mind',
      description: 'Complete a lesson with 100% accuracy',
      iconName: 'target',
      tier: 1,
      targetCount: 1,
      xpReward: 40,
    },
  ]);
  console.log(`✅ Seeded ${achievements.length} achievements.`);

  // 2. Seed Users: Admin & Demo Learner
  await User.create({
    email: 'admin@lingopulse.com',
    password: 'AdminPassword123!',
    username: 'admin',
    displayName: 'Lingo Administrator',
    role: 'admin',
    nativeLanguage: 'en',
    targetLanguage: 'es',
    learningLevel: 'advanced',
    hearts: 5,
    maxHearts: 5,
    hasCompletedOnboarding: true,
  });

  await User.create({
    email: 'learner@lingopulse.com',
    password: 'LearnerPassword123!',
    username: 'learner_alex',
    displayName: 'Alex Learner',
    role: 'learner',
    nativeLanguage: 'en',
    targetLanguage: 'es',
    learningLevel: 'beginner',
    hearts: 5,
    maxHearts: 5,
    totalXp: 45,
    currentStreak: 2,
    longestStreak: 5,
    lastActiveDate: new Date().toISOString().split('T')[0],
    hasCompletedOnboarding: true,
  });
  console.log('✅ Seeded Admin & Demo Learner accounts.');

  // 3. Seed All 38 Language Courses
  const allCourses = generateAllCourses();
  console.log(`📚 Seeding ${allCourses.length} Courses into Database...`);

  let totalUnitsCount = 0;
  let totalLessonsCount = 0;
  let totalExercisesCount = 0;

  for (const staticCourse of allCourses) {
    const course = await Course.create({
      code: staticCourse.code,
      title: staticCourse.title,
      description: staticCourse.description,
      fromLanguage: staticCourse.fromLanguage,
      toLanguage: staticCourse.toLanguage,
      flagIcon: staticCourse.flagIcon,
      status: staticCourse.status || 'published',
      order: staticCourse.order,
      nativeName: staticCourse.nativeName || '',
      isRTL: staticCourse.isRTL || false,
      region: staticCourse.region || 'European',
      totalUnits: staticCourse.units.length,
      totalLessons: staticCourse.units.reduce((acc: number, u: any) => acc + u.lessons.length, 0),
    });

    const unitDocs: any[] = [];
    const lessonDocs: any[] = [];
    const exerciseDocs: any[] = [];

    for (const staticUnit of staticCourse.units) {
      const unitId = new mongoose.Types.ObjectId();
      unitDocs.push({
        _id: unitId,
        courseId: course._id,
        unitNumber: staticUnit.unitNumber,
        title: staticUnit.title,
        description: staticUnit.description,
        themeColor: staticUnit.themeColor,
        icon: staticUnit.icon,
        status: staticUnit.status || 'published',
      });
      totalUnitsCount++;

      for (const staticLesson of staticUnit.lessons) {
        const lessonId = new mongoose.Types.ObjectId();
        lessonDocs.push({
          _id: lessonId,
          unitId,
          lessonNumber: staticLesson.lessonNumber,
          title: staticLesson.title,
          type: staticLesson.type,
          xpReward: staticLesson.xpReward,
          order: staticLesson.order,
          status: staticLesson.status || 'published',
        });
        totalLessonsCount++;

        for (const ex of staticLesson.exercises) {
          exerciseDocs.push({
            lessonId,
            type: ex.type,
            prompt: ex.prompt,
            instruction: ex.instruction,
            audioUrl: ex.audioUrl || '',
            imageUrl: ex.imageUrl || '',
            order: ex.order,
            hint: ex.hint || '',
            explanation: ex.explanation,
            data: ex.data,
          });
          totalExercisesCount++;
        }
      }
    }

    if (unitDocs.length > 0) await Unit.insertMany(unitDocs);
    if (lessonDocs.length > 0) await Lesson.insertMany(lessonDocs);
    if (exerciseDocs.length > 0) {
      // Chunk exercise inserts to respect MongoDB 16MB document/packet limits
      const chunkSize = 2000;
      for (let i = 0; i < exerciseDocs.length; i += chunkSize) {
        await Exercise.insertMany(exerciseDocs.slice(i, i + chunkSize), { ordered: false });
      }
    }

    console.log(
      ` ✅ Seeded ${staticCourse.flagIcon} ${staticCourse.title} (${staticCourse.code}) — ` +
        `${unitDocs.length} units, ${lessonDocs.length} sections, ${exerciseDocs.length} exercises.`
    );
  }

  console.log('----------------------------------------------------');
  console.log(
    `🎉 Database seeding complete! Total: ${allCourses.length} courses, ` +
      `${totalUnitsCount} units, ${totalLessonsCount} lessons, ${totalExercisesCount} exercises.`
  );
  console.log('====================================================');
};

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding script finished successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Seeding failed with error:', err);
      process.exit(1);
    });
}
