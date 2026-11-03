/**
 * LingoPulse 3D Character Registry & Pedagogical Rotation Engine
 * Features 5 distinct real-time 3D characters:
 * - Maya: Lead Teacher & Grammar Guide
 * - Leo: Pronunciation Coach & Phonics Master
 * - Elena: Conversation Partner & Dialogue Specialist
 * - Kael: Challenge Character & Speed Quiz Master
 * - Pip: Autonomous Companion Robot & Streak Celebrator
 */

export type CharacterId = 'maya' | 'leo' | 'elena' | 'kael' | 'pip';

export type CharacterMood =
  | 'idle'
  | 'speaking'
  | 'celebrate'
  | 'thinking'
  | 'encouraging'
  | 'correct'
  | 'wrong';

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  role: string;
  title: string;
  accentColor: string;
  darkAccent: string;
  lightAccent: string;
  haloColor: string;
  pedestalColor: string;
  pedestalBorder: string;
  pedestalBottom: string;
  quotes: {
    intro: string[];
    correct: string[];
    mistake: string[];
    streak: string[];
    thinking: string[];
  };
}

export const CHARACTER_PROFILES: Record<CharacterId, CharacterProfile> = {
  maya: {
    id: 'maya',
    name: 'Maya',
    role: 'Teacher',
    title: 'Grammar & Vocabulary Guide',
    accentColor: '#10B981', // Emerald
    darkAccent: '#059669',
    lightAccent: '#D1FAE5',
    haloColor: 'rgba(16, 185, 129, 0.25)',
    pedestalColor: '#ECFDF5',
    pedestalBorder: '#6EE7B7',
    pedestalBottom: '#047857',
    quotes: {
      intro: [
        "Welcome! Let's explore new words together.",
        "Take your time, learning is step by step.",
        "Notice the pattern in this sentence!",
      ],
      correct: [
        'Brilliant! You grasp this quickly.',
        'Exactly right! Perfect grammar.',
        'Magnificent work, keep going!',
      ],
      mistake: [
        "Almost there! Look closely at the word endings.",
        "Mistakes help our brain grow stronger.",
        "Let's review this together, you've got this!",
      ],
      streak: [
        'Your daily dedication is truly paying off!',
        'Consistency creates true fluency.',
      ],
      thinking: [
        'Analyze each choice carefully...',
        'Remember the rule we practiced!',
      ],
    },
  },

  leo: {
    id: 'leo',
    name: 'Leo',
    role: 'Pronunciation Coach',
    title: 'Phonics & Speech Coach',
    accentColor: '#0EA5E9', // Azure
    darkAccent: '#0284C7',
    lightAccent: '#E0F2FE',
    haloColor: 'rgba(14, 165, 233, 0.25)',
    pedestalColor: '#F0F9FF',
    pedestalBorder: '#7DD3FC',
    pedestalBottom: '#0369A1',
    quotes: {
      intro: [
        'Listen closely to the native rhythm and cadence.',
        'Repeat after me! Form your mouth with precision.',
        'Tune your ear to the subtle sound variations.',
      ],
      correct: [
        'Spot-on accent! Sounds like a native speaker.',
        'Clean, crisp pronunciation! Outstanding.',
        'Your ear is becoming sharp!',
      ],
      mistake: [
        'Listen again closely to the vowel sound.',
        'So close! Try smoothing out the rhythm.',
        'Slow down and let each syllable breathe.',
      ],
      streak: [
        'Your ear is tuning in faster every single day!',
        'Native cadence comes with this steady repetition.',
      ],
      thinking: [
        'Listen to the acoustic cues...',
        'Focus on the intonation arc.',
      ],
    },
  },

  elena: {
    id: 'elena',
    name: 'Elena',
    role: 'Conversation Partner',
    title: 'Dialogue & Sentence Specialist',
    accentColor: '#F59E0B', // Amber
    darkAccent: '#D97706',
    lightAccent: '#FEF3C7',
    haloColor: 'rgba(245, 158, 11, 0.25)',
    pedestalColor: '#FFFBEB',
    pedestalBorder: '#FCD34D',
    pedestalBottom: '#B45309',
    quotes: {
      intro: [
        'Imagine using this phrase on a lively street cafe!',
        "Let's practice how real people speak every day.",
        'How would you reply to this in a real conversation?',
      ],
      correct: [
        'Smooth dialogue! You sound so natural.',
        'That connects seamlessly, beautiful sentence!',
        'Ready for a spontaneous conversation anytime!',
      ],
      mistake: [
        'In daily chats, we usually frame it like this!',
        'Natural phrasing takes a little practice.',
        'Think of how you would respond to a friend.',
      ],
      streak: [
        'Our conversations are getting more fluent every day!',
        'You are building real conversational confidence.',
      ],
      thinking: [
        'Think of the context of this conversation...',
        'What feels most natural to say next?',
      ],
    },
  },

  kael: {
    id: 'kael',
    name: 'Kael',
    role: 'Challenge Master',
    title: 'Speed & Mastery Strategist',
    accentColor: '#8B5CF6', // Amethyst Violet
    darkAccent: '#7C3AED',
    lightAccent: '#EDE9FE',
    haloColor: 'rgba(139, 92, 246, 0.25)',
    pedestalColor: '#F5F3FF',
    pedestalBorder: '#C4B5FD',
    pedestalBottom: '#6D28D9',
    quotes: {
      intro: [
        'Time to test your reflexes! Stay sharp.',
        'Challenge round incoming. Trust your instincts!',
        'Show me your speed and accuracy.',
      ],
      correct: [
        'Unstoppable! Lightning reflexes!',
        'Mastery achieved! That was high difficulty.',
        'Flawless execution! Challenge conquered.',
      ],
      mistake: [
        'High difficulty, reset your focus and strike again!',
        'Speed is good, but precision is king.',
        'Recover fast, every champion learns under pressure.',
      ],
      streak: [
        'Unbroken streak! You are in the master league now.',
        'Your momentum is unstoppable!',
      ],
      thinking: [
        'Lock in, analyze the choices swiftly...',
        'Do not let tricky distractors throw you off.',
      ],
    },
  },

  pip: {
    id: 'pip',
    name: 'Pip',
    role: 'AI Companion',
    title: 'Habit & Cheer Bot',
    accentColor: '#EC4899', // Pink / Rose
    darkAccent: '#DB2777',
    lightAccent: '#FCE7F3',
    haloColor: 'rgba(236, 72, 153, 0.25)',
    pedestalColor: '#FDF2F8',
    pedestalBorder: '#F472B6',
    pedestalBottom: '#9D174D',
    quotes: {
      intro: [
        'BEEP BOOP! Ready for today’s quest! ✨',
        'Pip is here to boost your power!',
        'You are doing wonderful, let’s win some XP!',
      ],
      correct: [
        'YAHOO! ⭐ +10 XP added to your hoard!',
        'Pip gives high-five with both robotic hands!',
        'You are on fire today! Super combo!',
      ],
      mistake: [
        'Pip has extra battery power for you! Try again!',
        'No worries at all! Pip believes in you! 💖',
        'Shake it off! Next one is ours!',
      ],
      streak: [
        'STREAK SHIELD ACTIVE! 🔥 Keep that flame alive!',
        'Look at your streak shine! So proud of you!',
      ],
      thinking: [
        'Whirrr... Pip is calculating good luck for you!',
        'Take a deep breath, you know this one!',
      ],
    },
  },
};

