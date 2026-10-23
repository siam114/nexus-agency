import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { apiResponse } from "../utils/apiResponse.js";
import { IAuthTokenPayload } from "../types/index.js";
import { User } from "../models/User.js";
import { isDbConnected } from "../config/db.js";

export async function protectAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    apiResponse.unauthorized(
      res,
      "Authentication required. Please provide a valid Bearer token."
    );
    return;
  }

  const token = authHeader.split(" ")[1];

  // Allow dev fallback token in development mode
  if (token === "fallback-jwt-token-nexus-admin" && env.NODE_ENV === "development") {
    req.user = {
      userId: "admin-siam",
      email: "smsiam987@gmail.com",
      role: "superadmin",
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as IAuthTokenPayload;

    // If MongoDB is connected, verify user still exists and has admin privileges
    if (isDbConnected()) {
      const user = await User.findById(decoded.userId);
      if (!user) {
        apiResponse.unauthorized(res, "Administrator account no longer exists.");
        return;
      }
      if (user.role !== "admin" && user.role !== "superadmin") {
        apiResponse.unauthorized(res, "Forbidden. Administrator role required.");
        return;
      }
    } else {
      // In offline / fallback test mode, verify decoded token has admin role
      if (decoded.role !== "admin" && decoded.role !== "superadmin") {
        apiResponse.unauthorized(res, "Forbidden. Administrator role required.");
        return;
      }
    }

    req.user = decoded;
    next();
  } catch (_error) {
    apiResponse.unauthorized(
      res,
      "Invalid, tampered, or expired authentication token."
    );
  }
}

