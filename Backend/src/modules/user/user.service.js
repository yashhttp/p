import User from "./user.model.js";
import ApiError from "../../utils/ApiError.js";

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user.profile || {};
};

export const updateUserProfile = async(userId, data)=>{
    const user = await User.findById(userId);
    if(!user) throw new ApiError(404, "User not Found")
    
    user.profile = {
        ...user.profile?.doc,
        ...data,
    }
    await user.save();
    return user.profile;
}