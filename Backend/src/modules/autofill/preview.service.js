export const buildPreview = (form, autofilledData, validationErrors = []) => {
  const preview = [];

  // safety
  const errorsArray = Array.isArray(validationErrors)
    ? validationErrors
    : Object.keys(validationErrors || {}).map((key) => ({
        field: key,
        message: validationErrors[key],
      }));

  for (const field of form.fields) {
    const filled = autofilledData[field.name] || {};

    const error = errorsArray.find(
      (err) => err.field === field.name
    );
    const getConfidenceLevel = (score) => {
  if (score > 0.8) return "HIGH";
  if (score > 0.5) return "MEDIUM";
  return "LOW";
};

    preview.push({
      field: field.name,
      label: field.label,
      type: field.type,

      value: filled.value || "",
      confidence: filled.confidence || 0,
      confidenceLevel: getConfidenceLevel(filled.confidence || 0),
      source: filled.source || "UNKNOWN",

      editable: true,

      isValid: !error,
      error: error ? error.message : null,
    });
  }

  return preview;
};