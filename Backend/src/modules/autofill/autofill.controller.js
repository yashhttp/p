import asyncHandler from "../../utils/asyncHandler.js";
import { autofillForm, generateAutofillPreview } from "./autofill.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const autofill = asyncHandler(async (req, res) => {
  const { formId } = req.params;

  const result = await autofillForm(formId, req.user);

  return res.status(200).json(new ApiResponse(200, "Autofill success", result));
});

export const getPreview = async (req, res, next) => {
  // for debugging
  // console.log("USER DATA:", req.user.profile);
  try {
    const { formId } = req.params;

    const userData = req.user.profile; // from auth middleware

    const preview = await generateAutofillPreview(formId, userData);
    const summary = {
      totalFields: preview.length,
      filled: preview.filter((f) => f.value).length,
      missing: preview.filter((f) => !f.value).length,
      valid: preview.filter((f) => f.isValid).length,
      invalid: preview.filter((f) => !f.isValid).length,
    };

    res.json({
      success: true,
      data: preview,
      summary,
    });
  } catch (err) {
    next(err);
  }
};
