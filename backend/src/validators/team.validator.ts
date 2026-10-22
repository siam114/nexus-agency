import { z } from "zod";

export const createTeamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  bio: z.string().optional(),
  image: z.string().url("Valid profile image URL is required"),
  skills: z.array(z.string()).default([]),
  socials: z
    .object({
      github: z.string().url().optional().or(z.literal("")),
      linkedin: z.string().url().optional().or(z.literal("")),
      website: z.string().url().optional().or(z.literal("")),
      facebook: z.string().url().optional().or(z.literal("")),
      whatsapp: z.string().url().optional().or(z.literal("")),
    })
    .optional(),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

