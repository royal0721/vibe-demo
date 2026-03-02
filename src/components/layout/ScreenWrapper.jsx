import { motion } from "framer-motion";

export function ScreenWrapper({ children, screenKey }) {
  return (
    <motion.div
      key={screenKey}
      className="relative min-h-screen w-full"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
