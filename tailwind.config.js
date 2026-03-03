/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "neon-pink":   "#ff2d78",
        "neon-cyan":   "#00f5d4",
        "neon-purple": "#b845f5",
        "neon-amber":  "#f5a623",
        "dark-base":   "#0d0d1a",
        "dark-card":   "#1a1a2e",
        "dark-panel":  "#16213e",
        "dark-border": "#2a2a4a",
      },
      fontFamily: {
        display: ["'Press Start 2P'", "monospace"],
        body:    ["'M PLUS Rounded 1c'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        floatUp: {
          "0%":   { opacity: "1", transform: "translateY(0) scale(0.8)" },
          "80%":  { opacity: "1", transform: "translateY(-60px) scale(1.4)" },
          "100%": { opacity: "0", transform: "translateY(-80px) scale(0.9)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%":      { transform: "scale(1.35)" },
          "50%":      { transform: "scale(1)" },
          "75%":      { transform: "scale(1.15)" },
        },
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        glitch: {
          "0%":   { clipPath: "inset(40% 0 61% 0)", transform: "translate(-4px,0)" },
          "20%":  { clipPath: "inset(92% 0 1% 0)",  transform: "translate(4px,0)" },
          "40%":  { clipPath: "inset(43% 0 1% 0)",  transform: "translate(-2px,0)" },
          "60%":  { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px,0)" },
          "80%":  { clipPath: "inset(54% 0 7% 0)",  transform: "translate(-4px,0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(0,0)" },
        },
        neonPulse: {
          "0%, 100%": { opacity: "0.7" },
          "50%":      { opacity: "1" },
        },
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        spin3d: {
          "0%":   { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },
      animation: {
        "float-up":   "floatUp 1.2s ease-out forwards",
        "heartbeat":  "heartbeat 0.6s ease-in-out",
        "scanline":   "scanline 6s linear infinite",
        "glitch":     "glitch 0.3s steps(2) infinite",
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "blink":      "blink 1s step-end infinite",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,245,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
      boxShadow: {
        "neon-cyan":   "0 0 8px #00f5d4, 0 0 20px #00f5d430",
        "neon-pink":   "0 0 8px #ff2d78, 0 0 20px #ff2d7830",
        "neon-purple": "0 0 8px #b845f5, 0 0 20px #b845f530",
        "neon-amber":  "0 0 8px #f5a623, 0 0 20px #f5a62330",
        "card":        "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};
