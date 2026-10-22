import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().min(2, "Your name must be at least 2 characters long"),
  email: z.string().email("A valid email address is required").trim().toLowerCase(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Please describe your project in at least 10 characters"),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(["new", "in_progress", "resolved", "archived"]),
});

