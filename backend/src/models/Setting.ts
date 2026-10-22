import mongoose, { Schema, Document } from "mongoose";
import { ISetting } from "../types/index.js";

export interface ISettingDocument extends ISetting, Document {}

const SettingSchema = new Schema<ISettingDocument>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const record = ret as Record<string, unknown>;
        delete record._id;
        delete record.__v;
        return record;
      },
    },
  }
);

export const Setting = mongoose.model<ISettingDocument>("Setting", SettingSchema);
