import { Request, Response, NextFunction } from "express";
import { settingsService } from "../services/settings.service.js";
import { apiResponse } from "../utils/apiResponse.js";

export const settingsController = {
  async getSettings(_req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await settingsService.getSettings();
      return apiResponse.success(res, settings, "Settings retrieved");
    } catch (error) {
      next(error);
    }
  },

  async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await settingsService.updateSettings(req.body);
      return apiResponse.success(res, updated, "Settings updated successfully");
    } catch (error) {
      next(error);
    }
  },
};

