import { motion } from "framer-motion";
import { CharacterAvatar } from "../character/CharacterAvatar.jsx";
import { HeartParticles }  from "../ui/HeartParticles.jsx";
import { TypewriterText }  from "../ui/TypewriterText.jsx";
import { getConfessionTier } from "../../hooks/useAffection.js";

const TIER_CONFIG = {
  s: {
    badge:      "💕 完美告白 · S 級結局 💕",
    heartCount: 30,
    glowOpacity: "45",
    particleSize: "large",
  },
  a: {
    badge:      "★ 告白結局 解鎖 ★",
    heartCount: 20,
    glowOpacity: "30",
    particleSize: "normal",
  },
};

export function ConfessionScene({ character, affection, onClose }) {
  const tier   = getConfessionTier(affection ?? 80);
  const line   = character.confessionTiers?.[tier] ?? character.confessionLine;
  const config = TIER_CONFIG[tier];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heart particles */}
      <HeartParticles color={character.color.primary} count={config.heartCount} />

      {/* Radial glow behind avatar */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:  `radial-gradient(circle, ${character.color.primary}20 0%, transparent 70%)`,
          filter:      "blur(30px)",
        }}
      />

      {/* Avatar zoom-in — sprite style, no circular crop */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 40 }}
        animate={{ scale: 1,   opacity: 1, y: 0  }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.35 }}
        className="relative z-10 mb-4"
        style={{ "--char-color": character.color.primary }}
      >
        {/* Neon glow behind portrait */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width:      "280px",
            height:     "160px",
            background: `radial-gradient(ellipse at bottom, ${character.color.primary}${config.glowOpacity} 0%, transparent 70%)`,
            filter:     "blur(20px)",
          }}
        />
        <CharacterAvatar character={character} size={300} variant="sprite" className="relative" />
      </motion.div>

      {/* Tier badge */}
      <motion.div
        className="relative z-10 mb-3 font-display text-sm text-center tracking-widest"
        style={{ color: character.color.primary, textShadow: `0 0 20px ${character.color.primary}` }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {config.badge}
      </motion.div>

      {/* Character name */}
      <motion.div
        className="relative z-10 font-body font-black text-4xl text-white mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        {character.name}
        <span className="font-mono text-lg ml-3 font-normal" style={{ color: character.color.primary }}>
          {character.nameJp}
        </span>
      </motion.div>

      {/* Confession text */}
      <motion.div
        className="relative z-10 max-w-md text-center px-6 py-4 rounded-xl mb-6"
        style={{
          backgroundColor: character.color.primary + "12",
          border:          `1px solid ${character.color.primary}30`,
          backdropFilter:  "blur(12px)",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3 }}
      >
        <p className="font-body text-gray-100 text-base leading-relaxed italic">
          <TypewriterText text={`"${line}"`} speed={28} />
        </p>
      </motion.div>

      {/* Close button */}
      <motion.button
        className="relative z-10 font-mono text-sm px-6 py-2 rounded-lg border transition-colors"
        style={{ borderColor: character.color.primary + "60", color: character.color.primary }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05, backgroundColor: character.color.primary + "20" }}
        whileTap={{ scale: 0.97 }}
      >
        ← 繼續
      </motion.button>
    </motion.div>
  );
}
