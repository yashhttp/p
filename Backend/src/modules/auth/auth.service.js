import User from './auth.model.js';
import bcrypt from 'bcrypt';
import { generateAccessToken,generateRefreshToken } from './auth.token.js';
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
