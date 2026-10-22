import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import { apiResponse } from "../utils/apiResponse.js";

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return apiResponse.success(res, result, "Login successful");
    } catch (error) {
      return apiResponse.unauthorized(res, (error as Error).message);
    }
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return apiResponse.unauthorized(res, "No authenticated user session.");
      }
      return apiResponse.success(res, req.user, "Current user profile");
    } catch (error) {
      next(error);
    }
  },
};

