import type { AuthResponse, AuthUser, UserRole } from "@/types/auth";
export type { AuthResponse, AuthUser };

export type LoginCredentials = { email: string; password: string };
export type RegisterJobSeekerInput = LoginCredentials & { name: string };
export type RegisterCompanyInput = LoginCredentials & {
  name: string;
  companyName: string;
  phone?: string;
  location?: string;
  description?: string;
};
export type RegisterInput = (RegisterJobSeekerInput | RegisterCompanyInput) & { role?: UserRole };
export type AuthApiResponse = AuthResponse;
export type CurrentUser = AuthUser;
export type { UserRole };