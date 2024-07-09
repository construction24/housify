import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
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
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null
  }
});

const userModel = mongoose.model.users || mongoose.model("users", UserSchema);

export default userModel;
