import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Contact Inquiries Endpoints", () => {
  it("POST /api/v1/contact should accept valid project inquiry", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({
        name: "Alice Johnson",
        email: "alice@example.com",
        company: "Johnson Retail",
        service: "Shopify Development",
        message: "We need a full Shopify redesign and custom theme development.",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.status).toBe("new");
    expect(res.body.message).toContain("received");
  });
});

