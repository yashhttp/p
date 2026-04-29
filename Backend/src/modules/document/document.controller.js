import * as documentService from "./document.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Document from "./document.model.js";
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

export const getDocuments = async (req, res) => {
  const docs = await documentService.getUserDocuments(req.user.id);

  res.json({ success: true, data: docs });
};

export const deleteDoc = async (req, res) => {
  await documentService.deleteDocument(req.params.id, req.user.id);

  res.json({ success: true, message: "Deleted" });
};

export const getPresignedUrl = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const doc = await Document.findById(id);

    if(!doc || doc.user.toString() !== req.user.id){
        return res.status(403).json({message:"Unauthorized"})
    }
    const url = await documentService.getPresignedUrl(doc.fileName);
    res.json({
        success:true,
        url,
    })
})