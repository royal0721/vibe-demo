import { motion } from "framer-motion";

const DIFFICULTY_COLORS = {
  easy:   { bg: "bg-emerald-900/40", text: "text-emerald-400", border: "border-emerald-700/50" },
  medium: { bg: "bg-amber-900/40",   text: "text-amber-400",   border: "border-amber-700/50" },
  hard:   { bg: "bg-red-900/40",     text: "text-red-400",     border: "border-red-700/50" },
};

const DIFFICULTY_LABELS = { easy: "簡單", medium: "普通", hard: "困難" };

export function QuestionBox({ question, questionNumber, total, color }) {
  const difficulty = question.difficulty?.toLowerCase() ?? "easy";
  const dc = DIFFICULTY_COLORS[difficulty] ?? DIFFICULTY_COLORS.easy;

  return (
    <motion.div
      className="rounded-xl border p-6"
      style={{
        borderColor:     color + "40",
        backgroundColor: "rgba(13,13,26,0.85)",
        backdropFilter:  "blur(8px)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      key={question.id}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-base text-gray-500">
          第 {questionNumber} 題　共 {total} 題
        </span>
        <span className={`font-mono text-base px-2 py-0.5 rounded border ${dc.bg} ${dc.text} ${dc.border}`}>
          {DIFFICULTY_LABELS[difficulty] ?? difficulty}
        </span>
      </div>

      <p className="font-body text-xl font-semibold text-gray-100 leading-relaxed">
        {question.text}
      </p>
    </motion.div>
  );
}
