"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function OneTimePassword({methodOfLogin, userDetail}) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const {toast} = useToast();

  const onComplete = async () => {
    try {
      console.log(value);
      const response = await axiosInstance.post('/api/verify-otp', { otp: value });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log("otp verified successfully");
      toast({
        description: "OTP verified successfully",
      });

      console.log(response);
      router.push("/");
    } catch (error) {
      toast({
          title: "OTP Verification Failed",
          description: "The entered OTP does not match. Please try again."
        })
    }
    
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center gap-8">
      <div>
        <h2>OTP Verification</h2>
        <p>One Time Password (OTP) has been sent via {methodOfLogin} to {methodOfLogin === "phone" ? "+91" : ""}<b>{userDetail}</b> </p>
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
