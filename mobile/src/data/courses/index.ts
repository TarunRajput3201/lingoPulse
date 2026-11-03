import { generateCourseByCode, generateAllCourses, Course as GenCourse, FLAGSHIP_LANGUAGES } from '../curriculum';
import type { StaticCourse } from '../staticCurriculum';

// In-memory cache for lazy, on-demand course instantiation (saves ~32MB at startup)
const courseCache = new Map<string, StaticCourse>();

export function getOrGenerateCourse(code: string): StaticCourse {
  if (!code) return getOrGenerateCourse('es-en');
  const norm = code.toLowerCase().trim().replace(/^course-/, '');
  if (courseCache.has(norm)) {
    return courseCache.get(norm)!;
  }
  const generated = (generateCourseByCode(norm) as unknown) as StaticCourse;
  if (generated) {
    courseCache.set(norm, generated);
    courseCache.set(`course-${norm}`, generated);
    courseCache.set(generated.code.toLowerCase(), generated);
    courseCache.set(generated.toLanguage.toLowerCase(), generated);
    if (generated.id) courseCache.set(generated.id.toLowerCase(), generated);
    if (generated._id) courseCache.set(generated._id.toLowerCase(), generated);
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

// Helper to create lazy plain-object course reference (NOT a Proxy, evaluated on-demand without blocking startup)
function createLazyCourseRef(code: string): StaticCourse {
  let cached: StaticCourse | null = null;
  const getCourse = () => {
    if (!cached) cached = getOrGenerateCourse(code);
    return cached;
  };

  return {
    get _id() { return getCourse()._id; },
    get id() { return getCourse().id; },
    get code() { return getCourse().code; },
    get title() { return getCourse().title; },
    get description() { return getCourse().description; },
    get fromLanguage() { return getCourse().fromLanguage; },
    get toLanguage() { return getCourse().toLanguage; },
    get flagIcon() { return getCourse().flagIcon; },
    get status() { return getCourse().status; },
    get order() { return getCourse().order; },
    get totalUnits() { return getCourse().totalUnits; },
    get totalLessons() { return getCourse().totalLessons; },
    get nativeName() { return getCourse().nativeName; },
    get isRTL() { return getCourse().isRTL; },
    get region() { return getCourse().region; },
    get units() { return getCourse().units; },
  } as StaticCourse;
}

// Backward-compatible course references (zero CPU work at bundle evaluation time)
export const ENGLISH_COURSE = createLazyCourseRef('en-es');
export const SPANISH_COURSE = createLazyCourseRef('es-en');
export const FRENCH_COURSE = createLazyCourseRef('fr-en');
export const JAPANESE_COURSE = createLazyCourseRef('ja-en');
export const GERMAN_COURSE = createLazyCourseRef('de-en');
export const KOREAN_COURSE = createLazyCourseRef('ko-en');
export const ITALIAN_COURSE = createLazyCourseRef('it-en');
export const MANDARIN_COURSE = createLazyCourseRef('zh-en');
export const PORTUGUESE_COURSE = createLazyCourseRef('pt-en');
export const HINDI_COURSE = createLazyCourseRef('hi-en');

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
  nativeName: langDef.nativeName,
  isRTL: langDef.isRTL || false,
  region: langDef.region || 'European',
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
  const norm = courseId.toLowerCase().trim().replace(/^course-/, '');
  return getOrGenerateCourse(norm);
};
