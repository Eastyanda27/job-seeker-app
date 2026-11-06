import { Application, ApplicationHistory, ApplicationStatus } from "@prisma/client";
import { ApplyJobDto, UpdateApplicationStatusDto } from "@/dto/application-dto";

export interface ApplicationRepository {
  createApplication(seekerId: string, data: ApplyJobDto): Promise<Application>;
  findBySeekerId(seekerId: string): Promise<any[]>;
  findByJobId(jobId: string): Promise<any[]>;
  findByCompanyId(companyId: string, jobId?: string): Promise<any[]>;
  findById(id: string): Promise<(Application & { job: { companyId: string } }) | null>;
  updateStatus(applicationId: string, companyUserId: string, data: UpdateApplicationStatusDto): Promise<Application>;
  findHistory(applicationId: string): Promise<ApplicationHistory[]>;
  findExistingApplication(jobId: string, seekerId: string): Promise<Application | null>;
}
