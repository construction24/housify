import { supabase } from "@/lib/utils";
import { generateOTP } from "@/lib/utils";
import { sendOtpToUser } from "@/lib/mailer";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import otpModel from "../../../models/otp";
import UserModel from "@/models/user";
import { connectDB } from "../../../dbConfig/dbConfig";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { msg: "Please provide an email" },
        { status: 401 }
      );
    }

    const otp = generateOTP();
    const token = jwt.sign({ email, otp }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const user = await UserModel.findOne({ email: email });
    // console.log("user", user);
    //sign up logic
    if (!user) {
      const newUser = await UserModel.create({
        email: email,
        otp: otp,
      });
      const otpRecord = new otpModel({ email, otp });
      await otpRecord.save();
    } else {
        user.otp = otp;
        await user.save();

    }

    // await supabase.rpc('insert_into_otp_table', { email, otp });

    try {
      await sendOtpToUser(email, otp);
      console.log("OTP sent to user successfully");

      return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error) {
    console.error("Invalid request:", error.message);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
