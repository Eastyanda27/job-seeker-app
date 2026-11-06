import { api, type ApiResponse } from "@/libs/api";
import type { AuthResponse, AuthUser, LoginCredentials, RegisterInput } from "../types/auth-types";

const unwrap = <T>(response: unknown) => (response as ApiResponse<T>).data;

export const login = async (payload: LoginCredentials) =>
  unwrap<AuthResponse>(await api.post("/auth/login", payload));

export const register = async (payload: RegisterInput) =>
  unwrap<AuthResponse>(await api.post("/auth/register", payload));

export const getMe = async () => unwrap<AuthUser>(await api.get("/auth/me"));