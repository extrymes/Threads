export const isSimpleKey = (e: KeyboardEvent) => {
  return e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey;
};
