import { describe, it, expect, beforeEach } from "vitest";
import { getAllHistory, useHistory } from "./useHistory.js";

const STORAGE_KEY = "ctf-dating-sim-v1";

beforeEach(() => {
  localStorage.clear();
});

describe("getAllHistory", () => {
  it("returns empty null-prototype object when storage is empty", () => {
    const result = getAllHistory();
    expect(typeof result).toBe("object");
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("returns parsed history from localStorage", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ alice: { zero: { affection: 75, confessionUnlocked: false, lastPlayed: "2026-01-01T00:00:00.000Z" } } })
    );
    const result = getAllHistory();
    expect(result.alice.zero.affection).toBe(75);
  });

  it("returns empty object when localStorage contains invalid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "not-json{{{");
    expect(Object.keys(getAllHistory())).toHaveLength(0);
  });

  it("returns empty object when stored value is an array", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2, 3]));
    expect(Object.keys(getAllHistory())).toHaveLength(0);
  });
});

describe("useHistory — getPlayerHistory", () => {
  it("returns empty object when player has no history", () => {
    const { getPlayerHistory } = useHistory("alice");
    expect(getPlayerHistory()).toEqual({});
  });

  it("returns empty object for empty player name", () => {
    const { getPlayerHistory } = useHistory("");
    expect(getPlayerHistory()).toEqual({});
  });

  it("returns existing history for the player", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ alice: { zero: { affection: 80, confessionUnlocked: true, lastPlayed: "2026-01-01T00:00:00.000Z" } } })
    );
    const { getPlayerHistory } = useHistory("alice");
    const history = getPlayerHistory();
    expect(history.zero.affection).toBe(80);
    expect(history.zero.confessionUnlocked).toBe(true);
  });

  it("does not return another player's history", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ bob: { zero: { affection: 60, confessionUnlocked: false, lastPlayed: null } } })
    );
    const { getPlayerHistory } = useHistory("alice");
    expect(getPlayerHistory()).toEqual({});
  });
});

describe("useHistory — saveResult", () => {
  it("saves a new result to localStorage", () => {
    const { saveResult, getPlayerHistory } = useHistory("alice");
    saveResult("zero", 70, false);
    const history = getPlayerHistory();
    expect(history.zero.affection).toBe(70);
    expect(history.zero.confessionUnlocked).toBe(false);
    expect(typeof history.zero.lastPlayed).toBe("string");
  });

  it("keeps the higher affection on subsequent saves", () => {
    const { saveResult, getPlayerHistory } = useHistory("alice");
    saveResult("zero", 60, false);
    saveResult("zero", 40, false);
    expect(getPlayerHistory().zero.affection).toBe(60);
  });

  it("latches confessionUnlocked to true and does not revert", () => {
    const { saveResult, getPlayerHistory } = useHistory("alice");
    saveResult("zero", 90, true);
    saveResult("zero", 30, false);
    expect(getPlayerHistory().zero.confessionUnlocked).toBe(true);
  });

  it("saves results for multiple characters independently", () => {
    const { saveResult, getPlayerHistory } = useHistory("alice");
    saveResult("zero", 70, false);
    saveResult("phantom", 85, true);
    const history = getPlayerHistory();
    expect(history.zero.affection).toBe(70);
    expect(history.phantom.affection).toBe(85);
  });

  it("does nothing when player name is empty", () => {
    const { saveResult } = useHistory("");
    saveResult("zero", 70, false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("persists results across separate hook instances (same player)", () => {
    useHistory("alice").saveResult("zero", 72, false);
    const { getPlayerHistory } = useHistory("alice");
    expect(getPlayerHistory().zero.affection).toBe(72);
  });

  it("isolates data between different players", () => {
    useHistory("alice").saveResult("zero", 80, false);
    useHistory("bob").saveResult("zero", 50, false);
    expect(useHistory("alice").getPlayerHistory().zero.affection).toBe(80);
    expect(useHistory("bob").getPlayerHistory().zero.affection).toBe(50);
  });

  it("truncates player names longer than 20 characters", () => {
    const longName = "a".repeat(30);
    const { saveResult } = useHistory(longName);
    saveResult("zero", 60, false);
    const all = getAllHistory();
    const truncated = "a".repeat(20);
    expect(all[truncated]).toBeDefined();
    expect(all[longName]).toBeUndefined();
  });
});
