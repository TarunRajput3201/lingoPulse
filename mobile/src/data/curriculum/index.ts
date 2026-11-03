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

// 28 New Languages
import { ARABIC_LANGUAGE } from './languages/arabic';
import { RUSSIAN_LANGUAGE } from './languages/russian';
import { DUTCH_LANGUAGE } from './languages/dutch';
import { TURKISH_LANGUAGE } from './languages/turkish';
import { SWEDISH_LANGUAGE } from './languages/swedish';
import { NORWEGIAN_LANGUAGE } from './languages/norwegian';
import { DANISH_LANGUAGE } from './languages/danish';
import { POLISH_LANGUAGE } from './languages/polish';
import { GREEK_LANGUAGE } from './languages/greek';
import { HEBREW_LANGUAGE } from './languages/hebrew';
import { THAI_LANGUAGE } from './languages/thai';
import { VIETNAMESE_LANGUAGE } from './languages/vietnamese';
import { INDONESIAN_LANGUAGE } from './languages/indonesian';
import { MALAY_LANGUAGE } from './languages/malay';
import { TAGALOG_LANGUAGE } from './languages/tagalog';
import { BENGALI_LANGUAGE } from './languages/bengali';
import { URDU_LANGUAGE } from './languages/urdu';
import { PUNJABI_LANGUAGE } from './languages/punjabi';
import { TAMIL_LANGUAGE } from './languages/tamil';
import { TELUGU_LANGUAGE } from './languages/telugu';
import { MARATHI_LANGUAGE } from './languages/marathi';
import { GUJARATI_LANGUAGE } from './languages/gujarati';
import { UKRAINIAN_LANGUAGE } from './languages/ukrainian';
import { PERSIAN_LANGUAGE } from './languages/persian';
import { SWAHILI_LANGUAGE } from './languages/swahili';
import { ROMANIAN_LANGUAGE } from './languages/romanian';
import { CZECH_LANGUAGE } from './languages/czech';
import { HUNGARIAN_LANGUAGE } from './languages/hungarian';

export * from './types';
export * from './unitThemes';
export * from './generator';

export const ALL_LANGUAGES: LanguageDefinition[] = [
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
  ARABIC_LANGUAGE,
  RUSSIAN_LANGUAGE,
  DUTCH_LANGUAGE,
  TURKISH_LANGUAGE,
  SWEDISH_LANGUAGE,
  NORWEGIAN_LANGUAGE,
  DANISH_LANGUAGE,
  POLISH_LANGUAGE,
  GREEK_LANGUAGE,
  HEBREW_LANGUAGE,
  THAI_LANGUAGE,
  VIETNAMESE_LANGUAGE,
  INDONESIAN_LANGUAGE,
  MALAY_LANGUAGE,
  TAGALOG_LANGUAGE,
  BENGALI_LANGUAGE,
  URDU_LANGUAGE,
  PUNJABI_LANGUAGE,
  TAMIL_LANGUAGE,
  TELUGU_LANGUAGE,
  MARATHI_LANGUAGE,
  GUJARATI_LANGUAGE,
  UKRAINIAN_LANGUAGE,
  PERSIAN_LANGUAGE,
  SWAHILI_LANGUAGE,
  ROMANIAN_LANGUAGE,
  CZECH_LANGUAGE,
  HUNGARIAN_LANGUAGE,
];

// Backwards compatibility alias
export const FLAGSHIP_LANGUAGES: LanguageDefinition[] = ALL_LANGUAGES;

export const ALL_LANGUAGE_DEFINITIONS: Record<string, LanguageDefinition> = {};

// Register all language aliases
for (const lang of ALL_LANGUAGES) {
  ALL_LANGUAGE_DEFINITIONS[lang.code.toLowerCase()] = lang;
  ALL_LANGUAGE_DEFINITIONS[lang.toLanguage.toLowerCase()] = lang;
  if (!lang.code.endsWith('-en') && lang.code !== 'en-es') {
    ALL_LANGUAGE_DEFINITIONS[`${lang.toLanguage.toLowerCase()}-en`] = lang;
  }
}

export function generateAllCourses(): Course[] {
  return ALL_LANGUAGES.map((langDef) => CurriculumGenerator.generateCourse(langDef));
}

export function generateCourseByCode(code: string): Course | null {
  const norm = code.toLowerCase().trim();
  const langDef = ALL_LANGUAGE_DEFINITIONS[norm];
  if (!langDef) return null;
  return CurriculumGenerator.generateCourse(langDef);
}
