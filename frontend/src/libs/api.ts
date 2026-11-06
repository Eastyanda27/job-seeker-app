import axios from "axios";
import { env } from "@/config/env";
import { useAuthStore } from "@/stores/auth-store";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors: unknown;
};

export const api = axios.create({
  baseURL: env.API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/")) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  },
);
