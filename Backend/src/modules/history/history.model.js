import mongoose from "mongoose";

const fieldChangeSchema = new mongoose.Schema({
  field: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
});

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },

    version: {
      type: Number,
      required: true,
    },

    dataSnapshot: {
      type: Object, // full form snapshot at that time
      required: true,
    },

    changes: [fieldChangeSchema],

    source: {
      type: String,
      enum: ["AI", "MANUAL", "OCR", "MAPPING"],
      default: "AI",
    },

    confidenceScore: {
      type: Number,
      default: 1,
    },

    isFinal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Fast lookup index (important for production)
historySchema.index({ userId: 1, formId: 1, version: -1 });

export default mongoose.model("History", historySchema);