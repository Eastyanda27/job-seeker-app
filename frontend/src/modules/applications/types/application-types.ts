import type { Job } from "@/modules/jobs/types/job-types";
export type ApplicationStatus = "APPLIED" | "REVIEWING" | "SHORTLISTED" | "REJECTED" | "ACCEPTED";

export type ApplicationSeeker = {
  id: string;
  name: string;
  email: string;
  jobSeekerProfile?: {
    id: string;
    phone?: string | null;
    bio?: string | null;
    resumeUrl?: string | null;
  } | null;
};

export type Application = {
  id: string;
  jobId: string;
  seekerId: string;
  status: ApplicationStatus;
  coverLetter?: string | null;
  createdAt: string;
  updatedAt: string;
  job?: Job;
  seeker?: ApplicationSeeker;
};

export type ApplyJobInput = { jobId: string; coverLetter?: string };
export type UpdateApplicationStatusInput = { status: ApplicationStatus; notes?: string };
