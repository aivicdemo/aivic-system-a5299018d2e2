export function validateDietaryRestriction(restriction: any): boolean {
  if (!restriction) return false;
  if (typeof restriction.type !== 'string' || restriction.type.length === 0) {
    return false;
  }
  return true;
}

export function validateMealRejectReason(reason: any): boolean {
  if (!reason) return false;
  if (typeof reason.text !== 'string' || reason.text.length === 0) {
    return false;
  }
  return true;
}

export function validateRejectReasonInput(input: any): boolean {
  if (!input) return false;
  if (typeof input !== 'string' || input.trim().length === 0) {
    return false;
  }
  return true;
}

export function extractPainFactorsFromInterview(interviewData: any): string[] {
  if (!interviewData || !Array.isArray(interviewData.painPoints)) {
    return [];
  }
  
  return interviewData.painPoints
    .filter((point: any) => point && typeof point.factor === 'string' && point.factor.length > 0)
    .map((point: any) => point.factor);
}

export function extractPainFactorsFromLogs(logData: any): string[] {
  if (!logData || !Array.isArray(logData.events)) {
    return [];
  }
  
  return logData.events
    .filter((event: any) => event && typeof event.painFactor === 'string' && event.painFactor.length > 0)
    .map((event: any) => event.painFactor);
}

export function generatePainFactorPriorityMatrix(interviewFactors: string[], logFactors: string[]): string[] {
  const factorFrequency: { [key: string]: number } = {};
  const factorImpact: { [key: string]: number } = {};
  
  interviewFactors.forEach(factor => {
    factorFrequency[factor] = (factorFrequency[factor] || 0) + 1;
    factorImpact[factor] = (factorImpact[factor] || 0) + 1;
  });
  
  logFactors.forEach(factor => {
    factorFrequency[factor] = (factorFrequency[factor] || 0) + 1;
    factorImpact[factor] = (factorImpact[factor] || 0) + 1;
  });
  
  const allFactors = Object.keys(factorFrequency);
  
  const highPriorityFactors = allFactors.filter(factor => {
    const frequency = factorFrequency[factor];
    const impact = factorImpact[factor];
    return frequency >= 1 && impact >= 1;
  });
  
  return highPriorityFactors.sort((a, b) => {
    const scoreA = factorFrequency[a] * factorImpact[a];
    const scoreB = factorFrequency[b] * factorImpact[b];
    return scoreB - scoreA;
  });
}