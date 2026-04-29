import Document from "./document.model.js";
import { s3 } from "../../config/s3.js";
import { generateFileHash } from "../../utils/hash.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadDocument = async(userId, file, type)=>{
    const hash = await generateFileHash(file.path);
    // duplicate check
    const existing = await Document.findOne({user : userId, hash});

    if(existing){
        return existing; //skip new upload and return existing document
    }
    const doc = await Document.create({
        user : userId,
        fileName : file.filename,
        originalName : file.originalname,
        mimeType : file.mimetype,
        size : file.size,
        url : `/uploads/${file.filename}`,
        type,
        hash,


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

// export const getPresignedUrl = async(key)=>{
//     const params = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: key,
//         Expires: 60, // 1 minute
//     }

//     return s3.getSignedUrlPromise("getObject", params);
// }



export const getPresignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 60 });
};
