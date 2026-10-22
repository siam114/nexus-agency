import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getParam } from "../utils/params.js";

export const projectController = {
  async getPublicProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const featured = req.query.featured === "true" ? true : undefined;

      const projects = await projectService.getPublished({ category, featured });
      return apiResponse.success(res, projects, "Projects retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async getProjectBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = getParam(req.params.slug);
      const project = await projectService.getBySlug(slug);
      if (!project) {
        return apiResponse.notFound(res, `Project with slug "${slug}" not found`);
      }
      return apiResponse.success(res, project, "Project details retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async getAllAdminProjects(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.getAll();
      return apiResponse.success(res, projects, "All projects retrieved for admin");
    } catch (error) {
      next(error);
    }
  },

  async getAdminProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const project = await projectService.getById(id);
      if (!project) {
        return apiResponse.notFound(res, "Project not found");
      }
      return apiResponse.success(res, project);
    } catch (error) {
      next(error);
    }
  },

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await projectService.create(req.body);
      return apiResponse.created(res, created, "Project created successfully");
    } catch (error) {
      next(error);
    }
  },

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const updated = await projectService.update(id, req.body);
      if (!updated) {
        return apiResponse.notFound(res, "Project not found");
      }
      return apiResponse.success(res, updated, "Project updated successfully");
    } catch (error) {
      next(error);
    }
  },

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const deleted = await projectService.delete(id);
      if (!deleted) {
        return apiResponse.notFound(res, "Project not found");
      }
      return apiResponse.success(res, deleted, "Project deleted successfully");
    } catch (error) {
      next(error);
    }
  },

  async togglePublishProject(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const updated = await projectService.togglePublish(id);
      if (!updated) {
        return apiResponse.notFound(res, "Project not found");
      }
      return apiResponse.success(res, updated, "Project publication status updated");
    } catch (error) {
      next(error);
    }
  },
};
