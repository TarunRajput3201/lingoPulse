import {
  Course,
  Unit,
  Lesson,
  Exercise,
  LanguageDefinition,
  VocabularyItem,
  MatchingPair,
} from './types';
import { UNIT_THEMES } from './unitThemes';

export class CurriculumGenerator {
  public static generateCourse(langDef: LanguageDefinition): Course {
    const courseId = `course-${langDef.code}`;
    const units: Unit[] = [];
    const cumulativeVocab: VocabularyItem[] = [];

    // Iterate through all 50 units
    for (let u = 1; u <= 50; u++) {
      const theme = UNIT_THEMES[u - 1];
      const unitVocab = langDef.units[u] || [];
      cumulativeVocab.push(...unitVocab);

      const unitId = `unit-${langDef.toLanguage}-${u}`;
      const lessons: Lesson[] = [];

      // Exactly 5 sections per unit
      for (let s = 1; s <= 5; s++) {
        const lessonNumber = (u - 1) * 5 + s;
        const lessonId = `lesson-${langDef.toLanguage}-${u * 100 + s}`;
        const isCheckpoint = s === 5;
        const stepName =
          s === 1
            ? 'Step 1: Introduction & Single-Word Recognition'
            : s === 2
            ? 'Step 2: Listening & Audio Comprehension'
            : s === 3
            ? 'Step 3: Association & Spoken Practice'
            : s === 4
            ? 'Step 4: Word Order & Sentence Context'
            : 'Step 5: Unit Checkpoint & Cumulative Synthesis';

        const exercises: Exercise[] = this.generateExercisesForSection(
          u,
          s,
          lessonId,
          langDef,
          unitVocab,
          cumulativeVocab
        );

        lessons.push({
          id: lessonId,
          unitId,
          lessonNumber: s, // 1 to 5 per unit
          title: `${theme.title.split(':')[1]?.trim() || theme.title} — ${stepName.split(':')[1]?.trim() || stepName}`,
          type: isCheckpoint ? 'checkpoint' : 'standard',
          xpReward: isCheckpoint ? 25 : 15 + (s - 1) * 2,
          order: s,
          status: 'published',
          exercises,
        });
      }

      units.push({
        id: unitId,
        courseId,
        unitNumber: u,
        title: theme.title,
        description: theme.description,
        themeColor: theme.themeColor,
        icon: theme.icon,
        status: 'published',
        lessons,
      });
    }

    return {
      _id: courseId,
      id: courseId,
      code: langDef.code,
      title: langDef.title,
      description: langDef.description,
      fromLanguage: langDef.fromLanguage,
      toLanguage: langDef.toLanguage,
      flagIcon: langDef.flagIcon,
      level: langDef.level,
      status: 'published',
      order: langDef.order,
      totalUnits: units.length,
      totalLessons: units.reduce((acc, u) => acc + u.lessons.length, 0),
      units,
    };
  }

