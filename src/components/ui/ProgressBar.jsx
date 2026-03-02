import { motion } from "framer-motion";

export function ProgressBar({ value, max, color = "#00f5d4", className = "", animated = true }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={`w-full h-2 bg-dark-border rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={animated ? { width: "0%" } : false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
