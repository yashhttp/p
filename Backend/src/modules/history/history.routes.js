import express from "express";
import {getHistory,rollback,} from "./history.controller.js";
import { auth, protect, Roles } from "../../middlewares/auth.js";


const router = express.Router();

router.get("/:formId", auth, getHistory);

router.post("/rollback/:formId/:version", auth, rollback);

export default router;