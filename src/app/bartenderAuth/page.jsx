"use client";

import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import LocationIco from "@/components/icon/LocationIco";
import Arrow from "@/components/icon/Arrow";
import Image1 from "../../../public/img/shopImage.png";
import { Navbar } from "@/components/shared/Navbar";
import { useLoginAdminMutation } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  
  const [login, { isLoading }] = useLoginAdminMutation();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  // ✅ Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("loginData");

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormValues({
        email: parsed.email || "",
        password: parsed.password || "",
        remember: true,
      });
    }
  }, []);

  // ✅ Handle input change (FIXED)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formValues.email,
        password: formValues.password,
      }).unwrap();

      // ✅ Save token
      localStorage.setItem("token", res?.data?.accessToken);

      toast.success(res?.message || "Login successful");

      // ✅ Remember me
      if (formValues.remember) {
        localStorage.setItem(
          "loginData",
          JSON.stringify({
            email: formValues.email,
            password: formValues.password,
          }),
        );
      } else {
        localStorage.removeItem("loginData");
      }

      // ✅ Redirect
      router.push("/shiftDetails");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
      console.error("Login Error:", err);
    }
  };

  return (
 <div className="">
      <Navbar></Navbar>
      <div className="w-full pt-28">
        {/* Shop Card */}
       <div className="bg-[#1A0E2E] border p-2 border-[#2A2448] rounded-2xl mb-6">
          <Link href={"/shopDetails"}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image
                  className="w-[70px] h-[70px] object-cover rounded-2xl"
                  src={Image1}
                  alt="Logo"
                />
                <div className="space-y-2">
                  <h2 className="text-[17px] text-white font-semibold">
                    Copper Alley Bar
                  </h2>
                  <p className="text-gray-400 text-[12px] flex gap-1 items-center">
                    <LocationIco /> Austin, Texas, USA
                  </p>
                </div>
              </div>
              <Arrow />
            </div>
          </Link>
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          Venue Bartender Login
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Sign in to start your shift and manage venue orders.
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
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-400 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                name="remember"
                checked={formValues.remember}
                onChange={handleChange}
              />
              Remember me
            </label>

            <Link href="/forgot-password" className="text-sm text-[#9D5BFF]">
              Forget password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 ${
              isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
            }`}
          >
            {isLoading ? (
              <>
                <Spin size="small" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
