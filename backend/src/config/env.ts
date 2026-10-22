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
});

export const env = envSchema.parse(process.env);

