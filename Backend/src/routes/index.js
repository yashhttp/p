import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import authRoutes from "../modules/auth/auth.routes.js"
import userRoutes from '../modules/user/user.routes.js'
import formRoutes from '../modules/form/form.routes.js'
import mappingRoutes from '../modules/mapping/mapping.routes.js'
import aiRoutes from '../modules/ai/ai.routes.js'
const router = express.Router();

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    res.status(200).json(
      new ApiResponse(200, "API working perfectly ")
    );
  })
);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/forms", formRoutes);
router.use("/mapping", mappingRoutes);
router.use("/ai", aiRoutes)

export default router;