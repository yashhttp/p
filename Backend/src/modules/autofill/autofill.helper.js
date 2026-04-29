// import { smartMatch } from "../ai/ai.service.js";
// import { normalize } from "../mapping/mapping.utils.js";

// export const resolveField = async (fieldLabel, userData) => {
//   // Normalize label for consistency
//   const normalizedField = normalize(fieldLabel);

//   //  AI + fallback match
//   const matchResult = await smartMatch(normalizedField, userData);

//   let value = userData[matchResult.matchedKey];

//   //  Handle nested fields 
//   if (!value && matchResult.matchedKey?.includes(".")) {
//     value = getNestedValue(userData, matchResult.matchedKey);
//   }

//   //  Data cleanup 
//   if (typeof value === "string") {
//     value = value.trim();
//   }

//   return {
//     field: fieldLabel,
//     value: value || null,
//     meta: {
//       matchedKey: matchResult.matchedKey,
//       confidence: matchResult.confidence,
//       source: matchResult.source,
//     },
//   };
// };

// const getNestedValue = (obj, path) => {
//   return path.split(".").reduce((acc, key) => {
//     return acc ? acc[key] : null;
//   }, obj);
// };

import { smartMatch } from "../ai/ai.service.js";
import { normalize } from "../mapping/mapping.utils.js";


// export const resolveField = async (fieldLabel, userData) => {
//   try {
 
//     if (!userData || typeof userData !== "object") {
//       return buildEmpty(fieldLabel, "NO_USER_DATA");
//     }

//     const normalizedField = normalize(fieldLabel);

//     let matchResult = null;

//     try {
//       matchResult = await smartMatch(normalizedField, userData);
//     } catch (err) {
//       console.error("AI ERROR:", err.message);
//     }

//     if (!matchResult || !matchResult.matchedKey) {
//       return buildEmpty(fieldLabel, "NO_MATCH");
//     }

//     let value = getSafeValue(userData, matchResult.matchedKey);

//     if (typeof value === "string") {
//       value = value.trim();
//     }

//     return {
//       field: fieldLabel,
//       value: value ?? null,
//       meta: {
//         matchedKey: matchResult.matchedKey,
//         confidence: matchResult.confidence ?? 0,
//         source: matchResult.source || "UNKNOWN",
//       },
//     };

//   } catch (error) {
//     console.error("❌ resolveField crash:", error.message);

//     return buildEmpty(fieldLabel, "CRASH_SAFE");
//   }
// };
export const resolveField = async (fieldLabel, userData) => {
  const normalizedField = normalize(fieldLabel);

  const matchResult = await smartMatch(normalizedField, userData);

  let value = userData[matchResult.matchedKey];

  // 🔥 DEBUG LOGS (yaha add kar)
  console.log("------ DEBUG ------");
  console.log("FIELD:", fieldLabel);
  console.log("MATCH RESULT:", matchResult);
  console.log("VALUE BEFORE:", value);

  // Nested support
  if (!value && matchResult.matchedKey?.includes(".")) {
    value = getNestedValue(userData, matchResult.matchedKey);
  }

  console.log("VALUE AFTER:", value);
  console.log("-------------------");

  if (typeof value === "string") {
    value = value.trim();
  }

  return {
    field: fieldLabel,
    value: value || null,
    meta: {
      matchedKey: matchResult.matchedKey,
      confidence: matchResult.confidence,
      source: matchResult.source,
    },
  };
};
const getSafeValue = (obj, path) => {
  if (!path) return null;

  return path.split(".").reduce((acc, key) => {
    if (!acc || typeof acc !== "object") return null;
    return acc[key];
  }, obj);
};

const buildEmpty = (fieldLabel, reason) => {
  return {
    field: fieldLabel,
    value: null,
    meta: {
      matchedKey: null,
      confidence: 0,
      source: reason,
    },
  };
};