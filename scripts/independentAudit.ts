import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

// Define schemas matching MongoDB collections
const CourseSchema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  fromLanguage: String,
  toLanguage: String,
  status: String,
  order: Number,
  totalUnits: Number,
  totalLessons: Number,
});

const UnitSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  unitNumber: Number,
  title: String,
  description: String,
  themeColor: String,
  icon: String,
  status: String,
});

const LessonSchema = new mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  lessonNumber: Number,
  title: String,
  type: String,
  xpReward: Number,
  order: Number,
  status: String,
});

const ExerciseSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  type: String,
  prompt: String,
  instruction: String,
  order: Number,
  explanation: String,
  data: mongoose.Schema.Types.Mixed,
});

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
const Unit = mongoose.models.Unit || mongoose.model('Unit', UnitSchema);
const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);
const Exercise = mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema);

interface AuditResult {
  section: string;
  check: string;
  status: 'PASSED' | 'FAILED';
  details: string;
}

const results: AuditResult[] = [];

function record(section: string, check: string, passed: boolean, details: string) {
  results.push({
    section,
    check,
    status: passed ? 'PASSED' : 'FAILED',
    details,
  });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] [${section}] ${check} - ${details}`);
}

async function runIndependentAudit() {
  console.log('================================================================');
  console.log('   LINGOPULSE INDEPENDENT QA & MULTILINGUAL INTEGRITY AUDIT   ');
  console.log('================================================================\n');

  // 1. DIRECT DATABASE VERIFICATION
  console.log('--- 1. Direct MongoDB Inspection ---');
  await mongoose.connect('mongodb://localhost:27017/lingopulse');
  console.log('Connected to MongoDB at mongodb://localhost:27017/lingopulse');

  const EXPECTED_LANGUAGES = [
    { code: 'en-es', to: 'en', name: 'English Academy' },
    { code: 'es-en', to: 'es', name: 'Spanish Academy' },
    { code: 'fr-en', to: 'fr', name: 'French Academy' },
    { code: 'ja-en', to: 'ja', name: 'Japanese Academy' },
    { code: 'de-en', to: 'de', name: 'German Academy' },
    { code: 'ko-en', to: 'ko', name: 'Korean Academy' },
    { code: 'it-en', to: 'it', name: 'Italian Academy' },
    { code: 'zh-en', to: 'zh', name: 'Mandarin Chinese Academy' },
    { code: 'pt-en', to: 'pt', name: 'Portuguese Academy' },
    { code: 'hi-en', to: 'hi', name: 'Hindi Academy' },
  ];

  const dbCourses = await Course.find({}).lean();
  const dbUnits = await Unit.find({}).lean();
  const dbLessons = await Lesson.find({}).lean();
  const dbExercises = await Exercise.find({}).lean();

  record(
    'MongoDB Database',
    'Flagship Course Count',
    dbCourses.length >= 10,
    `Found ${dbCourses.length} courses in database (expected >= 10)`
  );

  for (const expected of EXPECTED_LANGUAGES) {
    const course = dbCourses.find((c: any) => c.code === expected.code);
    if (!course) {
      record('MongoDB Database', `Course ${expected.code}`, false, `Course code ${expected.code} not found in DB`);
      continue;
    }

    const courseUnits = dbUnits.filter((u: any) => u.courseId?.toString() === course._id.toString());
    const courseLessons = dbLessons.filter((l: any) =>
      courseUnits.some((u: any) => u._id.toString() === l.unitId?.toString())
    );
    const courseExercises = dbExercises.filter((ex: any) =>
      courseLessons.some((l: any) => l._id.toString() === ex.lessonId?.toString())
    );

    const isAligned =
      course.toLanguage === expected.to &&
      courseUnits.length >= 3 &&
      courseLessons.length >= 7 &&
      courseExercises.length >= 15;

    record(
      'MongoDB Database',
      `Flagship Course: ${expected.name} (${expected.code})`,
      isAligned,
      `toLanguage="${course.toLanguage}", ${courseUnits.length} units, ${courseLessons.length} lessons, ${courseExercises.length} exercises`
    );
  }

  // 2. FRENCH TO SPANISH ISOLATION IN DATABASE
  console.log('\n--- 2. French Course Isolation & Zero Spanish Contamination ---');
  const frenchCourse = dbCourses.find((c: any) => c.code === 'fr-en');
  if (!frenchCourse) {
    record('Language Isolation', 'French Course Exists', false, 'French course not found in DB');
  } else {
    const frenchUnits = dbUnits.filter((u: any) => u.courseId?.toString() === frenchCourse._id.toString());
    const frenchLessons = dbLessons.filter((l: any) =>
      frenchUnits.some((u: any) => u._id.toString() === l.unitId?.toString())
    );
    const frenchExercises = dbExercises.filter((ex: any) =>
      frenchLessons.some((l: any) => l._id.toString() === ex.lessonId?.toString())
    );

    const spanishKeywords = [
      'hola', 'buenos días', 'buenos dias', 'gracias', 'adiós', 'adios',
      'por favor', 'mucho gusto', 'cómo estás', 'buenas noches', 'hasta luego'
    ];
    const frenchKeywords = [
      'bonjour', 'merci', 'salut', 'au revoir', 's\'il vous plaît', 'enchanté', 'bonne nuit'
    ];

    let spanishHits = 0;
    let frenchHits = 0;

    for (const ex of frenchExercises) {
      const contentStr = JSON.stringify(ex).toLowerCase();
      for (const spWord of spanishKeywords) {
        if (contentStr.includes(`"${spWord}"`) || contentStr.includes(` ${spWord} `) || contentStr.includes(` ${spWord}"`)) {
          console.warn(`[WARN] Spanish word "${spWord}" detected in French exercise ${ex._id}`);
          spanishHits++;
        }
      }
      for (const frWord of frenchKeywords) {
        if (contentStr.includes(frWord.toLowerCase())) {
          frenchHits++;
        }
      }
    }

    record(
      'Language Isolation',
      'Zero Spanish Contamination in French Course',
      spanishHits === 0,
      `Scanned ${frenchExercises.length} French exercises: ${spanishHits} Spanish keyword hits (must be 0)`
    );

    record(
      'Language Isolation',
      'Authentic French Vocabulary Density',
      frenchHits >= 10,
      `Found ${frenchHits} authentic French vocabulary markers across French exercises`
    );
  }

  // 3. LIVE HTTP API END-TO-END JOURNEY (French Selection -> Lesson Start)
  console.log('\n--- 3. Live HTTP API Learner Journey ---');
  const BASE_URL = 'http://localhost:5050';
  const timestamp = Date.now();
  const testUser = {
    email: `independent_auditor_${timestamp}@lingopulse.com`,
    password: 'Password123!',
    username: `auditor_${timestamp}`,
    displayName: 'Independent QA Auditor',
    targetLanguage: 'es',
    learningLevel: 'beginner',
  };

  try {
    // A. Register
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });
    const regData: any = await regRes.json();
    const token = regData.tokens?.accessToken;
    record('Live API Journey', 'User Registration', regRes.status === 201 && !!token, `User created: ${testUser.username}`);

    // B. Switch to French via onboarding
    const onbRes = await fetch(`${BASE_URL}/api/auth/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        targetLanguage: 'fr',
        learningLevel: 'beginner',
        dailyGoalMinutes: 15,
      }),
    });
    record('Live API Journey', 'Select French Onboarding', onbRes.status === 200, `Set targetLanguage to "fr"`);

    // C. Verify profile reflects French
    const profRes = await fetch(`${BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profData: any = await profRes.json();
    record(
      'Live API Journey',
      'Profile Target Language',
      profData.user?.targetLanguage === 'fr',
      `Profile targetLanguage is "${profData.user?.targetLanguage}"`
    );

    // D. Fetch courses catalog
    const coursesRes = await fetch(`${BASE_URL}/api/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const coursesData: any = await coursesRes.json();
    const frCourse = coursesData.courses?.find((c: any) => c.code === 'fr-en' || c.toLanguage === 'fr');
    record('Live API Journey', 'Fetch Course Catalog', !!frCourse, `Found French course: "${frCourse?.title}" (${frCourse?._id})`);

    // E. Fetch French path
    const pathRes = await fetch(`${BASE_URL}/api/courses/${frCourse._id}/path`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const pathData: any = await pathRes.json();
    const frLesson1 = pathData.units?.[0]?.lessons?.[0];
    const frLesson2 = pathData.units?.[0]?.lessons?.[1];

    record(
      'Live API Journey',
      'French Path Progression Lock State',
      frLesson1?.isLocked === false && frLesson2?.isLocked === true,
      `Lesson 1 "${frLesson1?.title}" locked=${frLesson1?.isLocked}, Lesson 2 "${frLesson2?.title}" locked=${frLesson2?.isLocked}`
    );

    // F. Fetch French Lesson 1 with explicit language guard
    const lessonRes = await fetch(`${BASE_URL}/api/lessons/${frLesson1.id}?expectedLanguage=fr`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const lessonData: any = await lessonRes.json();
    const exercises = lessonData.exercises || [];

    record(
      'Live API Journey',
      'Fetch French Lesson 1 Exercises',
      lessonRes.status === 200 && exercises.length >= 3,
      `Fetched ${exercises.length} exercises for French Lesson 1 "${lessonData.title}"`
    );

    // Verify first exercise prompt is French
    const ex1 = exercises[0];
    const isEx1French = JSON.stringify(ex1).includes('Bonjour') || JSON.stringify(ex1).includes('French');
    record(
      'Live API Journey',
      'Exercise 1 French Authenticity',
      isEx1French,
      `Exercise 1 prompt: "${ex1?.prompt}"`
    );

    // G. Cross-Language Security Guard Check
    const esCourse = coursesData.courses?.find((c: any) => c.code === 'es-en');
    const esPathRes = await fetch(`${BASE_URL}/api/courses/${esCourse._id}/path`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const esPathData: any = await esPathRes.json();
    const esLesson1Id = esPathData.units?.[0]?.lessons?.[0]?.id;

    const crossRes = await fetch(`${BASE_URL}/api/lessons/${esLesson1Id}?expectedLanguage=fr`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    record(
      'Security & Isolation Guard',
      'Cross-Language Tampering Blocked',
      crossRes.status === 400,
      `Fetching Spanish lesson with expectedLanguage=fr correctly returned HTTP ${crossRes.status}`
    );

    // H. Solve French Lesson 1 Exercises
    let allExercisesPassed = true;
    const attempts = [];
    for (const ex of exercises) {
      const dbEx = dbExercises.find((e: any) => e._id.toString() === ex.id);
      let answer: any;
      if (ex.type === 'MULTIPLE_CHOICE') {
        const correctId = dbEx?.data?.correctOptionId;
        const opt = ex.data?.options?.find((o: any) => o.id === correctId);
        answer = opt ? opt.text : (dbEx?.data?.options?.find((o: any) => o.id === correctId)?.text || 'Bonjour');
      } else if (ex.type === 'TRANSLATION') {
        answer = dbEx?.data?.acceptableAnswers?.[0] || 'Merci beaucoup';
      } else if (ex.type === 'MATCHING_PAIRS') {
        answer = {};
        (ex.data?.pairs || []).forEach((p: any) => {
          answer[p.id || p.leftText] = p.rightText;
        });
      } else if (ex.type === 'SPEAKING_PRONUNCIATION') {
        answer = ex.data?.phraseToSpeak || dbEx?.data?.phraseToSpeak || 'Bonjour, merci beaucoup';
      } else if (ex.type === 'FILL_IN_THE_BLANK') {
        answer = dbEx?.data?.acceptableAnswers?.[0] || '';
      } else if (ex.type === 'TRUE_FALSE') {
        answer = dbEx?.data?.isTrue ?? true;
      }

      const submitRes = await fetch(`${BASE_URL}/api/lessons/submit-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          exerciseId: ex.id,
          userAnswer: answer,
          durationMs: 1000,
        }),
      });
      const submitData: any = await submitRes.json();
      if (!submitData.isCorrect) {
        allExercisesPassed = false;
        console.warn(`[WARN] Exercise ${ex.id} (${ex.type}) failed validation:`, submitData);
      }
      attempts.push({
        exerciseId: ex.id,
        isCorrect: submitData.isCorrect,
        userAnswer: answer,
        durationMs: 1000,
      });
    }

    record(
      'Live API Journey',
      'French Lesson 1 Answer Submission',
      allExercisesPassed,
      `Submitted answers for all ${exercises.length} exercises (all marked correct: ${allExercisesPassed})`
    );

    // I. Complete Lesson 1
    const compRes = await fetch(`${BASE_URL}/api/lessons/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lessonId: frLesson1.id,
        attempts,
      }),
    });
    const compData: any = await compRes.json();
    record(
      'Live API Journey',
      'Complete French Lesson 1',
      compRes.status === 200 && compData.xpAwarded > 0,
      `Completed lesson with ${compData.xpAwarded} XP awarded, hearts=${compData.heartsRemaining}, streak=${compData.streak}`
    );

    // J. Verify French Lesson 2 is now unlocked!
    const updatedPathRes = await fetch(`${BASE_URL}/api/courses/${frCourse._id}/path`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updatedPathData: any = await updatedPathRes.json();
    const updatedLesson2 = updatedPathData.units?.[0]?.lessons?.[1];

    record(
      'Live API Journey',
      'Progression Unlock Verification',
      updatedLesson2?.isLocked === false,
      `French Lesson 2 "${updatedLesson2?.title}" is now UNLOCKED (isLocked=${updatedLesson2?.isLocked})`
    );

  } catch (err: any) {
    record('Live API Journey', 'API Execution Error', false, err.message);
  }

  // 4. MOBILE CLIENT STATIC CATALOG INSPECTION
  console.log('\n--- 4. Mobile Client Static Catalog Inspection ---');
  const mobileDataPath = path.resolve('backend/src/seed/coursesData.json');
  if (fs.existsSync(mobileDataPath)) {
    const rawMobileCourses = JSON.parse(fs.readFileSync(mobileDataPath, 'utf8'));
    record(
      'Mobile Static Data',
      'Mobile Flagship Course Catalog',
      rawMobileCourses.length >= 10,
      `Static course bundle contains ${rawMobileCourses.length} complete courses`
    );

    const mobileFrench = rawMobileCourses.find((c: any) => c.code === 'fr-en' || c.toLanguage === 'fr');
    if (mobileFrench) {
      const mobileFrenchStr = JSON.stringify(mobileFrench).toLowerCase();
      const hasSpanishLeak = mobileFrenchStr.includes('"buenos días"') || mobileFrenchStr.includes('"hola"');
      record(
        'Mobile Static Data',
        'Mobile French Course Zero Spanish Leakage',
        !hasSpanishLeak,
        `Mobile French course zero Spanish leak: ${!hasSpanishLeak}`
      );
    }
  }

  // AUDIT SUMMARY
  console.log('\n================================================================');
  console.log('                   AUDIT SUMMARY REPORT                         ');
  console.log('================================================================');
  const total = results.length;
  const passed = results.filter((r) => r.status === 'PASSED').length;
  const failed = results.filter((r) => r.status === 'FAILED').length;
  console.log(`Total Checks Executed : ${total}`);
  console.log(`Checks Passed         : ${passed}`);
  console.log(`Checks Failed         : ${failed}`);
  console.log(`Audit Integrity Score : ${Math.round((passed / total) * 100)}%\n`);

  if (failed > 0) {
    console.error('FAILED CHECKS:');
    results.filter((r) => r.status === 'FAILED').forEach((r) => {
      console.error(`- [${r.section}] ${r.check}: ${r.details}`);
    });
  }

  await mongoose.disconnect();
  process.exit(failed > 0 ? 1 : 0);
}

runIndependentAudit().catch((e) => {
  console.error('Fatal audit error:', e);
  process.exit(1);
});
