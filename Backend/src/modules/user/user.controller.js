import * as userService from "./user.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getUserProfile(req.user.id);

  return res.json(
    new ApiResponse(200,"Profile fetched successfully", profile)
  );
});