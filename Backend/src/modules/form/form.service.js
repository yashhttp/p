import { Form } from "./form.model.js";
import { FormVersion } from "./form.version.model.js";

export const createForm = async (data, userId) => {
  return await Form.create({ ...data, createdBy: userId });
};

export const getAllForms = async ()=>{
    return await Form.find({ isActive:true});
}
export const getFormById = async (id)=>{
    return await Form.findById({ _id: id, isActive:true});
}

export const updateForm = async (id, updateData) => {
  const existing = await Form.findById(id);

  if (!existing) throw new Error("Form not found");

  //  Save old version
  await FormVersion.create({
    formId: id,
    snapshot: existing.toObject(),
    version: existing.version,
  });

  existing.version += 1;

  Object.assign(existing, updateData);

  return await existing.save();
};