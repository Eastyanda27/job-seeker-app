export type UserRole = "JOB_SEEKER" | "COMPANY";

export type CompanyProfile = {
  id: string;
  userId: string;
  companyName: string;
  description?: string | null;
  location?: string | null;
  website?: string | null;
};

export type JobSeekerProfile = {
  id: string;
  userId: string;
  phone?: string | null;
  bio?: string | null;
  resumeUrl?: string | null;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyProfile?: CompanyProfile | null;
  jobSeekerProfile?: JobSeekerProfile | null;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};
