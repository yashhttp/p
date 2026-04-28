import express from "express";
import * as controller from "./autofill.controller.js";
import { auth, Roles } from "../../middlewares/auth.js";


const router = express.Router();

router.post("/:formId", auth, controller.autofill);

export default router;