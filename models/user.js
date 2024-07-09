import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please fill a valid email address",
    ],
  },
  fullname: {
    type: String,
    required: true,
  },
  otp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "otp",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address',
    default: null,
  },
  refreshToken: {
    type: String,
    default: "", // Default to empty string for JWT token
  }
});

// Use `mongoose.models` to check if the model already exists
const UserModel = mongoose.models.users || mongoose.model("users", UserSchema);

export default UserModel;
