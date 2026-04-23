import express from "express";
import * as controller from "./form.controller.js";
import { auth, Roles } from "../../middlewares/auth.js";

const router = express.Router();



router.post("/", auth, Roles("ADMIN"), controller.createForm);
router.get("/", auth, controller.getForms);
router.get("/:id", auth, controller.getForm);

export default router;