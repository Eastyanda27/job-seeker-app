import { UserRepository } from "@/domain/service/user-repository";
import { JobRepository } from "@/domain/service/job-repository";
import { ApplicationRepository } from "@/domain/service/application-repository";

import { UserPrismaRepository } from "@/persistence/repository/user-prisma-repository";
import { JobPrismaRepository } from "@/persistence/repository/job-prisma-repository";
import { ApplicationPrismaRepository } from "@/persistence/repository/application-prisma-repository";

import { AuthService } from "@/services/auth-service";
import { JobService } from "@/services/job-service";
import { ApplicationService } from "@/services/application-service";

export class Container {
  public userRepository: UserRepository;
  public jobRepository: JobRepository;
  public applicationRepository: ApplicationRepository;

  public authService: AuthService;
  public jobService: JobService;
  public applicationService: ApplicationService;

  constructor() {
    this.userRepository = new UserPrismaRepository();
    this.jobRepository = new JobPrismaRepository();
    this.applicationRepository = new ApplicationPrismaRepository();

    this.authService = new AuthService(this.userRepository);
    this.jobService = new JobService(this.jobRepository);
    this.applicationService = new ApplicationService(
      this.applicationRepository,
      this.jobRepository
    );
  }
}

export const container = new Container();
