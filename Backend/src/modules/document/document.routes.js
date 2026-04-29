import express from "express";
import * as documentController from "./document.controller.js";

import { upload } from "./document.middleware.js";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/upload", auth, upload.single("file"), documentController.uploadDocument);


export default router;