const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "dob",
  "gender",
  "address.line1",
  "address.city",
  "address.state",
  "address.pincode",
  "govtIds.aadhar",
  "govtIds.pan",
];

const getValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const calculateProfileCompletion = (profile) => {
  let filled = 0;

  REQUIRED_FIELDS.forEach((field) => {
    const value = getValue(profile, field);
    if (value) filled++;
  });

  const percentage = Math.round((filled / REQUIRED_FIELDS.length) * 100);

  return {
    percentage,
    filled,
    total: REQUIRED_FIELDS.length,
  };
};