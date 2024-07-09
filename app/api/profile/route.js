import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import { connectDB } from "@/dbConfig/dbConfig";

export async function POST(req) {
     
    try {
        await connectDB();
        const { email } = await req.json();
        // console.log("email", email)
        if (!email) {
            return NextResponse.json({ msg: 'Please provide an email' }, { status: 400 });
        }

        const user = await UserModel.findOne({ email: email });
        // console.log("user", user);
        if (!user) {
            return NextResponse.json({ msg: 'Email not registered, Please Signup' }, { status: 404 });
        }
        //leaving token thing here if needed 
        // const token = jwt.sign({ email, otp }, process.env.JWT_KEY, { expiresIn: '1h' });

        return NextResponse.json({
            user: user,
            // token: token
        }, { status: 200 });
    } catch (error) {
        console.log("Error in getting user details route", error);
        return NextResponse.json({
            message: "Error in getting user details",
            error: error.message
        }, { status: 500 });
    }
}

//delete route
export async function DELETE(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ msg: 'Please provide an email' }, { status: 400 });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ msg: 'Email not registered, Please Signup' }, { status: 404 });
        }

        // Delete the user
        await UserModel.deleteOne({ email: email });

        return NextResponse.json({ msg: 'User details successfully deleted' }, { status: 200 });
    } catch (error) {
        console.log("Error in deleting user", error);
        return NextResponse.json({
            message: "Error in deleting user",
            error: error.message
        }, { status: 500 });
    }
}

//put route depending on need