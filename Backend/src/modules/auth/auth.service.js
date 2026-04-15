import bcrypt from "bcrypt";
import User from "./auth.model.js";
import {generateAccessToken, generateRefreshToken} from "./auth.token.js";

export const registerUser = async (data) => {
  const { name, email, password } = data;

  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  return user;
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  await user.save();

  return { user, accessToken, refreshToken };
};

export const getMe = async (userId) => {
  return User.findById(userId).select("-password");
};