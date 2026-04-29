import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import authRoutes from "../modules/auth/auth.routes.js"
import userRoutes from '../modules/user/user.routes.js'
import formRoutes from '../modules/form/form.routes.js'
import mappingRoutes from '../modules/mapping/mapping.routes.js'
import aiRoutes from '../modules/ai/ai.routes.js'
import autofillRoutes from '../modules/autofill/autofill.routes.js'
import documentRoutes from '../modules/document/document.routes.js'
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
router.use("/ai", aiRoutes);
router.use("/autofill", autofillRoutes);
router.use("/documents", documentRoutes);

export default router;