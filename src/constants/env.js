export const GAS_URL               = import.meta.env.VITE_GAS_URL ?? "";
export const PASS_THRESHOLD        = Number(import.meta.env.VITE_PASS_THRESHOLD  ?? 5);
export const QUESTION_COUNT        = Number(import.meta.env.VITE_QUESTION_COUNT  ?? 10);
export const AFFECTION_PER_CORRECT = Number(import.meta.env.VITE_AFFECTION_PER_CORRECT ?? 12);
export const AFFECTION_PER_WRONG   = Number(import.meta.env.VITE_AFFECTION_PER_WRONG   ?? -5);
export const COMBO_BONUS           = Number(import.meta.env.VITE_COMBO_BONUS     ?? 10);
export const PASS_BONUS            = Number(import.meta.env.VITE_PASS_BONUS      ?? 20);
export const CONFESSION_THRESHOLD  = Number(import.meta.env.VITE_CONFESSION_THRESHOLD ?? 80);
