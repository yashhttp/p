import { cleanEmail } from "../../utils/cleaner.js";
import { formatPhone } from "../../utils/cleaner.js";

// EMAIL
export const extractEmail = (text) => {
  if (!text) return null;

  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

  if (!match) return null;

  let email = match[0];

  // 🔥 FIX: remove OCR leading junk chars before first letter
  email = email.replace(/^[^a-zA-Z0-9]+/, "");

  // 🔥 EXTRA SAFETY: ensure no invalid leading uppercase garbage
  email = email.replace(/^[A-Z](?=[a-z])/g, "");

  return email;
};

// NAME
const extractName = (text) => {
  const lines = text.split("\n").map((l) => l.trim());

  for (let line of lines) {
    if (/^[A-Z\s]{5,}$/.test(line) && line.split(" ").length <= 4) {
      return line;
    }
  }

  return null;
};

const smartSplit = (text) => {
  return (
    text
      // split digit-letter joins
      .replace(/(\d)([A-Za-z])/g, "$1 $2")

      // split email corruption (OCR fix)
      .replace(/([a-z])([A-Z][a-z0-9]+@\w)/g, "$1 $2")

      // lowercase-uppercase split
      .replace(/([a-z])([A-Z])/g, "$1 $2")

      // normalize spaces
      .replace(/\s+/g, " ")
      .trim()
  );
};

//  PHONE
const extractPhone = (text) => {
  if (!text) return null;
  const match = text.match(/(\+91[\-\s]?)?[6-9]\d{9}/);

  return match ? match[0] : null;
};

//  MAIN FUNCTION
export const extractStructuredData = (text) => {
  const data = {};

  const processedText = smartSplit(text);

  const emailRaw = extractEmail(processedText);
  const email = cleanEmail(emailRaw);

  if (email) data.email = email;

  const phoneRaw = extractPhone(text);

  if (phoneRaw) {
    data.phone = formatPhone(phoneRaw);
  }

  const name = extractName(text);
  if (name) data.fullName = name;

  const locationMatch = processedText.match(
    /\b(mumbai|delhi|bangalore|pune|hyderabad|india)\b/i,
  );

  if (locationMatch) {
    data.location = locationMatch[0];
  }

  return data;
};
