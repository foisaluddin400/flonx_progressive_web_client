// src/Redux/baseApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://10.10.20.9:3500/api/v1";

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
      // ⚠️ if backend needs:
      // headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// ✅ NO 401 HANDLING HERE
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery, // 🔥 directly use baseQuery
  tagTypes: ["profile", "event", "videos"],
  endpoints: () => ({}),
});

export default baseApi;