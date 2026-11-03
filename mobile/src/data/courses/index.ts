import { generateCourseByCode, generateAllCourses, Course as GenCourse, FLAGSHIP_LANGUAGES } from '../curriculum';
import type { StaticCourse } from '../staticCurriculum';

// In-memory cache for lazy, on-demand course instantiation (saves ~32MB at startup)
const courseCache = new Map<string, StaticCourse>();

export function getOrGenerateCourse(code: string): StaticCourse {
  const norm = code.toLowerCase().trim();
  if (courseCache.has(norm)) {
    return courseCache.get(norm)!;
  }
  const generated = (generateCourseByCode(norm) as unknown) as StaticCourse;
  if (generated) {
    courseCache.set(norm, generated);
    courseCache.set(generated.code.toLowerCase(), generated);
    courseCache.set(generated.toLanguage.toLowerCase(), generated);
    return generated;
  }
  // Fallback to Spanish if specific code not found
  if (norm !== 'es' && norm !== 'es-en') {
    return getOrGenerateCourse('es-en');
  }
  throw new Error(`Failed to generate course for code: ${code}`);
}

// Lazy getters for flagship courses - safe functions, NO PROXIES
export const getEnglishCourse = (): StaticCourse => getOrGenerateCourse('en-es');
export const getSpanishCourse = (): StaticCourse => getOrGenerateCourse('es-en');
export const getFrenchCourse = (): StaticCourse => getOrGenerateCourse('fr-en');
export const getJapaneseCourse = (): StaticCourse => getOrGenerateCourse('ja-en');
export const getGermanCourse = (): StaticCourse => getOrGenerateCourse('de-en');
export const getKoreanCourse = (): StaticCourse => getOrGenerateCourse('ko-en');
export const getItalianCourse = (): StaticCourse => getOrGenerateCourse('it-en');
export const getMandarinCourse = (): StaticCourse => getOrGenerateCourse('zh-en');
export const getPortugueseCourse = (): StaticCourse => getOrGenerateCourse('pt-en');
export const getHindiCourse = (): StaticCourse => getOrGenerateCourse('hi-en');

// Backward-compatible course getters
export const ENGLISH_COURSE = getEnglishCourse();
export const SPANISH_COURSE = getSpanishCourse();
export const FRENCH_COURSE = getFrenchCourse();
export const JAPANESE_COURSE = getJapaneseCourse();
export const GERMAN_COURSE = getGermanCourse();
export const KOREAN_COURSE = getKoreanCourse();
export const ITALIAN_COURSE = getItalianCourse();
export const MANDARIN_COURSE = getMandarinCourse();
export const PORTUGUESE_COURSE = getPortugueseCourse();
export const HINDI_COURSE = getHindiCourse();

// Lightweight metadata catalog for course selection (Zero memory overhead)
export const COURSE_CATALOG_SUMMARIES = FLAGSHIP_LANGUAGES.map((langDef) => ({
  _id: `course-${langDef.code}`,
  id: `course-${langDef.code}`,
  code: langDef.code,
  title: langDef.title,
  description: langDef.description,
  fromLanguage: langDef.fromLanguage,
  toLanguage: langDef.toLanguage,
  flagIcon: langDef.flagIcon,
  level: langDef.level,
  status: 'published' as const,
  order: langDef.order,
  totalUnits: 50,
  totalLessons: 250,
}));

// On-demand cache for ALL_COURSES (plain array, NO Proxy)
let _allCoursesCache: StaticCourse[] | null = null;
export function getAllCourses(): StaticCourse[] {
  if (!_allCoursesCache) {
    _allCoursesCache = (generateAllCourses() as unknown) as StaticCourse[];
  }
  return _allCoursesCache;
}

export const ALL_COURSES: StaticCourse[] = [];

export const getCourseByCode = (code: string): StaticCourse | undefined => {
  if (!code) return undefined;
  return getOrGenerateCourse(code);
};

export const getCourseByLanguage = (targetLang?: string): StaticCourse | undefined => {
  if (!targetLang) return undefined;
  const lang = targetLang.toLowerCase().trim();
  return getOrGenerateCourse(lang);
};

export const getCourseById = (courseId: string): StaticCourse | undefined => {
  if (!courseId) return undefined;
  const norm = courseId.toLowerCase().trim();
  return getOrGenerateCourse(norm);
};
