import User from "./user.model.js";
import ApiError from "../../utils/ApiError.js";

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user.profile || {};
};