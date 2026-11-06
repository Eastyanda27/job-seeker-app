import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "@/libs/jwt";
import { AppError } from "@/libs/exceptions";

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized: Token missing", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next(new AppError("Unauthorized: Invalid or expired token", 401));
  }
}

export function authorize(...roles: Array<"JOB_SEEKER" | "COMPANY">) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden: Access denied for your role", 403));
    }
    next();
  };
}
