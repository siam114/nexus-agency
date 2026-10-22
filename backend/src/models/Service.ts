import mongoose, { Schema, Document } from "mongoose";
import { IService } from "../types/index.js";

export interface IServiceDocument extends Omit<IService, "id">, Document {}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    iconName: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    deliverables: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    details: {
      eyebrow: { type: String, default: "" },
      heroHeading: { type: String, default: "" },
      heroDescription: { type: String, default: "" },
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      visualBadge: {
        label: { type: String, default: "" },
        value: { type: String, default: "" },
        tag: { type: String, default: "" },
      },
      overview: {
        whatItIs: { type: String, default: "" },
        problemsSolved: { type: [String], default: [] },
        whoItIsFor: { type: String, default: "" },
        whatWeDeliver: { type: String, default: "" },
        businessImpact: { type: String, default: "" },
      },
      offerings: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          iconName: { type: String, required: true },
        },
      ],
      benefits: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      useCases: [
        {
          title: { type: String, required: true },
          scenario: { type: String, required: true },
        },
      ],
      process: [
        {
          step: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      faqs: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      ctaHeading: { type: String, default: "" },
      ctaDescription: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const record = ret as Record<string, unknown>;
        record.id = record._id;
        delete record._id;
        delete record.__v;
        return record;
      },
    },
  }
);

export const Service = mongoose.model<IServiceDocument>("Service", ServiceSchema);
