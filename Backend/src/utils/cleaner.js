
export const cleanEmail = (text) => {
  if (!text) return null;

  const match = text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );

  return match ? match[0] : null;
};

//  FIELD CLEANER
export const cleanFields = (data) => {
  const cleaned = { ...data };

  if (cleaned.email) {
    const match = cleaned.email.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );
    cleaned.email = match ? match[0] : null;
  }

  if (cleaned.phone) {
    cleaned.phone = cleaned.phone.replace(/[^\d+]/g, "");
  }

  return cleaned;
};
export const formatPhone = (phone) => {
  if (!phone) return null;

  const digits = phone.replace(/\D/g, "").slice(-10);

  return `+91-${digits}`;
};