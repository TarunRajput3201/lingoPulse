import util from 'util';
import {
  getAllCourses,
  getCourseByCode,
  getCourseByLanguage,
  COURSE_CATALOG_SUMMARIES,
} from '../mobile/src/data/courses';
import {
  getStaticLessonById,
  validateLocalAnswer,
  StaticExercise,
} from '../mobile/src/data/staticCurriculum';

console.log('====================================================');
console.log('   LINGOPULSE COMPLETE MOBILE LEARNING JOURNEY TEST  ');
console.log('====================================================');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`❌ FAILED: ${msg}`);
  }
}

// 1. Verify No Hermes Proxies in Course Data
console.log('\n--- Test Suite 1: Hermes Proxy Safety ---');
const allCourses = getAllCourses();
assert(Array.isArray(allCourses), 'getAllCourses returns an array');
assert(allCourses.length === 10, `Found 10 courses, got ${allCourses.length}`);

for (const course of allCourses) {
  const isProxy = util.types.isProxy(course);
  assert(!isProxy, `Course ${course.id} must NOT be a Proxy`);
  assert(!util.types.isProxy(course.units), `Units for ${course.id} must NOT be a Proxy`);
}

// 2. Verify Lesson Retrieval Across All 10 Courses & 50 Units
console.log('\n--- Test Suite 2: Lesson Retrieval & Traversal ---');
for (const course of allCourses) {
  // Test unit 1 lesson 1 (Easy)
  const firstLessonId = course.units[0]?.lessons[0]?.id;
  assert(Boolean(firstLessonId), `Course ${course.title} has valid first lesson`);
  if (firstLessonId) {
    const fetched = getStaticLessonById(firstLessonId);
    assert(Boolean(fetched), `Successfully resolved lesson ${firstLessonId}`);
    assert(fetched?.lesson.exercises.length >= 15, `Lesson ${firstLessonId} has >= 15 exercises`);
  }

  // Test unit 25 lesson 3 (Hard)
  const midUnit = course.units[24];
  assert(Boolean(midUnit), `Course ${course.title} has Unit 25`);
  if (midUnit && midUnit.lessons.length > 0) {
    const midLessonId = midUnit.lessons[0].id;
    const fetchedMid = getStaticLessonById(midLessonId);
    assert(Boolean(fetchedMid), `Successfully resolved mid-course lesson ${midLessonId}`);
  }

  // Test unit 50 lesson 5 (Capstone)
  const lastUnit = course.units[course.units.length - 1];
  assert(Boolean(lastUnit), `Course ${course.title} has Unit 50`);
  if (lastUnit && lastUnit.lessons.length > 0) {
    const lastLessonId = lastUnit.lessons[lastUnit.lessons.length - 1].id;
    const fetchedLast = getStaticLessonById(lastLessonId);
    assert(Boolean(fetchedLast), `Successfully resolved capstone lesson ${lastLessonId}`);
  }
}

// 3. Comprehensive Question Type & Answer Scenario Testing
console.log('\n--- Test Suite 3: Question Types & Validation Robustness ---');

