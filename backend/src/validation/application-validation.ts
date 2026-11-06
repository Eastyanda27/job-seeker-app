import { z } from "zod";

export const applyJobSchema = z.object({
  jobId: z.string().uuid("Invalid job ID"),
  coverLetter: z.string().optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["APPLIED", "REVIEWING", "SHORTLISTED", "REJECTED", "ACCEPTED"]),
  notes: z.string().optional(),
});
