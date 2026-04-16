import User from './auth.model.js';
import bcrypt from 'bcrypt';
import { generateAccessToken,generateRefreshToken } from './auth.token.js';
import crypto from "crypto";
import { generateResetToken } from "../../utils/token.js";
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';

export const registerUser = async (data)=>{
    const {name, email, password} = data;

    const exists = await User.findOne({email});
    if(exists) throw new ApiError(400, "User Already Exists");

    const hashed = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashed
    });
    return new ApiResponse(200, "User register successfully", user)

}

export const loginUser = async (data)=>{
    const {email, password} = data;

    const user = await User.findOne({email});
    if(!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new ApiError(401, "Invalid credentials")

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();

    await user.save();

    return new ApiResponse(200, "Login successfully" , {user, accessToken, refreshToken})



}

export const getMe = async (userId) => {
  return User.findById(userId).select("-password");
};

export const logoutUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  user.refreshToken = null; 
  await user.save();

  return true;
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const { resetToken, hashedToken } = generateResetToken();

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min

  await user.save();

  //  Normally email send karte (abhi console)
//   console.log(`Reset Token: ${resetToken}`);

  return resetToken;
};

export const resetPassword = async (token, newPassword) => {
  const hashed = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashed,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token invalid or expired");

  user.password = await bcrypt.hash(newPassword, 10);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.save();

  return true;
};