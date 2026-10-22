import { TeamMember } from "../models/TeamMember.js";
import { ITeamMember } from "../types/index.js";
import { initialTeam } from "../data/initialData.js";
import { isDbConnected } from "../config/db.js";

let fallbackTeam: ITeamMember[] = initialTeam.map((m, idx) => ({
  ...m,
  id: m.id || (idx + 1).toString(),
}));

export const teamService = {
  async getPublished() {
    if (isDbConnected()) {
      return TeamMember.find({ published: true }).sort({ sortOrder: 1 });
    }
    return fallbackTeam.filter((m) => m.published);
  },

  async getAll() {
    if (isDbConnected()) {
      return TeamMember.find().sort({ sortOrder: 1 });
    }
    return fallbackTeam;
  },

  async getById(id: string) {
    if (isDbConnected()) {
      return TeamMember.findById(id);
    }
    return fallbackTeam.find((m) => m.id === id) || null;
  },

  async create(data: Partial<ITeamMember>) {
    if (isDbConnected()) {
      return TeamMember.create(data);
    }

    const newMember: ITeamMember = {
      ...(data as ITeamMember),
      id: `fallback-member-${Date.now()}`,
      skills: data.skills || [],
      published: data.published ?? true,
      sortOrder: data.sortOrder ?? fallbackTeam.length + 1,
    };
    fallbackTeam.push(newMember);
    return newMember;
  },

  async update(id: string, data: Partial<ITeamMember>) {
    if (isDbConnected()) {
      return TeamMember.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    }

    const index = fallbackTeam.findIndex((m) => m.id === id);
    if (index === -1) return null;
    fallbackTeam[index] = { ...fallbackTeam[index], ...data };
    return fallbackTeam[index];
  },

  async delete(id: string) {
    if (isDbConnected()) {
      return TeamMember.findByIdAndDelete(id);
    }

    const index = fallbackTeam.findIndex((m) => m.id === id);
    if (index === -1) return null;
    const deleted = fallbackTeam[index];
    fallbackTeam = fallbackTeam.filter((m) => m.id !== id);
    return deleted;
  },
};

