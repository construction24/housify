import * as jwt from "jsonwebtoken";
import { connectDB } from "@/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { idTokenExpiry } from "@/constants";

export async function POST(req) {
  try {
    console.log("Received POST request.");

    let token = req.headers.get('authorization');
    if (!token) {
      console.log("Authorization header missing.");
      return NextResponse.json({ message: 'Token Missing' }, { status: 403 });
    }
    
    token = token.split(' ')[1];
    console.log("Extracted token:", token);

    const { otp } = await req.json();
    console.log("Received OTP:", otp);

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("Decoded token:", decoded);

    // Verify OTP
    if (otp !== decoded.otp) {
      console.log("OTP verification failed.");
      return NextResponse.json({ message: 'OTP not matched' }, { status: 403 });
    }

    console.log("OTP verification successful.");

    // Connect to the database
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    // Check if user exists in MongoDB
    console.log("Checking if user exists in MongoDB...");
    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      console.log("User not found. Creating new user in MongoDB...");
      user = await User.create({ email: decoded.email });
      console.log("New user created:", user);
    } else {
      console.log("User found:", user);
    }

    // Generate new JWT token with updated expiry
    console.log("Generating new JWT token...");
    const newToken = jwt.sign({ email: decoded.email, id: user._id }, process.env.JWT_KEY, { expiresIn: idTokenExpiry });
    console.log("New JWT token generated:", newToken); 


    // Set the JWT token in a cookie
    cookies().set('idToken', newToken,  {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Helps prevent CSRF
      maxAge: idTokenExpiry, // Cookie expiry in seconds
      path: '/', // Cookie available throughout the entire site
    })

    console.log("JWT token saved in cookie.");  
    // Return JSON response with the token
    return NextResponse.json({ token: newToken }, { status: 201 });

  } catch (error) {
    console.error("Error:", error.message);

    if (error.name === 'JsonWebTokenError') {
      console.log("Invalid token.");
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (error.name === 'TokenExpiredError') {
      console.log("Token expired.");
      return NextResponse.json({ message: "Token expired" }, { status: 401 });
    }

    // Handle database connection errors
    if (error.message.includes("failed to connect to server")) {
      console.log("Database connection failed.");
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }

    // Handle other errors (e.g., MongoDB errors)
    if (error.name === 'MongoError') {
      console.log("Database error.");
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    console.log("Internal Server Error.");
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
