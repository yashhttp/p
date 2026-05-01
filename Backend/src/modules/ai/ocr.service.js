import Tesseract from "tesseract.js";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse/lib/pdf-parse.js");

export const extractTextFromFile = async (filePath, mimetype) => {
  try {
    //  PDF handling
    if (mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);

      if (!data.text || data.text.trim().length < 10) {
        throw new Error("EMPTY_PDF_TEXT");
      }

      return {
        text: data.text,
        confidence: 0.9,
      };
    }

    // IMAGE OCR
    const { data } = await Tesseract.recognize(filePath, "eng");

    return {
      text: data.text,
      confidence: data.confidence / 100,
    };
  } catch (error) {
    console.error("OCR ERROR:", error);
    throw new Error("OCR_FAILED");
  }
};
