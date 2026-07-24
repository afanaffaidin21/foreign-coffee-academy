import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";
import { redactSensitiveData } from "@/lib/sentry";

describe("E2E System Integration & Quality Suite", () => {
  it("enforces rate limits on high-frequency API calls", () => {
    const ip = "192.168.1.100";
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip, 5, 60000)).toBe(true);
    }
    // 6th call should exceed 5 limit
    expect(checkRateLimit(ip, 5, 60000)).toBe(false);
  });

  it("redacts sensitive passwords and credentials in logs", () => {
    const rawData = {
      email: "student@example.com",
      password: "secretpassword123",
      serverKey: "Mid-server-key",
    };

    const sanitized = redactSensitiveData(rawData);
    expect(sanitized.email).toBe("student@example.com");
    expect(sanitized.password).toBe("[REDACTED]");
    expect(sanitized.serverKey).toBe("[REDACTED]");
  });
});
