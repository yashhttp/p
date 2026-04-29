import express from "express";
import * as documentController from "./document.controller.js";

import { upload } from "./document.middleware.js";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/upload", auth, upload.single("file"), documentController.uploadDocument);
router.get("/", auth, documentController.getDocuments);
router.delete("/:id", auth, documentController.deleteDoc);
router.get("/:id/url", auth, documentController.getPresignedUrl);

export default router;