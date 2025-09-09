"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => "getUser", // ✅ matches /api/getUser
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
