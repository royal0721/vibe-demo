import { motion } from "framer-motion";

export function SkipHint({ onSkip }) {
  return (
    <motion.button
      className="absolute top-4 right-4 font-mono text-sm text-gray-500 hover:text-gray-300 transition-colors px-3 py-1 border border-dark-border rounded-lg"
      onClick={onSkip}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      跳過 &gt;&gt;
    </motion.button>
  );
}
