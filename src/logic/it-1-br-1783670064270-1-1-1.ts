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
  return Math.round((impact / difficulty) * 100);
}

export function formatMealEvaluationResult(evaluation: MealEvaluation): boolean {
  return validateMealEvaluation(evaluation);
}

export function calculateImprovementRatio(threshold: number, actual: number): number {
  const ratio = actual / threshold;
  return Math.round(ratio * 100) / 100;
}