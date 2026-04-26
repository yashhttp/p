import { WEIGHTS } from "./ai.constants.js";
import { stringSimilarity } from "../mapping/mapping.utils.js";

export const hybridScore = (aiScore, fieldLabel, key) => {
  const keywordScore = stringSimilarity(fieldLabel, key);

  return (
    aiScore * WEIGHTS.AI +
    keywordScore * WEIGHTS.KEYWORD
  );
};