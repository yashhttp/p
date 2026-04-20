import express from "express";
import { getProfile, } from "./user.controller.js";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/profile", auth, getProfile);


export default router;