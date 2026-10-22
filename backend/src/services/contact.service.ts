import { ContactInquiry } from "../models/ContactInquiry.js";
import { IContactInquiry, InquiryStatus } from "../types/index.js";
import { isDbConnected } from "../config/db.js";

let fallbackInquiries: IContactInquiry[] = [];

export const contactService = {
  async create(data: {
    name: string;
    email: string;
    company?: string;
    service?: string;
    message: string;
    ipAddress?: string;
  }) {
    if (isDbConnected()) {
      return ContactInquiry.create(data);
    }

    const newInquiry: IContactInquiry = {
      id: `fallback-inquiry-${Date.now()}`,
      ...data,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fallbackInquiries.unshift(newInquiry);
    return newInquiry;
  },

  async getAll(filter?: { status?: InquiryStatus }) {
    if (isDbConnected()) {
      const query = filter?.status ? { status: filter.status } : {};
      return ContactInquiry.find(query).sort({ createdAt: -1 });
    }

    if (filter?.status) {
      return fallbackInquiries.filter((i) => i.status === filter.status);
    }
    return fallbackInquiries;
  },

  async getById(id: string) {
    if (isDbConnected()) {
      return ContactInquiry.findById(id);
    }
    return fallbackInquiries.find((i) => i.id === id) || null;
  },

  async updateStatus(id: string, status: InquiryStatus) {
    if (isDbConnected()) {
      return ContactInquiry.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      );
    }

    const inquiry = fallbackInquiries.find((i) => i.id === id);
    if (!inquiry) return null;
    inquiry.status = status;
    inquiry.updatedAt = new Date();
    return inquiry;
  },

  async delete(id: string) {
    if (isDbConnected()) {
      return ContactInquiry.findByIdAndDelete(id);
    }

    const index = fallbackInquiries.findIndex((i) => i.id === id);
    if (index === -1) return null;
    const deleted = fallbackInquiries[index];
    fallbackInquiries = fallbackInquiries.filter((i) => i.id !== id);
    return deleted;
  },
};

