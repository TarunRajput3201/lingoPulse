import { VocabularyItem } from './types';

export function v(
  target: string,
  english: string,
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'expression',
  phonetic: string,
  exampleSentenceTarget: string,
  exampleSentenceEnglish: string,
  blankSentence: string,
  missingWord: string,
  distractors: string[]
): VocabularyItem {
  return {
    target,
    english,
    partOfSpeech,
    phonetic,
    exampleSentenceTarget,
    exampleSentenceEnglish,
    blankSentence,
    missingWord,
    distractors,
  };
}
