import { generateOTP } from "@/lib/utils";
import { sendOtpToUser } from "@/lib/mailer";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig";

export async function POST(req) {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Database connection established.");

    const { email } = await req.json();
    console.log("Received email:", email);

    if (!email) {
      console.warn("Email not provided in the request.");
      return NextResponse.json(
        { msg: "Please provide an email" },
        { status: 401 }
      );
    }

    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    const otpToken = jwt.sign({ email, otp }, process.env.JWT_KEY, {
      expiresIn: "10m",
    });

    console.log("Generated JWT token.");

    try {

      await sendOtpToUser(email, otp);
      console.log("OTP sent to user successfully.");
      
      return NextResponse.json({ otpToken }, { status: 200 });

    } catch (error) {

      console.error("Error sending OTP:", error.message);
      return NextResponse.json(
        { error: "Failed to send OTP. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Invalid request:", error.message);
    return NextResponse.json(
      { error: "Invalid request. Please check your input and try again." },
      { status: 400 }
    );
  }
}
