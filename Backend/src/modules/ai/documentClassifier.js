export const classifyDocument = (fileName, text = "") => {
  const name = fileName.toLowerCase();

  if (name.includes("aadhar") || text.includes("government of india")) {
    return "AADHAR";
  }

  if (name.includes("pan") || text.includes("income tax")) {
    return "PAN";
  }

  if (name.includes("resume") || text.includes("experience")) {
    return "RESUME";
  }

  return "OTHER";
};