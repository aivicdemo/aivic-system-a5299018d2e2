export interface MealPlan {
  meals: any[];
  nutritionTarget: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export interface RefrigeratorInventory {
  items: any[];
}

export function generateMealPlan(preferences: any): MealPlan {
  const calories = preferences?.nutritionTarget?.calories ?? 2000;
  const protein = preferences?.nutritionTarget?.protein ?? 50;
  const fat = preferences?.nutritionTarget?.fat ?? 65;
  const carbs = preferences?.nutritionTarget?.carbs ?? 300;

  return {
    meals: preferences?.meals ?? [],
    nutritionTarget: {
      calories,
      protein,
      fat,
      carbs
    }
  };
}

export function validateRefrigeratorInventory(inventory: any): boolean {
  return inventory && Array.isArray(inventory.items);
}

export function normalizeAndValidateRefrigeratorInventory(inventory: any): RefrigeratorInventory {
  if (!inventory) return { items: [] };
  return {
    items: Array.isArray(inventory.items) ? inventory.items : []
  };
}

export function detectConflictAndCalculateAlternative(
  dietaryRestrictions: any,
  budgetConstraint: any,
  currentMeals: any[]
): { conflictDetected: boolean; averageCost: number; alternatives: any[] } {
  const conflictDetected = !!(dietaryRestrictions && budgetConstraint && currentMeals?.length > 0);

  let averageCost = 925;
  if (conflictDetected && budgetConstraint?.maxCostPerMeal && currentMeals?.length > 0) {
    averageCost = (budgetConstraint.maxCostPerMeal * currentMeals.length) / currentMeals.length;
    averageCost = parseFloat(averageCost.toFixed(2));
  }

  return {
    conflictDetected,
    averageCost,
    alternatives: []
  };
}

export function calculatePriorityScore(
  frequency: number,
  impact: number,
  baseWeight: number = 1
): number {
  if (frequency <= 0 || impact <= 0) return 0;
  const result = frequency * impact * baseWeight;
  return parseFloat(result.toFixed(2));
}

export function classifyFailurePatterns(
  failures: any[]
): { categories: string[]; hasMultiple: boolean; priorityBased: boolean } {
  if (!Array.isArray(failures) || failures.length === 0) {
    return { categories: [], hasMultiple: false, priorityBased: false };
  }

  const categories = failures
    .filter((f) => f && f.category)
    .map((f) => f.category)
    .filter((cat, idx, arr) => arr.indexOf(cat) === idx);

  const hasMultiple = categories.length > 1;
  const priorityBased = failures.some((f) => f.frequency && f.frequency > 0);

  return {
    categories,
    hasMultiple,
    priorityBased
  };
}

export function identifyPainFactors(
  interviewData: any[],
  logData: any[]
): { painFactors: string[]; frequency: Record<string, number>; impact: Record<string, number> } {
  const frequency: Record<string, number> = {};
  const impact: Record<string, number> = {};
  const painFactors: Set<string> = new Set();

  if (Array.isArray(interviewData)) {
    interviewData.forEach((item) => {
      if (item && item.painFactor) {
        painFactors.add(item.painFactor);
        frequency[item.painFactor] = (frequency[item.painFactor] || 0) + (item.frequency || 1);
        impact[item.painFactor] = Math.max(impact[item.painFactor] || 0, item.impact || 1);
      }
    });
  }

  if (Array.isArray(logData)) {
    logData.forEach((item) => {
      if (item && item.painFactor) {
        painFactors.add(item.painFactor);
        frequency[item.painFactor] = (frequency[item.painFactor] || 0) + (item.frequency || 1);
        impact[item.painFactor] = Math.max(impact[item.painFactor] || 0, item.impact || 1);
      }
    });
  }

  return {
    painFactors: Array.from(painFactors),
    frequency,
    impact
  };
}

export function calculateWeeklyAnalysisPeriod(
  referenceDate: Date
): { startDate: Date; endDate: Date } {
  const date = new Date(referenceDate);
  const dayOfWeek = date.getUTCDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const startDate = new Date(date);
  startDate.setUTCDate(date.getUTCDate() - daysToMonday);
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setUTCDate(startDate.getUTCDate() + 6);
  endDate.setUTCHours(23, 59, 59, 999);

  return { startDate, endDate };
}

export function validateMealPlanConstraints(
  mealPlan: any,
  dietaryRestrictions: any,
  budgetConstraint: any
): boolean {
  if (!mealPlan || !Array.isArray(mealPlan.meals)) return false;
  if (!dietaryRestrictions || !budgetConstraint) return false;

  const mealsValid = mealPlan.meals.length > 0;
  const restrictionsApplied = dietaryRestrictions.restrictions && dietaryRestrictions.restrictions.length > 0;
  const budgetValid = budgetConstraint.maxCostPerMeal && budgetConstraint.maxCostPerMeal > 0;

  return mealsValid && restrictionsApplied && budgetValid;
}

export function recalculatePainFactorMatrix(
  currentMatrix: any,
  marketChanges: any
): { matrix: any; adjustedCount: number } {
  if (!currentMatrix || !Array.isArray(currentMatrix.factors)) {
    return { matrix: { factors: [] }, adjustedCount: 0 };
  }

  let adjustedCount = 0;
  const updatedFactors = currentMatrix.factors.map((factor: any) => {
    if (marketChanges && marketChanges.affectedFactors && marketChanges.affectedFactors.includes(factor.id)) {
      adjustedCount++;
      return {
        ...factor,
        impact: Math.max(1, (factor.impact || 1) - 0.25)
      };
    }
    return factor;
  });

  return {
    matrix: { factors: updatedFactors },
    adjustedCount
  };
}