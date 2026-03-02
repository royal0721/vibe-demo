import { GAS_URL, QUESTION_COUNT, PASS_THRESHOLD } from "../constants/env.js";
import { getDemoQuestions } from "../constants/demoQuestions.js";

const TIMEOUT_MS = 12000;

async function gasWithTimeout(fetchFn) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetchFn(controller.signal);
  } finally {
    clearTimeout(id);
  }
}

export async function fetchQuestions(characterId, count = QUESTION_COUNT) {
  // Fall back to built-in demo questions when GAS URL is not configured
  if (!GAS_URL) {
    return getDemoQuestions(characterId, count);
  }

  const url = new URL(GAS_URL);
  url.searchParams.set("action",    "getQuestions");
  url.searchParams.set("character", characterId);
  url.searchParams.set("count",     String(count));

  return gasWithTimeout(async (signal) => {
    const res = await fetch(url.toString(), { signal });
    if (!res.ok) throw new Error(`GAS responded with ${res.status}`);
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    return json.questions ?? [];
  });
}

export async function fetchPlayerHistory(playerName) {
  if (!GAS_URL) return null;
  const url = new URL(GAS_URL);
  url.searchParams.set("action", "getHistory");
  url.searchParams.set("player", playerName);

  try {
    return await gasWithTimeout(async (signal) => {
      const res = await fetch(url.toString(), { signal });
      if (!res.ok) return null;
      const json = await res.json();
      return json.history ?? null;
    });
  } catch {
    return null;
  }
}

export async function submitResult({ playerName, characterId, score, affection, confessionUnlocked }) {
  // Skip submission silently in demo mode
  if (!GAS_URL) return { success: true, demo: true };
  return gasWithTimeout(async (signal) => {
    const res = await fetch(GAS_URL, {
      method:  "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body:    JSON.stringify({
        action: "submitResult",
        playerName,
        characterId,
        score,
        affection,
        confessionUnlocked,
        passThreshold: PASS_THRESHOLD,
      }),
      signal,
    });
    if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
    return await res.json();
  });
}
