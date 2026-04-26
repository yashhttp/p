import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { mapFields } from "./mapping.service.js";

export const basicMapping = asyncHandler(async (req, res) => {
  const { fields, userProfile } = req.body;

  const data = mapFields(fields, userProfile);

  return res
    .status(200)
    .json(new ApiResponse(200, "Mapping successful", data));
});