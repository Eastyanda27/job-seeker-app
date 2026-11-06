import { Router } from "express";
import { container } from "@/container";
import { JobController } from "@/presentation/controllers/job-controller";
import { authenticate, authorize } from "@/middlewares/auth-middleware";

const router = Router();
const controller = new JobController(container.jobService);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: List open jobs with filters and salary sorting
 *     tags: [Jobs]
 *     parameters:
 *       - { in: query, name: search, schema: { type: string } }
 *       - { in: query, name: location, schema: { type: string } }
 *       - { in: query, name: jobType, schema: { type: string, enum: [FULL_TIME, PART_TIME, REMOTE, CONTRACT] } }
 *       - { in: query, name: minSalary, schema: { type: integer } }
 *       - { in: query, name: maxSalary, schema: { type: integer } }
 *       - { in: query, name: sortBy, schema: { type: string, enum: [latest, salary_asc, salary_desc] } }
 *     responses:
 *       200: { description: Jobs fetched successfully }
 */
router.get("/", controller.getAllJobs.bind(controller));

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses:
 *       200: { description: Job detail fetched successfully }
 *       404: { description: Job not found }
 */
router.get("/:id", controller.getJobById.bind(controller));

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a job vacancy
 *     tags: [Jobs]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateJobRequest' }
 *     responses:
 *       201: { description: Job vacancy created successfully }
 */
router.post("/", authenticate, authorize("COMPANY"), controller.createJob.bind(controller));
router.get("/company/my-jobs", authenticate, authorize("COMPANY"), controller.getCompanyJobs.bind(controller));

export default router;
