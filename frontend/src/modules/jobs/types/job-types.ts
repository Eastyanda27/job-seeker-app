import type { UserRole } from "@/types/auth";
export type JobType = "FULL_TIME" | "PART_TIME" | "REMOTE" | "CONTRACT";
export type Job = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  jobType: JobType;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
  company?: { companyName: string; location?: string | null };
  _count?: { applications?: number };
};
export type JobFilters = {
  search?: string;
  location?: string;
  jobType?: JobType;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: "latest" | "salary_asc" | "salary_desc";
};
export type CreateJobInput = {
  title: string;
  description: string;
  location: string;
  jobType: JobType;
  salary?: number;
};
export type CompanyJob = Job & { companyId: string; viewerRole?: UserRole };
