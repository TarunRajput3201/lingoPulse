import { ENGLISH_COURSE } from './english';
import { SPANISH_COURSE } from './spanish';
import { FRENCH_COURSE } from './french';
import { JAPANESE_COURSE } from './japanese';
import { GERMAN_COURSE } from './german';
import { KOREAN_COURSE } from './korean';
import { ITALIAN_COURSE } from './italian';
import { MANDARIN_COURSE } from './mandarin';
import { PORTUGUESE_COURSE } from './portuguese';
import { HINDI_COURSE } from './hindi';
import type { StaticCourse } from '../staticCurriculum';

export {
  ENGLISH_COURSE,
  SPANISH_COURSE,
  FRENCH_COURSE,
  JAPANESE_COURSE,
  GERMAN_COURSE,
  KOREAN_COURSE,
  ITALIAN_COURSE,
  MANDARIN_COURSE,
  PORTUGUESE_COURSE,
  HINDI_COURSE,
};

export const ALL_COURSES: StaticCourse[] = [
  ENGLISH_COURSE,
  SPANISH_COURSE,
  FRENCH_COURSE,
  JAPANESE_COURSE,
  GERMAN_COURSE,
  KOREAN_COURSE,
  ITALIAN_COURSE,
  MANDARIN_COURSE,
  PORTUGUESE_COURSE,
  HINDI_COURSE,
];

export const getCourseByCode = (code: string): StaticCourse | undefined => {
  const norm = code.toLowerCase().trim();
  return ALL_COURSES.find((c) => c.code.toLowerCase() === norm);
};

// Explicit canonical mapping table for all 10 flagship languages
const LANGUAGE_COURSE_MAP: Record<string, StaticCourse> = {
  en: ENGLISH_COURSE,
  english: ENGLISH_COURSE,
  'en-es': ENGLISH_COURSE,

  es: SPANISH_COURSE,
  spanish: SPANISH_COURSE,
  'es-en': SPANISH_COURSE,

  fr: FRENCH_COURSE,
  french: FRENCH_COURSE,
  'fr-en': FRENCH_COURSE,

  ja: JAPANESE_COURSE,
  japanese: JAPANESE_COURSE,
  'ja-en': JAPANESE_COURSE,

  de: GERMAN_COURSE,
  german: GERMAN_COURSE,
  'de-en': GERMAN_COURSE,

  ko: KOREAN_COURSE,
  korean: KOREAN_COURSE,
  'ko-en': KOREAN_COURSE,

  it: ITALIAN_COURSE,
  italian: ITALIAN_COURSE,
  'it-en': ITALIAN_COURSE,

  zh: MANDARIN_COURSE,
  mandarin: MANDARIN_COURSE,
  chinese: MANDARIN_COURSE,
  'zh-en': MANDARIN_COURSE,

  pt: PORTUGUESE_COURSE,
  portuguese: PORTUGUESE_COURSE,
  'pt-en': PORTUGUESE_COURSE,

  hi: HINDI_COURSE,
  hindi: HINDI_COURSE,
  'hi-en': HINDI_COURSE,
};

export const getCourseByLanguage = (targetLang?: string): StaticCourse | undefined => {
  if (!targetLang) return undefined;
  const lang = targetLang.toLowerCase().trim();

  // 1. Direct canonical map lookup
  if (LANGUAGE_COURSE_MAP[lang]) {
    return LANGUAGE_COURSE_MAP[lang];
  }

  // 2. Exact match in catalog
  const found = ALL_COURSES.find(
    (c) =>
      c.toLanguage.toLowerCase() === lang ||
      c.code.toLowerCase() === lang ||
      c.code.toLowerCase().startsWith(`${lang}-`) ||
      c.title.toLowerCase().startsWith(lang)
  );

  return found;
};

export const getCourseById = (courseId: string): StaticCourse | undefined => {
  return ALL_COURSES.find((c) => c.id === courseId || c._id === courseId);
};
