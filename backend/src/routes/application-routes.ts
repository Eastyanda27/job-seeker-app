import { Router } from "express";
import { ApplicationController } from "@/controllers/application-controller";
import { authenticate, authorize } from "@/middlewares/auth-middleware";

const router = Router();

// Job Seeker routes
router.post("/apply", authenticate, authorize("JOB_SEEKER"), ApplicationController.apply);
router.get("/my-applications", authenticate, authorize("JOB_SEEKER"), ApplicationController.getMyApplications);

// Company routes
router.get("/company/applicants", authenticate, authorize("COMPANY"), ApplicationController.getAllCompanyApplicants);
router.get("/job/:jobId/applicants", authenticate, authorize("COMPANY"), ApplicationController.getJobApplicants);
router.patch("/:id/status", authenticate, authorize("COMPANY"), ApplicationController.updateStatus);

// Common / History
router.get("/:id/history", authenticate, ApplicationController.getHistory);

export default router;
