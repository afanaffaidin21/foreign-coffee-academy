import { describe, it, expect } from "vitest";
import { generateSeedData } from "../db/seed";
import { userRoleEnum, publicationStatusEnum, lessonAccessEnum } from "../db/schema";

describe("Database Schema & Seed Definitions", () => {
  it("exports valid user role enums", () => {
    expect(userRoleEnum.enumValues).toEqual(["STUDENT", "ADMIN"]);
  });

  it("exports valid publication status enums", () => {
    expect(publicationStatusEnum.enumValues).toEqual(["DRAFT", "PUBLISHED", "ARCHIVED"]);
  });

  it("exports valid lesson access enums", () => {
    expect(lessonAccessEnum.enumValues).toEqual(["FREE", "PREMIUM"]);
  });

  it("generates deterministic seed data with required accounts", async () => {
    const { users, plans, hubs } = await generateSeedData();

    expect(users).toHaveLength(4);
    expect(users.map((u) => u.email)).toContain("student-free@example.com");
    expect(users.map((u) => u.email)).toContain("student-active@example.com");
    expect(users.map((u) => u.email)).toContain("student-expired@example.com");
    expect(users.map((u) => u.email)).toContain("admin@example.com");

    expect(plans).toHaveLength(2);
    expect(plans.map((p) => p.slug)).toContain("monthly");
    expect(plans.map((p) => p.slug)).toContain("yearly");

    expect(hubs).toHaveLength(6);
  });
});
