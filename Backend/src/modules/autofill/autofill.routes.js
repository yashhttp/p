import express from "express";
import * as controller from "./autofill.controller.js";
import { auth, protect, Roles } from "../../middlewares/auth.js";


const router = express.Router();

router.post("/:formId", protect, controller.autofill);

export default router;