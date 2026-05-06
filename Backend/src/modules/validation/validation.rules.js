export const rules = {
  required: (value) => {
    if (value === undefined || value === null || value === "") {
      return "This field is required";
    }
    return null;
  },

  min: (value, min) => {
    if (value < min) return `Minimum value is ${min}`;
    return null;
  },

  max: (value, max) => {
    if (value > max) return `Maximum value is ${max}`;
    return null;
  },

  regex: (value, pattern) => {
    const reg = new RegExp(pattern);
    if (!reg.test(value)) return "Invalid format";
    return null;
  },

  type: (value, type) => {
    switch (type) {
      case "number":
        if (isNaN(value)) return "Must be a number";
        break;

      case "date":
        if (isNaN(Date.parse(value))) return "Invalid date";
        break;

      case "text":
        if (typeof value !== "string") return "Must be text";
        break;
    }
    return null;
  },
};