import { z } from "zod";

export const updateSettingsSchema = z.object({
  agencyName: z.string().min(1).optional(),
  tagline: z.string().optional(),
  contactEmail: z.string().email().optional(),
  phone: z.string().optional(),
  whatsappUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  facebookUrl: z.string().url().optional(),
});

