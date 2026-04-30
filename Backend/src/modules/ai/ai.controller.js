 import asyncHandler from "../../utils/asyncHandler.js";
import { smartMatch, cleanExtractedData } from "./ai.service.js";
import { extractStructuredData } from "./extract.service.js";
import { extractTextFromFile } from "./ocr.service.js";
import ApiResponse from "../../utils/ApiResponse.js";


export const matchField = asyncHandler(async (req, res) => {
  const { fieldLabel, userData } = req.body;

  const result = await smartMatch(fieldLabel, userData);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "AI match success"));
});

export const batchMatch = asyncHandler(async (req, res) => {
  const { fields, userData } = req.body;

  const results = [];

  for (const field of fields) {
    const match = await smartMatch(field, userData);
    results.push(match);
  }

  return res.status(200).json(
    new ApiResponse(200, "Batch match success", results)
  );
});

export const extractDocumentData = asyncHandler(async (req, res, next) => {
  try {
    const file = req.file;
    if(!file){
      return res.status(400).json({
        success:false,
        message : "File required"
      })
    }
    const ocrResult = await extractTextFromFile(file.path, file.mimetype)

    const structuredData = await extractStructuredData(ocrResult.text);

    const aiData =  await cleanExtractedData(structuredData);
    
    return res.status(200).json({
      success:true,
      data :{
         rawText: ocrResult.text.slice(0, 500),
        extracted: structuredData,
        final: aiData.cleaned,
        confidence: ocrResult.confidence,
      }
    })
  } catch (error) {
    next(error);
    
  }

})