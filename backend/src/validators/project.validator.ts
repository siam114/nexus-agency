import { z } from "zod";

const metricSchema = z.object({
  label: z.string().min(1, "Metric label is required"),
  value: z.string().min(1, "Metric value is required"),
});

const featureSchema = z.object({
  title: z.string().min(1, "Feature title is required"),
  description: z.string().min(1, "Feature description is required"),
});

export const createProjectSchema = z.object({
  title: z.string().min(2, "Project title must be at least 2 characters"),
  slug: z.string().min(2).optional(),
  category: z.string().min(2, "Category is required"),
  tags: z.array(z.string()).default([]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Valid image URL is required"),
  client: z.string().optional(),
  year: z.string().optional(),
  liveUrl: z.string().url("Valid live URL required").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  metrics: z.array(metricSchema).default([]),
  overview: z
    .object({
      purpose: z.string().default(""),
      requirements: z.string().default(""),
      audience: z.string().default(""),
      goals: z.array(z.string()).default([]),
    })
    .default({ purpose: "", requirements: "", audience: "", goals: [] }),
  challenge: z
    .object({
      summary: z.string().default(""),
      points: z.array(z.string()).default([]),
    })
    .default({ summary: "", points: [] }),
  solution: z
    .object({
      summary: z.string().default(""),
      points: z.array(z.string()).default([]),
    })
    .default({ summary: "", points: [] }),
  features: z.array(featureSchema).default([]),
  showcase: z
    .object({
      title: z.string().default(""),
      description: z.string().default(""),
      desktopAspect: z.string().default(""),
      mobileAspect: z.string().default(""),
    })
    .default({ title: "", description: "", desktopAspect: "", mobileAspect: "" }),
  technologies: z.array(z.string()).default([]),
  servicesProvided: z.array(z.string()).default([]),
  outcome: z
    .object({
      summary: z.string().default(""),
      highlights: z.array(z.string()).default([]),
    })
    .default({ summary: "", highlights: [] }),
  seo: z
    .object({
      metaTitle: z.string().default(""),
      metaDescription: z.string().default(""),
    })
    .optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

