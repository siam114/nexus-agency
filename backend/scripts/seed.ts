import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "../src/config/env.js";
import { User } from "../src/models/User.js";
import { Project } from "../src/models/Project.js";
import { Service } from "../src/models/Service.js";
import { TeamMember } from "../src/models/TeamMember.js";
import { Testimonial } from "../src/models/Testimonial.js";
import { Setting } from "../src/models/Setting.js";
import {
  initialProjects,
  initialServices,
  initialTeam,
  initialTestimonials,
  initialSettings,
} from "../src/data/initialData.js";
import { logger } from "../src/utils/logger.js";

async function runSeed() {
  logger.info("Connecting to MongoDB for seeding...");
  await mongoose.connect(env.MONGODB_URI);
  logger.info("Connected to MongoDB successfully.");

  // 1. Seed Administrator User
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "smsiam987@gmail.com";
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || "AdminPassword123!";
  const adminName = process.env.INITIAL_ADMIN_NAME || "Siam Ahmed";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    await User.create({
      email: adminEmail,
      passwordHash,
      name: adminName,
      role: "superadmin",
    });
    logger.info(`Created Initial Admin user: ${adminEmail}`);
  } else {
    logger.info(`Admin user already exists: ${adminEmail}`);
  }

  // 2. Seed Projects
  for (const proj of initialProjects) {
    await Project.findOneAndUpdate(
      { slug: proj.slug },
      { $set: proj },
      { upsert: true, new: true }
    );
  }
  logger.info(`Seeded ${initialProjects.length} Projects.`);

  // 3. Seed Services
  for (const svc of initialServices) {
    await Service.findOneAndUpdate(
      { slug: svc.slug },
      { $set: svc },
      { upsert: true, new: true }
    );
  }
  logger.info(`Seeded ${initialServices.length} Services.`);

  // 4. Seed Team Members
  for (const member of initialTeam) {
    await TeamMember.findOneAndUpdate(
      { name: member.name },
      { $set: member },
      { upsert: true, new: true }
    );
  }
  logger.info(`Seeded ${initialTeam.length} Team Members.`);

  // 5. Seed Testimonials
  for (const test of initialTestimonials) {
    await Testimonial.findOneAndUpdate(
      { name: test.name },
      { $set: test },
      { upsert: true, new: true }
    );
  }
  logger.info(`Seeded ${initialTestimonials.length} Testimonials.`);

  // 6. Seed Website Settings
  await Setting.findOneAndUpdate(
    { key: "general" },
    { $set: { data: initialSettings } },
    { upsert: true, new: true }
  );
  logger.info("Seeded Website Settings.");

  logger.info("Database seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

runSeed().catch((error) => {
  logger.error("Seeding failed:", error);
  process.exit(1);
});

