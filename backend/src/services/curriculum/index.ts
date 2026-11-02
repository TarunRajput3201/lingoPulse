import { Course, LanguageDefinition } from './types';
import { CurriculumGenerator } from './generator';
import { FRENCH_LANGUAGE } from './languages/french';
import { SPANISH_LANGUAGE } from './languages/spanish';
import { GERMAN_LANGUAGE } from './languages/german';
import { ITALIAN_LANGUAGE } from './languages/italian';
import { PORTUGUESE_LANGUAGE } from './languages/portuguese';
import { JAPANESE_LANGUAGE } from './languages/japanese';
import { KOREAN_LANGUAGE } from './languages/korean';
import { MANDARIN_LANGUAGE } from './languages/mandarin';
import { HINDI_LANGUAGE } from './languages/hindi';
import { ENGLISH_LANGUAGE } from './languages/english';

export * from './types';
export * from './unitThemes';
export * from './generator';

export const ALL_LANGUAGE_DEFINITIONS: Record<string, LanguageDefinition> = {
  'fr-en': FRENCH_LANGUAGE,
  fr: FRENCH_LANGUAGE,

  'es-en': SPANISH_LANGUAGE,
  es: SPANISH_LANGUAGE,

  'de-en': GERMAN_LANGUAGE,
  de: GERMAN_LANGUAGE,

  'it-en': ITALIAN_LANGUAGE,
  it: ITALIAN_LANGUAGE,

  'pt-en': PORTUGUESE_LANGUAGE,
  pt: PORTUGUESE_LANGUAGE,

  'ja-en': JAPANESE_LANGUAGE,
  ja: JAPANESE_LANGUAGE,

  'ko-en': KOREAN_LANGUAGE,
  ko: KOREAN_LANGUAGE,

  'zh-en': MANDARIN_LANGUAGE,
  zh: MANDARIN_LANGUAGE,

  'hi-en': HINDI_LANGUAGE,
  hi: HINDI_LANGUAGE,

  'en-es': ENGLISH_LANGUAGE,
  en: ENGLISH_LANGUAGE,
};

export const FLAGSHIP_LANGUAGES: LanguageDefinition[] = [
  ENGLISH_LANGUAGE,
  SPANISH_LANGUAGE,
  FRENCH_LANGUAGE,
  JAPANESE_LANGUAGE,
  GERMAN_LANGUAGE,
  KOREAN_LANGUAGE,
  ITALIAN_LANGUAGE,
  MANDARIN_LANGUAGE,
  PORTUGUESE_LANGUAGE,
  HINDI_LANGUAGE,
];

export function generateAllCourses(): Course[] {
  return FLAGSHIP_LANGUAGES.map((langDef) => CurriculumGenerator.generateCourse(langDef));
}

export function generateCourseByCode(code: string): Course | null {
  const norm = code.toLowerCase().trim();
  const langDef = ALL_LANGUAGE_DEFINITIONS[norm];
  if (!langDef) return null;
  return CurriculumGenerator.generateCourse(langDef);
}
