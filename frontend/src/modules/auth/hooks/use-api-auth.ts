import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, login, register } from "../api/auth-api";
import { authKeys } from "../constants/auth-query";
import type { LoginCredentials, RegisterCompanyInput, RegisterJobSeekerInput } from "../types/auth-types";
import { useAuthStore } from "@/stores/auth-store";

export function useMe() {
  const token = useAuthStore((state) => state.token);
  return useQuery({ queryKey: authKeys.me(), queryFn: getMe, enabled: Boolean(token) });
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (payload: LoginCredentials) => login(payload),
    onSuccess: ({ token, user }) => setAuth(token, user),
  });
}

function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: register,
    onSuccess: ({ token, user }) => setAuth(token, user),
  });
}

export function useRegisterJobSeeker() {
  const mutation = useRegister();
  return { ...mutation, mutate: (payload: RegisterJobSeekerInput, options?: Parameters<typeof mutation.mutate>[1]) => mutation.mutate({ ...payload, role: "JOB_SEEKER" }, options) };
}

export function useRegisterCompany() {
  const mutation = useRegister();
  return { ...mutation, mutate: (payload: RegisterCompanyInput, options?: Parameters<typeof mutation.mutate>[1]) => mutation.mutate({ ...payload, role: "COMPANY" }, options) };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return () => { clearAuth(); queryClient.clear(); };
}