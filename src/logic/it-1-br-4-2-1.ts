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