'use client'
import React, { useState } from "react";
import { Form, Input, Spin, Button } from "antd";
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
const venueId = localStorage.getItem("venueId");
  const onFinish = async (values) => {
    const email = localStorage.getItem("resetEmail");

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

      // ✅ redirect after success
      router.push(`/auth/login/${venueId}`);

    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg p-6 lg:p-8 rounded-lg bg-[#822CE71A]">

        <h2 className="text-2xl font-semibold mb-2">
          Set a New Password
        </h2>
        <p className="mb-6 text-sm text-gray-400">
          Secure your account by creating a new password.
        </p>

        <Form form={form} layout="vertical" onFinish={onFinish}>
<label className="text-gray-400 block mb-1">
              New Password
            </label>
          {/* Password */}
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
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>
<label className="text-gray-400 block mb-1">
             Confirm Password
            </label>
          {/* Confirm Password */}
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
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input
              style={{ height: "50px" }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              suffix={
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <button
              htmlType="submit"
              block
              disabled={isLoading}
              className="h-12 w-full text-white rounded-full bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]"
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