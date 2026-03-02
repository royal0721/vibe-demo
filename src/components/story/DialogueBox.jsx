import { motion } from "framer-motion";
import { CharacterAvatar } from "../character/CharacterAvatar.jsx";
import { TypewriterText }  from "../ui/TypewriterText.jsx";

export function DialogueBox({ character, text, onTextComplete }) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Name plate */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-t-lg mb-0"
        style={{ backgroundColor: character.color.primary + "30", borderTop: `2px solid ${character.color.primary}` }}
      >
        <CharacterAvatar character={character} size={32} className="rounded-full" />
        <span className="font-mono text-lg font-bold" style={{ color: character.color.primary }}>
          {character.name}
        </span>
        <span className="font-mono text-base text-gray-500">{character.nameJp}</span>
      </div>

      {/* Dialogue box */}
      <div
        className="relative rounded-b-xl rounded-tr-xl p-5 border"
        style={{
          backgroundColor:   "rgba(13,13,26,0.92)",
          borderColor:       character.color.primary + "50",
          backdropFilter:    "blur(12px)",
          boxShadow:         `0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 ${character.color.primary}15`,
        }}
      >
        <p className="font-body text-2xl text-gray-100 leading-relaxed min-h-[5rem]">
          <TypewriterText
            text={text}
            speed={22}
            onComplete={onTextComplete}
          />
        </p>

        {/* Tap hint arrow */}
        <div className="flex justify-end mt-3">
          <span className="font-mono text-base text-gray-500 animate-blink">▼ 點擊繼續</span>
        </div>
      </div>
    </motion.div>
  );
}
