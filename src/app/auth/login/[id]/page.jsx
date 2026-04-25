"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, message, Spin } from "antd";
import Link from "next/link";
import Image from "next/image";

import Arrow from "@/components/icon/Arrow";
import Image1 from "../../../../../public/img/shopImage.png";
import { useLoginAdminMutation } from "@/redux/Api/userApi";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGetSingleVenueQuery } from "@/redux/Api/venueApi";
import LocationIco from "@/components/icon/LocationIco";

const Login = () => {
  const {id} = useParams();
  console.log(id)
  const { data: getSingleVenue } = useGetSingleVenueQuery({ id });
  
    const venue = getSingleVenue?.data;
    console.log(venue)
const [login, { isLoading }] = useLoginAdminMutation();
  const router = useRouter();
  const dispatch = useDispatch();
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

  // ✅ Handle input change
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

      const role = res?.data?.role;

      // ✅ Role check
      if (role === "bartender") {
      localStorage.setItem("accessToken", res.data.accessToken);

        console.log("Login Success:", res);
        
        toast.success(res?.message);
        router.push(`/shiftDetails/${id}`);

        // remember me
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
      } else {
        toast.error("Access denied: You are not a bartender");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
      console.error("Login Error:", err);
    }
  };
  return (
    <div className="flex container m-auto bg-[#0F0B1A] justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full">
        {/* Shop Card */}
        <div className="bg-[#1A0E2E] border p-2 border-[#2A2448] rounded-2xl mb-6">
          <Link href={"/shopDetails"}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image
                  className="w-[70px] h-[70px] object-cover rounded-2xl"
                  src={venue?.logo || Image1}
                  alt="Logo"
                  width={400}
                  height={400}
                />
                <div className="space-y-2">
                  <h2 className="text-[17px] text-white font-semibold">
                    {venue?.name || "Shop Name"}
                  </h2>
                  <p className="text-gray-400 text-[12px] flex gap-1 items-center">
                    <LocationIco /> {venue?.address || "No address found"}
                  </p>
                </div>
              </div>
              <Arrow />
            </div>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Venue Bartender Login
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Sign in to start your shift and manage venue orders.
        </p>

        {/* Normal Form */}
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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

            <Link href={"/forgot-password"} className="text-sm text-[#9D5BFF]">
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