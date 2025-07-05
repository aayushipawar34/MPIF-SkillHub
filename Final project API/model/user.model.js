import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
contact: {
  type: Number,
  required: false,      // ✅ make optional
  unique: true,
  sparse: true,         // ✅ ignore duplicates if value is missing/null
},


  email: {
    type: String,
    required: true,
    unique: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  otp: {
    type: String,
  },

  googleId: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  resetOtp: {
    type: String,
  },

  resetOtpExpire: {
    type: Date,
  },

  gender: String,
  dateOfBirth: Date,
  address: String,
  education: String,
  profilePicture: String,
});

export const User = mongoose.model("user", userSchema);
export default User;
