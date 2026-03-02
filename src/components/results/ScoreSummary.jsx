import { motion } from "framer-motion";
import { PASS_THRESHOLD, QUESTION_COUNT } from "../../constants/env.js";

export function ScoreSummary({ score, affection, color }) {
  const passed     = score >= PASS_THRESHOLD;
  const pct        = Math.round((score / QUESTION_COUNT) * 100);
  const affPct     = Math.round(affection);

  const grade = pct >= 90 ? "S" : pct >= 70 ? "A" : pct >= 50 ? "B" : pct >= 30 ? "C" : "D";
  const gradeColor = pct >= 90 ? "#f5d020" : pct >= 70 ? color : pct >= 50 ? "#60a5fa" : "#9ca3af";

  return (
    <motion.div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: color + "40", backgroundColor: "rgba(13,13,26,0.9)" }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* Pass/fail banner */}
      <div
        className="px-4 py-2 text-center font-mono text-base font-bold"
        style={{
          backgroundColor: passed ? "#22c55e20" : "#ef444420",
          color:           passed ? "#22c55e"   : "#ef4444",
          borderBottom:    `1px solid ${passed ? "#22c55e40" : "#ef444440"}`,
        }}
      >
        {passed ? "★ 闖關成功 ★" : "— 闖關失敗 —"}
      </div>

      <div className="p-6">
        {/* Grade */}
        <div className="text-center mb-6">
          <motion.div
            className="font-display text-6xl mb-1"
            style={{ color: gradeColor, textShadow: `0 0 30px ${gradeColor}` }}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          >
            {grade}
          </motion.div>
          <div className="font-mono text-base text-gray-500">評級</div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatBlock label="答對題數" value={`${score} / ${QUESTION_COUNT}`} color={color} delay={0.3} />
          <StatBlock label="正確率" value={`${pct}%`} color={color} delay={0.4} />
          <StatBlock label="好感度" value={`${affPct}`} color={color} delay={0.5} suffix="♥" />
          <StatBlock label="通關" value={passed ? "達成" : "未達"} color={passed ? "#22c55e" : "#ef4444"} delay={0.6} />
        </div>
      </div>
    </motion.div>
  );
}

function StatBlock({ label, value, color, delay, suffix }) {
  return (
    <motion.div
      className="rounded-xl p-3 text-center"
      style={{ backgroundColor: color + "10", border: `1px solid ${color}25` }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
    >
      <div className="font-mono text-base text-gray-500 mb-1">{label}</div>
      <div className="font-mono font-bold text-2xl" style={{ color }}>
        {value}{suffix && <span className="ml-1 text-base">{suffix}</span>}
      </div>
    </motion.div>
  );
}
