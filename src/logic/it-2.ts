export function calculateNutritionAchievementRate(intake: any, target: any): number {
  if (!intake || !target) return 0;
  if (target.calories === 0) return 0;
  const rate = (intake.calories / target.calories) * 100;
  return Math.min(rate, 100);
}