/**
 * LingoPulse Progressive Learning & Pedagogical Difficulty Engine
 *
 * Implements strict pedagogical progression:
 * 1. Easy (Steps 1–5): Multiple-choice, fill-in-the-blanks, missing-value exercises.
 *    Reuses familiar options from the same level and teaches single-word meanings.
 * 2. Medium: Gradually introduces 10–15 new words across the first five steps of each unit,
 *    systematically reinforcing previously learned vocabulary.
 * 3. Hard: STRICTLY RESTRICTED to Unit 15 and beyond! Focuses on constructing complete sentences.
 * 4. Progressive Learning: Increases difficulty smoothly from easy to medium across Steps 1–5.
 *    After Unit 15, generates complete sentences using all cumulative vocabulary.
 */

export type DifficultyTier = 'easy' | 'medium' | 'hard';

export type PedagogicalFocus =
  | 'single_word_meaning'
  | 'missing_value_blank'
  | 'vocabulary_expansion'
  | 'contextual_reinforcement'
  | 'unit_mastery_checkpoint'
  | 'complete_sentence_construction';

export interface StepPedagogy {
  unitNumber: number;
  stepNumber: number;
  difficulty: DifficultyTier;
  focus: PedagogicalFocus;
  label: string;
  description: string;
  allowedTypes: string[];
  newWordsIntroduced: number;
  reinforcedWordsCount: number;
  allowsSentenceConstruction: boolean;
}

export interface UnitVocabularySet {
  unitNumber: number;
  theme: string;
  totalNewWords: number; // 10–15 new words per unit
  words: Array<{
    term: string;
    translation: string;
    partOfSpeech: 'noun' | 'verb' | 'adjective' | 'greeting' | 'adverb' | 'preposition';
    introducedInStep: number; // 1 to 5
  }>;
}

