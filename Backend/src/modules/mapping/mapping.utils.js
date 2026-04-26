// normalize string
export const normalize = (text = "") => {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
};

// simple similarity
export const stringSimilarity = (a, b) => {
  let matches = 0;
  const len = Math.min(a.length, b.length);

  for (let i = 0; i < len; i++) {
    if (a[i] === b[i]) matches++;
  }

  return matches / Math.max(a.length, b.length);
};

// gender normalization
export const normalizeGender = (value) => {
  if (!value) return null;

  const v = value.toLowerCase();

  if (v.startsWith("m")) return "Male";
  if (v.startsWith("f")) return "Female";
  return "Other";
};

// build full address
export const buildFullAddress = (profile) => {
  return [
    profile.addressLine1,
    profile.city,
    profile.state,
    profile.pincode,
    profile.country,
  ]
    .filter(Boolean)
    .join(", ");
};