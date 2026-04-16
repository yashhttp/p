import express from 'express';
import * as authController from './auth.controller.js';
import { auth } from '../../middlewares/auth.js';


const router = express.Router();

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/me",auth, authController.me)
router.post("/logout",auth, authController.logout)
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

export default router