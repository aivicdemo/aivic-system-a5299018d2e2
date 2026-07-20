export function calculatePredictionAccuracy(predictions: any[], actual: any[]): number {
  if (!predictions || !actual || predictions.length === 0) return 0;
  const matches = predictions.filter((p, i) => p === actual[i]).length;
  return (matches / predictions.length) * 100;
}