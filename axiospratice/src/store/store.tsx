"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// 🔹 Types for better DX
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
