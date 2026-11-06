import { container } from "@/container";
import { JobController as PresentationJobController } from "@/presentation/controllers/job-controller";

const instance = new PresentationJobController(container.jobService);

export class JobController {
  static getAllJobs = instance.getAllJobs.bind(instance);
  static getJobById = instance.getJobById.bind(instance);
  static createJob = instance.createJob.bind(instance);
  static getCompanyJobs = instance.getCompanyJobs.bind(instance);
}

