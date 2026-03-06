import { describe, it, expect } from "vitest";
import {
  clampAffection,
  getScoreGrade,
  getAffectionGrade,
  getAffectionTier,
  isConfessionUnlocked,
} from "./useAffection.js";

describe("clampAffection", () => {
  it("clamps below 0 to 0", () => {
    expect(clampAffection(-10)).toBe(0);
  });
  it("clamps above 100 to 100", () => {
    expect(clampAffection(150)).toBe(100);
  });
  it("passes through values in range", () => {
    expect(clampAffection(50)).toBe(50);
  });
});

describe("getScoreGrade", () => {
  it("returns s for 90%+", () => expect(getScoreGrade(9, 10)).toBe("s"));
  it("returns a for 70–89%", () => expect(getScoreGrade(7, 10)).toBe("a"));
  it("returns b for 50–69%", () => expect(getScoreGrade(5, 10)).toBe("b"));
  it("returns c for 30–49%", () => expect(getScoreGrade(3, 10)).toBe("c"));
  it("returns d for below 30%", () => expect(getScoreGrade(2, 10)).toBe("d"));
  it("returns d when total is 0", () => expect(getScoreGrade(0, 0)).toBe("d"));
});

describe("getAffectionGrade", () => {
  it("returns s for affection 90+", () => expect(getAffectionGrade(95)).toBe("s"));
  it("returns a for affection 70–89", () => expect(getAffectionGrade(75)).toBe("a"));
  it("returns b for affection 50–69", () => expect(getAffectionGrade(50)).toBe("b"));
  it("returns c for affection 30–49", () => expect(getAffectionGrade(40)).toBe("c"));
  it("returns d for affection below 30", () => expect(getAffectionGrade(0)).toBe("d"));
});

describe("getAffectionTier", () => {
  it("returns high for 80+", () => expect(getAffectionTier(80)).toBe("high"));
  it("returns mid for 50–79", () => expect(getAffectionTier(50)).toBe("mid"));
  it("returns low for below 50", () => expect(getAffectionTier(30)).toBe("low"));
});

describe("isConfessionUnlocked", () => {
  it("returns true at or above threshold (80)", () => {
    expect(isConfessionUnlocked(80)).toBe(true);
    expect(isConfessionUnlocked(100)).toBe(true);
  });
  it("returns false below threshold", () => {
    expect(isConfessionUnlocked(79)).toBe(false);
  });
});
