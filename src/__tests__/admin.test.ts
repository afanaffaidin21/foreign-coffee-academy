import { describe, it, expect } from "vitest";
import { requireMutableAccount } from "@/modules/auth/guards";

describe("Admin Security & Mutable Account Guards", () => {
  it("allows mutations for real non-demo accounts", async () => {
    const res = await requireMutableAccount("realadmin@example.com");
    expect(res.ok).toBe(true);
  });

  it("blocks destructive mutations for public demo student accounts", async () => {
    const res = await requireMutableAccount("student-free@example.com");
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("DEMO_ACCOUNT_READ_ONLY");
    }
  });
});
