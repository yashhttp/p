import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    refreshToken: String,

    lastLogin: Date, // 🔥 pro feature
  },
  { timestamps: true }
);

export default mongoose.model("User", authSchema);