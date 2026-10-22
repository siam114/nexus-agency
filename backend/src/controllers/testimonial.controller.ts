import { Request, Response, NextFunction } from "express";
import { testimonialService } from "../services/testimonial.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { getParam } from "../utils/params.js";

export const testimonialController = {
  async getPublicTestimonials(_req: Request, res: Response, next: NextFunction) {
    try {
      const testimonials = await testimonialService.getPublished();
      return apiResponse.success(res, testimonials, "Testimonials retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async getAllAdminTestimonials(_req: Request, res: Response, next: NextFunction) {
    try {
      const testimonials = await testimonialService.getAll();
      return apiResponse.success(res, testimonials);
    } catch (error) {
      next(error);
    }
  },

  async createTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await testimonialService.create(req.body);
      return apiResponse.created(res, created, "Testimonial created successfully");
    } catch (error) {
      next(error);
    }
  },

  async updateTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const updated = await testimonialService.update(id, req.body);
      if (!updated) {
        return apiResponse.notFound(res, "Testimonial not found");
      }
      return apiResponse.success(res, updated, "Testimonial updated successfully");
    } catch (error) {
      next(error);
    }
  },

  async deleteTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const deleted = await testimonialService.delete(id);
      if (!deleted) {
        return apiResponse.notFound(res, "Testimonial not found");
      }
      return apiResponse.success(res, deleted, "Testimonial removed successfully");
    } catch (error) {
      next(error);
    }
  },
};

