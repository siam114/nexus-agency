import mongoose, { Schema, Document } from "mongoose";
import { ITestimonial } from "../types/index.js";

export interface ITestimonialDocument extends Omit<ITestimonial, "id">, Document {}

const TestimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
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

export const Testimonial = mongoose.model<ITestimonialDocument>(
  "Testimonial",
  TestimonialSchema
);
