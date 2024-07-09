const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "1h",
    },
  },
  { timestamps: true }
);

const otpModel = mongoose.model.otp || mongoose.model("otp", otpSchema);

export default otpModel;
