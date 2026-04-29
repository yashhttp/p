// import { FIELD_ALIASES } from "./mapping.constants.js";
// import { normalize, stringSimilarity } from "./mapping.utils.js";

// export const findBestMatch = (fieldLabel, userData) => {
//   const normalizedField = normalize(fieldLabel);

//   let bestMatch = null;
//   let bestScore = 0;

//   for (const key in userData) {
//     const normalizedKey = normalize(key);

//     // direct match
//     if (normalizedField === normalizedKey) {
//       return { key, score: 1 };
//     }

//     // alias match
//     const aliases = FIELD_ALIASES[key] || [];
//     for (const alias of aliases) {
//       if (normalize(alias) === normalizedField) {
//         return { key, score: 0.95 };
//       }
//     }

//     // fuzzy match
//     const score = stringSimilarity(normalizedField, normalizedKey);

//     if (score > bestScore) {
//       bestScore = score;
//       bestMatch = key;
//     }
//   }

//   return bestScore > 0.5 ? { key: bestMatch, score: bestScore } : null;
// };
// import { FIELD_ALIASES } from "./mapping.constants.js";
// import { normalize, stringSimilarity } from "./mapping.utils.js";

// export const findBestMatch = (fieldLabel, userData) => {
//   const normalizedField = normalize(fieldLabel);

//   let bestMatch = null;
//   let bestScore = 0;

//   for (const key in FIELD_ALIASES) {
//     const aliases = FIELD_ALIASES[key];

//     for (const alias of aliases) {
//       const normalizedAlias = normalize(alias);

//       const score = stringSimilarity(normalizedField, normalizedAlias);

//       if (score > bestScore) {
//         bestScore = score;
//         bestMatch = key;
//       }
//     }
//   }

//   // 🔥 threshold
//   if (bestScore < 0.6) {
//     return {
//       matchedKey: null,
//       confidence: bestScore,
//       source: "FALLBACK",
//     };
//   }

//   return {
//     matchedKey: bestMatch,
//     confidence: bestScore,
//     source: "FALLBACK",
//   };
// };

import { FIELD_ALIASES } from "./mapping.constants.js";
import { normalize, stringSimilarity } from "./mapping.utils.js";

export const findBestMatch = (fieldLabel, userData) => {
  const normalizedField = normalize(fieldLabel);

  let bestMatch = null;
  let bestScore = 0;
  let source = "FALLBACK";


  for (const key in userData) {
    const normalizedKey = normalize(key);

    const score = stringSimilarity(normalizedField, normalizedKey);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = key;
      source = "AI"; 
    }
  }

  for (const key in FIELD_ALIASES) {
    const aliases = FIELD_ALIASES[key];

    for (const alias of aliases) {
      const normalizedAlias = normalize(alias);

      const score = stringSimilarity(normalizedField, normalizedAlias);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = key;
        source = "AI"; 
      }
    }
  }

  if (bestScore < 0.6) {
    return {
      matchedKey: null,
      confidence: bestScore,
      source: "FALLBACK",
    };
  }

  return {
    matchedKey: bestMatch,
    confidence: bestScore,
    source,
  };
};