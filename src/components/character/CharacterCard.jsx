import { motion } from "framer-motion";
import { CharacterAvatar } from "./CharacterAvatar.jsx";

export function CharacterCard({ character, onSelect, historyEntry, isSelected = false }) {
  const { color } = character;
  const affection       = historyEntry?.affection ?? 0;
  const confession      = historyEntry?.confessionUnlocked ?? false;
  const hasPlayed       = !!historyEntry;

  const affectionPct    = Math.round(affection);
  const affectionBars   = Math.round((affection / 100) * 5);

  return (
    <motion.div
      className="card-shimmer relative rounded-2xl border cursor-pointer overflow-hidden select-none h-full"
      style={{
        borderColor:     isSelected ? color.primary : color.border,
        backgroundColor: color.secondary,
        boxShadow:       isSelected ? color.glow : "none",
        "--char-color":  color.primary,
      }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: color.glow }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(character.id)}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Confession badge */}
      {confession && (
        <div
          className="absolute top-2 right-2 z-10 text-xs font-mono px-2 py-0.5 rounded-full"
          style={{ backgroundColor: color.primary + "30", color: color.primary, border: `1px solid ${color.primary}60` }}
        >
          ♥ 已通關
        </div>
      )}

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${character.gradient} pointer-events-none`} />

      <div className="relative p-5 flex flex-col items-center gap-3 h-full justify-between">
        {/* Avatar */}
        <div
          className={`rounded-full p-1 ${isSelected ? "neon-border-pulse" : ""}`}
          style={{ backgroundColor: color.primary + "20" }}
        >
          <CharacterAvatar character={character} size={120} />
        </div>

        {/* Name & specialty */}
        <div className="text-center">
          <div className="font-body font-extrabold text-3xl text-white leading-tight">
            {character.name}
          </div>
          <div className="font-mono text-lg mt-0.5" style={{ color: color.primary }}>
            {character.specialtyLabel}
          </div>
        </div>

        {/* Tagline */}
        <p className="font-body text-gray-400 text-lg text-center leading-snug px-1">
          {character.tagline}
        </p>

        {/* Affection history */}
        <div className="w-full mt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-sm text-gray-500">
              好感度
            </span>
            <span className="font-mono text-sm" style={{ color: color.primary }}>
              {hasPlayed ? `${affectionPct}%` : "—"}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-dark-border overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color.primary }}
              initial={{ width: "0%" }}
              animate={{ width: hasPlayed ? `${affectionPct}%` : "0%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          {/* Heart pips */}
          <div className="flex gap-1 mt-2 justify-center">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="text-sm transition-opacity duration-300"
                style={{
                  color:   i < affectionBars ? color.primary : "#2a2a4a",
                  opacity: i < affectionBars ? 1 : 0.3,
                }}
              >
                ♥
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
