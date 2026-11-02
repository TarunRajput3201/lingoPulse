import * as fs from 'fs';
import * as path from 'path';
import { generateAllCourses } from '../backend/src/services/curriculum';

async function main() {
  console.log('🚀 Running LingoPulse Scalable Curriculum Generation Engine...');
  const startTime = Date.now();

  const courses = generateAllCourses();
  console.log(`Generated ${courses.length} Flagship Language Courses in ${Date.now() - startTime}ms`);

  let totalUnits = 0;
  let totalLessons = 0;
  let totalExercises = 0;

  for (const c of courses) {
    totalUnits += c.units.length;
    let courseExercises = 0;

    if (c.units.length < 50) {
      throw new Error(`Course ${c.code} has ${c.units.length} units, expected at least 50!`);
    }

    for (const u of c.units) {
      if (u.lessons.length !== 5) {
        throw new Error(`Unit ${u.unitNumber} in course ${c.code} has ${u.lessons.length} sections, expected exactly 5!`);
      }
      totalLessons += u.lessons.length;

      for (const s of u.lessons) {
        if (s.exercises.length < 15) {
          throw new Error(
            `Section ${s.lessonNumber} in Unit ${u.unitNumber} (${c.code}) has ${s.exercises.length} questions, expected at least 15!`
          );
        }
        courseExercises += s.exercises.length;
        totalExercises += s.exercises.length;

        // Check pedagogical boundary
        const hasSentenceConst = s.exercises.some((e) => e.type === 'SENTENCE_CONSTRUCTION');
        if (u.unitNumber < 15 && hasSentenceConst) {
          throw new Error(
            `Pedagogical Violation: Unit ${u.unitNumber} (< 15) contains SENTENCE_CONSTRUCTION in ${c.code}!`
          );
        }
      }
    }

    console.log(
      `  ✓ ${c.flagIcon} ${c.title} (${c.code}): ${c.units.length} units, ` +
        `${c.units.reduce((acc, u) => acc + u.lessons.length, 0)} sections, ${courseExercises} questions.`
    );
  }

  console.log('------------------------------------------------------------');
  console.log(`📊 Grand Curriculum Totals:`);
  console.log(`   Courses:   ${courses.length} flagship languages`);
  console.log(`   Units:     ${totalUnits} units (50 per course)`);
  console.log(`   Sections:  ${totalLessons} sections (5 per unit, 250 per course)`);
  console.log(`   Questions: ${totalExercises} varied questions (>= 15 per section, 3,750 per course)`);
  console.log('------------------------------------------------------------');

  // 1. Write backend seed coursesData.json
  const backendSeedPath = path.resolve(__dirname, '../backend/src/seed/coursesData.json');
  console.log(`Writing seed JSON to ${backendSeedPath}...`);
  fs.writeFileSync(backendSeedPath, JSON.stringify(courses, null, 2), 'utf-8');
  console.log(`✅ Successfully wrote backend seed JSON (${(fs.statSync(backendSeedPath).size / 1024 / 1024).toFixed(2)} MB).`);

  // 2. Synchronize to Mobile curriculum directory
  const mobileCurriculumDir = path.resolve(__dirname, '../mobile/src/data/curriculum');
  if (!fs.existsSync(mobileCurriculumDir)) {
    fs.mkdirSync(mobileCurriculumDir, { recursive: true });
  }

  // Copy curriculum engine files to mobile so mobile has offline parity
  const backendCurriculumDir = path.resolve(__dirname, '../backend/src/services/curriculum');
  const filesToCopy = [
    'types.ts',
    'vocabHelper.ts',
    'unitThemes.ts',
    'generator.ts',
    'index.ts',
  ];

  for (const f of filesToCopy) {
    fs.copyFileSync(path.join(backendCurriculumDir, f), path.join(mobileCurriculumDir, f));
  }

  const mobileLangsDir = path.join(mobileCurriculumDir, 'languages');
  if (!fs.existsSync(mobileLangsDir)) {
    fs.mkdirSync(mobileLangsDir, { recursive: true });
  }
  const backendLangsDir = path.join(backendCurriculumDir, 'languages');
  for (const f of fs.readdirSync(backendLangsDir)) {
    fs.copyFileSync(path.join(backendLangsDir, f), path.join(mobileLangsDir, f));
  }
  console.log(`✅ Successfully mirrored Curriculum Engine to mobile/src/data/curriculum.`);
}

main().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
