import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  dob: Date,
  gender: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
  },
  govtIds: {
    aadhar: String,
    pan: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    profile: {
       type: profileSchema,
       default:{},
        _id: false 
    } //main system
  },
  { timestamps: true },
);

export default mongoose.model("Users", userSchema)