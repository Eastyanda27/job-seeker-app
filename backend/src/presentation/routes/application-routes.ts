import { Router } from "express";
import { container } from "@/container";
import { ApplicationController } from "@/presentation/controllers/application-controller";
import { authenticate, authorize } from "@/middlewares/auth-middleware";

const router = Router();
const controller = new ApplicationController(container.applicationService);

/**
 * @swagger
 * /applications/apply:
 *   post:
 *     summary: Apply to a job
 *     tags: [Applications]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ApplyJobRequest' }
 *     responses:
 *       201: { description: Job applied successfully }
 */
router.post("/apply", authenticate, authorize("JOB_SEEKER"), controller.apply.bind(controller));
router.get("/my-applications", authenticate, authorize("JOB_SEEKER"), controller.getMyApplications.bind(controller));
router.get("/company/applicants", authenticate, authorize("COMPANY"), controller.getAllCompanyApplicants.bind(controller));
router.get("/job/:jobId/applicants", authenticate, authorize("COMPANY"), controller.getJobApplicants.bind(controller));
router.patch("/:id/status", authenticate, authorize("COMPANY"), controller.updateStatus.bind(controller));
router.get("/:id/history", authenticate, controller.getHistory.bind(controller));

export default router;
