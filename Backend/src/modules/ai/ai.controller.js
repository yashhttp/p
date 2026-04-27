 import asyncHandler from "../../utils/asyncHandler.js";
import { smartMatch } from "./ai.service.js";
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