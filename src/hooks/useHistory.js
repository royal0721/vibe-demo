const STORAGE_KEY = "ctf-dating-sim-v1";

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

export function useHistory(playerName) {
  function getPlayerHistory() {
    if (!playerName) return {};
    const all = readStorage();
    return all[playerName] ?? {};
  }

  function saveResult(characterId, affection, confessionUnlocked) {
    const all      = readStorage();
    const player   = all[playerName] ?? {};
    const existing = player[characterId] ?? { affection: 0, confessionUnlocked: false };

    player[characterId] = {
      affection:         Math.max(existing.affection, affection),
      confessionUnlocked: existing.confessionUnlocked || confessionUnlocked,
      lastPlayed:        new Date().toISOString(),
    };

    all[playerName] = player;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
      // localStorage quota exceeded — ignore silently
    }
  }

  return { getPlayerHistory, saveResult };
}
