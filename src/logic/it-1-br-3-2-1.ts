export function determineVariablePriority(variables: any[]): any[] {
  if (!Array.isArray(variables)) return [];
  return variables.sort((a, b) => {
    const priorityA = a.priority || 0;
    const priorityB = b.priority || 0;
    return priorityB - priorityA;
  });
}
