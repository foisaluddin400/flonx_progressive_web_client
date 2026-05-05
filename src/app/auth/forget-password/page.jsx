"use client";
import { useForgotPasswordMutation } from "@/redux/Api/userApi";
import { Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();
const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    const res = forgetPassword({ email }).unwrap();
    res.then((response) => {
      console.log("Response:", response);
      if (response?.success) {
        toast.success(response?.message || "Verification code sent successfully!");
        localStorage.setItem("resetEmail", email);
        router.push("/auth/verification");
      }
    }).catch((error) => {
      console.error("Error:", error);
        toast.error(error?.data?.message || "Failed to send verification code.");
    });
    
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 bg-[#0F0B1A]">
      <div className="w-full max-w-lg p-8 border-[#2A2448] rounded-lg bg-[#822CE71A]">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2 italic">
          Forget Password
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Enter your registered email address and we’ll send you a verification
          code to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-gray-400 block mb-1">
              Enter Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#822CE7] placeholder-white/70"
              required
            />
          </div>

          {/* Continue Button */}
        
            <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-3 bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] py-3 text-white rounded-full shadow-md hover:opacity-90 transition ${
              isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
            }`}
          >
            {isLoading ? (
              <>
                <Spin size="small" />
                <span>Submitting...</span>
              </>
            ) : (
              "Submit"
            )}
            </button>
         
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
