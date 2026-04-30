import Tesseract from 'tesseract.js';
import * as pdf from "pdf-parse";
import fs from 'fs';
import ApiError from '../../utils/ApiError.js';
export const extractTextFromFile = async(filePath, mimetype)=>{
    try{
        if(mimetype === 'application/pdf'){
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            return{
                text : data.text,
                confidence : 0.9,
            }
        }
        const {data} = await Tesseract.recognize(filePath, 'eng', {
            logger: m => console.log(m.status)
        });
        return {
            text: data.text,
            confidence: data.confidence / 100,
        };
    }catch(error){
        throw new ApiError(500, 'Failed to extract text from file - OCR Failed');
    }
}