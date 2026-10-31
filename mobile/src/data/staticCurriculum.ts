// ============================================================================
// LingoPulse - Built-in Static Curriculum
// Contains all offline courses, units, lessons, exercises, and achievements.
// ============================================================================

export interface ExerciseOption {
  id: string;
  text: string;
  translation?: string;
}

export interface MatchingPair {
  id: string;
  leftText: string;
  rightText: string;
}

export interface ExerciseData {
  correctOptionId?: string;
  options?: (ExerciseOption | string | any)[];
  acceptableAnswers?: string[];
  sentenceWithBlank?: string;
  scrambledWords?: string[];
  correctOrder?: string[];
  fullSentence?: string;
  statement?: string;
  isTrue?: boolean;
  transcript?: string;
  phraseToSpeak?: string;
  phoneticGuide?: string;
  sourcePrompt?: string;
  wordBank?: string[];
  correctSentence?: string[];
  acceptableSentences?: string[];
  pairs?: MatchingPair[];
}

export interface StaticExercise {
  id: string;
  lessonId: string;
  type:
    | 'MULTIPLE_CHOICE'
    | 'TRANSLATION'
    | 'WORD_ORDER'
    | 'FILL_IN_THE_BLANK'
    | 'MATCHING_PAIRS'
    | 'LISTENING_COMPREHENSION'
    | 'SPEAKING_PRONUNCIATION'
    | 'TRUE_FALSE'
    | 'SENTENCE_CONSTRUCTION';
  prompt: string;
  instruction: string;
  audioUrl?: string;
  imageUrl?: string;
  order: number;
  hint?: string;
  explanation: string;
  data: ExerciseData;
}

export interface StaticLesson {
  id: string;
  unitId: string;
  lessonNumber: number;
  title: string;
  type: 'standard' | 'checkpoint' | 'review';
  xpReward: number;
  order: number;
  status: 'published';
  exercises: StaticExercise[];
}

export interface StaticUnit {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  description: string;
  themeColor: string;
  icon: string;
  status: 'published';
  lessons: StaticLesson[];
}

export interface StaticCourse {
  _id: string;
  id: string;
  code: string;
  title: string;
  description: string;
  fromLanguage: string;
  toLanguage: string;
  flagIcon: string;
  status: 'published';
  order: number;
  totalUnits: number;
  totalLessons: number;
  units: StaticUnit[];
}

export interface StaticAchievement {
  id: string;
  code: string;
  title: string;
  description: string;
  iconName: string;
  tier: number;
  targetCount: number;
  xpReward: number;
}

// ----------------------------------------------------------------------------
// 1. Achievements
// ----------------------------------------------------------------------------
export const STATIC_ACHIEVEMENTS: StaticAchievement[] = [
  {
    id: 'ach-1',
    code: 'FIRST_LESSON',
    title: 'First Step',
    description: 'Complete your very first lesson',
    iconName: 'footprints',
    tier: 1,
    targetCount: 1,
    xpReward: 20,
  },
  {
    id: 'ach-2',
    code: 'STREAK_3',
    title: 'Consistency',
    description: 'Maintain a 3-day learning streak',
    iconName: 'flame',
    tier: 1,
    targetCount: 3,
    xpReward: 50,
  },
  {
    id: 'ach-3',
    code: 'STREAK_7',
    title: 'Unstoppable',
    description: 'Reach a 7-day learning streak',
    iconName: 'zap',
    tier: 2,
    targetCount: 7,
    xpReward: 100,
  },
  {
    id: 'ach-4',
    code: 'XP_100',
    title: 'Century Club',
    description: 'Earn 100 total XP',
    iconName: 'sparkles',
    tier: 1,
    targetCount: 100,
    xpReward: 30,
  },
  {
    id: 'ach-5',
    code: 'XP_500',
    title: 'Master Scholar',
    description: 'Earn 500 total XP',
    iconName: 'crown',
    tier: 2,
    targetCount: 500,
    xpReward: 150,
  },
  {
    id: 'ach-6',
    code: 'PERFECT_ACCURACY',
    title: 'Flawless Mind',
    description: 'Complete a lesson with 100% accuracy',
    iconName: 'target',
    tier: 1,
    targetCount: 1,
    xpReward: 40,
  },
];

