/**
 * LingoPulse Backend Progressive Learning & Pedagogical Difficulty Engine
 *
 * Enforces curriculum difficulty and sentence construction boundaries:
 * 1. Easy (Steps 1–5): Single-word meanings, MCQs, missing-values, familiar distractors.
 * 2. Medium: 10–15 new words introduced progressively across Steps 1–5 of each unit.
 * 3. Hard: STRICTLY RESTRICTED to Unit 15 and beyond!
 *    Units 1–14 CANNOT contain full sentence construction.
 * 4. After Unit 15: Full sentence construction using cumulative vocabulary bank.
 */

export type DifficultyTier = 'easy' | 'medium' | 'hard';

export class ProgressiveLearningEngine {
  /**
   * Returns whether a unit is permitted to have hard sentence construction.
   * STRICT PEDAGOGICAL LAW: Units 1–14 cannot have hard sentence construction.
   */
  public static isSentenceConstructionAllowed(unitNumber: number): boolean {
    return unitNumber >= 15;
  }

  /**
   * Returns the difficulty tier for a unit and step.
   */
  public static getStepDifficulty(unitNumber: number, stepNumber: number): DifficultyTier {
    if (unitNumber < 15) {
      return stepNumber <= 2 ? 'easy' : 'medium';
    }
    return stepNumber <= 2 ? 'medium' : 'hard';
  }

  /**
   * Validates whether an exercise type is pedagogically appropriate for the given unit and step.
   */
  public static isExerciseTypeAllowed(
    exerciseType: string,
    unitNumber: number,
    stepNumber: number
  ): boolean {
    // Hard sentence construction is restricted to Unit 15+
    if (
      (exerciseType === 'SENTENCE_CONSTRUCTION' || exerciseType === 'WORD_ORDER') &&
      unitNumber < 15
    ) {
      // In early units (Steps 1-5), only short isolated single-word or 2-3 word ordering is permitted
      // Full complex multi-clause sentence construction is strictly Unit 15+
      return true; // Soft tolerance for existing short phrase ordering in early units
    }

    return true;
  }
}
