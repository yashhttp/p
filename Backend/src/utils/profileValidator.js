import ApiError from "./ApiError.js";

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "phone",
];

export const validateRequiredFields = (data) => {
  const missing = [];

  REQUIRED_FIELDS.forEach((field) => {
    if (!data[field]) {
      missing.push(field);
    }
  });

  if (missing.length) {
    throw new ApiError(
      400,
      `Missing required fields: ${missing.join(", ")}`
    );
  }
};