// ----------------------------------------------------------------------------
// 2. Spanish Course (es-en)
// ----------------------------------------------------------------------------
const SPANISH_COURSE: StaticCourse = {
  _id: 'course-es-en',
  id: 'course-es-en',
  code: 'es-en',
  title: 'Spanish Essentials',
  description: 'Learn conversational Spanish from day one with interactive bite-sized lessons.',
  fromLanguage: 'en',
  toLanguage: 'es',
  flagIcon: '🇪🇸',
  status: 'published',
  order: 1,
  totalUnits: 2,
  totalLessons: 5,
  units: [
    {
      id: 'unit-es-1',
      courseId: 'course-es-en',
      unitNumber: 1,
      title: 'Unit 1: Greetings & Basics',
      description: 'Say hello, introduce yourself, and order basic drinks.',
      themeColor: '#059669',
      icon: 'sparkles',
      status: 'published',
      lessons: [
        {
          id: 'es-lesson-1',
          unitId: 'unit-es-1',
          lessonNumber: 1,
          title: 'Basic Greetings',
          type: 'standard',
          xpReward: 15,
          order: 1,
          status: 'published',
          exercises: [
            {
              id: 'es-ex-101',
              lessonId: 'es-lesson-1',
              type: 'MULTIPLE_CHOICE',
              prompt: 'How do you say "Hello" in Spanish?',
              instruction: 'Select the correct translation',
              order: 1,
              explanation: '"Hola" is the universal greeting for "Hello" in Spanish.',
              hint: 'It starts with an "H" which is silent in Spanish.',
              data: {
                correctOptionId: 'opt-1',
                options: [
                  { id: 'opt-1', text: 'Hola', translation: 'Hello' },
                  { id: 'opt-2', text: 'Adiós', translation: 'Goodbye' },
                  { id: 'opt-3', text: 'Gracias', translation: 'Thank you' },
                  { id: 'opt-4', text: 'Por favor', translation: 'Please' },
                ],
              },
            },
            {
              id: 'es-ex-102',
              lessonId: 'es-lesson-1',
              type: 'TRANSLATION',
              prompt: 'Translate to Spanish: "Good morning"',
              instruction: 'Type the Spanish translation below',
              order: 2,
              explanation: '"Buenos días" translates directly to "Good day" or "Good morning". Note the accent mark on "días".',
              hint: 'Starts with "Buenos..."',
              data: {
                acceptableAnswers: [
                  'Buenos días',
                  'buenos días',
                  'Buenos dias',
                  'buenos dias',
                  'Buenos días.',
                ],
              },
            },
            {
              id: 'es-ex-103',
              lessonId: 'es-lesson-1',
              type: 'WORD_ORDER',
              prompt: 'Assemble: "Nice to meet you"',
              instruction: 'Tap the words in the correct order',
              order: 3,
              explanation: '"Mucho gusto" means "Much pleasure" or "Nice to meet you".',
              data: {
                scrambledWords: ['gusto', 'Hola', 'Mucho', 'tarde'],
                correctOrder: ['Mucho', 'gusto'],
                fullSentence: 'Mucho gusto',
              },
            },
            {
              id: 'es-ex-104',
              lessonId: 'es-lesson-1',
              type: 'FILL_IN_THE_BLANK',
              prompt: 'Complete the greeting: "¿___ estás?" (How are you?)',
              instruction: 'Select or type the missing word',
              order: 4,
              explanation: '"¿Cómo estás?" is used when speaking casually to friends.',
              hint: 'Sounds like "Koh-moh"',
              data: {
                sentenceWithBlank: '¿___ estás?',
                acceptableAnswers: ['Cómo', 'cómo', 'Como', 'como'],
                options: ['Cómo', 'Dónde', 'Cuándo', 'Qué'],
              },
            },
            {
              id: 'es-ex-105',
              lessonId: 'es-lesson-1',
              type: 'TRUE_FALSE',
              prompt: 'Does "Adiós" mean "Goodbye"?',
              instruction: 'Select True or False',
              order: 5,
              explanation: '"Adiós" is the standard farewell meaning "Goodbye".',
              data: {
                statement: '"Adiós" means "Goodbye" in Spanish.',
                isTrue: true,
              },
            },
          ],
        },
        {
          id: 'es-lesson-2',
          unitId: 'unit-es-1',
          lessonNumber: 2,
          title: 'Food & Drinks',
          type: 'standard',
          xpReward: 15,
          order: 2,
          status: 'published',
          exercises: [
            {
              id: 'es-ex-201',
              lessonId: 'es-lesson-2',
              type: 'MULTIPLE_CHOICE',
              prompt: 'Which word means "Water"?',
              instruction: 'Select the correct option',
              order: 1,
              explanation: '"El agua" is water in Spanish.',
              data: {
                correctOptionId: 'water-opt-2',
                options: [
                  { id: 'water-opt-1', text: 'El café', translation: 'The coffee' },
                  { id: 'water-opt-2', text: 'El agua', translation: 'The water' },
                  { id: 'water-opt-3', text: 'La leche', translation: 'The milk' },
                ],
              },
            },
            {
              id: 'es-ex-202',
              lessonId: 'es-lesson-2',
              type: 'SENTENCE_CONSTRUCTION',
              prompt: 'Translate: "I want a coffee, please"',
              instruction: 'Construct the sentence from the word bank',
              order: 2,
              explanation: '"Yo quiero un café, por favor" is the polite way to order coffee.',
              data: {
                sourcePrompt: 'I want a coffee, please',
                wordBank: ['un', 'Yo', 'bebe', 'café', 'quiero', 'pan', 'por', 'favor'],
                correctSentence: ['Yo', 'quiero', 'un', 'café', 'por', 'favor'],
              },
            },
            {
              id: 'es-ex-203',
              lessonId: 'es-lesson-2',
              type: 'MATCHING_PAIRS',
              prompt: 'Match the English and Spanish pairs',
              instruction: 'Tap a word on the left then its match on the right',
              order: 3,
              explanation: 'Great job matching all vocabulary pairs!',
              data: {
                pairs: [
                  { id: 'p1', leftText: 'Water', rightText: 'Agua' },
                  { id: 'p2', leftText: 'Bread', rightText: 'Pan' },
                  { id: 'p3', leftText: 'Milk', rightText: 'Leche' },
                  { id: 'p4', leftText: 'Apple', rightText: 'Manzana' },
                ],
              },
            },
            {
              id: 'es-ex-204',
              lessonId: 'es-lesson-2',
              type: 'FILL_IN_THE_BLANK',
              prompt: 'Fill the blank: "Yo ___ una manzana." (I eat an apple)',
              instruction: 'Type the verb form for "I eat"',
              order: 4,
              explanation: '"Como" comes from the verb "comer" (to eat) for the first-person singular "Yo" (I).',
              data: {
                sentenceWithBlank: 'Yo ___ una manzana.',
                acceptableAnswers: ['como', 'Como'],
              },
            },
            {
              id: 'es-ex-205',
              lessonId: 'es-lesson-2',
              type: 'TRANSLATION',
              prompt: 'Translate: "A bread and a coffee"',
              instruction: 'Type the Spanish translation',
              order: 5,
              explanation: '"Un pan y un café". Notice the masculine indefinite article "un".',
              hint: 'Starts with "Un pan..."',
              data: {
                acceptableAnswers: [
                  'Un pan y un café',
                  'un pan y un café',
                  'Un pan y un cafe',
                  'un pan y un cafe',
                ],
              },
            },
          ],
        },
        {
          id: 'es-lesson-3',
          unitId: 'unit-es-1',
          lessonNumber: 3,
          title: 'Checkpoint 1: Greetings & Food',
          type: 'checkpoint',
          xpReward: 25,
          order: 3,
          status: 'published',
          exercises: [
            {
              id: 'es-ex-301',
              lessonId: 'es-lesson-3',
              type: 'LISTENING_COMPREHENSION',
              prompt: 'Listen to the audio clip and select what was spoken',
              instruction: 'Tap the audio button to listen carefully',
              order: 1,
              explanation: 'The spoken phrase is "Buenos días, mucho gusto."',
              data: {
                transcript: 'Buenos días, mucho gusto.',
                correctOptionId: 'listen-1',
                options: [
                  { id: 'listen-1', text: 'Buenos días, mucho gusto.' },
                  { id: 'listen-2', text: 'Buenas noches, adiós.' },
                  { id: 'listen-3', text: 'Por favor, un café.' },
                ],
              },
            },
            {
              id: 'es-ex-302',
              lessonId: 'es-lesson-3',
              type: 'SPEAKING_PRONUNCIATION',
              prompt: 'Speak this phrase clearly: "Por favor"',
              instruction: 'Tap the mic and say "Por favor"',
              order: 2,
              explanation: 'Pronounced as "por fah-VOR".',
              data: {
                phraseToSpeak: 'Por favor',
                phoneticGuide: 'por fah-VOR',
              },
            },
            {
              id: 'es-ex-303',
              lessonId: 'es-lesson-3',
              type: 'MULTIPLE_CHOICE',
              prompt: 'How do you say "Thank you very much" in Spanish?',
              instruction: 'Select the best phrase',
              order: 3,
              explanation: '"Muchas gracias" means "Many thanks" or "Thank you very much".',
              data: {
                correctOptionId: 'mc-thanks-1',
                options: [
                  { id: 'mc-thanks-1', text: 'Muchas gracias', translation: 'Thank you very much' },
                  { id: 'mc-thanks-2', text: 'De nada', translation: "You're welcome" },
                  { id: 'mc-thanks-3', text: 'Buenas tardes', translation: 'Good afternoon' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: 'unit-es-2',
      courseId: 'course-es-en',
      unitNumber: 2,
      title: 'Unit 2: Travel & Directions',
      description: 'Ask for directions, buy transit tickets, and navigate cities.',
      themeColor: '#2563EB',
      icon: 'compass',
      status: 'published',
      lessons: [
        {
          id: 'es-lesson-4',
          unitId: 'unit-es-2',
          lessonNumber: 4,
          title: 'Where is the Train?',
          type: 'standard',
          xpReward: 15,
          order: 4,
          status: 'published',
          exercises: [
            {
              id: 'es-ex-401',
              lessonId: 'es-lesson-4',
              type: 'MULTIPLE_CHOICE',
              prompt: 'What does "¿Dónde está el tren?" mean?',
              instruction: 'Select the English meaning',
              order: 1,
              explanation: '"¿Dónde está...?" means "Where is...?"',
              data: {
                correctOptionId: 'opt-train-1',
                options: [
                  { id: 'opt-train-1', text: 'Where is the train?' },
                  { id: 'opt-train-2', text: 'When is the train leaving?' },
                  { id: 'opt-train-3', text: 'Here is the train ticket' },
                ],
              },
            },
            {
              id: 'es-ex-402',
              lessonId: 'es-lesson-4',
              type: 'TRANSLATION',
              prompt: 'Translate: "The ticket, please"',
              instruction: 'Type in Spanish',
              order: 2,
              explanation: '"El boleto, por favor" or "El billete, por favor". Both are widely accepted.',
              data: {
                acceptableAnswers: [
                  'El boleto, por favor',
                  'el boleto por favor',
                  'el billete por favor',
                  'El billete, por favor',
                  'El boleto por favor',
                  'El billete por favor',
                ],
              },
            },
            {
              id: 'es-ex-403',
              lessonId: 'es-lesson-4',
              type: 'WORD_ORDER',
              prompt: 'Assemble: "The train station"',
              instruction: 'Put the words in correct Spanish order',
              order: 3,
              explanation: 'In Spanish, noun phrases are ordered "La estación de tren".',
              data: {
                scrambledWords: ['de', 'tren', 'La', 'estación', 'boleto'],
                correctOrder: ['La', 'estación', 'de', 'tren'],
                fullSentence: 'La estación de tren',
              },
            },
            {
              id: 'es-ex-404',
              lessonId: 'es-lesson-4',
              type: 'FILL_IN_THE_BLANK',
              prompt: 'Complete: "¿Dónde ___ la estación?"',
              instruction: 'Type the verb "está"',
              order: 4,
              explanation: '"Está" (from "estar") expresses physical location.',
              data: {
                sentenceWithBlank: '¿Dónde ___ la estación?',
                acceptableAnswers: ['está', 'esta', 'Está', 'Esta'],
              },
            },
            {
              id: 'es-ex-405',
              lessonId: 'es-lesson-4',
              type: 'TRUE_FALSE',
              prompt: 'Does "A la derecha" mean "To the right"?',
              instruction: 'Select True or False',
              order: 5,
              explanation: '"A la derecha" means to the right, and "A la izquierda" means to the left.',
              data: {
                statement: '"A la derecha" means "To the right".',
                isTrue: true,
              },
            },
          ],
        },
        {
          id: 'es-lesson-5',
          unitId: 'unit-es-2',
          lessonNumber: 5,
          title: 'Checkpoint 2: City Navigation',
          type: 'checkpoint',
          xpReward: 25,
          order: 5,
          status: 'published',
          exercises: [
            {
              id: 'es-ex-501',
              lessonId: 'es-lesson-5',
              type: 'SENTENCE_CONSTRUCTION',
              prompt: 'Translate: "Where is the station?"',
              instruction: 'Construct the sentence from the word bank',
              order: 1,
              explanation: '"¿Dónde está la estación?" asks for the location of the station.',
              data: {
                sourcePrompt: 'Where is the station?',
                wordBank: ['¿Dónde', 'está', 'tren', 'la', 'estación?', 'boleto'],
                correctSentence: ['¿Dónde', 'está', 'la', 'estación?'],
                acceptableSentences: [
                  '¿Dónde está la estación?',
                  'Dónde está la estación',
                  'donde esta la estacion',
                ],
              },
            },
            {
              id: 'es-ex-502',
              lessonId: 'es-lesson-5',
              type: 'SPEAKING_PRONUNCIATION',
              prompt: 'Speak this question: "¿Dónde está el tren?"',
              instruction: 'Tap the mic and speak clearly',
              order: 2,
              explanation: 'Pronounced: "DOHN-deh ehs-TAH ehl trehn".',
              data: {
                phraseToSpeak: '¿Dónde está el tren?',
                phoneticGuide: 'DOHN-deh ehs-TAH ehl trehn',
              },
            },
            {
              id: 'es-ex-503',
              lessonId: 'es-lesson-5',
              type: 'MATCHING_PAIRS',
              prompt: 'Match navigation directions',
              instruction: 'Tap matching pairs',
              order: 3,
              explanation: 'Great job learning directional vocabulary!',
              data: {
                pairs: [
                  { id: 'dir1', leftText: 'Left', rightText: 'Izquierda' },
                  { id: 'dir2', leftText: 'Right', rightText: 'Derecha' },
                  { id: 'dir3', leftText: 'Station', rightText: 'Estación' },
                  { id: 'dir4', leftText: 'Street', rightText: 'Calle' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

// ----------------------------------------------------------------------------
// 3. French Course (fr-en)
// ----------------------------------------------------------------------------
const FRENCH_COURSE: StaticCourse = {
  _id: 'course-fr-en',
  id: 'course-fr-en',
  code: 'fr-en',
  title: 'French Foundations',
  description: 'Master French pronunciation, everyday vocabulary, and travel grammar.',
  fromLanguage: 'en',
  toLanguage: 'fr',
  flagIcon: '🇫🇷',
  status: 'published',
  order: 2,
  totalUnits: 1,
  totalLessons: 2,
  units: [
    {
      id: 'unit-fr-1',
      courseId: 'course-fr-en',
      unitNumber: 1,
      title: 'Unit 1: Salutations & Café',
      description: 'Greet people politely and order delicious food in Paris.',
      themeColor: '#EF4444',
      icon: 'coffee',
      status: 'published',
      lessons: [
        {
          id: 'fr-lesson-1',
          unitId: 'unit-fr-1',
          lessonNumber: 1,
          title: 'French Greetings & Courtesy',
          type: 'standard',
          xpReward: 15,
          order: 1,
          status: 'published',
          exercises: [
            {
              id: 'fr-ex-101',
              lessonId: 'fr-lesson-1',
              type: 'MULTIPLE_CHOICE',
              prompt: 'How do you say "Hello" or "Good day" in French?',
              instruction: 'Select the polite greeting',
              order: 1,
              explanation: '"Bonjour" is the standard, polite greeting for "Hello" and "Good day".',
              hint: 'Literally means "good day".',
              data: {
                correctOptionId: 'fr-mc-1',
                options: [
                  { id: 'fr-mc-1', text: 'Bonjour', translation: 'Hello / Good day' },
                  { id: 'fr-mc-2', text: 'Bonsoir', translation: 'Good evening' },
                  { id: 'fr-mc-3', text: 'Merci', translation: 'Thank you' },
                  { id: 'fr-mc-4', text: 'Au revoir', translation: 'Goodbye' },
                ],
              },
            },
            {
              id: 'fr-ex-102',
              lessonId: 'fr-lesson-1',
              type: 'TRANSLATION',
              prompt: 'Translate: "Thank you very much"',
              instruction: 'Type in French',
              order: 2,
              explanation: '"Merci beaucoup" expresses hearty gratitude.',
              hint: 'Starts with "Merci..."',
              data: {
                acceptableAnswers: [
                  'Merci beaucoup',
                  'merci beaucoup',
                  'Merci beaucoup.',
                  'merci beaucoup.',
                ],
              },
            },
            {
              id: 'fr-ex-103',
              lessonId: 'fr-lesson-1',
              type: 'MATCHING_PAIRS',
              prompt: 'Match French greetings to English',
              instruction: 'Match each French word with its English translation',
              order: 3,
              explanation: 'Essential French politeness words mastered!',
              data: {
                pairs: [
                  { id: 'fr-p1', leftText: 'Hello', rightText: 'Bonjour' },
                  { id: 'fr-p2', leftText: 'Goodbye', rightText: 'Au revoir' },
                  { id: 'fr-p3', leftText: 'Please', rightText: "S'il vous plaît" },
                  { id: 'fr-p4', leftText: 'Thank you', rightText: 'Merci' },
                ],
              },
            },
            {
              id: 'fr-ex-104',
              lessonId: 'fr-lesson-1',
              type: 'TRUE_FALSE',
              prompt: 'Does "Bonsoir" mean "Good evening"?',
              instruction: 'Select True or False',
              order: 4,
              explanation: '"Bonsoir" is used to greet people in the late afternoon and evening.',
              data: {
                statement: '"Bonsoir" means "Good evening" in French.',
                isTrue: true,
              },
            },
            {
              id: 'fr-ex-105',
              lessonId: 'fr-lesson-1',
              type: 'FILL_IN_THE_BLANK',
              prompt: 'Complete: "___, comment allez-vous ?" (Hello, how are you?)',
              instruction: 'Type the greeting',
              order: 5,
              explanation: '"Bonjour" opens polite formal conversations.',
              data: {
                sentenceWithBlank: '___, comment allez-vous ?',
                acceptableAnswers: ['Bonjour', 'bonjour'],
              },
            },
          ],
        },
        {
          id: 'fr-lesson-2',
          unitId: 'unit-fr-1',
          lessonNumber: 2,
          title: 'Checkpoint: First Café Encounter',
          type: 'checkpoint',
          xpReward: 25,
          order: 2,
          status: 'published',
          exercises: [
            {
              id: 'fr-ex-201',
              lessonId: 'fr-lesson-2',
              type: 'WORD_ORDER',
              prompt: 'Assemble: "A coffee, please"',
              instruction: 'Tap words in the correct order',
              order: 1,
              explanation: '"Un café, s\'il vous plaît" is the quintessential French order.',
              data: {
                scrambledWords: ['Un', 'croissant', 'café,', "s'il", 'vous', 'plaît'],
                correctOrder: ['Un', 'café,', "s'il", 'vous', 'plaît'],
                fullSentence: "Un café, s'il vous plaît",
              },
            },
            {
              id: 'fr-ex-202',
              lessonId: 'fr-lesson-2',
              type: 'SPEAKING_PRONUNCIATION',
              prompt: 'Speak this courtesy phrase: "Merci beaucoup"',
              instruction: 'Tap the mic and say "Merci beaucoup"',
              order: 2,
              explanation: 'Pronounced: "mair-SEE boh-KOO".',
              data: {
                phraseToSpeak: 'Merci beaucoup',
                phoneticGuide: 'mair-SEE boh-KOO',
              },
            },
            {
              id: 'fr-ex-203',
              lessonId: 'fr-lesson-2',
              type: 'LISTENING_COMPREHENSION',
              prompt: 'Listen to the barista greeting',
              instruction: 'Select the spoken sentence',
              order: 3,
              explanation: 'The barista says: "Bonjour, un café s\'il vous plaît."',
              data: {
                transcript: "Bonjour, un café s'il vous plaît.",
                correctOptionId: 'fr-listen-1',
                options: [
                  { id: 'fr-listen-1', text: "Bonjour, un café s'il vous plaît." },
                  { id: 'fr-listen-2', text: 'Bonsoir, au revoir.' },
                  { id: 'fr-listen-3', text: 'Non merci, de rien.' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

export const STATIC_COURSES: StaticCourse[] = [SPANISH_COURSE, FRENCH_COURSE];

// ----------------------------------------------------------------------------
// 4. Curriculum Helper Functions
// ----------------------------------------------------------------------------
export const getStaticCourses = (): StaticCourse[] => {
  return STATIC_COURSES;
};

export const getStaticCourseById = (courseId: string): StaticCourse | undefined => {
  return (
    STATIC_COURSES.find((c) => c._id === courseId || c.id === courseId || c.code === courseId) ||
    STATIC_COURSES[0]
  );
};

export const getStaticCourseByLanguage = (targetLang?: string): StaticCourse => {
  if (!targetLang) return STATIC_COURSES[0];
  const lang = targetLang.toLowerCase();
  return (
    STATIC_COURSES.find(
      (c) =>
        c.toLanguage.toLowerCase() === lang ||
        c.code.toLowerCase().startsWith(lang) ||
        c.title.toLowerCase().includes(lang)
    ) || STATIC_COURSES[0]
  );
};

export const getStaticLessonById = (
  lessonId: string
): { lesson: StaticLesson; exercises: StaticExercise[]; course: StaticCourse } | null => {
  for (const course of STATIC_COURSES) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId) {
          return {
            lesson,
            exercises: lesson.exercises,
            course,
          };
        }
      }
    }
  }
  return null;
};

// Normalization for answers (accents, punctuation, case)
export const normalizeText = (text: string): string => {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:'"-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const validateLocalAnswer = (
  exercise: StaticExercise,
  userAnswer: any
): { isCorrect: boolean; explanation?: string } => {
  const { type, data } = exercise;

  switch (type) {
    case 'MULTIPLE_CHOICE': {
      if (typeof userAnswer === 'string') {
        const matchesId = userAnswer === data.correctOptionId;
        const correctOpt = data.options?.find((o) => o.id === data.correctOptionId);
        const matchesText =
          correctOpt && normalizeText(correctOpt.text) === normalizeText(userAnswer);
        return {
          isCorrect: Boolean(matchesId || matchesText),
          explanation: exercise.explanation,
        };
      }
      return { isCorrect: false, explanation: exercise.explanation };
    }

    case 'TRANSLATION':
    case 'FILL_IN_THE_BLANK': {
      const userNorm = normalizeText(String(userAnswer || ''));
      const acceptable = data.acceptableAnswers || [];
      const isCorrect = acceptable.some((ans) => normalizeText(ans) === userNorm);
      return { isCorrect, explanation: exercise.explanation };
    }

    case 'WORD_ORDER': {
      const targetSentence = data.fullSentence || (data.correctOrder || []).join(' ');
      const userSentence = Array.isArray(userAnswer)
        ? userAnswer.join(' ')
        : String(userAnswer || '');
      const isCorrect = normalizeText(userSentence) === normalizeText(targetSentence);
      return { isCorrect, explanation: exercise.explanation };
    }

    case 'SENTENCE_CONSTRUCTION': {
      const target = (data.correctSentence || []).join(' ');
      const userSentence = Array.isArray(userAnswer)
        ? userAnswer.join(' ')
        : String(userAnswer || '');
      const isCorrect = normalizeText(userSentence) === normalizeText(target);
      return { isCorrect, explanation: exercise.explanation };
    }

    case 'TRUE_FALSE': {
      const boolAnswer =
        typeof userAnswer === 'boolean'
          ? userAnswer
          : String(userAnswer).toLowerCase() === 'true';
      return {
        isCorrect: boolAnswer === Boolean(data.isTrue),
        explanation: exercise.explanation,
      };
    }

    case 'MATCHING_PAIRS': {
      return { isCorrect: true, explanation: exercise.explanation };
    }

    case 'LISTENING_COMPREHENSION': {
      const matchesId = userAnswer === data.correctOptionId;
      const correctOpt = data.options?.find((o) => o.id === data.correctOptionId);
      const matchesText =
        correctOpt && normalizeText(correctOpt.text) === normalizeText(userAnswer);
      return {
        isCorrect: Boolean(matchesId || matchesText),
        explanation: exercise.explanation,
      };
    }

    case 'SPEAKING_PRONUNCIATION': {
      return { isCorrect: true, explanation: exercise.explanation };
    }

    default:
      return { isCorrect: true, explanation: exercise.explanation };
  }
};
