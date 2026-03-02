import { motion, AnimatePresence } from "framer-motion";

export function FloatingEffect({ delta, show, combo }) {
  const isPositive = delta > 0;
  const isCombo    = combo > 0 && combo % 3 === 0;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute right-4 top-1/2 pointer-events-none z-50 flex flex-col items-center gap-1"
          initial={{ opacity: 1, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -80, scale: 1.4 }}
          exit={{}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`font-mono font-bold text-2xl ${isPositive ? "text-emerald-400" : "text-red-400"}`}
            style={{ textShadow: isPositive ? "0 0 12px #22c55e" : "0 0 12px #ef4444" }}
          >
            {isPositive ? `+${delta}` : delta}
          </span>
          <span className="text-lg">{isPositive ? "💕" : "💔"}</span>

          {isCombo && isPositive && (
            <motion.span
              className="font-mono text-xs text-yellow-400 font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", bounce: 0.6 }}
            >
              {combo} 連擊!! ⚡
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
