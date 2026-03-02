export const AFFECTION_COMMENTS = {
  low:  (name) => `${name} looks away. "...You need more practice."`,
  mid:  (name) => `${name} nods. "Not bad. You're improving."`,
  high: (name) => `${name} smiles quietly. "You exceeded my expectations."`,
};

export const TIMER_DURATION = 30; // seconds per question

export const CORRECT_EFFECTS = ["💕", "✨", "💫", "⭐", "💖"];
export const WRONG_EFFECTS    = ["💔", "✖", "💢", "😤", "❌"];

export const COMBO_MESSAGES = [
  "3 COMBO!! ⚡",
  "6 COMBO!! ⚡⚡",
  "9 COMBO!! ⚡⚡⚡",
];
