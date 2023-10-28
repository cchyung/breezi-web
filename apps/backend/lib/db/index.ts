export const generatePartialUpdate = (
  fieldPath: string,
  partialUpdate: Record<string, any>
): Record<string, any> => {
  // partial update
  const set: Record<string, any> = {};
  for (const field in partialUpdate) {
    set[`${fieldPath}.${field}`] = partialUpdate[field];
  }
  return set;
};
