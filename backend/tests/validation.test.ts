import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Input Validation & Zod Schema Tests", () => {
  it("should reject contact inquiry with invalid email", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({
        name: "Test User",
        email: "not-an-email",
        message: "Hello this is a valid message description.",
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation failed");
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "email" }),
      ])
    );
  });

  it("should reject contact inquiry with message that is too short", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({
        name: "Test User",
        email: "valid@example.com",
        message: "short",
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "message" }),
      ])
    );
  });

  it("should reject login attempt without password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "admin@nexusagency.com",
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

