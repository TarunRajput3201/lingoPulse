import mongoose from 'mongoose';
import { ENV } from '../config/env';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Unit } from '../models/Unit';
import { Lesson } from '../models/Lesson';
import { Exercise } from '../models/Exercise';
import { Achievement } from '../models/Achievement';

export const seedDatabase = async () => {
  console.log('🌱 Starting LingoPulse Database Seeding...');
  await mongoose.connect(ENV.MONGO_URI);

  // Clear existing collections
  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Unit.deleteMany({}),
    Lesson.deleteMany({}),
    Exercise.deleteMany({}),
    Achievement.deleteMany({}),
  ]);

  console.log('🧹 Cleared existing database records.');

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

  // ==========================================
  // 3. Course: Spanish Essentials (CEFR A1)
  // ==========================================
  const spanishCourse = await Course.create({
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
  });

  // Spanish Unit 1: Greetings & Basics (CEFR A1.1)
  const esUnit1 = await Unit.create({
    courseId: spanishCourse._id,
    unitNumber: 1,
    title: 'Unit 1: Greetings & Basics',
    description: 'Say hello, introduce yourself, and order basic drinks.',
    themeColor: '#58CC02',
    icon: 'sparkles',
    status: 'published',
  });

  // Lesson 1.1: Hello & Greetings
  const esLesson1 = await Lesson.create({
    unitId: esUnit1._id,
    lessonNumber: 1,
    title: 'Basic Greetings',
    type: 'standard',
    xpReward: 15,
    order: 1,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: esLesson1._id,
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
      lessonId: esLesson1._id,
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
          'Buenos días.',
        ],
      },
    },
    {
      lessonId: esLesson1._id,
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
      lessonId: esLesson1._id,
      type: 'FILL_IN_THE_BLANK',
      prompt: 'Complete the greeting: "¿___ estás?" (How are you?)',
      instruction: 'Select or type the missing word',
      order: 4,
      explanation: '"¿Cómo estás?" is used when speaking casually to friends. "Cómo" carries an accent mark when asking questions.',
      hint: 'Sounds like "Koh-moh"',
      data: {
        sentenceWithBlank: '¿___ estás?',
        acceptableAnswers: ['Cómo', 'cómo'],
        options: ['Cómo', 'Dónde', 'Cuándo', 'Qué'],
      },
    },
    {
      lessonId: esLesson1._id,
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
  ]);

  // Lesson 1.2: Food & Drinks
  const esLesson2 = await Lesson.create({
    unitId: esUnit1._id,
    lessonNumber: 2,
    title: 'Food & Drinks',
    type: 'standard',
    xpReward: 15,
    order: 2,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: esLesson2._id,
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
      lessonId: esLesson2._id,
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
      lessonId: esLesson2._id,
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
      lessonId: esLesson2._id,
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
      lessonId: esLesson2._id,
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
  ]);

  // Lesson 1.3: Checkpoint 1
  const esLesson3 = await Lesson.create({
    unitId: esUnit1._id,
    lessonNumber: 3,
    title: 'Checkpoint 1: Greetings & Food',
    type: 'checkpoint',
    xpReward: 25,
    order: 3,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: esLesson3._id,
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Listen to the audio clip and select what was spoken',
      instruction: 'Tap the audio button to listen carefully',
      audioUrl: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
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
      lessonId: esLesson3._id,
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
      lessonId: esLesson3._id,
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
  ]);

  // Spanish Unit 2: Travel & Directions (CEFR A1.2)
  const esUnit2 = await Unit.create({
    courseId: spanishCourse._id,
    unitNumber: 2,
    title: 'Unit 2: Travel & Directions',
    description: 'Ask for directions, buy transit tickets, and navigate cities.',
    themeColor: '#1CB0F6',
    icon: 'compass',
    status: 'published',
  });

  // Lesson 2.1: Where is the Train?
  const esLesson4 = await Lesson.create({
    unitId: esUnit2._id,
    lessonNumber: 4,
    title: 'Where is the Train?',
    type: 'standard',
    xpReward: 15,
    order: 4,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: esLesson4._id,
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
      lessonId: esLesson4._id,
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
        ],
      },
    },
    {
      lessonId: esLesson4._id,
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
      lessonId: esLesson4._id,
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
      lessonId: esLesson4._id,
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
  ]);

  // Lesson 2.2: Checkpoint 2: Travel & Navigation Checkpoint
  const esLesson5 = await Lesson.create({
    unitId: esUnit2._id,
    lessonNumber: 5,
    title: 'Checkpoint 2: City Navigation',
    type: 'checkpoint',
    xpReward: 25,
    order: 5,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: esLesson5._id,
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
      lessonId: esLesson5._id,
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
      lessonId: esLesson5._id,
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
  ]);

  // ==========================================
  // 4. Course: French Foundations (CEFR A1)
  // ==========================================
  const frenchCourse = await Course.create({
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
  });

  const frUnit1 = await Unit.create({
    courseId: frenchCourse._id,
    unitNumber: 1,
    title: 'Unit 1: Salutations & Café',
    description: 'Greet people politely and order delicious food in Paris.',
    themeColor: '#FF4B4B',
    icon: 'coffee',
    status: 'published',
  });

  // French Lesson 1.1: Basic Greetings
  const frLesson1 = await Lesson.create({
    unitId: frUnit1._id,
    lessonNumber: 1,
    title: 'French Greetings & Courtesy',
    type: 'standard',
    xpReward: 15,
    order: 1,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: frLesson1._id,
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
      lessonId: frLesson1._id,
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
      lessonId: frLesson1._id,
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
      lessonId: frLesson1._id,
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
      lessonId: frLesson1._id,
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
  ]);

  // French Lesson 1.2: Checkpoint 1
  const frLesson2 = await Lesson.create({
    unitId: frUnit1._id,
    lessonNumber: 2,
    title: 'Checkpoint: First Café Encounter',
    type: 'checkpoint',
    xpReward: 25,
    order: 2,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: frLesson2._id,
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
      lessonId: frLesson2._id,
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
      lessonId: frLesson2._id,
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Listen to the barista greeting',
      instruction: 'Select the spoken sentence',
      audioUrl: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
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
  ]);

  console.log('🎉 Seeding successfully completed!');
  await mongoose.disconnect();
};

if (require.main === module) {
  seedDatabase().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
}