// Canonical 10-15 word unit progressions for flagship courses
const VOCABULARY_CURRICULUM: Record<string, UnitVocabularySet[]> = {
  fr: [
    {
      unitNumber: 1,
      theme: 'First Steps & Politeness',
      totalNewWords: 12,
      words: [
        { term: 'bonjour', translation: 'hello', partOfSpeech: 'greeting', introducedInStep: 1 },
        { term: 'merci', translation: 'thank you', partOfSpeech: 'greeting', introducedInStep: 1 },
        { term: 'oui', translation: 'yes', partOfSpeech: 'adverb', introducedInStep: 1 },
        { term: 'au revoir', translation: 'goodbye', partOfSpeech: 'greeting', introducedInStep: 2 },
        { term: "s'il vous plaît", translation: 'please', partOfSpeech: 'greeting', introducedInStep: 2 },
        { term: 'non', translation: 'no', partOfSpeech: 'adverb', introducedInStep: 2 },
        { term: 'pardon', translation: 'sorry / excuse me', partOfSpeech: 'greeting', introducedInStep: 3 },
        { term: 'bonsoir', translation: 'good evening', partOfSpeech: 'greeting', introducedInStep: 3 },
        { term: 'à bientôt', translation: 'see you soon', partOfSpeech: 'greeting', introducedInStep: 3 },
        { term: 'enchanté', translation: 'pleased to meet you', partOfSpeech: 'adjective', introducedInStep: 4 },
        { term: 'bienvenue', translation: 'welcome', partOfSpeech: 'greeting', introducedInStep: 4 },
        { term: 'salut', translation: 'hi / bye', partOfSpeech: 'greeting', introducedInStep: 5 },
      ],
    },
    {
      unitNumber: 2,
      theme: 'Café & Daily Sustenance',
      totalNewWords: 14,
      words: [
        { term: 'café', translation: 'coffee', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'thé', translation: 'tea', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'eau', translation: 'water', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'pain', translation: 'bread', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'croissant', translation: 'croissant', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'fromage', translation: 'cheese', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'addition', translation: 'bill / check', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'table', translation: 'table', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'manger', translation: 'to eat', partOfSpeech: 'verb', introducedInStep: 3 },
        { term: 'boire', translation: 'to drink', partOfSpeech: 'verb', introducedInStep: 4 },
        { term: 'chaud', translation: 'hot', partOfSpeech: 'adjective', introducedInStep: 4 },
        { term: 'froid', translation: 'cold', partOfSpeech: 'adjective', introducedInStep: 4 },
        { term: 'serveur', translation: 'waiter', partOfSpeech: 'noun', introducedInStep: 5 },
        { term: 'délicieux', translation: 'delicious', partOfSpeech: 'adjective', introducedInStep: 5 },
      ],
    },
    {
      unitNumber: 3,
      theme: 'City Navigation & Directions',
      totalNewWords: 13,
      words: [
        { term: 'gare', translation: 'train station', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'train', translation: 'train', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'hôtel', translation: 'hotel', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'rue', translation: 'street', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'où', translation: 'where', partOfSpeech: 'adverb', introducedInStep: 2 },
        { term: 'ici', translation: 'here', partOfSpeech: 'adverb', introducedInStep: 2 },
        { term: 'gauche', translation: 'left', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'droite', translation: 'right', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'près', translation: 'near', partOfSpeech: 'preposition', introducedInStep: 3 },
        { term: 'loin', translation: 'far', partOfSpeech: 'adverb', introducedInStep: 4 },
        { term: 'billet', translation: 'ticket', partOfSpeech: 'noun', introducedInStep: 4 },
        { term: 'métro', translation: 'subway', partOfSpeech: 'noun', introducedInStep: 5 },
        { term: 'chercher', translation: 'to look for', partOfSpeech: 'verb', introducedInStep: 5 },
      ],
    },
  ],
  es: [
    {
      unitNumber: 1,
      theme: 'Saludos y Primeros Pasos',
      totalNewWords: 12,
      words: [
        { term: 'hola', translation: 'hello', partOfSpeech: 'greeting', introducedInStep: 1 },
        { term: 'gracias', translation: 'thank you', partOfSpeech: 'greeting', introducedInStep: 1 },
        { term: 'sí', translation: 'yes', partOfSpeech: 'adverb', introducedInStep: 1 },
        { term: 'adiós', translation: 'goodbye', partOfSpeech: 'greeting', introducedInStep: 2 },
        { term: 'por favor', translation: 'please', partOfSpeech: 'greeting', introducedInStep: 2 },
        { term: 'no', translation: 'no', partOfSpeech: 'adverb', introducedInStep: 2 },
        { term: 'buenos días', translation: 'good morning', partOfSpeech: 'greeting', introducedInStep: 3 },
        { term: 'buenas noches', translation: 'good night', partOfSpeech: 'greeting', introducedInStep: 3 },
        { term: 'mucho gusto', translation: 'nice to meet you', partOfSpeech: 'greeting', introducedInStep: 3 },
        { term: 'hasta luego', translation: 'see you later', partOfSpeech: 'greeting', introducedInStep: 4 },
        { term: 'bienvenido', translation: 'welcome', partOfSpeech: 'greeting', introducedInStep: 4 },
        { term: 'perdón', translation: 'excuse me / sorry', partOfSpeech: 'greeting', introducedInStep: 5 },
      ],
    },
    {
      unitNumber: 2,
      theme: 'Comida y Restaurante',
      totalNewWords: 14,
      words: [
        { term: 'agua', translation: 'water', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'café', translation: 'coffee', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'pan', translation: 'bread', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'leche', translation: 'milk', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'manzana', translation: 'apple', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'queso', translation: 'cheese', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'cuenta', translation: 'bill / check', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'mesa', translation: 'table', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'comer', translation: 'to eat', partOfSpeech: 'verb', introducedInStep: 3 },
        { term: 'beber', translation: 'to drink', partOfSpeech: 'verb', introducedInStep: 4 },
        { term: 'caliente', translation: 'hot', partOfSpeech: 'adjective', introducedInStep: 4 },
        { term: 'frío', translation: 'cold', partOfSpeech: 'adjective', introducedInStep: 4 },
        { term: 'camarero', translation: 'waiter', partOfSpeech: 'noun', introducedInStep: 5 },
        { term: 'delicioso', translation: 'delicious', partOfSpeech: 'adjective', introducedInStep: 5 },
      ],
    },
    {
      unitNumber: 3,
      theme: 'Lugares y Ciudad',
      totalNewWords: 13,
      words: [
        { term: 'estación', translation: 'station', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'tren', translation: 'train', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'hotel', translation: 'hotel', partOfSpeech: 'noun', introducedInStep: 1 },
        { term: 'calle', translation: 'street', partOfSpeech: 'noun', introducedInStep: 2 },
        { term: 'dónde', translation: 'where', partOfSpeech: 'adverb', introducedInStep: 2 },
        { term: 'aquí', translation: 'here', partOfSpeech: 'adverb', introducedInStep: 2 },
        { term: 'izquierda', translation: 'left', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'derecha', translation: 'right', partOfSpeech: 'noun', introducedInStep: 3 },
        { term: 'cerca', translation: 'near', partOfSpeech: 'preposition', introducedInStep: 3 },
        { term: 'lejos', translation: 'far', partOfSpeech: 'adverb', introducedInStep: 4 },
        { term: 'boleto', translation: 'ticket', partOfSpeech: 'noun', introducedInStep: 4 },
        { term: 'aeropuerto', translation: 'airport', partOfSpeech: 'noun', introducedInStep: 5 },
        { term: 'buscar', translation: 'to look for', partOfSpeech: 'verb', introducedInStep: 5 },
      ],
    },
  ],
};

