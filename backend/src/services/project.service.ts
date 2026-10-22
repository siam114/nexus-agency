import { Project } from "../models/Project.js";
import { IProject } from "../types/index.js";
import { initialProjects } from "../data/initialData.js";
import { isDbConnected } from "../config/db.js";
import { slugify } from "../utils/slugify.js";

// In-memory store for fallback operations
let fallbackProjects: IProject[] = initialProjects.map((p, idx) => ({
  ...p,
  id: p.id || p.slug || `project-${idx + 1}`,
}));

export const projectService = {
  async getPublished(filter?: { category?: string; featured?: boolean }) {
    if (isDbConnected()) {
      const query: Record<string, unknown> = { published: true };
      if (filter?.category && filter.category !== "All Projects") {
        query.category = filter.category;
      }
      if (filter?.featured !== undefined) {
        query.featured = filter.featured;
      }
      return Project.find(query).sort({ sortOrder: 1, createdAt: -1 });
    }

    // Fallback mode
    return fallbackProjects.filter((p) => {
      if (!p.published) return false;
      if (filter?.category && filter.category !== "All Projects" && p.category !== filter.category) {
        return false;
      }
      if (filter?.featured !== undefined && p.featured !== filter.featured) {
        return false;
      }
      return true;
    });
  },

  async getAll() {
    if (isDbConnected()) {
      return Project.find().sort({ sortOrder: 1, createdAt: -1 });
    }
    return fallbackProjects;
  },

  async getBySlug(slug: string) {
    if (isDbConnected()) {
      return Project.findOne({ slug });
    }
    return fallbackProjects.find((p) => p.slug === slug) || null;
  },

  async getById(id: string) {
    if (isDbConnected()) {
      return Project.findById(id);
    }
    return fallbackProjects.find((p) => p.id === id || p.slug === id) || null;
  },

  async create(data: Partial<IProject>) {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title || "untitled-project");

    if (isDbConnected()) {
      const existing = await Project.findOne({ slug });
      if (existing) {
        throw new Error(`A project with slug "${slug}" already exists.`);
      }
      return Project.create({ ...data, slug });
    }

    // Fallback mode
    const newProject: IProject = {
      ...(data as IProject),
      id: `fallback-${Date.now()}`,
      slug,
      metrics: data.metrics || [],
      tags: data.tags || [],
      technologies: data.technologies || [],
      servicesProvided: data.servicesProvided || [],
      features: data.features || [],
      featured: data.featured ?? false,
      published: data.published ?? true,
      sortOrder: data.sortOrder ?? fallbackProjects.length + 1,
      overview: data.overview || { purpose: "", requirements: "", audience: "", goals: [] },
      challenge: data.challenge || { summary: "", points: [] },
      solution: data.solution || { summary: "", points: [] },
      showcase: data.showcase || { title: "", description: "", desktopAspect: "", mobileAspect: "" },
      outcome: data.outcome || { summary: "", highlights: [] },
    };
    fallbackProjects.push(newProject);
    return newProject;
  },

  async update(id: string, data: Partial<IProject>) {
    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }

    if (isDbConnected()) {
      return Project.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    }

    const index = fallbackProjects.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) return null;
    fallbackProjects[index] = { ...fallbackProjects[index], ...data };
    return fallbackProjects[index];
  },

  async delete(id: string) {
    if (isDbConnected()) {
      return Project.findByIdAndDelete(id);
    }

    const index = fallbackProjects.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) return null;
    const deleted = fallbackProjects[index];
    fallbackProjects = fallbackProjects.filter((p) => p.id !== id && p.slug !== id);
    return deleted;
  },

  async togglePublish(id: string) {
    if (isDbConnected()) {
      const project = await Project.findById(id);
      if (!project) return null;
      project.published = !project.published;
      await project.save();
      return project;
    }

    const project = fallbackProjects.find((p) => p.id === id || p.slug === id);
    if (!project) return null;
    project.published = !project.published;
    return project;
  },
};

