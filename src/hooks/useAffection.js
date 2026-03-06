import {
  AFFECTION_PER_CORRECT,
  AFFECTION_PER_WRONG,
  COMBO_BONUS,
  PASS_BONUS,
  PASS_THRESHOLD,
  CONFESSION_THRESHOLD,
} from "../constants/env.js";

export function calculateAffectionDelta({ isCorrect, newCombo, isLastQuestion, newScore }) {
  let delta = isCorrect ? AFFECTION_PER_CORRECT : AFFECTION_PER_WRONG;

  // Every 3rd consecutive correct answer triggers combo bonus
  if (isCorrect && newCombo > 0 && newCombo % 3 === 0) {
    delta += COMBO_BONUS;
  }

  // Pass bonus on the final question if score meets threshold
  if (isLastQuestion && newScore >= PASS_THRESHOLD) {
    delta += PASS_BONUS;
  }

  return delta;
}

export function clampAffection(value) {
  return Math.max(0, Math.min(100, value));
}

export function isConfessionUnlocked(affection) {
  return affection >= CONFESSION_THRESHOLD;
}

export function getAffectionTier(affection) {
  if (affection >= 80) return "high";
  if (affection >= 50) return "mid";
  return "low";
}

export function getConfessionTier(affection) {
  return affection >= 90 ? "s" : "a";
}

export function getScoreGrade(score, total) {
  const pct = total > 0 ? (score / total) * 100 : 0;
  if (pct >= 90) return "s";
  if (pct >= 70) return "a";
  if (pct >= 50) return "b";
  if (pct >= 30) return "c";
  return "d";
}

export function getAffectionGrade(affection) {
  if (affection >= 90) return "s";
  if (affection >= 70) return "a";
  if (affection >= 50) return "b";
  if (affection >= 30) return "c";
  return "d";
}
