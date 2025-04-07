import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN } from "./constants";
import { actions } from "../redux/store";
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuth = (): boolean => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    return false;
  }

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const Headers = () => localStorage.getItem(AUTH_TOKEN) || "";

export const baseQueryInterceptor = (
  baseUrl: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Headers()}`);
      return headers;
    }
  });

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      actions.auth.clearToken(null);
    }

    return result;
  };
};

export const handleError = async (error: any) => {
  toast.error(
    error?.data?.message ? error.data.message : "Something went wrong"
  );
};

export const handleSuccess = async (obj: any) => {
  toast.success(obj?.message ? obj.message : "Success");
};

export const handleValue = (row: any, field: any) => {
  if (!field) return "-";
  if (typeof field === "function") return field(row) ?? "-";
  return field
    .split(".")
    .reduce((acc: any, part: any) => acc && (acc[part] ?? "-"), row);
};
