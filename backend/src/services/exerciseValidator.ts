import { IExercise } from '../models/Exercise';

export interface ValidationResult {
  isCorrect: boolean;
  correctAnswer: any;
  explanation: string;
  hint?: string;
}

export class ExerciseValidator {
  /**
   * Helper to normalize text: removes excess spaces, converts to lowercase, trims punctuation.
   */
  private static normalizeText(text: string): string {
    if (!text) return '';
    return text
      .trim()
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿¡!]/g, '')
      .replace(/\s+/g, ' ');
  }

  /**
   * Authoritatively validate user's answer against exercise data.
   */
  public static validate(exercise: IExercise, userAnswer: any): ValidationResult {
    const data = exercise.data || {};

    switch (exercise.type) {
      case 'MULTIPLE_CHOICE': {
        const correctId = data.correctOptionId;
        const isCorrect = String(userAnswer).trim() === String(correctId).trim();
        const correctOption = data.options?.find((opt: any) => String(opt.id) === String(correctId));

        return {
          isCorrect,
          correctAnswer: correctOption ? correctOption.text : String(correctId),
          explanation: exercise.explanation || data.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'FILL_IN_THE_BLANK': {
        const acceptable: string[] = data.acceptableAnswers || [];
        const normalizedUser = this.normalizeText(String(userAnswer));
        const isCorrect = acceptable.some((ans) => this.normalizeText(ans) === normalizedUser);

        return {
          isCorrect,
          correctAnswer: acceptable[0] || '',
          explanation: exercise.explanation || `The correct word is "${acceptable[0]}".`,
          hint: exercise.hint,
        };
      }

      case 'TRANSLATION': {
        const acceptable: string[] = data.acceptableAnswers || [];
        const normalizedUser = this.normalizeText(String(userAnswer));
        const isCorrect = acceptable.some((ans) => this.normalizeText(ans) === normalizedUser);

        return {
          isCorrect,
          correctAnswer: acceptable[0] || '',
          explanation: exercise.explanation || `Correct translation: "${acceptable[0]}"`,
          hint: exercise.hint,
        };
      }

      case 'WORD_ORDER': {
        const correctOrder: string[] = data.correctOrder || [];
        let isCorrect = false;

        if (Array.isArray(userAnswer)) {
          const userJoined = userAnswer.map((w) => this.normalizeText(w)).join(' ');
          const correctJoined = correctOrder.map((w) => this.normalizeText(w)).join(' ');
          isCorrect = userJoined === correctJoined;
        } else if (typeof userAnswer === 'string') {
          const userNorm = this.normalizeText(userAnswer);
          const fullSent = this.normalizeText(data.fullSentence || correctOrder.join(' '));
          isCorrect = userNorm === fullSent;
        }

        return {
          isCorrect,
          correctAnswer: data.fullSentence || correctOrder.join(' '),
          explanation: exercise.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'SENTENCE_CONSTRUCTION': {
        const correctSentence: string[] = data.correctSentence || [];
        let isCorrect = false;

        if (Array.isArray(userAnswer)) {
          const userJoined = userAnswer.map((w) => this.normalizeText(w)).join(' ');
          const correctJoined = correctSentence.map((w) => this.normalizeText(w)).join(' ');
          isCorrect = userJoined === correctJoined;
        } else if (typeof userAnswer === 'string') {
          const userNorm = this.normalizeText(userAnswer);
          const fullSent = this.normalizeText(correctSentence.join(' '));
          isCorrect = userNorm === fullSent;
        }

        return {
          isCorrect,
          correctAnswer: correctSentence.join(' '),
          explanation: exercise.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'MATCHING_PAIRS': {
        // Pairs structure: [{ id, leftText, rightText }]
        // User answers should be map of leftId -> rightId or array of matched pairs
        const pairs: Array<{ id: string; leftText: string; rightText: string }> = data.pairs || [];
        let correctCount = 0;

        if (typeof userAnswer === 'object' && userAnswer !== null) {
          pairs.forEach((pair) => {
            if (userAnswer[pair.id] === pair.id || userAnswer[pair.leftText] === pair.rightText) {
              correctCount++;
            }
          });
        }

        const isCorrect = correctCount === pairs.length;

        return {
          isCorrect,
          correctAnswer: pairs.map((p) => `${p.leftText} = ${p.rightText}`).join(', '),
          explanation: exercise.explanation || 'All pairs must be matched accurately.',
          hint: exercise.hint,
        };
      }

      case 'IMAGE_SELECT': {
        const correctId = data.correctOptionId;
        const isCorrect = String(userAnswer).trim() === String(correctId).trim();
        const correctOption = data.options?.find((opt: any) => String(opt.id) === String(correctId));

        return {
          isCorrect,
          correctAnswer: correctOption ? correctOption.text : String(correctId),
          explanation: exercise.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'LISTENING_COMPREHENSION': {
        const correctId = data.correctOptionId;
        if (correctId) {
          const isCorrect = String(userAnswer).trim() === String(correctId).trim();
          const correctOption = data.options?.find((opt: any) => String(opt.id) === String(correctId));
          return {
            isCorrect,
            correctAnswer: correctOption ? correctOption.text : data.transcript || '',
            explanation: exercise.explanation || `Transcript: "${data.transcript}"`,
            hint: exercise.hint,
          };
        } else {
          // If free text transcript match
          const normalizedUser = this.normalizeText(String(userAnswer));
          const normalizedTranscript = this.normalizeText(data.transcript || '');
          const isCorrect = normalizedUser === normalizedTranscript;
          return {
            isCorrect,
            correctAnswer: data.transcript,
            explanation: exercise.explanation || `Transcript: "${data.transcript}"`,
            hint: exercise.hint,
          };
        }
      }

      case 'TRUE_FALSE': {
        const expectedBool = Boolean(data.isTrue);
        const userBool = typeof userAnswer === 'boolean' ? userAnswer : String(userAnswer).toLowerCase() === 'true';
        const isCorrect = userBool === expectedBool;

        return {
          isCorrect,
          correctAnswer: expectedBool ? 'True' : 'False',
          explanation: exercise.explanation || (expectedBool ? 'This statement is true.' : 'This statement is false.'),
          hint: exercise.hint,
        };
      }

      case 'SPEAKING_PRONUNCIATION': {
        const target = this.normalizeText(data.phraseToSpeak || exercise.prompt);
        const spoken = this.normalizeText(String(userAnswer));

        // Token match similarity calculation
        const targetWords = target.split(' ');
        const spokenWords = spoken.split(' ');
        let matches = 0;
        targetWords.forEach((word) => {
          if (spokenWords.includes(word)) matches++;
        });

        const similarity = targetWords.length > 0 ? matches / targetWords.length : 0;
        const isCorrect = similarity >= 0.75; // 75% accuracy threshold for speech

        return {
          isCorrect,
          correctAnswer: data.phraseToSpeak || exercise.prompt,
          explanation: isCorrect ? 'Great pronunciation!' : `Target phrase: "${data.phraseToSpeak || exercise.prompt}"`,
          hint: data.phoneticGuide || exercise.hint,
        };
      }

      default: {
        return {
          isCorrect: false,
          correctAnswer: '',
          explanation: 'Unknown exercise type',
        };
      }
    }
  }
}
