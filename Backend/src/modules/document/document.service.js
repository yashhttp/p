import Document from "./document.model.js";

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