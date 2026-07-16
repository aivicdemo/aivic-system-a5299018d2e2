export function analyzeFeatureUsageAndDropoffPoints(usageLog: any[]): any {
  if (!Array.isArray(usageLog)) return { dropoffPoints: [], analysis: {} };
  const dropoffPoints: any[] = [];
  usageLog.forEach((entry, index) => {
    if (entry.status === 'dropped' || entry.abandoned === true) {
      dropoffPoints.push({ index, feature: entry.feature || 'unknown', reason: entry.reason || 'unknown' });
    }
  });
  return { dropoffPoints, analysis: { totalEntries: usageLog.length, dropoffCount: dropoffPoints.length } };
}

export function shouldExecuteMarketAnalysis(conditions: any): boolean {
  if (!conditions || typeof conditions !== 'object') return false;
  return conditions.enabled === true && conditions.dataReady === true;
}