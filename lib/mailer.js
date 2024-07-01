import nodemailer from "nodemailer";

// Create a Nodemailer transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // your email
    pass: 'your-password', // your password
  },
});

// Function to send email
async function sendMail(options) {
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      ...options,
    });

    console.log(`Email sent to ${options.to}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export default sendMail;