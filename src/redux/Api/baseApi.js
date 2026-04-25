// src/Redux/baseApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://rnj64vmh-3500.inc1.devtunnels.ms/api/v1";

// ✅ get token
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

// ✅ base query
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", token); 
    }
    return headers;
  },
});

// 🔥 MAIN MAGIC HERE
const baseQueryWithAutoLogin = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

 
  if (result?.error?.status === 401) {
    try {
      // deviceId get/create
      let deviceId = sessionStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId = crypto.randomUUID();
        sessionStorage.setItem("deviceId", deviceId);
      }

      // 🔥 guest login call
      const loginResult = await baseQuery(
        {
          url: "/auth/guest-login", 
          method: "POST",
          body: { deviceId },
        },
        api,
        extraOptions
      );

      if (loginResult?.data?.data?.accessToken) {
        // save new token
        localStorage.setItem(
          "accessToken",
          loginResult.data.data.accessToken
        );

        // 🔥 retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Guest login failed");
        localStorage.clear();
      }
    } catch (error) {
      console.error("Auto login error:", error);
    }
  }

  return result;
};


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAutoLogin, 
  tagTypes: ["profile", "event", "videos"],
  endpoints: () => ({}),
});

export default baseApi;