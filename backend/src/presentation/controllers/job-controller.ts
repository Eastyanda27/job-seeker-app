import { Request, Response, NextFunction } from "express";
import { JobService } from "@/services/job-service";
import { createJobSchema, jobFilterQuerySchema } from "@/validation/job-validation";
import { StandardResponse } from "@/libs/response";
import { AuthenticatedRequest } from "@/middlewares/auth-middleware";

export class JobController {
  constructor(private readonly jobService: JobService) {}

  async getAllJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedFilters = jobFilterQuerySchema.parse(req.query);
      const jobs = await this.jobService.getAllJobs(validatedFilters);
      return StandardResponse.success(res, "Jobs fetched successfully", jobs);
    } catch (error) {
      next(error);
    }
  }

  async getJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const job = await this.jobService.getJobById(id);
      return StandardResponse.success(res, "Job detail fetched successfully", job);
    } catch (error) {
      next(error);
    }
  }

  async createJob(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validated = createJobSchema.parse(req.body);
      const job = await this.jobService.createJob(req.user!.userId, validated);
      return StandardResponse.success(res, "Job vacancy created successfully", job, 201);
    } catch (error) {
      next(error);
    }
  }

  async getCompanyJobs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const jobs = await this.jobService.getCompanyJobs(req.user!.userId);
      return StandardResponse.success(res, "Company jobs fetched successfully", jobs);
    } catch (error) {
      next(error);
    }
  }
}
