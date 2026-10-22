import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z.string().min(2, "Client name is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(10, "Testimonial content must be at least 10 characters"),
  avatar: z.string().url().optional().or(z.literal("")),
  rating: z.number().min(1).max(5).default(5).optional(),
  featured: z.boolean().default(false).optional(),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

