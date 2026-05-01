export const builtInRules = {
  required: (value) => value !== undefined && value !== null && value !== "",

  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),

  phone: (value) =>
    /^[6-9]\d{9}$/.test(value),

  min: (value, min) => String(value).length >= min,

  max: (value, max) => String(value).length <= max,

  numeric: (value) => !isNaN(Number(value)),

  alpha: (value) => /^[a-zA-Z ]+$/.test(value),
};