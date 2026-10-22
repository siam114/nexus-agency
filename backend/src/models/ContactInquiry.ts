import mongoose, { Schema, Document } from "mongoose";
import { IContactInquiry } from "../types/index.js";

export interface IContactInquiryDocument
  extends Omit<IContactInquiry, "id">,
    Document {}

const ContactInquirySchema = new Schema<IContactInquiryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    company: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved", "archived"],
      default: "new",
      index: true,
    },
    ipAddress: {
      type: String,
      trim: true,
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

export const ContactInquiry = mongoose.model<IContactInquiryDocument>(
  "ContactInquiry",
  ContactInquirySchema
);
