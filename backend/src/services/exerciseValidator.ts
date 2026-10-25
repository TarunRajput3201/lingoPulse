import { IExercise } from '../models/Exercise';

export interface ValidationResult {
  isCorrect: boolean;
  correctAnswer: any;
  explanation: string;
  hint?: string;
  pedagogicalTip?: string;
  hasAccentWarning?: boolean;
}

export class ExerciseValidator {
  /**
   * Helper to normalize text:
   * - converts smart punctuation to standard
   * - converts to lowercase
   * - strips punctuation (including Spanish ¿ and ¡)
   * - collapses extra spaces
   */
  public static normalizeText(text: string): string {
    if (!text) return '';
    return text
      .trim()
      .toLowerCase()
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿¡!"«»]/g, '')
      .replace(/\s+/g, ' ');
  }

  /**
   * Helper to strip Unicode diacritics and accents (e.g. á -> a, é -> e, ñ -> n)
   */
  public static stripAccents(text: string): string {
    if (!text) return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Compares user input against a list of acceptable answers with accent tolerance.
   * If exact match: isCorrect=true, hasAccentWarning=false
   * If matched without accents: isCorrect=true, hasAccentWarning=true (soft reminder, no heart loss)
   */
  public static compareWithAccentTolerance(
    userInput: string,
    acceptableAnswers: string[]
  ): { isCorrect: boolean; hasAccentWarning: boolean; canonicalMatch: string } {
    if (!acceptableAnswers || acceptableAnswers.length === 0) {
      return { isCorrect: false, hasAccentWarning: false, canonicalMatch: '' };
    }

    const normUser = this.normalizeText(userInput);

    // 1. Exact normalized match (including accents)
    for (const ans of acceptableAnswers) {
      if (this.normalizeText(ans) === normUser) {
        return { isCorrect: true, hasAccentWarning: false, canonicalMatch: ans };
      }
    }

    // 2. Accent-tolerant match (NFD diacritic stripping)
    const strippedUser = this.stripAccents(normUser);
    for (const ans of acceptableAnswers) {
      const strippedAns = this.stripAccents(this.normalizeText(ans));
      if (strippedAns === strippedUser) {
        return { isCorrect: true, hasAccentWarning: true, canonicalMatch: ans };
      }
    }

    // 3. No match
    return { isCorrect: false, hasAccentWarning: false, canonicalMatch: acceptableAnswers[0] };
  }

  /**
   * Authoritatively validate user's answer against exercise data.
   */
  public static validate(exercise: IExercise, userAnswer: any): ValidationResult {
    const data = exercise.data || {};

    switch (exercise.type) {
      case 'MULTIPLE_CHOICE': {
        const correctId = String(data.correctOptionId || '').trim();
        const correctOption = data.options?.find((opt: any) => String(opt.id).trim() === correctId);
        const correctText = correctOption ? correctOption.text : correctId;

        const rawUser = String(userAnswer || '').trim();
        const normUser = this.normalizeText(rawUser);

        // Check matching by ID or by option text
        const isMatchById = rawUser === correctId;
        const isMatchByText = correctOption && this.normalizeText(correctOption.text) === normUser;
        const isCorrect = Boolean(isMatchById || isMatchByText);

        return {
          isCorrect,
          correctAnswer: correctText,
          explanation: exercise.explanation || data.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'FILL_IN_THE_BLANK': {
        const acceptable: string[] = data.acceptableAnswers || [];
        const { isCorrect, hasAccentWarning, canonicalMatch } = this.compareWithAccentTolerance(
          String(userAnswer || ''),
          acceptable
        );

        let pedagogicalTip: string | undefined;
        if (hasAccentWarning) {
          pedagogicalTip = `Great job! Notice the accent mark in "${canonicalMatch}".`;
        }

        return {
          isCorrect,
          hasAccentWarning,
          pedagogicalTip,
          correctAnswer: canonicalMatch || acceptable[0] || '',
          explanation: exercise.explanation || `The correct word is "${canonicalMatch || acceptable[0]}".`,
          hint: exercise.hint,
        };
      }

      case 'TRANSLATION': {
        const acceptable: string[] = data.acceptableAnswers || [];
        const { isCorrect, hasAccentWarning, canonicalMatch } = this.compareWithAccentTolerance(
          String(userAnswer || ''),
          acceptable
        );

        let pedagogicalTip: string | undefined;
        if (hasAccentWarning) {
          pedagogicalTip = `Correct translation! Watch the accent marks: "${canonicalMatch}".`;
        }

        return {
          isCorrect,
          hasAccentWarning,
          pedagogicalTip,
          correctAnswer: canonicalMatch || acceptable[0] || '',
          explanation: exercise.explanation || `Correct translation: "${canonicalMatch || acceptable[0]}"`,
          hint: exercise.hint,
        };
      }

      case 'WORD_ORDER': {
        const correctOrder: string[] = data.correctOrder || [];
        const fullSent = data.fullSentence || correctOrder.join(' ');
        const acceptableList = [fullSent, correctOrder.join(' ')];

        let userString = '';
        if (Array.isArray(userAnswer)) {
          userString = userAnswer.join(' ');
        } else if (typeof userAnswer === 'string') {
          userString = userAnswer;
        }

        const { isCorrect, hasAccentWarning, canonicalMatch } = this.compareWithAccentTolerance(
          userString,
          acceptableList
        );

        return {
          isCorrect,
          hasAccentWarning,
          pedagogicalTip: hasAccentWarning ? `Correct order! Remember: "${canonicalMatch}"` : undefined,
          correctAnswer: fullSent,
          explanation: exercise.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'SENTENCE_CONSTRUCTION': {
        const correctSentence: string[] = data.correctSentence || [];
        const fullSent = correctSentence.join(' ');
        const acceptableList = [fullSent];
        if (data.acceptableSentences && Array.isArray(data.acceptableSentences)) {
          acceptableList.push(...data.acceptableSentences);
        }

        let userString = '';
        if (Array.isArray(userAnswer)) {
          userString = userAnswer.join(' ');
        } else if (typeof userAnswer === 'string') {
          userString = userAnswer;
        }

        const { isCorrect, hasAccentWarning, canonicalMatch } = this.compareWithAccentTolerance(
          userString,
          acceptableList
        );

        return {
          isCorrect,
          hasAccentWarning,
          pedagogicalTip: hasAccentWarning ? `Almost perfect! Notice the accents: "${canonicalMatch}"` : undefined,
          correctAnswer: fullSent,
          explanation: exercise.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'MATCHING_PAIRS': {
        const pairs: Array<{ id: string; leftText: string; rightText: string }> = data.pairs || [];
        let correctCount = 0;

        if (typeof userAnswer === 'object' && userAnswer !== null) {
          pairs.forEach((pair) => {
            const userRight = userAnswer[pair.id] ?? userAnswer[pair.leftText];
            if (userRight !== undefined) {
              const matchedById = String(userRight).trim() === String(pair.id).trim();
              const matchedByText =
                this.normalizeText(String(userRight)) === this.normalizeText(pair.rightText);
              if (matchedById || matchedByText) {
                correctCount++;
              }
            }
          });
        }

        const isCorrect = pairs.length > 0 && correctCount === pairs.length;

        return {
          isCorrect,
          correctAnswer: pairs.map((p) => `${p.leftText} = ${p.rightText}`).join(', '),
          explanation: exercise.explanation || 'All pairs must be matched accurately.',
          hint: exercise.hint,
        };
      }

      case 'IMAGE_SELECT': {
        const correctId = String(data.correctOptionId || '').trim();
        const correctOption = data.options?.find((opt: any) => String(opt.id).trim() === correctId);
        const correctText = correctOption ? correctOption.text : correctId;

        const rawUser = String(userAnswer || '').trim();
        const isMatchById = rawUser === correctId;
        const isMatchByText = correctOption && this.normalizeText(correctOption.text) === this.normalizeText(rawUser);
        const isCorrect = Boolean(isMatchById || isMatchByText);

        return {
          isCorrect,
          correctAnswer: correctText,
          explanation: exercise.explanation || '',
          hint: exercise.hint,
        };
      }

      case 'LISTENING_COMPREHENSION': {
        const correctId = data.correctOptionId;
        if (correctId) {
          const correctOption = data.options?.find((opt: any) => String(opt.id) === String(correctId));
          const rawUser = String(userAnswer || '').trim();
          const isCorrect =
            rawUser === String(correctId).trim() ||
            (correctOption && this.normalizeText(correctOption.text) === this.normalizeText(rawUser));

          return {
            isCorrect,
            correctAnswer: correctOption ? correctOption.text : data.transcript || '',
            explanation: exercise.explanation || `Transcript: "${data.transcript}"`,
            hint: exercise.hint,
          };
        } else {
          // Free text transcript match
          const acceptable = [data.transcript || ''];
          if (Array.isArray(data.acceptableAnswers)) acceptable.push(...data.acceptableAnswers);
          const { isCorrect, hasAccentWarning, canonicalMatch } = this.compareWithAccentTolerance(
            String(userAnswer || ''),
            acceptable
          );

          return {
            isCorrect,
            hasAccentWarning,
            pedagogicalTip: hasAccentWarning ? `Great listening! Note the accent in: "${canonicalMatch}"` : undefined,
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
        const target = this.stripAccents(this.normalizeText(data.phraseToSpeak || exercise.prompt));
        const spoken = this.stripAccents(this.normalizeText(String(userAnswer || '')));

        const targetWords = target.split(' ').filter(Boolean);
        const spokenWords = spoken.split(' ').filter(Boolean);
        let matches = 0;
        targetWords.forEach((word) => {
          if (spokenWords.includes(word)) matches++;
        });

        const similarity = targetWords.length > 0 ? matches / targetWords.length : 0;
        const isCorrect = similarity >= 0.70; // 70% threshold for mobile speech input

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
