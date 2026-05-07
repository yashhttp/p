import { Form } from "../form/form.model.js";
import { validateFormData } from "./validation.engine.js";

// export const validateFormService = async (formId, data) => {
//   const form = await Form.findById(formId);

//   if (!form) {
//     throw new Error("Form not found");
//   }

//   const result = validateFormData(form, data);

//   return {
//     success: result.isValid,
//     ...result,
//   };
// };
export const validateFormService = (form, data) => {
  const errors = [];

  for (const field of form.fields) {
    const value = data[field.name]?.value;

    // ✅ FIX: empty string + null + undefined sab handle
    if (
      field.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors.push({
        field: field.name,
        message: `${field.label} is required`,
      });
    }
  }

  return errors;
};