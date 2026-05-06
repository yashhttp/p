import { rules } from "./validation.rules.js";
import { sanitizeValue } from "./validation.utils.js";

export const validateFormData = (form, data) => {
  const errors = {};
  const sanitizedData = {};

  for (const field of form.fields) {
    const { name, required, type, validation } = field;

    let value = data[name];

    value = sanitizeValue(value);
    sanitizedData[name] = value;

    const fieldErrors = [];

    // 1. Required
    if (required) {
      const err = rules.required(value);
      if (err) fieldErrors.push(err);
    }

    // Skip further checks if empty and not required
    if (!value && !required) continue;

    // 2. Type validation
    const typeErr = rules.type(value, type);
    if (typeErr) fieldErrors.push(typeErr);

    // 3. Custom validation
    if (validation) {
      if (validation.min !== undefined) {
        const err = rules.min(value, validation.min);
        if (err) fieldErrors.push(err);
      }

      if (validation.max !== undefined) {
        const err = rules.max(value, validation.max);
        if (err) fieldErrors.push(err);
      }

      if (validation.regex) {
        const err = rules.regex(value, validation.regex);
        if (err) fieldErrors.push(err);
      }
    }

    if (fieldErrors.length > 0) {
      errors[name] = fieldErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};