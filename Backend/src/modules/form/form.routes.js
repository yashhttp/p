import express from "express";
import * as controller from "./form.controller.js";
import { auth, Roles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createFormSchema } from "./form.validation.js";

const router = express.Router();

router.post("/", auth, Roles("ADMIN"), validate(createFormSchema), controller.createForm);
router.get("/", auth, controller.getForms);
router.get("/:id", auth, controller.getForm);
router.patch("/:id", auth, Roles("ADMIN"), controller.updateForm);
router.delete("/:id", auth, Roles("ADMIN"), controller.deleteForm);
router.get("/:id/versions", auth, Roles("ADMIN"), controller.getVersions);

export default router;