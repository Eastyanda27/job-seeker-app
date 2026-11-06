import { Job, CompanyProfile } from "@prisma/client";
import { CreateJobDto, JobFilterDto } from "@/dto/job-dto";

export interface JobWithCompany extends Job {
  company: {
    id: string;
    companyName: string;
    description?: string | null;
    location?: string | null;
    website?: string | null;
  };
  _count?: {
    applications: number;
  };
}

export interface JobRepository {
  findAll(filters?: JobFilterDto): Promise<JobWithCompany[]>;
  findById(id: string): Promise<JobWithCompany | null>;
  create(companyId: string, data: CreateJobDto): Promise<Job>;
  findByCompanyId(companyId: string): Promise<Job[]>;
  findCompanyProfileByUserId(userId: string): Promise<CompanyProfile | null>;
}
