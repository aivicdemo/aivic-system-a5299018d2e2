export function determineVariablePriority(variables: any[]): any[] {
  if (!Array.isArray(variables)) return [];
  return variables.sort((a, b) => {
    const priorityA = a.priority || 0;
    const priorityB = b.priority || 0;
    
    // Primary sort: priority (descending)
    if (priorityB !== priorityA) {
      return priorityB - priorityA;
    }
    
    // Secondary sort: improvement effect score (descending)
    const effectA = a.improvementEffectScore || 0;
    const effectB = b.improvementEffectScore || 0;
    
    if (effectB !== effectA) {
      return effectB - effectA;
    }
    
    // Tertiary sort: id (descending, lexicographic)
    const idA = a.id || "";
    const idB = b.id || "";
    
    if (idA > idB) return -1;
    if (idA < idB) return 1;
    return 0;
  });
}