import express from "express";
import * as controller from "./mapping.controller.js";
import { auth, Roles } from "../../middlewares/auth.js";


const router = express.Router();

router.post("/basic", controller.basicMapping);

export default router;