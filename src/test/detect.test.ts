import { describe, expect, it } from "vitest";
import { analyze } from "@/lib/detect";

describe("demo scam detection", () => {
  it("returns Safe when no common scam patterns are present", () => {
    expect(analyze("Hello, see you soon.", "").level).toBe("Safe");
  });

  it("returns Suspicious for a message requesting account verification", () => {
    expect(analyze("Please verify your account", "").level).toBe("Suspicious");
  });

  it("returns High Risk for urgent messages asking for an OTP", () => {
    expect(analyze("URGENT: share your OTP immediately", "").level).toBe("High Risk");
  });
});