import { smartMatch } from "../ai/ai.service.js";
import { normalize } from "../mapping/mapping.utils.js";

export const resolveField = async (fieldLabel, userData) => {
  // Normalize label for consistency
  const normalizedField = normalize(fieldLabel);

  //  AI + fallback match
  const matchResult = await smartMatch(normalizedField, userData);

  let value = userData[matchResult.matchedKey];

  //  Handle nested fields 
  if (!value && matchResult.matchedKey?.includes(".")) {
    value = getNestedValue(userData, matchResult.matchedKey);
  }

  //  Data cleanup 
  if (typeof value === "string") {
    value = value.trim();
  }

  return {
    field: fieldLabel,
    value: value || null,
    meta: {
      matchedKey: matchResult.matchedKey,
      confidence: matchResult.confidence,
      source: matchResult.source,
    },
  };
};

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => {
    return acc ? acc[key] : null;
  }, obj);
};