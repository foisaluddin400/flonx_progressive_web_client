import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./Api/baseApi";



export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// In JavaScript, no need for type annotations
export default store;
