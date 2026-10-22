import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import jwt from "jsonwebtoken";
import { env } from "../src/config/env.js";

describe("Authentication & Authorization Middleware Tests", () => {
  it("should reject access to protected admin route without token", async () => {
    const res = await request(app).get("/api/v1/admin/projects");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Authentication required");
  });

  it("should reject access with invalid or malformed token", async () => {
    const res = await request(app)
      .get("/api/v1/admin/projects")
      .set("Authorization", "Bearer invalid-tampered-token");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Invalid, tampered, or expired");
  });

  it("should allow admin access with a valid signed JWT", async () => {
    const adminToken = jwt.sign(
      { userId: "test-admin-id", email: "smsiam987@gmail.com", role: "admin" },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .get("/api/v1/admin/projects")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

