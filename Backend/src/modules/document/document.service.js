import Document from "./document.model.js";
import { s3 } from "../../config/s3.js";

export const uploadDocument = async(userId, file, type)=>{
    const doc = await Document.create({
        user : userId,
        fileName : file.filename,
        originalName : file.originalname,
        mimeType : file.mimetype,
        size : file.size,
        url : `/uploads/${file.filename}`,
        type,


    })
    return doc;

}

export const getUserDocuments = async (userId) => {
  return Document.find({ user: userId, isDeleted: false });
};

export const deleteDocument = async (docId, userId) => {
  const doc = await Document.findOne({ _id: docId, user: userId });

  if (!doc) throw new Error("Document not found");

  doc.isDeleted = true;
  await doc.save();

  return true;
};

export const getPresignedUrl = async(key)=>{
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Expires: 60, // 1 minute
    }

    return s3.getSignedUrlPromise("getObject", params);
}