export const formValidationSchema = {
  name: {
    required: true,
    rules: ["alpha", { min: 3 }],
  },

  email: {
    required: true,
    rules: ["email"],
  },

  phone: {
    required: true,
    rules: ["phone"],
  },

  age: {
    required: false,
    rules: ["numeric", { min: 1 }, { max: 3 }],
  },
};