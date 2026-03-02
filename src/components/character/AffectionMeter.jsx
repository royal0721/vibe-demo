import { motion, AnimatePresence } from "framer-motion";

export function AffectionMeter({ affection, color = "#00f5d4", showDelta, delta }) {
  const pct = Math.max(0, Math.min(100, affection));

  return (
    <div className="relative flex items-center gap-2 w-full">
      {/* Heart icon */}
      <span
        className="text-lg flex-shrink-0 animate-heartbeat"
        style={{ color, filter: `drop-shadow(0 0 4px ${color})` }}
        aria-hidden="true"
      >
        ♥
      </span>

      {/* Bar */}
      <div className="flex-1 h-3 bg-dark-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Shimmer gleam */}
          <div
            className="absolute inset-y-0 right-0 w-4 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${color}80)` }}
          />
        </motion.div>
      </div>

      {/* Value */}
      <span className="font-mono text-xs font-bold w-10 text-right flex-shrink-0" style={{ color }}>
        {Math.round(pct)}
      </span>

      {/* Delta float */}
      <AnimatePresence>
        {showDelta && delta !== 0 && (
          <motion.span
            className="absolute right-0 font-bold font-mono text-sm pointer-events-none"
            style={{ color: delta > 0 ? "#22c55e" : "#ef4444", top: "-1.5rem" }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {delta > 0 ? `+${delta}` : delta}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
