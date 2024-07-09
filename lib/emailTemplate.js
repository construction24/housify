export const otpEmailTemplate = (otp) => {
    return `
      <h1>Your OTP Code</h1>
      <p>Your OTP code is <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `;
  };
  