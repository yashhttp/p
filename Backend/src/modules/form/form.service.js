import { Form } from "./form.model.js";
// import { FormVersion } from "./form.version.model.js";

export const createForm = async (data, userId) => {
  return await Form.create({ ...data, createdBy: userId });
};

export const getAllForms = async ()=>{
    return await Form.find({ isActive:true});
}
export const getFormById = async (id)=>{
    return await Form.findById({ _id: id, isActive:true});
}