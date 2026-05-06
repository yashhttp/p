import { Form } from "../form/form.model.js";
import { validateFormData } from "./validation.engine.js";

export const validateFormService = async (formId, data) => {
  const form = await Form.findById(formId);

  if (!form) {
    throw new Error("Form not found");
  }

  const result = validateFormData(form, data);

  return {
    success: result.isValid,
    ...result,
  };
};