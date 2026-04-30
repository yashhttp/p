export const extractStructuredData = (text) => {
  const cleanText = text.replace(/\n/g, " ").toLowerCase();

  const data = {};

  //  Name
  const nameMatch = cleanText.match(/name[:\s]+([a-z\s]+)/i);
  if (nameMatch) data.fullName = nameMatch[1].trim();

  // DOB
  const dobMatch = cleanText.match(/\b\d{2}[\/\-]\d{2}[\/\-]\d{4}\b/);
  if (dobMatch) data.dob = dobMatch[0];

  // Aadhaar
  const aadhaarMatch = cleanText.match(/\b\d{4}\s\d{4}\s\d{4}\b/);
  if (aadhaarMatch) data.aadhaar = aadhaarMatch[0];

  // PAN
  const panMatch = cleanText.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
  if (panMatch) data.pan = panMatch[0];

  return data;
};