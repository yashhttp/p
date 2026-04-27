import Learning from "./ai.model.js";

export const saveLearning = async (field, matchedKey, confidence) => {
  try {
    const existing = await Learning.findOne({ field, matchedKey });

    if (existing) {
      existing.usageCount += 1;

      //  confidence improve over time
      existing.confidence =
        (existing.confidence + confidence) / 2;

      await existing.save();
    } else {
      await Learning.create({
        field,
        matchedKey,
        confidence,
      });
    }
  } catch (err) {
    console.log("Learning save error:", err.message);
  }
};

export const getLearnedMatch = async (field) => {
  return await Learning.findOne({ field }).sort({
    usageCount: -1, //  most used first
  });
};