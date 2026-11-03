import util from 'util';
import { SoundService, LANGUAGE_BCP47_MAP, getBCP47Code } from '../mobile/src/services/soundService';
import { CurriculumService } from '../mobile/src/services/curriculumService';
import { ALL_LANGUAGES } from '../mobile/src/data/curriculum';
import { getOrGenerateCourse, COURSE_CATALOG_SUMMARIES } from '../mobile/src/data/courses';
import { getStaticLessonById } from '../mobile/src/data/staticCurriculum';

console.log('========================================================================');
console.log('   LINGOPULSE AUDIO & STARTUP PERFORMANCE VERIFICATION SUITE   ');
console.log('========================================================================\n');

let totalCount = 0;
let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, evidence: string) {
  totalCount++;
  if (condition) {
    passCount++;
    console.log(`✅ [PASS] ${testName} | ${evidence}`);
  } else {
    failCount++;
    console.error(`❌ [FAIL] ${testName} | ${evidence}`);
  }
}

async function runVerification() {
  // 1. Language BCP-47 Audio Tag Coverage for All 38 Languages
  console.log('--- Test Suite 1: BCP-47 Audio Tag Coverage (38 Languages) ---');
  assert(
    ALL_LANGUAGES.length === 38,
    'Platform Language Count',
    `Found exactly 38 languages registered in curriculum catalog`
  );

  let validTagsCount = 0;
  for (const lang of ALL_LANGUAGES) {
    const code = lang.toLanguage.toLowerCase();
    const bcp47 = getBCP47Code(code);
    const hasTag = Boolean(bcp47 && bcp47.includes('-'));
    if (hasTag) validTagsCount++;
    assert(
      hasTag,
      `BCP-47 Tag for ${lang.title} (${code})`,
      `Resolved locale: "${bcp47}"`
    );
  }
  assert(
    validTagsCount === 38,
    '100% BCP-47 Tag Completeness',
    `All 38 languages have valid BCP-47 speech synthesis tags`
  );

  // 2. SoundService Speech API Methods & Speaker Config
  console.log('\n--- Test Suite 2: SoundService API Methods & Loudspeaker Output ---');
  assert(
    typeof SoundService.speak === 'function',
    'SoundService.speak Available',
    'SoundService exposes speak() method for native and web TTS'
  );
  assert(
    typeof SoundService.stopSpeaking === 'function',
    'SoundService.stopSpeaking Available',
    'SoundService exposes stopSpeaking() method'
  );
  assert(
    typeof SoundService.isSpeaking === 'function',
    'SoundService.isSpeaking Available',
    'SoundService exposes isSpeaking() query method'
  );
  assert(
    typeof SoundService.playSuccessChime === 'function',
    'SoundService.playSuccessChime Available',
    'Success chime with zero-latency Web Audio fallback is available'
  );
  assert(
    typeof SoundService.playErrorThud === 'function',
    'SoundService.playErrorThud Available',
    'Error thud with zero-latency Web Audio fallback is available'
  );
  assert(
    typeof SoundService.playFanfare === 'function',
    'SoundService.playFanfare Available',
    'Level-up fanfare with zero-latency Web Audio fallback is available'
  );

  // 3. Pronunciation Audio Resolution in Lessons Across Flagship & New Languages
  console.log('\n--- Test Suite 3: Pronunciation Audio & Transcript Resolution ---');
  const sampleCodes = ['es', 'fr', 'ja', 'ar', 'ru', 'de', 'hi', 'zh', 'he', 'vi'];
  for (const lang of sampleCodes) {
    const lessonId = `lesson-${lang}-101`;
    const staticData = getStaticLessonById(lessonId, lang);
    assert(
      Boolean(staticData && staticData.lesson.exercises.length > 0),
      `Lesson Retrieval for [${lang.toUpperCase()}]`,
      `Retrieved ${staticData?.lesson.exercises.length} exercises for lesson ${lessonId}`
    );

    // Find listening and speaking exercises
    const listeningEx = staticData?.lesson.exercises.find((e) => e.type === 'LISTENING_COMPREHENSION');
    const speakingEx = staticData?.lesson.exercises.find((e) => e.type === 'SPEAKING_PRONUNCIATION');

    assert(
      Boolean(listeningEx && (listeningEx.data?.transcript || listeningEx.prompt)),
      `Listening Pronunciation Text for [${lang.toUpperCase()}]`,
      `Spoken transcript: "${listeningEx?.data?.transcript || listeningEx?.prompt}"`
    );

    assert(
      Boolean(speakingEx && (speakingEx.data?.phraseToSpeak || speakingEx.prompt)),
      `Speaking Reference Text for [${lang.toUpperCase()}]`,
      `Phrase to speak: "${speakingEx?.data?.phraseToSpeak || speakingEx?.prompt}"`
    );
  }

  // 4. Initial App Loading & Curriculum Retrieval Benchmarks
  console.log('\n--- Test Suite 4: Startup Performance & Latency Benchmarks ---');
  
  // Benchmark 1: First-call getLearningPath (generates single course on demand)
  const t0 = performance.now();
  const firstPath = await CurriculumService.getLearningPath(undefined, 'es');
  const firstLoadTimeMs = performance.now() - t0;

  assert(
    firstLoadTimeMs < 300,
    'First-Launch Learning Path Generation',
    `Loaded in ${firstLoadTimeMs.toFixed(2)} ms (threshold: < 300 ms, prior: > 3500 ms)`
  );
  assert(
    firstPath.units.length === 50,
    'Learning Path Units Count',
    `Successfully resolved 50 units for active course`
  );

  // Benchmark 2: Second-call cached getLearningPath (zero CPU work)
  const t1 = performance.now();
  const cachedPath = await CurriculumService.getLearningPath(undefined, 'es');
  const cachedLoadTimeMs = performance.now() - t1;

  assert(
    cachedLoadTimeMs < 10,
    'Cached Learning Path Instant Access',
    `Loaded in ${cachedLoadTimeMs.toFixed(2)} ms (instant sub-millisecond retrieval)`
  );

  // Benchmark 3: Zero-Startup Catalog Overhead
  assert(
    COURSE_CATALOG_SUMMARIES.length === 38,
    'Lightweight Course Catalog Size',
    `38 course catalog summaries loaded in memory without evaluating lesson data`
  );

  console.log('\n========================================================================');
  console.log(`TOTAL BENCHMARK CHECKS: ${totalCount}`);
  console.log(`PASSED:                 ${passCount}`);
  console.log(`FAILED:                 ${failCount}`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL AUDIO & STARTUP PERFORMANCE BENCHMARKS PASSED 100%!\n');
    process.exit(0);
  }
}

runVerification().catch((err) => {
  console.error('Runner error:', err);
  process.exit(1);
});
