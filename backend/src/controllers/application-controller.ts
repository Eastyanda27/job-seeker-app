import { container } from "@/container";
import { ApplicationController as PresentationApplicationController } from "@/presentation/controllers/application-controller";

const instance = new PresentationApplicationController(container.applicationService);

export class ApplicationController {
  static apply = instance.apply.bind(instance);
  static getMyApplications = instance.getMyApplications.bind(instance);
  static getJobApplicants = instance.getJobApplicants.bind(instance);
  static getAllCompanyApplicants = instance.getAllCompanyApplicants.bind(instance);
  static updateStatus = instance.updateStatus.bind(instance);
  static getHistory = instance.getHistory.bind(instance);
}

