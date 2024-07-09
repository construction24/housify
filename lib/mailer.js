import nodemailer from "nodemailer";
import { otpEmailTemplate } from "./emailTemplate";
import { generateOTP } from "./utils";

// Create a Nodemailer transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// utility Function to send email
export const sendMail = async function (options) {
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Acme <manager.construction24@gmail.com>",
      ...options,
    });

    console.log(`Email sent to ${options.to}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Utility function to send OTP to user
export const sendOtpToUser = async (email, otp) => {

  const message = otpEmailTemplate(otp);

  const mailOptions = {
    to: email,
    subject: "Your OTP Code",
    html: message,
  };

  try {
    const info = await sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return info;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};
