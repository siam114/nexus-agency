import { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contact.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { InquiryStatus } from "../types/index.js";
import { getParam } from "../utils/params.js";

export const contactController = {
  async submitInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const ipAddress =
        (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;

      const created = await contactService.create({
        ...req.body,
        ipAddress: typeof ipAddress === "string" ? ipAddress.split(",")[0].trim() : undefined,
      });

      return apiResponse.created(
        res,
        { id: created.id, status: created.status },
        "Thank you! Your project inquiry has been received. Our team will contact you within 24 hours."
      );
    } catch (error) {
      next(error);
    }
  },

  async getAllInquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.query.status as InquiryStatus | undefined;
      const inquiries = await contactService.getAll({ status });
      return apiResponse.success(res, inquiries, "Inquiries retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  async getInquiryById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const inquiry = await contactService.getById(id);
      if (!inquiry) {
        return apiResponse.notFound(res, "Inquiry not found");
      }
      return apiResponse.success(res, inquiry);
    } catch (error) {
      next(error);
    }
  },

  async updateInquiryStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const updated = await contactService.updateStatus(
        id,
        req.body.status
      );
      if (!updated) {
        return apiResponse.notFound(res, "Inquiry not found");
      }
      return apiResponse.success(res, updated, "Inquiry status updated");
    } catch (error) {
      next(error);
    }
  },

  async deleteInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getParam(req.params.id);
      const deleted = await contactService.delete(id);
      if (!deleted) {
        return apiResponse.notFound(res, "Inquiry not found");
      }
      return apiResponse.success(res, deleted, "Inquiry deleted");
    } catch (error) {
      next(error);
    }
  },
};

