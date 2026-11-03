import { z } from "zod";

export const createTeamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  bio: z.string().optional(),
  image: z.string().min(1, "Valid profile image path or URL is required"),
  skills: z.array(z.string()).default([]),
  socials: z
    .object({
      github: z.string().optional().or(z.literal("")),
      linkedin: z.string().optional().or(z.literal("")),
      website: z.string().optional().or(z.literal("")),
      facebook: z.string().optional().or(z.literal("")),
      whatsapp: z.string().optional().or(z.literal("")),
    })
    .optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

