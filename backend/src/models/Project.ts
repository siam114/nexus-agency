import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "../types/index.js";

export interface IProjectDocument extends Omit<IProject, "id">, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
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
    category: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
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
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    overview: {
      purpose: { type: String, default: "" },
      requirements: { type: String, default: "" },
      audience: { type: String, default: "" },
      goals: { type: [String], default: [] },
    },
    challenge: {
      summary: { type: String, default: "" },
      points: { type: [String], default: [] },
    },
    solution: {
      summary: { type: String, default: "" },
      points: { type: [String], default: [] },
    },
    features: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    showcase: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      desktopAspect: { type: String, default: "" },
      mobileAspect: { type: String, default: "" },
    },
    technologies: {
      type: [String],
      default: [],
    },
    servicesProvided: {
      type: [String],
      default: [],
    },
    outcome: {
      summary: { type: String, default: "" },
      highlights: { type: [String], default: [] },
    },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
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

export const Project = mongoose.model<IProjectDocument>("Project", ProjectSchema);
