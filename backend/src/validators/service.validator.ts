import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(2, "Service title is required"),
  slug: z.string().min(2).optional(),
  description: z.string().min(10, "Service description is required"),
  iconName: z.string().min(1, "Icon name is required"),
  features: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  details: z
    .object({
      eyebrow: z.string().default(""),
      heroHeading: z.string().default(""),
      heroDescription: z.string().default(""),
      metaTitle: z.string().default(""),
      metaDescription: z.string().default(""),
      visualBadge: z
        .object({
          label: z.string().default(""),
          value: z.string().default(""),
          tag: z.string().default(""),
        })
        .default({ label: "", value: "", tag: "" }),
      overview: z
        .object({
          whatItIs: z.string().default(""),
          problemsSolved: z.array(z.string()).default([]),
          whoItIsFor: z.string().default(""),
          whatWeDeliver: z.string().default(""),
          businessImpact: z.string().default(""),
        })
        .default({
          whatItIs: "",
          problemsSolved: [],
          whoItIsFor: "",
          whatWeDeliver: "",
          businessImpact: "",
        }),
      offerings: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
            iconName: z.string(),
          })
        )
        .default([]),
      benefits: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
          })
        )
        .default([]),
      useCases: z
        .array(
          z.object({
            title: z.string(),
            scenario: z.string(),
          })
        )
        .default([]),
      process: z
        .array(
          z.object({
            step: z.string(),
            title: z.string(),
            description: z.string(),
          })
        )
        .default([]),
      faqs: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .default([]),
      ctaHeading: z.string().default(""),
      ctaDescription: z.string().default(""),
    })
    .optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

