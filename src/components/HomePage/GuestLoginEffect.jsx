"use client";
import { useEffect } from "react";
import { useGuestUserMutation } from "@/redux/Api/userApi";

export default function GuestLoginEffect() {
  const [guestLogin] = useGuestUserMutation();

  useEffect(() => {
    let deviceId = sessionStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      sessionStorage.setItem("deviceId", deviceId);
    }

    const callGuestLogin = async () => {
      try {
        const res = await guestLogin({ deviceId }).unwrap();

        if (res?.data?.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
        }
        if (res?.data?.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }

        console.log("Guest login success:", res);
      } catch (err) {
        console.error("Guest login error:", err);
      }
    };

    callGuestLogin();
  }, []);

  return null;
}