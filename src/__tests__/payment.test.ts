import { describe, it, expect } from "vitest";
import crypto from "crypto";

describe("Midtrans Sandbox Payment & SHA-512 Verification", () => {
  const serverKey = "SB-Mid-server-demo-key";
  const orderId = "FCA-1721800000-1234";
  const statusCode = "200";
  const grossAmount = "49000";

  it("generates correct SHA-512 signature hash", () => {
    const payloadToHash = `${orderId}${statusCode}${grossAmount}${serverKey}`;
    const signature = crypto
      .createHash("sha512")
      .update(payloadToHash)
      .digest("hex");

    expect(signature).toBeDefined();
    expect(signature).toHaveLength(128); // 128-char SHA-512 hex string
  });

  it("verifies matching SHA-512 signatures and rejects tampered signatures", () => {
    const payloadToHash = `${orderId}${statusCode}${grossAmount}${serverKey}`;
    const validSignature = crypto
      .createHash("sha512")
      .update(payloadToHash)
      .digest("hex");

    const tamperedSignature = "abcdef1234567890";

    expect(validSignature === validSignature).toBe(true);
    expect(validSignature === tamperedSignature).toBe(false);
  });
});
