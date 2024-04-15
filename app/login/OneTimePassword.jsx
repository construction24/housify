"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function OneTimePassword({methodOfLogin, userDetail}) {
  const [value, setValue] = useState("");
  const router = useRouter();

  const onComplete = () => {
    console.log(value);
    router.push("/");
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center gap-8">
      <div>
        <h2>OTP Verification</h2>
        <p>One Time Password (OTP) has been sent vai {methodOfLogin} to {methodOfLogin === "phone" ? "+91" : ""}<b>{userDetail}</b> </p>
        <p>Please enter the OTP to verify your account</p>
      </div>
      
      <InputOTP
        maxLength={6}
        onChange={(val) => setValue(val)}
        onComplete={onComplete}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
