import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000").transform((val) => parseInt(val, 10)),
  MONGODB_URI: z
    .string()
    .default("mongodb://127.0.0.1:27017/nexusagency"),
  JWT_SECRET: z
    .string()
    .default("super_secret_jwt_key_nexusagency_2026_change_in_production"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://127.0.0.1:3000")
    .transform((val) => val.split(",").map((s) => s.trim())),

  // Email Configuration (Nodemailer Gmail SMTP)
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.string().default("465").transform((val) => parseInt(val, 10)),
  SMTP_SECURE: z
    .string()
    .default("true")
    .transform((val) => val === "true" || val === "1"),
  SMTP_USER: z.string().default("smsiam987@gmail.com"),
  SMTP_PASS: z.string().optional(),
  NOTIFICATION_EMAIL: z.string().default("smsiam987@gmail.com"),
  AGENCY_NAME: z.string().default("NexusAgency"),
});

export const env = envSchema.parse(process.env);
