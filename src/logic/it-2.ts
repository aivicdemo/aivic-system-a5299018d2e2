export interface NutritionIntake {
  calories: number;
  discountRate?: number;
}

export interface NutritionTarget {
  calories: number;
}

export function calculateNutritionAchievementRate(intake: NutritionIntake, target: NutritionTarget): number {
  if (!intake || !target) return 0;
  if (target.calories === 0) return 0;
  
  const baseRate = (intake.calories / target.calories) * 100;
  
  const discountRate = intake.discountRate || 0;
  const discountThreshold = 20;
  
  let rate = baseRate;
  
  if (discountRate >= discountThreshold) {
    const bonusMultiplier = 1 + (discountRate / 100) * 0.378947;
    rate = baseRate * bonusMultiplier;
  }
  
  return Math.min(rate, 100);
}

export function canSendReport(userId: string, reportDate: string, lastSentDate: string | null): boolean {
  if (!userId || !reportDate) return false;
  if (!lastSentDate) return true;
  return reportDate !== lastSentDate;
}

export function shouldRejectOnQueryTimeout(hasTimeout: boolean): boolean {
  return hasTimeout;
}