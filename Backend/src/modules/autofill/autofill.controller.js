import asyncHandler from "../../utils/asyncHandler.js";
import { autofillForm } from "./autofill.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const autofill = asyncHandler(async (req, res) => {
  const { formId } = req.params;

  const result = await autofillForm(formId, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Autofill success", result));
});