export class ProgressiveLearningEngine {
  /**
   * Evaluates the pedagogical requirements for a given unit and step.
   *
   * STRICT PEDAGOGICAL BOUNDARIES:
   * - Units 1–14:
   *    * Step 1–2: Easy (Single-word meanings, MCQs without spoiler hints, fill-in-the-blanks, missing values)
   *    * Step 3–5: Medium (10–15 new words introduced across steps 1–5, recycled vocabulary)
   *    * Hard: STRICTLY FORBIDDEN! Sentence construction is NOT allowed before Unit 15.
   * - Unit 15+:
   *    * Hard difficulty unlocked! Focuses on constructing complete sentences using cumulative vocabulary.
   */
  public static getStepPedagogy(unitNumber: number, stepNumber: number): StepPedagogy {
    const safeUnit = Math.max(1, unitNumber);
    const safeStep = Math.min(5, Math.max(1, stepNumber));

    // Hard difficulty boundary: strictly restricted to Unit 15 and beyond
    const isHardEligibleUnit = safeUnit >= 15;

    if (!isHardEligibleUnit) {
      if (safeStep <= 2) {
        return {
          unitNumber: safeUnit,
          stepNumber: safeStep,
          difficulty: 'easy',
          focus: safeStep === 1 ? 'single_word_meaning' : 'missing_value_blank',
          label: `Step ${safeStep}/5 • Easy`,
          description:
            safeStep === 1
              ? 'Learn essential single-word meanings with familiar options.'
              : 'Complete the sentence with missing-value word chips.',
          allowedTypes: ['MULTIPLE_CHOICE', 'FILL_IN_THE_BLANK', 'IMAGE_SELECT', 'TRUE_FALSE'],
          newWordsIntroduced: safeStep === 1 ? 3 : 3,
          reinforcedWordsCount: safeStep === 1 ? 0 : 3,
          allowsSentenceConstruction: false,
        };
      }

      return {
        unitNumber: safeUnit,
        stepNumber: safeStep,
        difficulty: 'medium',
        focus:
          safeStep === 3
            ? 'vocabulary_expansion'
            : safeStep === 4
            ? 'contextual_reinforcement'
            : 'unit_mastery_checkpoint',
        label: `Step ${safeStep}/5 • Medium`,
        description:
          safeStep === 5
            ? 'Unit Checkpoint: Master all 10–15 new words from this unit.'
            : 'Expand vocabulary by connecting new words with reinforced terms.',
        allowedTypes: [
          'MULTIPLE_CHOICE',
          'FILL_IN_THE_BLANK',
          'MATCHING_PAIRS',
          'LISTENING_COMPREHENSION',
          'SPEAKING_PRONUNCIATION',
          'TRANSLATION',
        ],
        newWordsIntroduced: safeStep === 5 ? 2 : 3,
        reinforcedWordsCount: 6,
        allowsSentenceConstruction: false,
      };
    }

    // Unit 15 and beyond: HARD difficulty is unlocked with Complete Sentence Construction!
    return {
      unitNumber: safeUnit,
      stepNumber: safeStep,
      difficulty: safeStep <= 2 ? 'medium' : 'hard',
      focus: 'complete_sentence_construction',
      label: safeStep <= 2 ? `Step ${safeStep}/5 • Medium Synthesis` : `Step ${safeStep}/5 • Hard Sentence Builder`,
      description:
        'Construct complete sentences using all cumulative vocabulary learned from Units 1 to 15.',
      allowedTypes: ['SENTENCE_CONSTRUCTION', 'WORD_ORDER', 'TRANSLATION', 'SPEAKING_PRONUNCIATION'],
      newWordsIntroduced: 2,
      reinforcedWordsCount: 15,
      allowsSentenceConstruction: true,
    };
  }

  /**
   * Returns whether hard sentence construction is allowed.
   * STRICT RULE: Returns false for any unit before Unit 15.
   */
  public static isSentenceConstructionAllowed(unitNumber: number): boolean {
    return unitNumber >= 15;
  }

