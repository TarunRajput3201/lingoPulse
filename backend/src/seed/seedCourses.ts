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
  const admin = await User.create({
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

  const demoLearner = await User.create({
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

  // 3. Seed Course: Spanish for English Speakers
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
    totalLessons: 4,
  });

  // Also seed a French Course for exploration
  await Course.create({
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

  // 4. Seed Unit 1: Foundations & Greetings
  const unit1 = await Unit.create({
    courseId: spanishCourse._id,
    unitNumber: 1,
    title: 'Unit 1: Greetings & Basics',
    description: 'Say hello, introduce yourself, and order basic drinks.',
    themeColor: '#58CC02',
    icon: 'sparkles',
    status: 'published',
  });

  // Lesson 1.1: Hello & Greetings
  const lesson1 = await Lesson.create({
    unitId: unit1._id,
    lessonNumber: 1,
    title: 'Basic Greetings',
    type: 'standard',
    xpReward: 15,
    order: 1,
    status: 'published',
  });

  // Exercises for Lesson 1 (Covering multiple interactive types)
  await Exercise.create([
    {
      lessonId: lesson1._id,
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
      lessonId: lesson1._id,
      type: 'TRANSLATION',
      prompt: 'Translate to Spanish: "Good morning"',
      instruction: 'Type the Spanish translation below',
      order: 2,
      explanation: '"Buenos días" translates directly to "Good day" or "Good morning".',
      hint: 'Starts with "Buenos..."',
      data: {
        acceptableAnswers: ['Buenos días', 'buenos dias', 'buenos días.'],
      },
    },
    {
      lessonId: lesson1._id,
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
      lessonId: lesson1._id,
      type: 'FILL_IN_THE_BLANK',
      prompt: 'Complete the greeting: "¿___ estás?" (How are you?)',
      instruction: 'Select or type the missing word',
      order: 4,
      explanation: '"¿Cómo estás?" is used when speaking casually to friends.',
      hint: 'Sounds like "Koh-moh"',
      data: {
        sentenceWithBlank: '¿___ estás?',
        acceptableAnswers: ['Cómo', 'como'],
        options: ['Cómo', 'Dónde', 'Cuándo', 'Qué'],
      },
    },
    {
      lessonId: lesson1._id,
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
  const lesson2 = await Lesson.create({
    unitId: unit1._id,
    lessonNumber: 2,
    title: 'Food & Drinks',
    type: 'standard',
    xpReward: 15,
    order: 2,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: lesson2._id,
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
      lessonId: lesson2._id,
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
      lessonId: lesson2._id,
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
      lessonId: lesson2._id,
      type: 'FILL_IN_THE_BLANK',
      prompt: 'Fill the blank: "Yo ___ una manzana." (I eat an apple)',
      instruction: 'Type the verb "como"',
      order: 4,
      explanation: '"Como" comes from the verb "comer" (to eat) for "Yo" (I).',
      data: {
        sentenceWithBlank: 'Yo ___ una manzana.',
        acceptableAnswers: ['como'],
      },
    },
  ]);

  // Lesson 1.3: Checkpoint & Audio Comprehension
  const lesson3 = await Lesson.create({
    unitId: unit1._id,
    lessonNumber: 3,
    title: 'Checkpoint 1',
    type: 'checkpoint',
    xpReward: 25,
    order: 3,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: lesson3._id,
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Listen to the audio clip and select what was spoken',
      instruction: 'Tap the audio button to listen carefully',
      audioUrl: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg', // Sample test audio
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
      lessonId: lesson3._id,
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
  ]);

  // 5. Seed Unit 2: Travel & Directions
  const unit2 = await Unit.create({
    courseId: spanishCourse._id,
    unitNumber: 2,
    title: 'Unit 2: Travel & Directions',
    description: 'Ask for directions, buy transit tickets, and navigate cities.',
    themeColor: '#1CB0F6',
    icon: 'compass',
    status: 'published',
  });

  const lesson4 = await Lesson.create({
    unitId: unit2._id,
    lessonNumber: 4,
    title: 'Where is the Train?',
    type: 'standard',
    xpReward: 15,
    order: 4,
    status: 'published',
  });

  await Exercise.create([
    {
      lessonId: lesson4._id,
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
      lessonId: lesson4._id,
      type: 'TRANSLATION',
      prompt: 'Translate: "The ticket, please"',
      instruction: 'Type in Spanish',
      order: 2,
      explanation: '"El boleto, por favor" or "El billete, por favor".',
      data: {
        acceptableAnswers: [
          'El boleto, por favor',
          'el boleto por favor',
          'el billete por favor',
          'El billete, por favor',
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
