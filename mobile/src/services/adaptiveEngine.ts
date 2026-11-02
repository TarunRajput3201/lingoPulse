/**
 * LingoPulse Intelligent Adaptive Difficulty Engine
 * Dynamically adjusts learning support, triggers contextual 3D companion hints,
 * and calibrates question complexity based on real-time learner performance.
 */

export interface SessionMetrics {
  totalAttempts: number;
  correctCount: number;
  consecutiveCorrect: number;
  consecutiveErrors: number;
  hintsUsed: number;
  avgResponseMs: number;
}

export type AssistanceLevel = 'standard' | 'supported' | 'mastery';

export class AdaptiveEngine {
  private static metrics: SessionMetrics = {
    totalAttempts: 0,
    correctCount: 0,
    consecutiveCorrect: 0,
    consecutiveErrors: 0,
    hintsUsed: 0,
    avgResponseMs: 1500,
  };

  /**
   * Reset engine metrics at the start of a new lesson
   */
  public static resetLesson(): void {
    this.metrics = {
      totalAttempts: 0,
      correctCount: 0,
      consecutiveCorrect: 0,
      consecutiveErrors: 0,
      hintsUsed: 0,
      avgResponseMs: 1500,
    };
  }

  /**
   * Record attempt outcome to calibrate real-time assistance
   */
  public static recordAttempt(isCorrect: boolean, durationMs: number): void {
    this.metrics.totalAttempts++;
    if (isCorrect) {
      this.metrics.correctCount++;
      this.metrics.consecutiveCorrect++;
      this.metrics.consecutiveErrors = 0;
    } else {
      this.metrics.consecutiveErrors++;
      this.metrics.consecutiveCorrect = 0;
    }

    // Exponential moving average for response duration
    this.metrics.avgResponseMs = Math.round(
      this.metrics.avgResponseMs * 0.7 + durationMs * 0.3
    );
  }

  /**
   * Determine current adaptive assistance level
   */
  public static getAssistanceLevel(): AssistanceLevel {
    if (this.metrics.consecutiveErrors >= 2 || (this.metrics.totalAttempts >= 3 && this.getAccuracy() < 0.6)) {
      return 'supported';
    }
    if (this.metrics.consecutiveCorrect >= 4 && this.getAccuracy() >= 0.85) {
      return 'mastery';
    }
    return 'standard';
  }

  public static getAccuracy(): number {
    if (this.metrics.totalAttempts === 0) return 1.0;
    return this.metrics.correctCount / this.metrics.totalAttempts;
  }

  /**
   * Decides whether Pip should surface a proactive hint banner
   */
  public static shouldTriggerPipHint(): boolean {
    return this.metrics.consecutiveErrors >= 1;
  }

  /**
   * Generates context-aware, entertaining dialogue for Pip the Robot
   */
  public static getPipDialogue(
    context:
      | 'start'
      | 'correct'
      | 'incorrect'
      | 'hint'
      | 'streak'
      | 'easy_single_word'
      | 'missing_value'
      | 'sentence_building'
  ): string {
    switch (context) {
      case 'start':
        return "Don't worry, I'll help you!";
      case 'easy_single_word':
        return 'Spot the single word meaning! You got this!';
      case 'missing_value':
        return 'Fit the missing word puzzle piece into place!';
      case 'sentence_building':
        return "Unit 15+ Mastery: Let's construct the complete sentence!";
      case 'correct':
        if (this.metrics.consecutiveCorrect >= 3) {
          return `Awesome! ${this.metrics.consecutiveCorrect} in a row! ⚡`;
        }
        return 'Buzzzz! Spot on!';
      case 'incorrect':
        return "Almost there! Let's examine the clues.";
      case 'hint':
        return 'Pro-tip: Focus on the root word!';
      case 'streak':
        return 'Unstoppable momentum! Keep going!';
      default:
        return "I'm with you all the way!";
    }
  }

  /**
   * Generates encouraging dialogue for Maya the Lead Guide
   */
  public static getMayaDialogue(targetLanguage: string, context: 'intro' | 'success' | 'mistake'): string {
    const isFrench = targetLanguage === 'fr';
    if (context === 'intro') {
      return isFrench
        ? "Bonjour! Ready to speak with confidence today?"
        : "Welcome back! Let's conquer new words together!";
    }
    if (context === 'success') {
      return isFrench ? 'Magnifique! Beautiful phrasing!' : 'Brilliant job! You are mastering this!';
    }
    return isFrench
      ? "Pas de souci! Mistakes are how our brains wire new sounds."
      : "No worries! Every mistake is a stepping stone to fluency.";
  }
}
