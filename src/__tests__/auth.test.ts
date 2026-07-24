import { describe, it, expect } from "vitest";
import { requireMutableAccount } from "../modules/auth/guards";

describe("Auth Server Guards & Read-Only Demo Account Protections", () => {
  it("allows standard user accounts to execute mutations", async () => {
    const res = await requireMutableAccount("user@example.com");
    expect(res.ok).toBe(true);
  });

  it("blocks read-only demo accounts from executing sensitive mutations", async () => {
    const resFree = await requireMutableAccount("student-free@example.com");
    expect(resFree.ok).toBe(false);
    if (!resFree.ok) {
      expect(resFree.error.code).toBe("DEMO_ACCOUNT_READ_ONLY");
    }

    const resActive = await requireMutableAccount("student-active@example.com");
    expect(resActive.ok).toBe(false);
    if (!resActive.ok) {
      expect(resActive.error.code).toBe("DEMO_ACCOUNT_READ_ONLY");
    }
  });
});
