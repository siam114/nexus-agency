import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Projects API Endpoints", () => {
  it("GET /api/v1/projects should return published projects list", async () => {
    const res = await request(app).get("/api/v1/projects");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    const firstProject = res.body.data[0];
    expect(firstProject.slug).toBeDefined();
    expect(firstProject.title).toBeDefined();
    expect(firstProject.category).toBeDefined();
  });

  it("GET /api/v1/projects?category=Shopify+Development should filter by category", async () => {
    const res = await request(app)
      .get("/api/v1/projects")
      .query({ category: "Shopify Development" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    res.body.data.forEach((p: { category: string }) => {
      expect(p.category).toBe("Shopify Development");
    });
  });

  it("GET /api/v1/projects/:slug should return project details", async () => {
    const res = await request(app).get(
      "/api/v1/projects/outdoor-essentials-store"
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBe("outdoor-essentials-store");
    expect(res.body.data.overview).toBeDefined();
    expect(res.body.data.challenge).toBeDefined();
    expect(res.body.data.solution).toBeDefined();
    expect(res.body.data.features).toBeDefined();
  });

  it("GET /api/v1/projects/:slug should return 404 for non-existent slug", async () => {
    const res = await request(app).get("/api/v1/projects/non-existent-project-slug");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

