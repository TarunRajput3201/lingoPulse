export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'TRANSLATION'
  | 'WORD_ORDER'
  | 'FILL_IN_THE_BLANK'
  | 'MATCHING_PAIRS'
  | 'LISTENING_COMPREHENSION'
  | 'SPEAKING_PRONUNCIATION'
  | 'TRUE_FALSE'
  | 'SENTENCE_CONSTRUCTION';

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
  options?: ExerciseOption[];
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
  audioUrl?: string;
  pairs?: MatchingPair[];
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  prompt: string;
  instruction: string;
  audioUrl?: string;
  imageUrl?: string;
  order: number;
  hint?: string;
  explanation: string;
  data: ExerciseData;
}

export interface Lesson {
  id: string;
  unitId: string;
  lessonNumber: number;
  title: string;
  type: 'standard' | 'checkpoint' | 'review';
  xpReward: number;
  order: number;
  status: 'published';
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  description: string;
  themeColor: string;
  icon: string;
  status: 'published';
  lessons: Lesson[];
}

export interface Course {
  _id: string;
  id: string;
  code: string;
  title: string;
  description: string;
  fromLanguage: string;
  toLanguage: string;
  flagIcon: string;
  level: string;
  status: 'published';
  order: number;
  totalUnits: number;
  totalLessons: number;
  nativeName?: string;
  isRTL?: boolean;
  region?: string;
  units: Unit[];
}

export interface VocabularyItem {
  target: string;
  english: string;
  phonetic?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'expression';
  exampleSentenceTarget: string;
  exampleSentenceEnglish: string;
  blankSentence: string;
  missingWord: string;
  distractors: string[];
}

export interface UnitTheme {
  unitNumber: number;
  code: string;
  title: string;
  description: string;
  themeColor: string;
  icon: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
}

export interface LanguageDefinition {
  code: string;
  title: string;
  description: string;
  fromLanguage: string;
  toLanguage: string;
  flagIcon: string;
  level: string;
  order: number;
  nativeName?: string;
  isRTL?: boolean;
  region?: 'European' | 'Asian' | 'Middle Eastern' | 'Indian' | 'African' | 'Americas';
  units: Record<number, VocabularyItem[]>;
  culturalTips?: Record<number, string>;
}
