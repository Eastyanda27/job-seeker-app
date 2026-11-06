import { JobRepository } from "@/domain/service/job-repository";
import { CreateJobDto, JobFilterDto } from "@/dto/job-dto";
import { AppError } from "@/libs/exceptions";

export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  async getAllJobs(filters?: JobFilterDto) {
    return this.jobRepository.findAll(filters);
  }

  async getJobById(id: string) {
    const job = await this.jobRepository.findById(id);
    if (!job) {
      throw new AppError("Job listing not found", 404);
    }
    return job;
  }

  async createJob(userId: string, input: CreateJobDto) {
    const company = await this.jobRepository.findCompanyProfileByUserId(userId);
    if (!company) {
      throw new AppError("Company profile not found. Please register as a company.", 400);
    }

    return this.jobRepository.create(company.id, input);
  }

  async getCompanyJobs(userId: string) {
    const company = await this.jobRepository.findCompanyProfileByUserId(userId);
    if (!company) {
      throw new AppError("Company profile not found", 404);
    }

    return this.jobRepository.findByCompanyId(company.id);
  }
}

