import { Request, Response, NextFunction } from "express";
import { serviceService } from "../services/service.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getParam } from "../utils/params.js";

export const serviceController = {
  async getPublicServices(_req: Request, res: Response, next: NextFunction) {
    try {
      const services = await serviceService.getPublished();
      return apiResponse.success(res, services, "Services retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async getServiceBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = getParam(req.params.slug);
      const service = await serviceService.getBySlug(slug);
      if (!service) {
        return apiResponse.notFound(res, `Service with slug "${slug}" not found`);
      }
      return apiResponse.success(res, service, "Service details retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async getAllAdminServices(_req: Request, res: Response, next: NextFunction) {
    try {
      const services = await serviceService.getAll();
      return apiResponse.success(res, services, "All services retrieved for admin");
    } catch (error) {
      next(error);
    }
  },

  async createService(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await serviceService.create(req.body);
      return apiResponse.created(res, created, "Service created successfully");
    } catch (error) {
      next(error);
    }
  },

  async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const updated = await serviceService.update(id, req.body);
      if (!updated) {
        return apiResponse.notFound(res, "Service not found");
      }
      return apiResponse.success(res, updated, "Service updated successfully");
    } catch (error) {
      next(error);
    }
  },

  async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const deleted = await serviceService.delete(id);
      if (!deleted) {
        return apiResponse.notFound(res, "Service not found");
      }
      return apiResponse.success(res, deleted, "Service deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};

