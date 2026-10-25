import { ExerciseValidator } from '../services/exerciseValidator';
import { IExercise } from '../models/Exercise';

describe('ExerciseValidator - Quality & Linguistic Verification', () => {
  describe('Text Normalization & Accent Tolerance', () => {
    it('should normalize punctuation and multiple spaces', () => {
      const input = '  ¿¡Hola,   mundo!?  ';
      expect(ExerciseValidator.normalizeText(input)).toBe('hola mundo');
    });

    it('should correctly strip accents via NFD decomposition', () => {
      expect(ExerciseValidator.stripAccents('Buenos días')).toBe('Buenos dias');
      expect(ExerciseValidator.stripAccents('está')).toBe('esta');
      expect(ExerciseValidator.stripAccents('café')).toBe('cafe');
    });

    it('should validate exact match with no accent warning', () => {
      const result = ExerciseValidator.compareWithAccentTolerance('Buenos días', ['Buenos días']);
      expect(result.isCorrect).toBe(true);
      expect(result.hasAccentWarning).toBe(false);
    });

    it('should accept missing accents with a soft pedagogical warning', () => {
      const result = ExerciseValidator.compareWithAccentTolerance('Buenos dias', ['Buenos días']);
      expect(result.isCorrect).toBe(true);
      expect(result.hasAccentWarning).toBe(true);
      expect(result.canonicalMatch).toBe('Buenos días');
    });
  });

  describe('Exercise Types Validation', () => {
    it('MULTIPLE_CHOICE: accepts either option ID or option text', () => {
      const exercise = {
        type: 'MULTIPLE_CHOICE',
        prompt: 'How do you say "Hello"?',
        data: {
          correctOptionId: 'opt-1',
          options: [
            { id: 'opt-1', text: 'Hola' },
            { id: 'opt-2', text: 'Adiós' },
          ],
        },
      } as unknown as IExercise;

      // By ID
      const res1 = ExerciseValidator.validate(exercise, 'opt-1');
      expect(res1.isCorrect).toBe(true);

      // By Text
      const res2 = ExerciseValidator.validate(exercise, 'Hola');
      expect(res2.isCorrect).toBe(true);

      // Wrong
      const res3 = ExerciseValidator.validate(exercise, 'opt-2');
      expect(res3.isCorrect).toBe(false);
    });

    it('TRANSLATION: accepts accent-less answers without deducting hearts', () => {
      const exercise = {
        type: 'TRANSLATION',
        prompt: 'Translate to Spanish: "Good morning"',
        data: {
          acceptableAnswers: ['Buenos días', 'buenos días'],
        },
      } as unknown as IExercise;

      const res = ExerciseValidator.validate(exercise, 'buenos dias');
      expect(res.isCorrect).toBe(true);
      expect(res.hasAccentWarning).toBe(true);
      expect(res.pedagogicalTip).toContain('Buenos días');
    });

    it('FILL_IN_THE_BLANK: validates case and inverted punctuation', () => {
      const exercise = {
        type: 'FILL_IN_THE_BLANK',
        prompt: 'Complete: "¿___ estás?"',
        data: {
          acceptableAnswers: ['Cómo', 'cómo'],
        },
      } as unknown as IExercise;

      const res1 = ExerciseValidator.validate(exercise, 'como');
      expect(res1.isCorrect).toBe(true);
      expect(res1.hasAccentWarning).toBe(true);

      const res2 = ExerciseValidator.validate(exercise, 'Dónde');
      expect(res2.isCorrect).toBe(false);
    });

    it('WORD_ORDER: validates array or sentence input', () => {
      const exercise = {
        type: 'WORD_ORDER',
        prompt: 'Assemble: "Nice to meet you"',
        data: {
          correctOrder: ['Mucho', 'gusto'],
          fullSentence: 'Mucho gusto',
        },
      } as unknown as IExercise;

      const res1 = ExerciseValidator.validate(exercise, ['Mucho', 'gusto']);
      expect(res1.isCorrect).toBe(true);

      const res2 = ExerciseValidator.validate(exercise, 'Mucho gusto');
      expect(res2.isCorrect).toBe(true);

      const res3 = ExerciseValidator.validate(exercise, ['gusto', 'Mucho']);
      expect(res3.isCorrect).toBe(false);
    });

    it('SENTENCE_CONSTRUCTION: handles word banks with plausible distractors', () => {
      const exercise = {
        type: 'SENTENCE_CONSTRUCTION',
        prompt: 'I want a coffee, please',
        data: {
          correctSentence: ['Yo', 'quiero', 'un', 'café', 'por', 'favor'],
        },
      } as unknown as IExercise;

      const res = ExerciseValidator.validate(exercise, ['Yo', 'quiero', 'un', 'café', 'por', 'favor']);
      expect(res.isCorrect).toBe(true);
    });

    it('MATCHING_PAIRS: validates full set of pairs by ID or by text', () => {
      const exercise = {
        type: 'MATCHING_PAIRS',
        prompt: 'Match pairs',
        data: {
          pairs: [
            { id: 'p1', leftText: 'Water', rightText: 'Agua' },
            { id: 'p2', leftText: 'Bread', rightText: 'Pan' },
          ],
        },
      } as unknown as IExercise;

      const res1 = ExerciseValidator.validate(exercise, { p1: 'p1', p2: 'p2' });
      expect(res1.isCorrect).toBe(true);

      const res2 = ExerciseValidator.validate(exercise, { Water: 'Agua', Bread: 'Pan' });
      expect(res2.isCorrect).toBe(true);

      const res3 = ExerciseValidator.validate(exercise, { Water: 'Pan', Bread: 'Agua' });
      expect(res3.isCorrect).toBe(false);
    });

    it('SPEAKING_PRONUNCIATION: awards correct above 70% threshold with accent tolerance', () => {
      const exercise = {
        type: 'SPEAKING_PRONUNCIATION',
        prompt: 'Speak this phrase',
        data: {
          phraseToSpeak: 'Por favor, un café',
        },
      } as unknown as IExercise;

      // Spoken with missing accent and minor word variant
      const res1 = ExerciseValidator.validate(exercise, 'por favor un cafe');
      expect(res1.isCorrect).toBe(true);

      // Low match
      const res2 = ExerciseValidator.validate(exercise, 'hola buenas noches');
      expect(res2.isCorrect).toBe(false);
    });

    it('TRUE_FALSE: validates boolean and string input', () => {
      const exercise = {
        type: 'TRUE_FALSE',
        prompt: 'Is it true?',
        data: {
          isTrue: true,
        },
      } as unknown as IExercise;

      expect(ExerciseValidator.validate(exercise, true).isCorrect).toBe(true);
      expect(ExerciseValidator.validate(exercise, 'true').isCorrect).toBe(true);
      expect(ExerciseValidator.validate(exercise, false).isCorrect).toBe(false);
    });
  });
});
