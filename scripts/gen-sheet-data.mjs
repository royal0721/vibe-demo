// Generate TSV data for Google Sheets "題目" sheet
// Run: node scripts/gen-sheet-data.mjs

import { DEMO_QUESTIONS } from "../src/constants/demoQuestions.js";

const rows = [
  ["id", "character", "difficulty", "text", "A", "B", "C", "D", "correct", "correctDialogue", "wrongDialogue"],
];

for (const charId of ["zero", "phantom", "cipher", "glitch"]) {
  for (const q of DEMO_QUESTIONS[charId]) {
    rows.push([
      q.id,
      q.character,
      q.difficulty,
      q.text,
      q.options.A,
      q.options.B,
      q.options.C,
      q.options.D,
      q.correct,
      q.correctDialogue,
      q.wrongDialogue,
    ]);
  }
}

// Validate
let errors = 0;
for (const row of rows.slice(1)) {
  const [id, char, diff, text, A, B, C, D, correct, cDia, wDia] = row;
  if (!["zero","phantom","cipher","glitch"].includes(char)) { console.error(`Row ${id}: invalid character "${char}"`); errors++; }
  if (!["easy","medium","hard"].includes(diff)) { console.error(`Row ${id}: invalid difficulty "${diff}"`); errors++; }
  if (!["A","B","C","D"].includes(correct)) { console.error(`Row ${id}: invalid correct "${correct}"`); errors++; }
  if (!text) { console.error(`Row ${id}: missing text`); errors++; }
  if (!cDia) { console.error(`Row ${id}: missing correctDialogue`); errors++; }
  if (!wDia) { console.error(`Row ${id}: missing wrongDialogue`); errors++; }
}

if (errors === 0) {
  console.log(`✅ 驗證通過：${rows.length - 1} 題，格式完全正確\n`);
} else {
  console.log(`❌ 發現 ${errors} 個錯誤`);
  process.exit(1);
}

// Output TSV
const tsv = rows.map(r => r.map(String).join("\t")).join("\n");
process.stdout.write(tsv + "\n");
