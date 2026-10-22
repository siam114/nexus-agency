import { Testimonial } from "../models/Testimonial.js";
import { ITestimonial } from "../types/index.js";
import { initialTestimonials } from "../data/initialData.js";
import { isDbConnected } from "../config/db.js";

let fallbackTestimonials: ITestimonial[] = [...initialTestimonials];

export const testimonialService = {
  async getPublished() {
    if (isDbConnected()) {
      return Testimonial.find({ published: true }).sort({ sortOrder: 1 });
    }
    return fallbackTestimonials.filter((t) => t.published);
  },

  async getAll() {
    if (isDbConnected()) {
      return Testimonial.find().sort({ sortOrder: 1 });
    }
    return fallbackTestimonials;
  },

  async getById(id: string) {
    if (isDbConnected()) {
      return Testimonial.findById(id);
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

  async update(id: string, data: Partial<ITestimonial>) {
    if (isDbConnected()) {
      return Testimonial.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    }

    const index = fallbackTestimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;
    fallbackTestimonials[index] = { ...fallbackTestimonials[index], ...data };
    return fallbackTestimonials[index];
  },

  async delete(id: string) {
    if (isDbConnected()) {
      return Testimonial.findByIdAndDelete(id);
    }

    const index = fallbackTestimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;
    const deleted = fallbackTestimonials[index];
    fallbackTestimonials = fallbackTestimonials.filter((t) => t.id !== id);
    return deleted;
  },
};

