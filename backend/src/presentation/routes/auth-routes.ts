import { Router } from "express";
import { container } from "@/container";
import { AuthController } from "@/presentation/controllers/auth-controller";
import { authenticate } from "@/middlewares/auth-middleware";

const router = Router();
const controller = new AuthController(container.authService);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a job seeker or company
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RegisterRequest' }
 *     responses:
 *       201: { description: Registration successful }
 *       400: { description: Validation or duplicate email }
 */
router.post("/register", controller.register.bind(controller));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginRequest' }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid credentials }
 */
router.post("/login", controller.login.bind(controller));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the current authenticated user
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: User profile retrieved }
 *       401: { description: Unauthorized }
 */
router.get("/me", authenticate, controller.me.bind(controller));

export default router;
