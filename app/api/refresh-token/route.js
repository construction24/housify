import * as jwt from "jsonwebtoken";
import userModel from "../../../models/user";
import { NextResponse } from "next/server";
import { connectDB } from "../../../dbConfig/dbConfig";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { msg: "Please provide an email" },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { msg: "Email not registered, Please Signup" },
        { status: 404 }
      );
    }

    const refreshToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });

    user.refreshToken = refreshToken;
    await user.save();
     
    return NextResponse.json({
        refreshToken: refreshToken,
    }, { status: 201 });
  } catch (error) {
    console.error("Error generating token:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
