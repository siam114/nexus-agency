import { Setting } from "../models/Setting.js";
import { initialSettings } from "../data/initialData.js";
import { isDbConnected } from "../config/db.js";

let fallbackSettings: Record<string, unknown> = { ...initialSettings };

export const settingsService = {
  async getSettings() {
    if (isDbConnected()) {
      const setting = await Setting.findOne({ key: "general" });
      return setting ? setting.data : initialSettings;
    }
    return fallbackSettings;
  },

  async updateSettings(data: Record<string, unknown>) {
    if (isDbConnected()) {
      const setting = await Setting.findOneAndUpdate(
        { key: "general" },
        { $set: { data: { ...initialSettings, ...data } } },
        { new: true, upsert: true }
      );
      return setting.data;
    }

    fallbackSettings = { ...fallbackSettings, ...data };
    return fallbackSettings;
  },
};

