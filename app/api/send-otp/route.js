import { supabase } from "@/lib/utils";
import { generateOTP } from "@/lib/utils";
import { sendOtpToUser } from "@/lib/mailer";
import * as jwt from "jsonwebtoken";
import { NextResponse } from 'next/server';
import otpModel from "../../../models/otp";
import userModel from "../../../models/user";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ msg: 'Please provide an email' }, { status: 401 });
        }

        const otp = generateOTP();
        const token = jwt.sign({ email, otp }, process.env.JWT_KEY, { expiresIn: '1h' });

        const user = await userModel.findOne({email: email});

        if (!user) {
          return NextResponse.json({ msg: 'Email not registered, Please Signup' }, { status: 404 });
      }
        const otpRecord = new otpModel({ user, otp });
        await otpRecord.save();

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
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
