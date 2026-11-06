import { Router } from "express";
import { JobController } from "@/controllers/job-controller";
import { authenticate, authorize } from "@/middlewares/auth-middleware";

const router = Router();

// Public routes
router.get("/", JobController.getAllJobs);
router.get("/:id", JobController.getJobById);

// Company routes
router.post("/", authenticate, authorize("COMPANY"), JobController.createJob);
router.get("/company/my-jobs", authenticate, authorize("COMPANY"), JobController.getCompanyJobs);

export default router;
