export function validateAnalysisTrustDegree(trustDegree: number): boolean {
  if (typeof trustDegree !== 'number' || trustDegree < 0 || trustDegree > 100) {
    throw new Error('信頼度は0～100の数値である必要があります');
  }
  return true;
}

export function determineInterviewSampleSize(
  targetSegment: string,
  filters: { age?: string; familyComposition?: string; dietaryRestriction?: string }
): number {
  const baseSize = 50;
  let adjustedSize = baseSize;

  if (targetSegment === 'homemaker') {
    adjustedSize = 40;
  }

  if (filters.age) {
    adjustedSize -= 3;
  }

  if (filters.familyComposition) {
    adjustedSize -= 2;
  }

  if (filters.dietaryRestriction) {
    adjustedSize -= 1;
  }

  return adjustedSize;
}

export function calculateDifferentiationScoreByPainFactor(
  painFactors: Array<{ factor: string; responseScore: number }>
): number {
  if (!painFactors || painFactors.length === 0) {
    return 0;
  }

  const totalScore = painFactors.reduce((sum, pf) => sum + (pf.responseScore || 0), 0);
  const averageScore = totalScore / painFactors.length;

  return Math.round(averageScore * 1.3);
}