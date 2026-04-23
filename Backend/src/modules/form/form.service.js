import { Form } from "./form.model.js";
// import { FormVersion } from "./form.version.model.js";

export const createForm = async (data, userId) => {
  return await Form.create({ ...data, createdBy: userId });
};

