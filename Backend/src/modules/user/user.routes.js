import express from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/profile", auth, getProfile);
router.patch("/profile", auth, updateProfile);


export default router;