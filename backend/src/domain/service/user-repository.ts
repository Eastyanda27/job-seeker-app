import { User, CompanyProfile, JobSeekerProfile, Role } from "@prisma/client";
import { RegisterDto } from "@/dto/auth-dto";

export interface UserRepository {
  findByEmail(email: string): Promise<(User & { companyProfile?: CompanyProfile | null; jobSeekerProfile?: JobSeekerProfile | null }) | null>;
  findById(id: string): Promise<(User & { companyProfile?: CompanyProfile | null; jobSeekerProfile?: JobSeekerProfile | null }) | null>;
  createWithProfile(data: RegisterDto, hashedPassword: string): Promise<User & { companyProfile?: CompanyProfile | null; jobSeekerProfile?: JobSeekerProfile | null }>;
}
