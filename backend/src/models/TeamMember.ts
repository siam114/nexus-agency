import mongoose, { Schema, Document } from "mongoose";
import { ITeamMember } from "../types/index.js";

export interface ITeamMemberDocument extends Omit<ITeamMember, "id">, Document {}

const TeamMemberSchema = new Schema<ITeamMemberDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    socials: {
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      website: { type: String, trim: true },
      facebook: { type: String, trim: true },
      whatsapp: { type: String, trim: true },
    },
    featured: {
      type: Boolean,
      default: false,
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

export const TeamMember = mongoose.model<ITeamMemberDocument>(
  "TeamMember",
  TeamMemberSchema
);
