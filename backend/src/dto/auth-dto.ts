export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role: "JOB_SEEKER" | "COMPANY";
  companyName?: string;
  location?: string;
  description?: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
