const STORAGE_KEY = "ctf-dating-sim-v1";
const MAX_NAME_LENGTH = 20;

// Sanitize player name to prevent prototype pollution when used as object key
function sanitizeName(name) {
  return String(name).trim().slice(0, MAX_NAME_LENGTH);
}

function readStorage() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return Object.create(null);
    }
    // Rebuild as null-prototype object to prevent prototype pollution
    const safe = Object.create(null);
    for (const key of Object.keys(parsed)) {
      safe[key] = parsed[key];
    }
    return safe;
  } catch {
    return Object.create(null);
  }
}

export function getAllHistory() {
  return readStorage();
}

export function useHistory(playerName) {
  const safeName = sanitizeName(playerName ?? "");

  function getPlayerHistory() {
    if (!safeName) return {};
    const all = readStorage();
    return Object.prototype.hasOwnProperty.call(all, safeName) ? all[safeName] : {};
  }

  function saveResult(characterId, affection, confessionUnlocked) {
    if (!safeName) return;
    const all      = readStorage();
    const player   = Object.prototype.hasOwnProperty.call(all, safeName) ? all[safeName] : {};
    const existing = player[characterId] ?? { affection: 0, confessionUnlocked: false };

    player[characterId] = {
      affection:          Math.max(existing.affection, affection),
      confessionUnlocked: existing.confessionUnlocked || confessionUnlocked,
      lastPlayed:         new Date().toISOString(),
    };

    all[safeName] = player;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
      // localStorage quota exceeded — ignore silently
    }
  }

  return { getPlayerHistory, saveResult };
}
