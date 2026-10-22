import { Service } from "../models/Service.js";
import { IService } from "../types/index.js";
import { initialServices } from "../data/initialData.js";
import { isDbConnected } from "../config/db.js";
import { slugify } from "../utils/slugify.js";

let fallbackServices: IService[] = [...initialServices];

export const serviceService = {
  async getPublished() {
    if (isDbConnected()) {
      return Service.find({ published: true }).sort({ sortOrder: 1 });
    }
    return fallbackServices.filter((s) => s.published);
  },

  async getAll() {
    if (isDbConnected()) {
      return Service.find().sort({ sortOrder: 1 });
    }
    return fallbackServices;
  },

  async getBySlug(slug: string) {
    if (isDbConnected()) {
      return Service.findOne({ slug });
    }
    return fallbackServices.find((s) => s.slug === slug) || null;
  },

  async getById(id: string) {
    if (isDbConnected()) {
      return Service.findById(id);
    }
    return fallbackServices.find((s) => s.id === id || s.slug === id) || null;
  },

  async create(data: Partial<IService>) {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title || "service");

    if (isDbConnected()) {
      const existing = await Service.findOne({ slug });
      if (existing) {
        throw new Error(`A service with slug "${slug}" already exists.`);
      }
      return Service.create({ ...data, slug });
    }

    const newService: IService = {
      ...(data as IService),
      id: `fallback-service-${Date.now()}`,
      slug,
      features: data.features || [],
      deliverables: data.deliverables || [],
      published: data.published ?? true,
      sortOrder: data.sortOrder ?? fallbackServices.length + 1,
    };
    fallbackServices.push(newService);
    return newService;
  },

  async update(id: string, data: Partial<IService>) {
    if (isDbConnected()) {
      return Service.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    }

    const index = fallbackServices.findIndex((s) => s.id === id || s.slug === id);
    if (index === -1) return null;
    fallbackServices[index] = { ...fallbackServices[index], ...data };
    return fallbackServices[index];
  },

  async delete(id: string) {
    if (isDbConnected()) {
      return Service.findByIdAndDelete(id);
    }

    const index = fallbackServices.findIndex((s) => s.id === id || s.slug === id);
    if (index === -1) return null;
    const deleted = fallbackServices[index];
    fallbackServices = fallbackServices.filter((s) => s.id !== id && s.slug !== id);
    return deleted;
  },
};

