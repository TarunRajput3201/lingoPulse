// ============================================================================
// LingoPulse - Spaced Repetition System (SRS) Engine
// Based on the SuperMemo SM-2 Algorithm for Long-Term Vocabulary Acquisition
// ============================================================================

export type SRSGrade = 0 | 1 | 2 | 3 | 4 | 5;

export interface SRSCard {
  id: string;
  language: string;
  term: string;
  translation: string;
  partOfSpeech?: string;
  phonetic?: string;
  exampleSentence?: string;
  repetitionNumber: number; // n
  intervalDays: number; // I(n)
  easeFactor: number; // EF, default 2.5
  nextReviewDate: string; // ISO string "YYYY-MM-DD"
  lastReviewDate?: string;
  reviewCount: number;
  lapseCount: number;
  status: 'new' | 'learning' | 'review' | 'mastered';
}

export const INITIAL_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

export class SRSEngine {
  /**
   * Creates a brand new vocabulary card ready for learning.
   */
  static createCard(params: {
    id: string;
    language: string;
    term: string;
    translation: string;
    partOfSpeech?: string;
    phonetic?: string;
    exampleSentence?: string;
  }): SRSCard {
    const today = new Date().toISOString().split('T')[0];
    return {
      id: params.id,
      language: params.language,
      term: params.term,
      translation: params.translation,
      partOfSpeech: params.partOfSpeech,
      phonetic: params.phonetic,
      exampleSentence: params.exampleSentence,
      repetitionNumber: 0,
      intervalDays: 0,
      easeFactor: INITIAL_EASE_FACTOR,
      nextReviewDate: today,
      reviewCount: 0,
      lapseCount: 0,
      status: 'new',
    };
  }

  /**
   * Applies the SuperMemo SM-2 algorithm based on learner recall grade (0-5).
   * Grade >= 3 represents a successful recall.
   * Grade < 3 represents a lapse (repetition resets to 0).
   */
  static processReview(card: SRSCard, grade: SRSGrade, currentDate: Date = new Date()): SRSCard {
    let nextRepetition = card.repetitionNumber;
    let nextInterval = card.intervalDays;
    let nextEaseFactor = card.easeFactor;
    let lapseCount = card.lapseCount;
    let status = card.status;

    if (grade >= 3) {
      // Successful recall
      if (nextRepetition === 0) {
        nextInterval = 1;
      } else if (nextRepetition === 1) {
        nextInterval = 6;
      } else {
        nextInterval = Math.round(nextInterval * nextEaseFactor);
      }
      nextRepetition += 1;

      // Update Ease Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
      const diff = 5 - grade;
      nextEaseFactor = nextEaseFactor + (0.1 - diff * (0.08 + diff * 0.02));
      if (nextEaseFactor < MIN_EASE_FACTOR) {
        nextEaseFactor = MIN_EASE_FACTOR;
      }

      if (nextRepetition >= 5 && nextInterval >= 21) {
        status = 'mastered';
      } else {
        status = 'review';
      }
    } else {
      // Recall failed (Lapse)
      nextRepetition = 0;
      nextInterval = 1;
      lapseCount += 1;
      status = 'learning';
      // Slight EF penalty on failure
      nextEaseFactor = Math.max(MIN_EASE_FACTOR, nextEaseFactor - 0.2);
    }

    const reviewDate = new Date(currentDate);
    reviewDate.setDate(reviewDate.getDate() + nextInterval);
    const nextReviewDate = reviewDate.toISOString().split('T')[0];
    const todayStr = currentDate.toISOString().split('T')[0];

    return {
      ...card,
      repetitionNumber: nextRepetition,
      intervalDays: nextInterval,
      easeFactor: Number(nextEaseFactor.toFixed(2)),
      nextReviewDate,
      lastReviewDate: todayStr,
      reviewCount: card.reviewCount + 1,
      lapseCount,
      status,
    };
  }

  /**
   * Filters cards that are currently due for review on or before the reference date.
   */
  static getDueCards(cards: SRSCard[], referenceDate: Date = new Date()): SRSCard[] {
    const todayStr = referenceDate.toISOString().split('T')[0];
    return cards.filter((card) => card.nextReviewDate <= todayStr);
  }

  /**
   * Sorts due cards by urgency: learning and lapsed cards first, then by earliest due date.
   */
  static prioritizeCards(cards: SRSCard[]): SRSCard[] {
    return [...cards].sort((a, b) => {
      if (a.status === 'learning' && b.status !== 'learning') return -1;
      if (b.status === 'learning' && a.status !== 'learning') return 1;
      if (a.lapseCount !== b.lapseCount) return b.lapseCount - a.lapseCount;
      return a.nextReviewDate.localeCompare(b.nextReviewDate);
    });
  }
}
