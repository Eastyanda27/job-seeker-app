import { Response, NextFunction } from "express";
import { ApplicationService } from "@/services/application-service";
import { applyJobSchema, updateApplicationStatusSchema } from "@/validation/application-validation";
import { StandardResponse } from "@/libs/response";
import { AuthenticatedRequest } from "@/middlewares/auth-middleware";

export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  async apply(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validated = applyJobSchema.parse(req.body);
      const application = await this.applicationService.applyJob(req.user!.userId, validated);
      return StandardResponse.success(res, "Job applied successfully", application, 201);
    } catch (error) {
      next(error);
    }
  }

  async getMyApplications(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const applications = await this.applicationService.getSeekerApplications(req.user!.userId);
      return StandardResponse.success(res, "Applications fetched successfully", applications);
    } catch (error) {
      next(error);
    }
  }

  async getJobApplicants(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { jobId } = req.params;
      const applicants = await this.applicationService.getJobApplicants(req.user!.userId, jobId);
      return StandardResponse.success(res, "Job applicants retrieved successfully", applicants);
    } catch (error) {
      next(error);
    }
  }

  async getAllCompanyApplicants(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { jobId } = req.query;
      const applicants = await this.applicationService.getAllCompanyApplicants(
        req.user!.userId,
        jobId as string | undefined
      );
      return StandardResponse.success(res, "All company applicants retrieved successfully", applicants);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validated = updateApplicationStatusSchema.parse(req.body);
      const updated = await this.applicationService.updateStatus(req.user!.userId, id, validated);
      return StandardResponse.success(res, "Application status updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const history = await this.applicationService.getApplicationHistory(id);
      return StandardResponse.success(res, "Application history retrieved", history);
    } catch (error) {
      next(error);
    }
  }
}
