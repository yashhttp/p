export const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return value.trim();
  }
  return value;
};