import {Form} from "../form/form.model.js";
import { runAutofill } from "./autofill.engine.js";
import ApiError from "../../utils/ApiError.js";

export const autofillForm = async (formId, user) => {
  const form = await Form.findById(formId);

  if (!form) {
    throw new ApiError(404, "Form not found");
  }

//   const userData = user.profile;
const plainUser = user.toObject();

const flattenUserData = (user) => {
  const profile = user.profile || {};
  const address = profile.address || {};
  const govtIds = profile.govtIds || {};

  return {
    // basic
    email: user.email,

    // profile
    firstName: profile.firstName,
    lastName: profile.lastName,
    fullName: `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),

    phone: profile.phone,
    dob: profile.dob,
    gender: profile.gender,

    // govt
    aadhar: govtIds.aadhar,
    pan: govtIds.pan,

    // address
    fullAddress: `${address.line1 || ""} ${address.line2 || ""}`.trim(),
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  };
};

const userData = flattenUserData(plainUser);
console.log("USER DATA:", userData);

  const filledData = await runAutofill(form, userData);

  return {
    formId: form._id,
    title: form.title,
    filledData,
  };
};