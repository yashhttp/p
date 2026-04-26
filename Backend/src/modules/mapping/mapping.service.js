import { findBestMatch } from "./mapping.rules.js";
import {
  normalizeGender,
  buildFullAddress,
} from "./mapping.utils.js";

export const mapFields = (fields = [], userProfile = {}) => {
  const result = [];

  for (const field of fields) {
    const match = findBestMatch(field.label, userProfile);

    if (match) {
      let value = userProfile[match.key];

      //  special logic
      if (match.key === "gender") {
        value = normalizeGender(value);
      }

      if (match.key === "fullAddress") {
        value = buildFullAddress(userProfile);
      }

      result.push({
        field: field.name,
        label: field.label,
        mappedTo: match.key,
        value,
        confidence: match.score,
      });
    } else {
      result.push({
        field: field.name,
        label: field.label,
        mappedTo: null,
        value: null,
        confidence: 0,
      });
    }
  }

  return result;
};