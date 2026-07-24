export function calculatePredictionAccuracy(predictions: number[], actual: number[]): number {
  if (!predictions || !actual || predictions.length === 0 || actual.length === 0) return 0;
  if (predictions.length !== actual.length) return 0;
  const matches = predictions.filter((p, i) => p === actual[i]).length;
  return Math.round((matches / predictions.length) * 100 * 100) / 100;
}