'use client';

import React, { useState } from "react";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

import {
  useRegisterVerifyMutation,
  useResentVerifyMutation
} from "@/redux/Api/userApi";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  // ✅ correct destructuring
  const [verifyOtp, { isLoading }] = useRegisterVerifyMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResentVerifyMutation();

  // ✅ resend handler
  const handleResend = async () => {
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      toast.error("Email not found!");
      return;
    }

    try {
      const response = await resendOtp({ email }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Verification code resent!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend code.");
    }
  };

  // ✅ submit handler
  const handleSubmit = async () => {
  const email = localStorage.getItem("resetEmail");

  if (!email) {
    toast.error("Email not found!");
    return;
  }

  if (otp.length !== 6) {
    toast.error("Enter a valid 6-digit OTP");
    return;
  }

  try {
    const response = await verifyOtp({
      email,
      resetCode: Number(otp), 
    }).unwrap();

    if (response?.success) {
      toast.success(response?.message || "OTP verified!");
      router.push("/auth/resetPassword");
    }
  } catch (error) {
    toast.error(error?.data?.message || "OTP verification failed.");
  }
};

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 bg-[#0F0B1A]">
      <div className="w-full max-w-lg p-8 border-[#2A2448] rounded-lg bg-[#822CE71A]">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          Check your email
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Enter the 6-digit code sent to your email.
        </p>

        {/* OTP */}
        <div className="flex justify-center mb-5 gap-2">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1"></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-12 h-12 text-center bg-[#1D1733] text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            )}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full mt-3 py-3 text-white rounded-full transition ${
            isLoading
              ? "bg-[#b879ff]"
              : "bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] hover:opacity-90"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Spin size="small" />
              <span>Verifying...</span>
            </div>
          ) : (
            "Continue"
          )}
        </button>

        {/* Resend */}
        <div className="flex justify-center mt-4 text-gray-400 text-sm">
          Didn’t receive the code?
          <button
            onClick={handleResend}
            disabled={isResendLoading}
            className="text-[#D17C51] pl-2"
          >
            {isResendLoading ? "Sending..." : "Resend"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Verify;