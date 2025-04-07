import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryInterceptor } from "../../lib/utils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryInterceptor("/api/auth"),
  endpoints: (builder) => ({
    getUser: builder.query({ query: () => "/profile" }),
    login: builder.mutation({
      query: (body) => ({ url: "/login", method: "POST", body })
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/register", method: "POST", body })
    })
  })
});

export const { useLazyGetUserQuery, useLoginMutation, useRegisterMutation } =
  authApi;
