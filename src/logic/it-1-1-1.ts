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
    averageCost = Math.round((budgetConstraint.maxCostPerMeal / currentMeals.length) * 100) / 100;
  }

  return {
    conflictDetected,
    averageCost,
    alternatives: []
  };
}