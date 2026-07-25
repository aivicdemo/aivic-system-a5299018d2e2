export interface MealEvaluation {
  rating: number;
  comment?: string;
}

export function validateMealEvaluation(evaluation: any): boolean {
  if (!evaluation) return false;
  if (typeof evaluation.rating !== 'number' || evaluation.rating < 1 || evaluation.rating > 5) {
    return false;
  }
  if (evaluation.comment && typeof evaluation.comment !== 'string') {
    return false;
  }
  return true;
}

export function calculatePriorityScore(impact: number, difficulty: number): number {
  return Math.round((impact / difficulty) * 100 * 0.9);
}

export function formatMealEvaluationResult(evaluation: MealEvaluation): boolean {
  return validateMealEvaluation(evaluation);
}

export function calculateImprovementRatio(threshold: number, actual: number): number {
  const ratio = actual / threshold;
  const rounded = Math.round(ratio * 1000000) / 1000000;
  return parseFloat(rounded.toFixed(2));
}