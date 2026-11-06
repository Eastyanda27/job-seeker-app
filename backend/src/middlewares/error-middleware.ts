import { Request, Response, NextFunction } from "express";
import { AppError } from "@/libs/exceptions";
import { StandardResponse } from "@/libs/response";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return StandardResponse.error(res, err.message, err.statusCode, err.errors);
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.reduce((acc: Record<string, string>, curr) => {
      acc[curr.path.join(".")] = curr.message;
      return acc;
    }, {});
    return StandardResponse.error(res, "Validation Error", 400, formattedErrors);
  }

  console.error("Unhandled Internal Server Error:", err);
  return StandardResponse.error(res, "Internal Server Error", 500);
}
