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

export const getCourseByLanguage = (targetLang?: string): StaticCourse => {
  if (!targetLang) return SPANISH_COURSE;
  const lang = targetLang.toLowerCase().trim();
  const found = ALL_COURSES.find(
    (c) => c.toLanguage.toLowerCase() === lang || c.code.toLowerCase().startsWith(`${lang}-`)
  );
  return found || SPANISH_COURSE;
};

export const getCourseById = (courseId: string): StaticCourse | undefined => {
  return ALL_COURSES.find((c) => c.id === courseId || c._id === courseId);
};
