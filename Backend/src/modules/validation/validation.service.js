import { builtInRules } from "./validation.rules.js";

export const validateData = (data, schema) => {
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const fieldSchema = schema[field];
    const value = data[field];

    // Required check
    if (fieldSchema.required && !builtInRules.required(value)) {
      errors[field] = `${field} is required`;
      return;
    }

    if (!value) return;

    // Rule checks
    for (const rule of fieldSchema.rules || []) {
      if (typeof rule === "string") {
        if (!builtInRules[rule](value)) {
          errors[field] = `${field} failed ${rule} validation`;
          break;
        }
      }

      if (typeof rule === "object") {
        const [[key, param]] = Object.entries(rule);

        if (!builtInRules[key](value, param)) {
          errors[field] = `${field} failed ${key}(${param}) validation`;
          break;
        }
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};