const testCases: { name: string; exercise: StaticExercise; goodAnswer: any; badAnswer: any }[] = [
  {
    name: 'MULTIPLE_CHOICE with option ID',
    exercise: {
      id: 'mc-1',
      lessonId: 'l-1',
      type: 'MULTIPLE_CHOICE',
      prompt: 'Select the translation for "Bonjour"',
      instruction: 'Choose the correct option',
      order: 1,
      explanation: '"Bonjour" means "Hello".',
      data: {
        correctOptionId: 'opt-2',
        options: [
          { id: 'opt-1', text: 'Goodbye' },
          { id: 'opt-2', text: 'Hello' },
          { id: 'opt-3', text: 'Thanks' },
        ],
      },
    },
    goodAnswer: 'opt-2',
    badAnswer: 'opt-1',
  },
  {
    name: 'MULTIPLE_CHOICE with option text',
    exercise: {
      id: 'mc-2',
      lessonId: 'l-1',
      type: 'MULTIPLE_CHOICE',
      prompt: 'Select the translation',
      instruction: 'Select',
      order: 2,
      explanation: 'Correct',
      data: {
        correctOptionId: 'opt-2',
        options: [
          { id: 'opt-1', text: 'Adios' },
          { id: 'opt-2', text: 'Hola' },
        ],
      },
    },
    goodAnswer: 'Hola',
    badAnswer: 'Adios',
  },
  {
    name: 'IMAGE_SELECT exercise',
    exercise: {
      id: 'img-1',
      lessonId: 'l-1',
      type: 'IMAGE_SELECT',
      prompt: 'Which of these is the apple?',
      instruction: 'Select image',
      order: 3,
      explanation: 'Pomme means apple',
      data: {
        correctOptionId: 'opt-apple',
        options: [
          { id: 'opt-apple', text: 'la pomme' },
          { id: 'opt-bread', text: 'le pain' },
        ],
      },
    },
    goodAnswer: 'opt-apple',
    badAnswer: 'opt-bread',
  },
  {
    name: 'TRANSLATION with accent-insensitive tolerance',
    exercise: {
      id: 'trans-1',
      lessonId: 'l-1',
      type: 'TRANSLATION',
      prompt: 'Translate "The boy"',
      instruction: 'Translate',
      order: 4,
      explanation: '"El niño" or "El nino"',
      data: {
        acceptableAnswers: ['El niño', 'el nino'],
      },
    },
    goodAnswer: 'El nino', // missing tilde - should pass
    badAnswer: 'La niña',
  },
  {
    name: 'WORD_ORDER with array input',
    exercise: {
      id: 'wo-1',
      lessonId: 'l-1',
      type: 'WORD_ORDER',
      prompt: 'Reorder the words',
      instruction: 'Arrange',
      order: 5,
      explanation: 'Correct order: Je suis un garçon',
      data: {
        correctOrder: ['Je', 'suis', 'un', 'garçon'],
        fullSentence: 'Je suis un garçon',
      },
    },
    goodAnswer: ['Je', 'suis', 'un', 'garcon'], // array with accent normalization
    badAnswer: ['garcon', 'un', 'suis', 'Je'],
  },
  {
    name: 'FILL_IN_THE_BLANK with case normalization',
    exercise: {
      id: 'fitb-1',
      lessonId: 'l-1',
      type: 'FILL_IN_THE_BLANK',
      prompt: 'Fill in the missing word',
      instruction: 'Complete the sentence',
      order: 6,
      explanation: 'Guten Morgen means Good morning',
      data: {
        sentenceWithBlank: 'Guten ____, wie geht es dir?',
        acceptableAnswers: ['Morgen', 'morgen'],
      },
    },
    goodAnswer: 'morgen',
    badAnswer: 'Abend',
  },
  {
    name: 'MATCHING_PAIRS with pair arrays',
    exercise: {
      id: 'match-1',
      lessonId: 'l-1',
      type: 'MATCHING_PAIRS',
      prompt: 'Match the words',
      instruction: 'Match pairs',
      order: 7,
      explanation: 'Pairs matched',
      data: {
        pairs: [
          { id: 'p1', leftText: 'cat', rightText: 'gato' },
          { id: 'p2', leftText: 'dog', rightText: 'perro' },
        ],
      },
    },
    goodAnswer: [
      { leftId: 'cat', rightId: 'gato' },
      { leftId: 'dog', rightId: 'perro' },
    ],
    badAnswer: [
      { leftId: 'cat', rightId: 'perro' },
      { leftId: 'dog', rightId: 'gato' },
    ],
  },
  {
    name: 'LISTENING_COMPREHENSION with option ID',
    exercise: {
      id: 'list-1',
      lessonId: 'l-1',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Listen and select what you hear',
      instruction: 'Select option',
      order: 8,
      explanation: 'Audio was "Grazie"',
      data: {
        correctOptionId: 'opt-grazie',
        options: [
          { id: 'opt-grazie', text: 'Grazie' },
          { id: 'opt-prego', text: 'Prego' },
        ],
      },
    },
    goodAnswer: 'opt-grazie',
    badAnswer: 'opt-prego',
  },
  {
    name: 'TRUE_FALSE exercise',
    exercise: {
      id: 'tf-1',
      lessonId: 'l-1',
      type: 'TRUE_FALSE',
      prompt: '"Merci" means "Thank you"',
      instruction: 'True or False',
      order: 9,
      explanation: '"Merci" translates to "Thank you"',
      data: {
        isTrue: true,
      },
    },
    goodAnswer: true,
    badAnswer: false,
  },
  {
    name: 'SENTENCE_CONSTRUCTION with word array',
    exercise: {
      id: 'sc-1',
      lessonId: 'l-1',
      type: 'SENTENCE_CONSTRUCTION',
      prompt: 'Construct the sentence',
      instruction: 'Assemble',
      order: 10,
      explanation: 'Sentence is: Ella come una manzana',
      data: {
        correctSentence: ['Ella', 'come', 'una', 'manzana'],
        fullSentence: 'Ella come una manzana',
      },
    },
    goodAnswer: ['Ella', 'come', 'una', 'manzana'],
    badAnswer: ['manzana', 'come', 'Ella'],
  },
];

