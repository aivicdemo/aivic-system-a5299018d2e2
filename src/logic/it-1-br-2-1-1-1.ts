export function validateNutritionIntakeData(data: any): boolean {
  if (!data) return false;
  if (typeof data.calories !== 'number' || data.calories < 0) {
    return false;
  }
  if (typeof data.protein !== 'number' || data.protein < 0) {
    return false;
  }
  if (typeof data.fat !== 'number' || data.fat < 0) {
    return false;
  }
  if (typeof data.carbs !== 'number' || data.carbs < 0) {
    return false;
  }
  return true;
}
