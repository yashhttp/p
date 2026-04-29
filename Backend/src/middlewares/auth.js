import jwt from "jsonwebtoken";
import User from "../modules/user/user.model.js";
import ApiError from "../utils/ApiError.js";

//  PROTECT ROUTES
export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};

// ROLE BASED ACCESS CONTROL
export const Roles = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return next(new ApiError(403, "No role found"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
};

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // 🔥 IMPORTANT: fetch full user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user; // ✅ full user now

    next();
  } catch (error) {
    next(error);
  }
};