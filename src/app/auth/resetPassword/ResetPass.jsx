'use client';

import React, { useState, useEffect } from "react";
import { Form, Input, Spin } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/Api/userApi";
import { toast } from "react-toastify";

const ResetPass = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ FIX: localStorage safe access
  const [venueId, setVenueId] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVenueId(localStorage.getItem("venueId"));
      setEmail(localStorage.getItem("resetEmail"));
    }
  }, []);

  const onFinish = async (values) => {
    if (!email) {
      toast.error("Email not found!");
      return;
    }

    try {
      const response = await resetPassword({
        email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      toast.success(response?.message || "Password reset successful!");

      // ✅ safe redirect
      router.push(venueId ? `/auth/login/${venueId}` : "/auth/login");

    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg p-6 lg:p-8 rounded-lg bg-[#822CE71A]">

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">
          Set a New Password
        </h2>

        <p className="mb-6 text-sm text-gray-400">
          Secure your account by creating a new password.
        </p>

        {/* Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>

          {/* Password */}
          <label className="text-gray-400 block mb-1">
            New Password
          </label>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Enter your password!" },
              { min: 6, message: "Minimum 6 characters!" },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              suffix={
                <span
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Confirm Password */}
          <label className="text-gray-400 block mb-1">
            Confirm Password
          </label>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              style={{ height: "50px" }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              suffix={
                <span
                  className="cursor-pointer text-gray-400"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <button
              type="submit" // ✅ FIXED
              disabled={isLoading}
              className="w-full h-12 text-white rounded-full bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spin size="small" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default ResetPass;