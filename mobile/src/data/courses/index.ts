import { generateAllCourses, Course as GenCourse } from '../curriculum';
import type { StaticCourse } from '../staticCurriculum';

export const ALL_COURSES: StaticCourse[] = (generateAllCourses() as unknown) as StaticCourse[];

export const ENGLISH_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'en-es')!;
export const SPANISH_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'es-en')!;
export const FRENCH_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'fr-en')!;
export const JAPANESE_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'ja-en')!;
export const GERMAN_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'de-en')!;
export const KOREAN_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'ko-en')!;
export const ITALIAN_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'it-en')!;
export const MANDARIN_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'zh-en')!;
export const PORTUGUESE_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'pt-en')!;
export const HINDI_COURSE: StaticCourse = ALL_COURSES.find((c) => c.code === 'hi-en')!;

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
      c.code.toLowerCase().startsWith(lang)
  );
  if (found) return found;

  // 3. Fallback to Spanish
  return SPANISH_COURSE;
};

export const getCourseById = (courseId: string): StaticCourse | undefined => {
  const norm = courseId.toLowerCase().trim();
  return (
    ALL_COURSES.find((c) => c.id === courseId || c._id === courseId || c.code.toLowerCase() === norm) ||
    getCourseByLanguage(norm)
  );
};
