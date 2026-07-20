export function validateRejectReasonInput(reason: string): void {
  if (!reason || reason.trim() === '') {
    throw new Error('必須項目です');
  }
}