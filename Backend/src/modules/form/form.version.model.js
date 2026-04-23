
import mongoose from "mongoose";

const formVersionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },

  snapshot: mongoose.Schema.Types.Mixed,

  version: Number,
}, { timestamps: true });

export const FormVersion = mongoose.model("FormVersion", formVersionSchema);