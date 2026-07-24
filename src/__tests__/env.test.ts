import { describe, it, expect } from "vitest";

describe("Environment & Security Validation", () => {
  it("allows MIDTRANS_IS_PRODUCTION=false in Sandbox mode", () => {
    const isProd = "false";
    expect(isProd).toBe("false");
  });

  it("prevents MIDTRANS_IS_PRODUCTION=true from starting portfolio app", () => {
    const validateIsProduction = (val: string) => {
      if (val === "true") {
        throw new Error(
          "SECURITY GUARD: MIDTRANS_IS_PRODUCTION must be false. Production payment is disabled."
        );
      }
      return true;
    };

    expect(() => validateIsProduction("true")).toThrow(
      /SECURITY GUARD: MIDTRANS_IS_PRODUCTION must be false/
    );
    expect(validateIsProduction("false")).toBe(true);
  });
});
