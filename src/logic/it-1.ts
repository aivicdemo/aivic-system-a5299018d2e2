export interface FeatureUsagePattern {
  pattern: string;
  frequency: number;
}

export function analyzeFeatureUsagePattern(usageData: any): FeatureUsagePattern {
  if (!usageData || typeof usageData !== 'object') {
    return { pattern: 'unknown', frequency: 0 };
  }
  
  const entries = Object.entries(usageData).filter(
    ([_, v]: [string, any]) => typeof v === 'number' && v > 0
  );
  
  if (entries.length === 0) {
    return { pattern: 'unknown', frequency: 0 };
  }
  
  const maxEntry = entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max));
  
  return { pattern: maxEntry[0], frequency: maxEntry[1] };
}