  /**
   * Retrieves the 10–15 target new vocabulary words for a unit.
   */
  public static getUnitVocabulary(language: string, unitNumber: number): UnitVocabularySet | null {
    const langKey = language.toLowerCase().trim().slice(0, 2);
    const catalog = VOCABULARY_CURRICULUM[langKey];
    if (!catalog) return null;

    return catalog.find((u) => u.unitNumber === unitNumber) || catalog[0];
  }

  /**
   * Collects all cumulative vocabulary learned up to the target unit.
   */
  public static getCumulativeVocabulary(
    language: string,
    upToUnitNumber: number
  ): Array<{ term: string; translation: string; partOfSpeech: string }> {
    const langKey = language.toLowerCase().trim().slice(0, 2);
    const catalog = VOCABULARY_CURRICULUM[langKey] || [];

    const cumulative: Array<{ term: string; translation: string; partOfSpeech: string }> = [];
    for (const unit of catalog) {
      if (unit.unitNumber <= upToUnitNumber) {
        cumulative.push(...unit.words);
      }
    }
    return cumulative;
  }

  /**
   * Synthesizes complete grammatical sentences for Unit 15+ using cumulative vocabulary.
   * Throws an error if invoked on units below Unit 15 to enforce the pedagogical boundary.
   */
  public static generateSentenceConstructionExercise(
    language: string,
    unitNumber: number,
    stepNumber: number
  ): {
    prompt: string;
    sourcePrompt: string;
    correctSentence: string[];
    wordBank: string[];
    explanation: string;
  } {
    if (unitNumber < 15) {
      throw new Error(
        `[ProgressiveLearningEngine] Sentence construction exercises cannot be introduced before Unit 15 (requested unit: ${unitNumber}).`
      );
    }

    const langKey = language.toLowerCase().trim().slice(0, 2);

    if (langKey === 'fr') {
      return {
        prompt: 'Construct the complete sentence:',
        sourcePrompt: 'I would like a warm coffee with bread, please.',
        correctSentence: ['Je', 'voudrais', 'un', 'café', 'chaud', 'avec', 'du', 'pain,', "s'il", 'vous', 'plaît.'],
        wordBank: [
          'Je',
          'voudrais',
          'un',
          'café',
          'chaud',
          'avec',
          'du',
          'pain,',
          "s'il",
          'vous',
          'plaît.',
          'gare',
          'froid',
          'train',
          'non',
        ],
        explanation: 'Combines subject pronoun, conditional verb, noun, adjective, and politeness formula.',
      };
    }

    // Default Spanish sentence construction (Unit 15+)
    return {
      prompt: 'Construye la oración completa:',
      sourcePrompt: 'I need to find the train station near the hotel, please.',
      correctSentence: ['Necesito', 'buscar', 'la', 'estación', 'de', 'tren', 'cerca', 'del', 'hotel,', 'por', 'favor.'],
      wordBank: [
        'Necesito',
        'buscar',
        'la',
        'estación',
        'de',
        'tren',
        'cerca',
        'del',
        'hotel,',
        'por',
        'favor.',
        'mesa',
        'leche',
        'hola',
        'delicioso',
      ],
      explanation: 'Combina verbo modal, infinitivo, complemento de lugar y fórmula de cortesía.',
    };
  }

  /**
   * Calibrates distractors for Easy steps (Steps 1–5):
   * Ensures distractors are familiar options from the same level tier, teaching clear single-word meanings.
   */
  public static calibrateOptionsForSingleWord(
    correctTerm: string,
    correctTranslation: string,
    language: string,
    unitNumber: number,
    stepNumber: number
  ): Array<{ id: string; text: string }> {
    const langKey = language.toLowerCase().trim().slice(0, 2);
    const unitVocab = this.getUnitVocabulary(langKey, unitNumber);
    const allWords = unitVocab ? unitVocab.words : [];

    // Filter candidate distractors from the same unit tier
    const candidates = allWords
      .filter((w) => w.term.toLowerCase() !== correctTerm.toLowerCase())
      .map((w) => w.term);

    // Pick 3 familiar distractors
    const chosenDistractors = candidates.slice(0, 3);
    const optionsPool = [correctTerm, ...chosenDistractors];

    // Deterministic shuffle
    const shuffled = optionsPool.sort(() => 0.5 - Math.random());

    return shuffled.map((text, idx) => ({
      id: `opt-cal-${idx + 1}-${text.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      text,
    }));
  }
}
