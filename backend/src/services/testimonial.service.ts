import mongoose from "mongoose";
import { Testimonial } from "../models/Testimonial.js";
import { ITestimonial } from "../types/index.js";
import { initialTestimonials } from "../data/initialData.js";
import { isDbConnected } from "../config/db.js";

let fallbackTestimonials: ITestimonial[] = initialTestimonials.map((t, idx) => ({
  ...t,
  id: t.id || (idx + 1).toString(),
}));

export const testimonialService = {
  async getPublished() {
    if (isDbConnected()) {
      const count = await Testimonial.countDocuments();
      if (count < initialTestimonials.length) {
        for (const item of initialTestimonials) {
          await Testimonial.findOneAndUpdate(
            { name: item.name },
            { $setOnInsert: item },
            { upsert: true }
          );
        }
      }
      return Testimonial.find({ published: true }).sort({ sortOrder: 1 });
    }
    return fallbackTestimonials.filter((t) => t.published);
  },

  async getAll() {
    if (isDbConnected()) {
      const count = await Testimonial.countDocuments();
      if (count < initialTestimonials.length) {
        for (const item of initialTestimonials) {
          await Testimonial.findOneAndUpdate(
            { name: item.name },
            { $setOnInsert: item },
            { upsert: true }
          );
        }
      }
      return Testimonial.find().sort({ sortOrder: 1 });
    }
    return fallbackTestimonials;
  },

  async getById(id: string) {
    if (isDbConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return Testimonial.findById(id);
      }
      return Testimonial.findOne({ name: id });
    }
    return fallbackTestimonials.find((t) => t.id === id) || null;
  },

  async create(data: Partial<ITestimonial>) {
    if (isDbConnected()) {
      return Testimonial.create(data);
    }

    const newTestimonial: ITestimonial = {
      ...(data as ITestimonial),
      id: `fallback-testimonial-${Date.now()}`,
      published: data.published ?? true,
      sortOrder: data.sortOrder ?? fallbackTestimonials.length + 1,
    };
    fallbackTestimonials.push(newTestimonial);
    return newTestimonial;
  },

  async update(id: string, data: Partial<ITestimonial>, originalName?: string) {
    if (isDbConnected()) {
      let doc = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        doc = await Testimonial.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
      }
      if (!doc && originalName) {
        doc = await Testimonial.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${originalName.trim()}$`, "i") } },
          { $set: data },
          { new: true, runValidators: true }
        );
      }
      if (!doc && data.name) {
        doc = await Testimonial.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${data.name.trim()}$`, "i") } },
          { $set: data },
          { new: true, runValidators: true }
        );
      }
      return doc;
    }

    const index = fallbackTestimonials.findIndex((t) => t.id === id || (originalName && t.name.toLowerCase() === originalName.toLowerCase()) || (data.name && t.name.toLowerCase() === data.name.toLowerCase()));
    if (index === -1) return null;
    fallbackTestimonials[index] = { ...fallbackTestimonials[index], ...data };
    return fallbackTestimonials[index];
  },

  async delete(id: string, name?: string) {
    if (isDbConnected()) {
      let doc = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        doc = await Testimonial.findByIdAndDelete(id);
      }
      if (!doc && name) {
        doc = await Testimonial.findOneAndDelete({
          name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
        });
      }
      return doc;
    }

    const index = fallbackTestimonials.findIndex((t) => t.id === id || (name && t.name.toLowerCase() === name.toLowerCase()));
    if (index === -1) return null;
    const deleted = fallbackTestimonials[index];
    fallbackTestimonials = fallbackTestimonials.filter((t) => t.id !== id && (!name || t.name.toLowerCase() !== name.toLowerCase()));
    return deleted;
  },
};

