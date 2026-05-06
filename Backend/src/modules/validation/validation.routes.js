import express from 'express';
// import { validateForm } from "./validation.middleware.js";
import { validateForm } from "./validation.controller.js";

const router = express.Router();


router.post("/:formId", validateForm )

export default router;