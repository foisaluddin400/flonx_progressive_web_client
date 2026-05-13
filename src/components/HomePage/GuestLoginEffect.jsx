"use client";

import { useEffect } from "react";
import { useGuestUserMutation } from "@/redux/Api/userApi";

const DEVICE_ID_KEY = "deviceId";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export default function GuestLoginEffect() {
  const [guestLogin] = useGuestUserMutation();

  useEffect(() => {
    const handleGuestLogin = async () => {
      try {
        // Get existing deviceId
        let deviceId = localStorage.getItem(DEVICE_ID_KEY);

        // Generate only first time
        if (!deviceId) {
          deviceId = crypto.randomUUID();
          localStorage.setItem(DEVICE_ID_KEY, deviceId);
        }

        console.log("Device ID:", deviceId);

        // API Call
        const res = await guestLogin({ deviceId }).unwrap();

        // Save tokens
        if (res?.data?.accessToken) {
          localStorage.setItem(
            ACCESS_TOKEN_KEY,
            res.data.accessToken
          );
        }

        if (res?.data?.refreshToken) {
          localStorage.setItem(
            REFRESH_TOKEN_KEY,
            res.data.refreshToken
          );
        }

        console.log("Guest login success:", res);
      } catch (err) {
        console.error("Guest login error:", err);
      }
    };

    handleGuestLogin();
  }, [guestLogin]);

  return null;
}