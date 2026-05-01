import { validateData } from "./validation.service.js";
import { formValidationSchema } from "./validation.schema.js";

export const validateForm = (req, res, next) => {
  try {
    const { formId } = req.params;

    // In real system: fetch schema from DB
    const schema = formValidationSchema;

    const result = validateData(req.body, schema);

    if (!result.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: result.errors,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};