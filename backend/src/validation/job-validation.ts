import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  salary: z.coerce.number().int().positive("Salary must be a positive integer"),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT"]),
});

export const updateJobSchema = createJobSchema.partial().extend({
  isClosed: z.boolean().optional(),
});

export const jobFilterQuerySchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT"]).optional(),
  minSalary: z.coerce.number().int().optional(),
  maxSalary: z.coerce.number().int().optional(),
  sortBy: z.enum(["latest", "salary_asc", "salary_desc"]).optional(),
});
