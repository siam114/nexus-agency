import { Response } from "express";

export interface IApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
  errors?: unknown;
}

export const apiResponse = {
  success: <T>(
    res: Response,
    data: T,
    message = "Operation successful",
    statusCode = 200,
    meta?: IApiResponse<T>["meta"]
  ) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
    });
  },

  created: <T>(res: Response, data: T, message = "Resource created successfully") => {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  },

  error: (
    res: Response,
    message = "An error occurred",
    statusCode = 500,
    errors?: unknown
  ) => {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors ? { errors } : {}),
    });
  },

  notFound: (res: Response, message = "Resource not found") => {
    return res.status(404).json({
      success: false,
      message,
    });
  },

  unauthorized: (res: Response, message = "Unauthorized access") => {
    return res.status(401).json({
      success: false,
      message,
    });
  },

  badRequest: (res: Response, message = "Invalid request payload", errors?: unknown) => {
    return res.status(400).json({
      success: false,
      message,
      ...(errors ? { errors } : {}),
    });
  },
};

