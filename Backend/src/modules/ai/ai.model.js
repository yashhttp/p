import mongoose from "mongoose";

const learningSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: true,
      trim: true,
      index: true, //  fast search
    },

    matchedKey: {
      type: String,
      required: true,
      trim: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    usageCount: {
      type: Number,
      default: 1, //  learning strength
    },

    source: {
      type: String,
      enum: ["AI", "FALLBACK", "MANUAL"],
      default: "AI",
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 UNIQUE COMPOUND INDEX (IMPORTANT)
learningSchema.index({ field: 1, matchedKey: 1 }, { unique: true });

export default mongoose.model("Learning", learningSchema);