/**
 * 15-Question Pedagogical Rotation Sequence
 * Distributes all 5 characters evenly across their pedagogical responsibilities.
 */
const DEFAULT_15_ROTATION: CharacterId[] = [
  'maya',  // Q1:  Vocab intro & teacher welcome
  'maya',  // Q2:  Grammar reinforcement
  'kael',  // Q3:  Quick reflex quiz challenge
  'elena', // Q4:  Real-world dialogue phrasing
  'pip',   // Q5:  First 5-question milestone & cheer
  'leo',   // Q6:  Phonetic listening & lip-sync demonstration
  'kael',  // Q7:  Concept matching trial
  'leo',   // Q8:  Speaking & articulation coaching
  'maya',  // Q9:  Grammar rule fill-in explanation
  'elena', // Q10: Interactive conversation practice
  'kael',  // Q11: Rapid-fire speed challenge
  'elena', // Q12: Sentence construction & syntax
  'leo',   // Q13: Phonics cadence & native listening
  'maya',  // Q14: Cumulative synthesis translation
  'kael',  // Q15: Final lesson boss challenge!
];

/**
 * Resolves the active 3D character for any question in a lesson.
 * Respects question type specialties (e.g. listening/speaking always calls Leo).
 */
export function getCharacterForQuestion(
  stepIndex: number,
  totalQuestions: number = 15,
  questionType?: string
): CharacterId {
  // Direct pedagogical specialization
  if (questionType === 'LISTENING' || questionType === 'SPEAKING' || questionType === 'PRONUNCIATION') {
    return 'leo';
  }
  if (questionType === 'DIALOGUE' || questionType === 'SENTENCE_BUILDER') {
    return 'elena';
  }
  if (questionType === 'SPEED_QUIZ' || questionType === 'HARD_MATCHING') {
    return 'kael';
  }

  // 15-question mapped rotation
  if (totalQuestions <= 15) {
    const idx = Math.max(0, Math.min(stepIndex, DEFAULT_15_ROTATION.length - 1));
    return DEFAULT_15_ROTATION[idx];
  }

  // Generalized formula for longer courses: cyclical rotation
  const characters: CharacterId[] = ['maya', 'leo', 'elena', 'kael', 'pip'];
  return characters[stepIndex % characters.length];
}

/**
 * Selects an appropriate dialogue line for the character and current mood
 */
export function getCharacterQuote(characterId: CharacterId, mood: CharacterMood): string {
  const profile = CHARACTER_PROFILES[characterId] || CHARACTER_PROFILES.maya;
  let pool = profile.quotes.intro;

  if (mood === 'correct' || mood === 'celebrate') {
    pool = profile.quotes.correct;
  } else if (mood === 'wrong') {
    pool = profile.quotes.mistake;
  } else if (mood === 'thinking') {
    pool = profile.quotes.thinking;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || pool[0];
}
