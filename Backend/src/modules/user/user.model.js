import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  phone: {type: String, default: ""},
  dob: Date,
  gender: {type: String, default: ""},
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
