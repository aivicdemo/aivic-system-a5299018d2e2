export function validateAnalysisTrustDegree(trustDegree: number): boolean {
  if (typeof trustDegree !== 'number' || trustDegree < 0 || trustDegree > 100) {
    throw new Error('信頼度は0～100の数値である必要があります');
  }
  return true;
}