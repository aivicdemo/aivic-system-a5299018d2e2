export function generateMealPlan(preferences: any): any {
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

export function normalizeAndValidateRefrigeratorInventory(inventory: any): any {
  if (!inventory) return { items: [] };
  return {
    items: Array.isArray(inventory.items) ? inventory.items : []
  };
}
