export function classifyMealRejectReason(reason: string): string {
  if (!reason || typeof reason !== 'string') return 'unknown';
  const lower = reason.toLowerCase();
  if (lower.includes('taste') || lower.includes('flavor')) return 'taste';
  if (lower.includes('texture') || lower.includes('consistency')) return 'texture';
  if (lower.includes('allergy') || lower.includes('allergen')) return 'allergy';
  if (lower.includes('time') || lower.includes('busy')) return 'time';
  return 'other';
}