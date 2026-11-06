import { Response } from "express";

export class StandardResponse {
  static success<T>(res: Response, message: string, data?: T, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, message: string, statusCode = 400, errors?: any) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: errors || null,
    });
  }
}
