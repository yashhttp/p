import { getBatchEmbeddings } from "./ai.provider.js";
import { findBestMatch } from "../mapping/mapping.rules.js"; 

//  CONFIG
const THRESHOLD = 0.6;

//  SMART FIELD HINTS
const ENHANCED_FIELDS = {
  fullName: ["full name", "legal name", "applicant name", "name"],
  email: ["email address", "mail", "email id"],
  phone: ["mobile", "contact number", "phone number"],
  address: ["full address", "residential address"],
  gender: ["sex"]
};

//  CLEAN TEXT (Fix 1)
const cleanText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
};

// EXPAND KEYS (Fix 5)
const expandKeys = (userData) => {
  const expanded = [];
  const keyMap = {};

  Object.keys(userData).forEach((key) => {
    const cleanKey = cleanText(key);

    expanded.push(cleanKey);
    keyMap[cleanKey] = key;

    if (ENHANCED_FIELDS[key]) {
      ENHANCED_FIELDS[key].forEach((alias) => {
        const cleanAlias = cleanText(alias);
        expanded.push(cleanAlias);
        keyMap[cleanAlias] = key;
      });
    }
  });

  return { expanded, keyMap };
};

//  COSINE SIMILARITY (Fix 2)
const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
};


export const smartMatch = async (fieldLabel, userData) => {
  try {
    //  Clean field
    const cleanedField = cleanText(fieldLabel);

    //  Expand keys
    const { expanded, keyMap } = expandKeys(userData);

    //  Get embeddings
    const embeddings = await getBatchEmbeddings([
      cleanedField,
      ...expanded
    ]);

    const fieldEmbedding = embeddings[0];
    const keyEmbeddings = embeddings.slice(1);

    let bestScore = 0;
    let bestKey = null;

    //  Compare similarity
    keyEmbeddings.forEach((emb, index) => {
      const score = cosineSimilarity(fieldEmbedding, emb);

      //  Debug logs (Fix 4)
    //   console.log(
    //     `Compare: "${cleanedField}" ↔ "${expanded[index]}" =`,
    //     score.toFixed(3)
    //   );

      if (score > bestScore) {
        bestScore = score;
        bestKey = expanded[index];
      }
    });

    //  AI SUCCESS
    if (bestScore >= THRESHOLD) {
      return {
        field: fieldLabel,
        matchedKey: keyMap[bestKey],
        confidence: Number(bestScore.toFixed(2)),
        source: "AI"
      };
    }

    //  FALLBACK (Level 5)
    const fallback = findBestMatch(fieldLabel, userData);

    return {
      field: fieldLabel,
      matchedKey: fallback?.matchedKey || null,
      confidence: fallback?.confidence || 0.5,
      source: fallback?.confidence > 0.6 ? "AI" : "FALLBACK"
    };

  } catch (error) {
    console.error("AI ERROR:", error.message);

    //  Safety fallback
    const fallback = findBestMatch(fieldLabel, userData);

    return {
      field: fieldLabel,
      matchedKey: fallback?.matchedKey || null,
      confidence: 0.4,
      source: "ERROR_FALLBACK"
    };
  }
};