import { motion } from "framer-motion";
import { ScreenWrapper }     from "../components/layout/ScreenWrapper.jsx";
import { Button }            from "../components/ui/Button.jsx";
import { CHARACTERS }        from "../constants/characters.js";
import { getAllHistory }      from "../hooks/useHistory.js";
import { getAffectionGrade } from "../hooks/useAffection.js";

const GRADE_LABEL = { s: "S", a: "A", b: "B", c: "C", d: "D" };
const GRADE_COLOR = {
  s: "#f5a623",   // amber / gold
  a: "#00f5d4",   // neon-cyan
  b: "#4ade80",   // green-400
  c: "#fb923c",   // orange-400
  d: "#6b7280",   // gray-500
};

// Aggregate best stats for a character across all players in localStorage
function getCharacterStats(characterId) {
  const all = getAllHistory();
  let bestAffection = 0;
  let confessionUnlocked = false;
  let lastPlayed = null;

  for (const playerData of Object.values(all)) {
    if (typeof playerData !== "object" || playerData === null) continue;
    const charData = playerData[characterId];
    if (!charData) continue;
    const aff = Number(charData.affection);
    if (Number.isFinite(aff) && aff > bestAffection) {
      bestAffection = aff;
      lastPlayed = charData.lastPlayed ?? null;
    }
    if (charData.confessionUnlocked) confessionUnlocked = true;
  }

  return bestAffection > 0 ? { affection: bestAffection, confessionUnlocked, lastPlayed } : null;
}

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("zh-TW", { month: "short", day: "numeric" });
  } catch {
    return null;
  }
}

function StatBlock({ label, value, color }) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl border border-dark-border bg-dark-card px-4 py-3"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <span className="font-mono text-xs text-gray-500 tracking-widest">{label}</span>
      <span className="font-body font-bold text-xl" style={{ color }}>{value}</span>
    </div>
  );
}

function CharacterCard({ character, data }) {
  const played = Boolean(data);
  const grade  = played ? getAffectionGrade(data.affection) : null;
  const gradeLabel = grade ? GRADE_LABEL[grade] : null;
  const gradeColor = grade ? GRADE_COLOR[grade] : null;
  const barWidth   = played ? `${data.affection}%` : "0%";

  return (
    <div
      className="rounded-2xl border p-4 flex flex-col gap-3 transition-all"
      style={{
        backgroundColor: played ? "rgba(26,26,46,0.85)" : "rgba(13,13,26,0.6)",
        borderColor:     played ? character.color.border : "rgba(255,255,255,0.06)",
        boxShadow:       played && data.confessionUnlocked
          ? character.color.glow
          : "none",
      }}
    >
      {/* Top row: name + grade badge + confession icon */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 border-2"
          style={{
            borderColor:     played ? character.color.primary : "#2a2a3a",
            backgroundColor: played ? character.color.secondary : "#0d0d1a",
          }}
        >
          <img
            src={`/characters/${character.id}.png`}
            alt={character.name}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="font-body font-bold text-base"
              style={{ color: played ? character.color.primary : "#4b5563" }}
            >
              {character.name}
            </span>
            {played && data.confessionUnlocked && (
              <span className="text-sm" title="告白已解鎖">💖</span>
            )}
          </div>
          <span className="font-mono text-xs text-gray-600">{character.specialtyLabel}</span>
        </div>

        {played ? (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-display text-base flex-shrink-0"
            style={{ backgroundColor: `${gradeColor}22`, color: gradeColor, border: `1px solid ${gradeColor}55` }}
          >
            {gradeLabel}
          </div>
        ) : (
          <span className="font-mono text-xs text-gray-700">未攻略</span>
        )}
      </div>

      {/* Affection bar */}
      <div>
        <div className="flex justify-between font-mono text-xs mb-1">
          <span style={{ color: played ? "#9ca3af" : "#374151" }}>好感度</span>
          <span style={{ color: played ? character.color.primary : "#374151" }}>
            {played ? data.affection : "—"}
          </span>
        </div>
        <div className="h-2 rounded-full bg-dark-panel overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: played ? character.color.primary : "#1f2937" }}
            initial={{ width: "0%" }}
            animate={{ width: barWidth }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      </div>

      {/* Last played */}
      {played && data.lastPlayed && (
        <div className="font-mono text-xs text-gray-700">
          最後遊玩：{formatDate(data.lastPlayed)}
        </div>
      )}
    </div>
  );
}

export function DashboardScreen({ dispatch }) {
  const charStats = CHARACTERS.map((c) => ({ character: c, data: getCharacterStats(c.id) }));

  const played        = charStats.filter(({ data }) => data !== null);
  const conqueredCount = played.length;
  const avgAffection  = conqueredCount > 0
    ? Math.round(played.reduce((sum, { data }) => sum + data.affection, 0) / conqueredCount)
    : null;
  const bestChar = conqueredCount > 0
    ? played.reduce((best, cur) => cur.data.affection > best.data.affection ? cur : best).character
    : null;

  return (
    <ScreenWrapper screenKey="dashboard">
      <div className="min-h-screen flex flex-col px-4 py-8 max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="font-mono text-xs text-gray-500 tracking-[0.3em] mb-2">CONQUEST RECORD</div>
          <h1 className="font-display text-2xl sm:text-3xl text-white">攻略評分儀表板</h1>
          <div className="flex items-center gap-3 mt-4 justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan" />
            <span className="text-neon-cyan text-sm">♥</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan" />
          </div>
        </motion.div>

        {/* Stats overview */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatBlock label="已攻略" value={`${conqueredCount} / 4`} color="#00f5d4" />
          <StatBlock label="平均好感" value={avgAffection !== null ? String(avgAffection) : "—"} color="#ff2d78" />
          <StatBlock label="最高分" value={bestChar ? bestChar.name : "—"} color="#b845f5" />
        </motion.div>

        {/* Character cards */}
        <div className="flex flex-col gap-4 mb-8">
          {charStats.map(({ character, data }, i) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <CharacterCard character={character} data={data} />
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <motion.div
          className="mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="ghost"
            onClick={() => dispatch({ type: "BACK_TO_HOME_FROM_DASHBOARD" })}
            className="w-full text-center"
          >
            ← 返回標題畫面
          </Button>
        </motion.div>

      </div>
    </ScreenWrapper>
  );
}
