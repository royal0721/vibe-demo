import { motion } from "framer-motion";

export function Button({ children, onClick, variant = "primary", disabled = false, className = "", charColor }) {
  const base = "font-body font-bold rounded-lg transition-all duration-200 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary:   "px-6 py-3 bg-transparent border-2 text-sm tracking-wide",
    secondary: "px-4 py-2 bg-dark-card border border-dark-border text-gray-300 hover:border-gray-500 text-sm",
    ghost:     "px-4 py-2 bg-transparent text-gray-400 hover:text-white text-sm",
    danger:    "px-6 py-3 bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-500/10 text-sm",
  };

  const style = charColor
    ? { borderColor: charColor, color: charColor, "--char-color": charColor }
    : {};

  const primaryStyle = variant === "primary" && !charColor
    ? { borderColor: "#00f5d4", color: "#00f5d4" }
    : {};

  return (
    <motion.button
      className={`${base} ${variants[variant]} ${className}`}
      style={{ ...primaryStyle, ...style }}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {children}
    </motion.button>
  );
}
