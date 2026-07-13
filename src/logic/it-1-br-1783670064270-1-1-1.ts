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
