import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "USER", required: true },
    fileName: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String,
    extractedData: { type: Object, default: {} },
    isDeleted: { type: Boolean, default: false },
    hash: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Document", documentSchema);
