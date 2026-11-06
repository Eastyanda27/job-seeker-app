export interface ApplyJobDto {
  jobId: string;
  coverLetter?: string;
}

export interface UpdateApplicationStatusDto {
  status: "APPLIED" | "REVIEWING" | "SHORTLISTED" | "REJECTED" | "ACCEPTED";
  notes?: string;
}
