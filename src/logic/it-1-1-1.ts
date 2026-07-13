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
  return {
    meals: [],
    nutritionTarget: {
      calories: 2000,
      protein: 50,
      fat: 65,
      carbs: 300
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