  private static generateExercisesForSection(
    unitNumber: number,
    sectionNumber: number,
    lessonId: string,
    langDef: LanguageDefinition,
    unitVocab: VocabularyItem[],
    cumulativeVocab: VocabularyItem[]
  ): Exercise[] {
    const exercises: Exercise[] = [];
    const lang = langDef.toLanguage;
    const vLen = unitVocab.length || 1;

    // Helper to get vocab item deterministically
    const getV = (offset: number): VocabularyItem => {
      const idx = ((sectionNumber - 1) * 2 + offset) % vLen;
      return unitVocab[idx] || unitVocab[0] || {
        target: 'Bonjour',
        english: 'Hello',
        phonetic: 'bon-ZHOOR',
        partOfSpeech: 'phrase',
        exampleSentenceTarget: 'Bonjour, comment allez-vous ?',
        exampleSentenceEnglish: 'Hello, how are you?',
        blankSentence: '___, comment allez-vous ?',
        missingWord: 'Bonjour',
        distractors: ['Au revoir', 'Merci', 'Oui'],
      };
    };

    // Helper to get 3 familiar distractors
    const getFamiliarDistractors = (targetWord: string, isEnglish = false): string[] => {
      const pool = cumulativeVocab
        .map((item) => (isEnglish ? item.english : item.target))
        .filter((w) => w.toLowerCase() !== targetWord.toLowerCase());
      const unique = Array.from(new Set(pool));
      if (unique.length >= 3) {
        return unique.slice(-3);
      }
      return isEnglish ? ['Goodbye', 'Please', 'Thank you'] : ['Merci', 'Oui', 'Non'];
    };

    // 15 varied exercises:
    // Q1: MULTIPLE_CHOICE (English meaning to Target word recognition)
    const v1 = getV(0);
    const q1Distractors = getFamiliarDistractors(v1.target, false);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-1`,
      lessonId,
      type: 'MULTIPLE_CHOICE',
      prompt: `Select the correct ${langDef.title.split(' ')[0]} word for "${v1.english}":`,
      instruction: 'Choose the matching meaning',
      order: 1,
      explanation: `"${v1.target}" means "${v1.english}" in ${langDef.title.split(' ')[0]}.`,
      data: {
        correctOptionId: `opt-1-correct`,
        options: [
          { id: 'opt-1-correct', text: v1.target },
          { id: 'opt-1-dist-1', text: q1Distractors[0] },
          { id: 'opt-1-dist-2', text: q1Distractors[1] },
          { id: 'opt-1-dist-3', text: q1Distractors[2] },
        ].sort((a, b) => a.text.localeCompare(b.text)),
      },
    });

    // Q2: FILL_IN_THE_BLANK (Missing word in context)
    const v2 = getV(1);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-2`,
      lessonId,
      type: 'FILL_IN_THE_BLANK',
      prompt: 'Complete the sentence with the missing word:',
      instruction: 'Fill in the blank space',
      order: 2,
      explanation: `The sentence is: "${v2.exampleSentenceTarget}" ("${v2.exampleSentenceEnglish}").`,
      data: {
        sentenceWithBlank: v2.blankSentence,
        acceptableAnswers: [v2.missingWord, v2.missingWord.toLowerCase()],
        options: [v2.missingWord, ...v2.distractors]
          .sort()
          .map((w, i) => ({ id: `opt-b-${i}`, text: w })),
      },
    });

    // Q3: MATCHING_PAIRS (4 pairs)
    const p1 = getV(0);
    const p2 = getV(1);
    const p3 = getV(2);
    const p4 = getV(3);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-3`,
      lessonId,
      type: 'MATCHING_PAIRS',
      prompt: `Match the ${langDef.title.split(' ')[0]} terms with their English meanings:`,
      instruction: 'Tap matching pairs to link them',
      order: 3,
      explanation: 'Essential vocabulary associations for this unit.',
      data: {
        pairs: [
          { id: `pair-1`, leftText: p1.target, rightText: p1.english },
          { id: `pair-2`, leftText: p2.target, rightText: p2.english },
          { id: `pair-3`, leftText: p3.target, rightText: p3.english },
          { id: `pair-4`, leftText: p4.target, rightText: p4.english },
        ],
      },
    });

    // Q4: TRANSLATION (English to Target Language)
    const v4 = getV(1);
    const q4Answers = [
      v4.target,
      v4.target.toLowerCase(),
      v4.target.replace(/[.!?¿¡]/g, ''),
    ];
    if (v4.target.toLowerCase().includes('mucho gusto')) {
      q4Answers.push('Encantado, soy David', 'encantado, soy david', 'Mucho gusto, soy David');
    }
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-4`,
      lessonId,
      type: 'TRANSLATION',
      prompt: `Translate into ${langDef.title.split(' ')[0]}: "${v4.english}"`,
      instruction: 'Type your answer in the target language',
      order: 4,
      explanation: `"${v4.english}" translates to "${v4.target}".`,
      data: {
        acceptableAnswers: q4Answers,
      },
    });

    // Q5: WORD_ORDER (Scrambled phrase tokens)
    const v5 = getV(3);
    const v5Tokens = v5.exampleSentenceTarget.replace(/[.,!?;¿¡]/g, '').split(/\s+/).filter(Boolean);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-5`,
      lessonId,
      type: 'WORD_ORDER',
      prompt: 'Arrange the words in the correct grammatical order:',
      instruction: 'Tap words in the proper sequence',
      order: 5,
      explanation: `The correct order is: "${v5.exampleSentenceTarget}".`,
      data: {
        sourcePrompt: v5.exampleSentenceEnglish,
        fullSentence: v5.exampleSentenceTarget,
        scrambledWords: [...v5Tokens].sort(() => 0.5 - Math.random()),
        correctOrder: v5Tokens,
      },
    });

    // Q6: LISTENING_COMPREHENSION
    const v6 = getV(4);
    const q6Distractors = getFamiliarDistractors(v6.target);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-6`,
      lessonId,
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Listen carefully and select the spoken expression:',
      instruction: 'Identify the exact spoken phrase',
      audioUrl: `https://actions.google.com/sounds/v1/speech/${lang}_u${unitNumber}.mp3`,
      order: 6,
      explanation: `The speaker said: "${v6.target}" (${v6.english}).`,
      data: {
        audioUrl: `https://actions.google.com/sounds/v1/speech/${lang}_u${unitNumber}.mp3`,
        transcript: v6.target,
        correctOptionId: 'opt-6-correct',
        options: [
          { id: 'opt-6-correct', text: v6.target },
          { id: 'opt-6-dist-1', text: q6Distractors[0] },
          { id: 'opt-6-dist-2', text: q6Distractors[1] },
          { id: 'opt-6-dist-3', text: q6Distractors[2] },
        ].sort((a, b) => a.text.localeCompare(b.text)),
      },
    });

    // Q7: TRUE_FALSE
    const v7 = getV(5);
    const isTrueVal = (unitNumber + sectionNumber) % 2 === 0;
    const q7Distractor = getFamiliarDistractors(v7.english, true)[0];
    const statedMeaning = isTrueVal ? v7.english : q7Distractor;
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-7`,
      lessonId,
      type: 'TRUE_FALSE',
      prompt: `True or False: In ${langDef.title.split(' ')[0]}, "${v7.target}" means "${statedMeaning}".`,
      instruction: 'Select True or False',
      order: 7,
      explanation: `"${v7.target}" means "${v7.english}".`,
      data: {
        statement: `"${v7.target}" means "${statedMeaning}".`,
        isTrue: isTrueVal,
      },
    });

    // Q8: SPEAKING_PRONUNCIATION
    const v8 = getV(6);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-8`,
      lessonId,
      type: 'SPEAKING_PRONUNCIATION',
      prompt: `Pronounce the following phrase out loud:`,
      instruction: 'Speak clearly into your microphone',
      order: 8,
      explanation: `Pronunciation guide: [${v8.phonetic || v8.target}]`,
      data: {
        phraseToSpeak: v8.target,
        phoneticGuide: v8.phonetic || v8.target,
      },
    });

    // Q9: MULTIPLE_CHOICE (English to Target Language reverse recognition)
    const v9 = getV(7);
    const q9Distractors = getFamiliarDistractors(v9.target);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-9`,
      lessonId,
      type: 'MULTIPLE_CHOICE',
      prompt: `Which of the following means "${v9.english}"?`,
      instruction: 'Select the correct target word',
      order: 9,
      explanation: `"${v9.english}" is translated as "${v9.target}".`,
      data: {
        correctOptionId: 'opt-9-correct',
        options: [
          { id: 'opt-9-correct', text: v9.target },
          { id: 'opt-9-dist-1', text: q9Distractors[0] },
          { id: 'opt-9-dist-2', text: q9Distractors[1] },
          { id: 'opt-9-dist-3', text: q9Distractors[2] },
        ].sort((a, b) => a.text.localeCompare(b.text)),
      },
    });

    // Q10: FILL_IN_THE_BLANK (Grammar / missing word)
    const v10 = getV(8);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-10`,
      lessonId,
      type: 'FILL_IN_THE_BLANK',
      prompt: 'Fill in the blank to complete the statement:',
      instruction: 'Select or type the missing term',
      order: 10,
      explanation: `Correct sentence: "${v10.exampleSentenceTarget}".`,
      data: {
        sentenceWithBlank: v10.blankSentence,
        acceptableAnswers: [v10.missingWord, v10.missingWord.toLowerCase()],
        options: [v10.missingWord, ...v10.distractors]
          .sort()
          .map((w, i) => ({ id: `opt-b10-${i}`, text: w })),
      },
    });

    // Q11: TRANSLATION (Target sentence to English)
    const v11 = getV(2);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-11`,
      lessonId,
      type: 'TRANSLATION',
      prompt: `Translate this phrase to English: "${v11.exampleSentenceTarget}"`,
      instruction: 'Type your answer in English',
      order: 11,
      explanation: `"${v11.exampleSentenceTarget}" translates to "${v11.exampleSentenceEnglish}".`,
      data: {
        acceptableAnswers: [
          v11.exampleSentenceEnglish,
          v11.exampleSentenceEnglish.replace(/[.!?]/g, ''),
          v11.exampleSentenceEnglish.toLowerCase(),
        ],
      },
    });

    // Q12: WORD_ORDER (Reverse or longer sentence order)
    const v12 = getV(1);
    const v12Tokens = v12.exampleSentenceTarget.replace(/[.,!?;¿¡]/g, '').split(/\s+/).filter(Boolean);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-12`,
      lessonId,
      type: 'WORD_ORDER',
      prompt: 'Assemble the words to construct the proper sentence:',
      instruction: 'Tap words in correct sequence',
      order: 12,
      explanation: `Correct structure: "${v12.exampleSentenceTarget}".`,
      data: {
        sourcePrompt: v12.exampleSentenceEnglish,
        fullSentence: v12.exampleSentenceTarget,
        scrambledWords: [...v12Tokens].sort(() => 0.5 - Math.random()),
        correctOrder: v12Tokens,
      },
    });

    // Q13: MATCHING_PAIRS (Cumulative Review pairs)
    const cLen = cumulativeVocab.length;
    const cp1 = cumulativeVocab[Math.max(0, cLen - 1)] || v1;
    const cp2 = cumulativeVocab[Math.max(0, cLen - 2)] || v2;
    const cp3 = cumulativeVocab[Math.max(0, cLen - 3)] || v4;
    const cp4 = cumulativeVocab[Math.max(0, cLen - 4)] || v5;
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-13`,
      lessonId,
      type: 'MATCHING_PAIRS',
      prompt: 'Cumulative Review: Connect the learned pairs:',
      instruction: 'Link matching vocabulary pairs',
      order: 13,
      explanation: 'Cumulative spaced revision reinforces long-term vocabulary retention.',
      data: {
        pairs: [
          { id: 'cpair-1', leftText: cp1.target, rightText: cp1.english },
          { id: 'cpair-2', leftText: cp2.target, rightText: cp2.english },
          { id: 'cpair-3', leftText: cp3.target, rightText: cp3.english },
          { id: 'cpair-4', leftText: cp4.target, rightText: cp4.english },
        ],
      },
    });

    // Q14: MULTIPLE_CHOICE (Contextual dialogue / situation response)
    const v14 = getV(2);
    const q14Distractors = getFamiliarDistractors(v14.exampleSentenceTarget);
    exercises.push({
      id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-14`,
      lessonId,
      type: 'MULTIPLE_CHOICE',
      prompt: `In this situation, which phrase is the most natural? "${v14.exampleSentenceEnglish}"`,
      instruction: 'Select the most appropriate contextual response',
      order: 14,
      explanation: `"${v14.exampleSentenceTarget}" is the most natural expression in this context.`,
      data: {
        correctOptionId: 'opt-14-correct',
        options: [
          { id: 'opt-14-correct', text: v14.exampleSentenceTarget },
          { id: 'opt-14-dist-1', text: q14Distractors[0] },
          { id: 'opt-14-dist-2', text: q14Distractors[1] },
          { id: 'opt-14-dist-3', text: q14Distractors[2] },
        ].sort((a, b) => a.text.localeCompare(b.text)),
      },
    });

    // Q15: PEDAGOGICAL BOUNDARY:
    // Units 1 to 14: Short word order / phrase assembly (Easy / Medium, NO hard sentence construction)
    // Units 15+: Complete multi-clause sentence construction using cumulative vocabulary (Hard)
    const isHardAllowed = unitNumber >= 15;
    const v15 = getV(3);
    const v15Sentence = isHardAllowed
      ? `${v15.exampleSentenceTarget}`
      : v15.target;
    const v15Tokens = v15Sentence.replace(/[.,!?;¿¡]/g, '').split(/\s+/).filter(Boolean);
    const extraDistractors = getFamiliarDistractors(v15Tokens[0] || v15.target).slice(0, 2);

    if (isHardAllowed) {
      exercises.push({
        id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-15`,
        lessonId,
        type: 'SENTENCE_CONSTRUCTION',
        prompt: `Construct a complete, grammatically correct sentence using the word bank: "${v15.exampleSentenceEnglish}"`,
        instruction: 'Build the full sentence using the word bank',
        order: 15,
        explanation: `Full sentence: "${v15.exampleSentenceTarget}".`,
        data: {
          sourcePrompt: v15.exampleSentenceEnglish,
          fullSentence: v15.exampleSentenceTarget,
          wordBank: [...v15Tokens, ...extraDistractors].sort(() => 0.5 - Math.random()),
          correctSentence: v15Tokens,
          acceptableSentences: [
            v15.exampleSentenceTarget,
            v15.exampleSentenceTarget.replace(/[.,!?]/g, ''),
          ],
        },
      });
    } else {
      exercises.push({
        id: `ex-${lang}-u${unitNumber}-s${sectionNumber}-15`,
        lessonId,
        type: 'WORD_ORDER',
        prompt: `Assemble the phrase tokens: "${v15.english}"`,
        instruction: 'Tap words in the correct order',
        order: 15,
        explanation: `The phrase is: "${v15.target}".`,
        data: {
          sourcePrompt: v15.english,
          fullSentence: v15.target,
          scrambledWords: [...v15Tokens].sort(() => 0.5 - Math.random()),
          correctOrder: v15Tokens,
        },
      });
    }

    return exercises;
  }
}
