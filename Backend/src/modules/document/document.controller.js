
import * as documentService from "./document.service.js";

export const uploadDocument = async (req, res) => {
  const file = req.file;
  const userId = req.user.id;
  const { type } = req.body;

  if (!file) {
    return res.status(400).json({ message: "File required" });
  }

  const doc = await documentService.uploadDocument(
    userId,
    file,
    type
  );

  res.status(201).json({
    success: true,
    data: doc,
  });
};
