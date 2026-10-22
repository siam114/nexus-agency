import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /api/v1/health", () => {
  it("should return 200 OK with healthy status and metadata", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("healthy");
    expect(res.body.data.service).toBe("nexusagency-backend");
    expect(res.body.data.timestamp).toBeDefined();
  });

  it("should return 200 on root path with API info", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("NexusAgency API");
  });

  it("should return 404 on unknown paths", async () => {
    const res = await request(app).get("/api/v1/unknown-endpoint-xyz");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

