import { motion, AnimatePresence } from "framer-motion";
import { CharacterAvatar } from "../character/CharacterAvatar.jsx";
import { TypewriterText }  from "../ui/TypewriterText.jsx";

export function ReactionBubble({ character, text, isCorrect, visible }) {
  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          className="flex items-end gap-4"
          initial={{ opacity: 0, y: 16, scale: 0.93 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.05 }}
            >
              <CharacterAvatar character={character} size={64} />
            </motion.div>
            <span
              className="font-mono text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ color: character.color.primary, backgroundColor: character.color.primary + "18" }}
            >
              {character.name}
            </span>
          </div>

          {/* Bubble */}
          <div
            className="relative px-5 py-4 rounded-2xl rounded-bl-none flex-1"
            style={{
              backgroundColor: character.color.primary + "14",
              border:          `1px solid ${character.color.primary}45`,
              backdropFilter:  "blur(10px)",
              boxShadow:       `0 4px 20px ${character.color.primary}18`,
            }}
          >
            {/* Left accent stripe */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
              style={{ backgroundColor: isCorrect ? "#22c55e" : "#ef4444" }}
            />

            {/* Correct / wrong icon */}
            <div className="pl-3">
              <span className="mr-2 text-lg">{isCorrect ? "✨" : "💢"}</span>
              <span className="font-body text-lg text-gray-100 leading-relaxed">
                <TypewriterText key={text} text={text} speed={28} />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
