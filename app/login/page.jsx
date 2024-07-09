"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OneTimePassword } from "./OneTimePassword";
import axiosInstance from "@/lib/axiosInstance";

import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast"


const Signin = () => {
  const [verificationOption, setVerificationOption] = useState("email");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false); // Track if verification code has been sent
  const [loading, setLoading] = useState(false);

  const {toast} = useToast();

  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Reset error message when input changes
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneError(""); // Reset error message when input changes
  };

  const validateEmail = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePhoneNumber = () => {
    // Regular expression for phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSendVerificationCode = async (e) => {
    e.preventDefault(); 

   

    let isValid = true;
    if (verificationOption === "phone") {
      isValid = validatePhoneNumber();
    } else {
      isValid = validateEmail();
    }

    if (isValid) {

      setLoading(true);
      // logic to send verification code based on the selected option
      if (verificationOption === "phone") {
        console.log("Sending verification code to", phoneNumber);
      } else {
        console.log("Sending verification code to", email);
      }
      
      try {
        const response = await axiosInstance.post('/api/send-otp', { email });
        const { token } = response.data;
        localStorage.setItem('token', token);

        toast({
          description: "Your otp has been sent successfully.",
        })

        setVerificationSent(true); // Set verification sent to true
        setLoading(false);

      }catch(error){
        console.log(error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      }
    }
  };

  const handleSwitchVerificationOption = () => {
    setVerificationOption((prevOption) =>
      prevOption === "phone" ? "email" : "phone"
    );
    // Focus on the correct input field after switching option
    if (verificationOption === "phone") {
      setTimeout(() => {
        emailRef.current.focus();
      }, 0);
    } else {
      setTimeout(() => {
        phoneRef.current.focus();
      }, 0);
    }
    setVerificationSent(false); // Reset verification sent when switching option
  };

  return (
    <section>
      <div className="container mx-auto h-[100vh]">
        <div className="-mx-4 flex flex-wrap h-full justify-center items-center">
          <div className="w-full px-4">

            {/* login box start */}

            <div className="border border-primary shadow-lg animate-slide-in-right relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-10 py-16 text-center sm:px-12 md:px-[60px]">
              {!verificationSent && <h2>Welcome to Keshav Builders</h2>}
              {!verificationSent && <Link href="/"><Image src="/logo.ico" width={80} height={80} className="m-auto mb-5 mt-5 rounded-full" alt = "logo"/></Link>}
              {!verificationSent && (
                <form onSubmit={handleSendVerificationCode}>
                  {verificationOption === "email" && (
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        ref={emailRef}
                        onChange={handleEmailChange}
                        className="border border-input focus:border-none"
                      />
                      <span className="text-red-500 inline-block pt-4">{emailError}</span>
                    </div>
                  )}
                  {verificationOption === "phone" && (
                    <div>
                      <Input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        ref={phoneRef}
                        onChange={handlePhoneNumberChange}
                        className="border border-input focus:border-none"
                      />
                      <span className="text-red-500 inline-block pt-4">{phoneError}</span>
                    </div>
                  )}

                {/* Conditionally render SMS and verification code message */}
                {!verificationSent && (
                  <p className="text-base text-body-color dark:text-dark-6">
                    We will send you an SMS with a verification code and an email with a verification link.
                  </p>
                )}

                  <div className="m-7">
                    <Button type="submit" disabled = {loading}>{loading ? "Sending verification code ..." : "Send Verification Code"}</Button>
                  </div>
                </form>
              )}

              {verificationSent && (
                <div>
                  <OneTimePassword 
                    methodOfLogin={verificationOption === "phone" ? "sms" : "Email"}
                    userDetail={verificationOption === "phone" ? phoneNumber : email}
                  />
                </div>
              )}
                
              {!verificationSent && (
                <p className="mt-4">
                  <button
                    className="text-primary hover:underline focus:outline-none"
                    onClick={handleSwitchVerificationOption}
                  >
                    {verificationOption === "phone"
                      ? "Use your email instead"
                      : "Use your phone number instead"}
                  </button>
                </p>
              )}

            </div>

            {/* login box end */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
