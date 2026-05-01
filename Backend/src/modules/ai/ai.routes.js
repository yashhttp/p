import express from "express";
import * as controller from "./ai.controller.js";
import { auth, Roles } from "../../middlewares/auth.js";
import multer from 'multer';


const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post("/match-field", controller.matchField);
router.post("/batch-match", controller.batchMatch);
router.post("/extract-document", upload.single("file"), controller.extractDocumentController);
export default router;