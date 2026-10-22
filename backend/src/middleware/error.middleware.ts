import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { apiResponse } from "../utils/apiResponse.js";
import { env } from "../config/env.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error("Unhandled Exception Caught:", {
    message: err.message,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });

  const statusCode = (err as { status?: number }).status || 500;
  const message =
    env.NODE_ENV === "production" && statusCode === 500
      ? "Internal server error. Please try again later."
      : err.message || "An unexpected error occurred.";

  apiResponse.error(res, message, statusCode);
}

