import mongoose from "mongoose";
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
      const count = await TeamMember.countDocuments();
      if (count < initialTeam.length) {
        for (const member of initialTeam) {
          await TeamMember.findOneAndUpdate(
            { name: member.name },
            {
              $setOnInsert: member,
              $set: { image: member.image },
            },
            { upsert: true }
          );
        }
      }
      return TeamMember.find({ published: true }).sort({ sortOrder: 1 });
    }
    return fallbackTeam.filter((m) => m.published);
  },

  async getAll() {
    if (isDbConnected()) {
      const count = await TeamMember.countDocuments();
      if (count < initialTeam.length) {
        for (const member of initialTeam) {
          await TeamMember.findOneAndUpdate(
            { name: member.name },
            {
              $setOnInsert: member,
              $set: { image: member.image },
            },
            { upsert: true }
          );
        }
      }
      return TeamMember.find().sort({ sortOrder: 1 });
    }
    return fallbackTeam;
  },

  async getById(id: string) {
    if (isDbConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return TeamMember.findById(id);
      }
      return TeamMember.findOne({ name: id });
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

  async update(id: string, data: Partial<ITeamMember>, originalName?: string) {
    if (isDbConnected()) {
      let doc = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        doc = await TeamMember.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
      }
      // If id is not an ObjectId or findByIdAndUpdate didn't match, match by originalName, data.name or sortOrder
      if (!doc && originalName) {
        doc = await TeamMember.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${originalName.trim()}$`, "i") } },
          { $set: data },
          { new: true, runValidators: true }
        );
      }
      if (!doc && data.name) {
        doc = await TeamMember.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${data.name.trim()}$`, "i") } },
          { $set: data },
          { new: true, runValidators: true }
        );
      }
      if (!doc && data.sortOrder !== undefined) {
        doc = await TeamMember.findOneAndUpdate(
          { sortOrder: data.sortOrder },
          { $set: data },
          { new: true, runValidators: true }
        );
      }
      return doc;
    }

    const index = fallbackTeam.findIndex(
      (m) =>
        m.id === id ||
        (originalName && m.name.toLowerCase() === originalName.toLowerCase()) ||
        (data.name && m.name.toLowerCase() === data.name.toLowerCase()) ||
        (data.sortOrder !== undefined && m.sortOrder === data.sortOrder)
    );
    if (index === -1) return null;
    fallbackTeam[index] = { ...fallbackTeam[index], ...data };
    return fallbackTeam[index];
  },

  async delete(id: string, name?: string) {
    if (isDbConnected()) {
      let doc = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        doc = await TeamMember.findByIdAndDelete(id);
      }
      if (!doc && name) {
        doc = await TeamMember.findOneAndDelete({
          name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
        });
      }
      return doc;
    }

    const index = fallbackTeam.findIndex(
      (m) => m.id === id || (name && m.name.toLowerCase() === name.toLowerCase())
    );
    if (index === -1) return null;
    const deleted = fallbackTeam[index];
    fallbackTeam = fallbackTeam.filter((_, idx) => idx !== index);
    return deleted;
  },
};

