import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { env } from "../config/env.js";
import { IAuthTokenPayload } from "../types/index.js";
import { isDbConnected } from "../config/db.js";

export const authService = {
  generateToken(payload: IAuthTokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
  },

  async login(email: string, password: string) {
    if (isDbConnected()) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      user.lastLogin = new Date();
      await user.save();

      const token = this.generateToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      return {
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          lastLogin: user.lastLogin,
        },
      };
    }

    // Offline / local test fallback
    if (
      email.toLowerCase() === "smsiam987@gmail.com" &&
      password === "AdminPassword123!"
    ) {
      const token = this.generateToken({
        userId: "fallback-admin-id",
        email: "smsiam987@gmail.com",
        role: "admin",
      });

      return {
        token,
        user: {
          id: "fallback-admin-id",
          email: "smsiam987@gmail.com",
          name: "SM SIAM",
          role: "admin",
          lastLogin: new Date(),
        },
      };
    }

    throw new Error("Invalid email or password");
  },

  async createInitialAdmin(data: {
    email: string;
    password: string;
    name: string;
    role?: "admin" | "superadmin";
  }) {
    if (!isDbConnected()) {
      throw new Error("Cannot create user: database is not connected.");
    }

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return existing;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    return User.create({
      email: data.email,
      passwordHash,
      name: data.name,
      role: data.role || "superadmin",
    });
  },
};