for (const tc of testCases) {
  // Correct answer test
  const resGood = validateLocalAnswer(tc.exercise, tc.goodAnswer);
  assert(resGood.isCorrect === true, `[${tc.name}] Correct answer validated as true`);

  // Incorrect answer test
  const resBad = validateLocalAnswer(tc.exercise, tc.badAnswer);
  assert(resBad.isCorrect === false, `[${tc.name}] Incorrect answer validated as false`);

  // Edge cases: null, undefined, empty string, unexpected object
  const resNull = validateLocalAnswer(tc.exercise, null);
  assert(resNull.isCorrect === false, `[${tc.name}] Null answer safely returns false`);

  const resUndef = validateLocalAnswer(tc.exercise, undefined);
  assert(resUndef.isCorrect === false, `[${tc.name}] Undefined answer safely returns false`);

  const resEmpty = validateLocalAnswer(tc.exercise, '');
  assert(resEmpty.isCorrect === false, `[${tc.name}] Empty answer safely returns false`);

  const resObj = validateLocalAnswer(tc.exercise, { foo: 'bar' });
  assert(typeof resObj.isCorrect === 'boolean', `[${tc.name}] Malformed object input handled safely`);
}

// 4. Malformed Exercise Defense
console.log('\n--- Test Suite 4: Malformed Exercise Defense ---');
const malformedExercises: any[] = [
  { id: 'm-1', type: 'MULTIPLE_CHOICE' }, // missing data
  { id: 'm-2', type: 'TRANSLATION', data: {} }, // missing acceptableAnswers
  { id: 'm-3', type: 'WORD_ORDER', data: {} }, // missing correctOrder / fullSentence
  { id: 'm-4', type: 'SENTENCE_CONSTRUCTION', data: {} }, // missing correctSentence
  { id: 'm-5', type: 'MATCHING_PAIRS', data: {} }, // missing pairs
  { id: 'm-6', type: 'LISTENING_COMPREHENSION', data: {} }, // missing correctOptionId
  { id: 'm-7', type: 'TRUE_FALSE', data: {} }, // missing isTrue
];

for (const m of malformedExercises) {
  try {
    const res = validateLocalAnswer(m, 'sample answer');
    assert(typeof res.isCorrect === 'boolean', `Malformed exercise ${m.type} did not throw`);
  } catch (err: any) {
    assert(false, `Malformed exercise ${m.type} threw error: ${err.message}`);
  }
}

// 5. Audit all actual exercises across 5 sample units in all 10 courses
console.log('\n--- Test Suite 5: Live Curriculum Answer Submission Sweep ---');
let auditedLiveExercises = 0;
for (const course of allCourses) {
  for (let uIdx = 0; uIdx < 5; uIdx++) {
    const unit = course.units[uIdx];
    if (!unit) continue;
    for (const lesson of unit.lessons) {
      for (const ex of lesson.exercises) {
        auditedLiveExercises++;
        // Test with empty/dummy answer - should never throw
        try {
          const res = validateLocalAnswer(ex, '');
          if (typeof res.isCorrect !== 'boolean') {
            assert(false, `Exercise ${ex.id} returned invalid result`);
          }
        } catch (e: any) {
          assert(false, `Exercise ${ex.id} threw on submission: ${e.message}`);
        }
      }
    }
  }
}
assert(auditedLiveExercises > 3000, `Audited ${auditedLiveExercises} real curriculum exercises without exception`);

console.log('\n====================================================');
console.log(`TOTAL TESTS:  ${totalTests}`);
console.log(`PASSED:       ${passedTests}`);
console.log(`FAILED:       ${failedTests}`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL MOBILE LEARNING JOURNEY TESTS PASSED CLEANLY!\n');
  process.exit(0);
}
