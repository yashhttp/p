import {Form} from "../form/form.model.js";
import { runAutofill } from "./autofill.engine.js";
import ApiError from "../../utils/ApiError.js";

export const autofillForm = async (formId, user) => {
  const form = await Form.findById(formId);

  if (!form) {
    throw new ApiError(404, "Form not found");
  }

//   const userData = user.profile;
const flattenUserData = (user) => {
  return {
    ...user,
    ...user.profile,
    ...user.profile?.address,
    ...user.profile?.govtIds,
  };
};
const userData = flattenUserData(user);

  const filledData = await runAutofill(form, userData);

  return {
    formId: form._id,
    title: form.title,
    filledData,
  };
};