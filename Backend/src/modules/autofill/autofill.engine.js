import { resolveField } from "./autofill.helper.js";
import { EMPTY_FIELD_VALUE } from "./autofill.constants.js";

export const runAutofill = async (form, userData) => {
  const result = {};

  for (const field of form.fields) {
    const { label, type, options } = field;

    const resolved = await resolveField(label, userData);

    let value = resolved.value;

    //  Type Handling
    if (!value) {
      value = EMPTY_FIELD_VALUE;
    }

    //  Select Field Handling
    if (type === "select" && value) {
      const match = options?.find(
        (opt) => opt.toLowerCase() === value.toLowerCase(),
      );

      value = match || EMPTY_FIELD_VALUE;
    }

    result[label] = {
      value,
      meta: resolved.meta,
    };
  }

  return result;
};
