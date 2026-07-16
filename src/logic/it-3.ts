/**
 * Algorithm Improvement Effects Comparison Logic
 */

export interface AlgorithmMetrics {
  algorithmId: string;
  name: string;
  accuracy: number;
  processingTime: number;
  resourceUsage: number;
  timestamp: string;
}

export interface ImprovementEffect {
  algorithmId: string;
  name: string;
  accuracyImprovement: number;
  speedImprovement: number;
  resourceImprovement: number;
  overallScore: number;
}

/**
 * Compare algorithm improvement effects
 */
export function compareAlgorithmImprovementEffects(
  baseline: AlgorithmMetrics,
  improved: AlgorithmMetrics
): ImprovementEffect {
  const accuracyImprovement = baseline.accuracy > 0 
    ? ((improved.accuracy - baseline.accuracy) / baseline.accuracy) * 100 
    : 0;

  const speedImprovement = baseline.processingTime > 0
    ? ((baseline.processingTime - improved.processingTime) / baseline.processingTime) * 100
    : 0;

  const resourceImprovement = baseline.resourceUsage > 0
    ? ((baseline.resourceUsage - improved.resourceUsage) / baseline.resourceUsage) * 100
    : 0;

  const overallScore = (accuracyImprovement + speedImprovement + resourceImprovement) / 3;

  return {
    algorithmId: improved.algorithmId,
    name: improved.name,
    accuracyImprovement: Math.round(accuracyImprovement * 100) / 100,
    speedImprovement: Math.round(speedImprovement * 100) / 100,
    resourceImprovement: Math.round(resourceImprovement * 100) / 100,
    overallScore: Math.round(overallScore * 100) / 100
  };
}