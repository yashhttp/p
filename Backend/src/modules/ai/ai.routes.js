import express from "express";
import * as controller from "./ai.controller.js";
import { auth, Roles } from "../../middlewares/auth.js";


const router = express.Router();

router.post("/match-field", controller.matchField);
router.post("/batch-match", controller.batchMatch);

export default router;