import { Request, Response, NextFunction } from "express";
import { AuthService } from "@/services/auth-service";
import { registerSchema, loginSchema } from "@/validation/auth-validation";
import { StandardResponse } from "@/libs/response";
import { AuthenticatedRequest } from "@/middlewares/auth-middleware";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = registerSchema.parse(req.body);
      const result = await this.authService.register(validated);
      return StandardResponse.success(res, "Registration successful", result, 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await this.authService.login(validated);
      return StandardResponse.success(res, "Login successful", result, 200);
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = await this.authService.getMe(req.user!.userId);
      return StandardResponse.success(res, "User profile retrieved", user, 200);
    } catch (error) {
      next(error);
    }
  }
}
