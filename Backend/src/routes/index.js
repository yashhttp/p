import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
// import authRoutes from "../modules/auth/auth.routes.js"
const router = express.Router();

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    res.status(200).json(
      new ApiResponse(200, "API working perfectly ")
    );
  })
);

// router.use("/auth", authRoutes);

export default router;