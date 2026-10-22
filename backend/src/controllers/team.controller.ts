import { Request, Response, NextFunction } from "express";
import { teamService } from "../services/team.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getParam } from "../utils/params.js";

export const teamController = {
  async getPublicTeam(_req: Request, res: Response, next: NextFunction) {
    try {
      const team = await teamService.getPublished();
      return apiResponse.success(res, team, "Team members retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async getAllAdminTeam(_req: Request, res: Response, next: NextFunction) {
    try {
      const team = await teamService.getAll();
      return apiResponse.success(res, team);
    } catch (error) {
      next(error);
    }
  },

  async createTeamMember(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await teamService.create(req.body);
      return apiResponse.created(res, created, "Team member added successfully");
    } catch (error) {
      next(error);
    }
  },

  async updateTeamMember(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const updated = await teamService.update(id, req.body);
      if (!updated) {
        return apiResponse.notFound(res, "Team member not found");
      }
      return apiResponse.success(res, updated, "Team member updated successfully");
    } catch (error) {
      next(error);
    }
  },

  async deleteTeamMember(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const deleted = await teamService.delete(id);
      if (!deleted) {
        return apiResponse.notFound(res, "Team member not found");
      }
      return apiResponse.success(res, deleted, "Team member removed successfully");
    } catch (error) {
      next(error);
    }
  },
};

