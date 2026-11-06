import { ApplicationRepository } from "@/domain/service/application-repository";
import { JobRepository } from "@/domain/service/job-repository";
import { ApplyJobDto, UpdateApplicationStatusDto } from "@/dto/application-dto";
import { AppError } from "@/libs/exceptions";

export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly jobRepository: JobRepository
  ) {}

  async applyJob(seekerId: string, input: ApplyJobDto) {
    const job = await this.jobRepository.findById(input.jobId);
    if (!job || job.isClosed) {
      throw new AppError("Job is unavailable or closed", 400);
    }

    const existingApp = await this.applicationRepository.findExistingApplication(input.jobId, seekerId);
    if (existingApp) {
      throw new AppError("You have already applied to this job position", 400);
    }

    return this.applicationRepository.createApplication(seekerId, input);
  }

  async getSeekerApplications(seekerId: string) {
    return this.applicationRepository.findBySeekerId(seekerId);
  }

  async getJobApplicants(userId: string, jobId: string) {
    const company = await this.jobRepository.findCompanyProfileByUserId(userId);
    if (!company) {
      throw new AppError("Company profile not found", 403);
    }

    const job = await this.jobRepository.findById(jobId);
    if (!job || job.companyId !== company.id) {
      throw new AppError("Unauthorized access to this job application list", 403);
    }

    return this.applicationRepository.findByJobId(jobId);
  }

  async getAllCompanyApplicants(userId: string, jobId?: string) {
    const company = await this.jobRepository.findCompanyProfileByUserId(userId);
    if (!company) {
      throw new AppError("Company profile not found", 403);
    }

    return this.applicationRepository.findByCompanyId(company.id, jobId);
  }

  async updateStatus(
    companyUserId: string,
    applicationId: string,
    input: UpdateApplicationStatusDto
  ) {
    const company = await this.jobRepository.findCompanyProfileByUserId(companyUserId);
    if (!company) {
      throw new AppError("Company profile not found", 403);
    }

    const application = await this.applicationRepository.findById(applicationId);
    if (!application || application.job.companyId !== company.id) {
      throw new AppError("Unauthorized or application not found", 403);
    }

    return this.applicationRepository.updateStatus(applicationId, companyUserId, input);
  }

  async getApplicationHistory(applicationId: string) {
    return this.applicationRepository.findHistory(applicationId);
  }
}

