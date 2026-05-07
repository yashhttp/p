export const buildPreview = (form, autofilledData, validationErrors = []) => {
  const preview = [];

  const errorsArray = Array.isArray(validationErrors)
    ? validationErrors
    : Object.keys(validationErrors || {}).map((key) => ({
        field: key,
        message: validationErrors[key],
      }));

  const getConfidenceLevel = (score) => {
    if (score > 0.8) return "HIGH";
    if (score > 0.5) return "MEDIUM";
    return "LOW";
  };
  const getSourcePriority = (source) => {
    switch (source) {
      case "AI":
        return 1;
      case "COMPOSED":
        return 2;
      case "RULE":
        return 3;
      default:
        return 4;
    }
  };

  for (const field of form.fields) {
    const filled = autofilledData[field.name] || {};
    const error = errorsArray.find((err) => err.field === field.name);

    //  VALUE HANDLE
    let value = filled.value || "";

    //  DATE FORMAT FIX (IMPORTANT)
    if (field.type === "date" && value) {
      value = new Date(value).toISOString().split("T")[0];
    }
    const isLocked =
      field.locked === true ||
      field.type === "govt_id" ||
      field.name === "aadhar" ||
      field.name === "pan";


    preview.push({
      field: field.name,
      label: field.label,
      type: field.type,

      value: value, //

      confidence: filled.confidence || 0,
      confidenceLevel: getConfidenceLevel(filled.confidence || 0),
      source: filled.source || "UNKNOWN",
      sourcePriority: getSourcePriority(filled.source),
      editable: isLocked ? false : true,
      

      isValid: !error,
      error: error ? error.message : null,
    });
  }

  return preview;
};
