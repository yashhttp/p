import { smartMatch } from "../ai/ai.service.js";
import { findBestMatch } from "../mapping/mapping.rules.js";
import { normalize } from "../mapping/mapping.utils.js";

//  helper: build full name
const buildFullName = (userData) => {
  if (userData.firstName || userData.lastName) {
    return `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  }
  return null;
};

//  safe getter (nested support)
const getSafeValue = (obj, path) => {
  if (!path) return null;

  return path.split(".").reduce((acc, key) => {
    if (!acc || typeof acc !== "object") return null;
    return acc[key];
  }, obj);
};

//  date formatter (FINAL FIX)
const formatDate = (date) => {
  if (!date) return null;

  const d = new Date(date);

  if (isNaN(d)) return null;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
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

export const resolveField = async (fieldLabel, userData) => {
  try {
    if (!userData || typeof userData !== "object") {
      return buildEmpty(fieldLabel, "NO_USER_DATA");
    }

    const normalizedField = normalize(fieldLabel);

    let matchResult;

    try {
      matchResult = await smartMatch(normalizedField, userData);
    } catch (err) {
      console.error("AI ERROR:", err.message);
    }

    if (
      !matchResult ||
      !matchResult.matchedKey ||
      matchResult.confidence < 0.6
    ) {
      const fallback = findBestMatch(normalizedField, userData);

      if (!fallback.matchedKey) {
        return buildEmpty(fieldLabel, "NO_MATCH");
      }

      matchResult = fallback;
    }

    let value = getSafeValue(userData, matchResult.matchedKey);

    if (!value && matchResult.matchedKey === "fullName") {
      value = buildFullName(userData);
      matchResult.source = "CUSTOM";
      matchResult.confidence = 1;
    }

    if (matchResult.matchedKey === "dob" && value) {
      value = formatDate(value);
    }
    if (typeof value === "string") {
      value = value.trim();
    }

    return {
      field: fieldLabel,
      value: value ?? null,
      meta: {
        matchedKey: matchResult.matchedKey,
        confidence: matchResult.confidence ?? 0,
        source: matchResult.source || "UNKNOWN",
      },
    };
  } catch (error) {
    console.error(" resolveField crash:", error.message);
    return buildEmpty(fieldLabel, "CRASH_SAFE");
  }
};
