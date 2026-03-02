import { motion, AnimatePresence } from "framer-motion";
import { CharacterAvatar } from "../character/CharacterAvatar.jsx";

export function ReactionBubble({ character, text, isCorrect, visible }) {
  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          className="flex items-end gap-3"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <CharacterAvatar character={character} size={52} className="flex-shrink-0 mb-1" />

          <div
            className="relative px-5 py-4 rounded-xl rounded-bl-none text-lg font-body text-gray-100 leading-snug max-w-[80%]"
            style={{
              backgroundColor:   character.color.primary + "18",
              border:            `1px solid ${character.color.primary}40`,
              backdropFilter:    "blur(8px)",
            }}
          >
            {/* Correct/wrong stripe */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
              style={{ backgroundColor: isCorrect ? "#22c55e" : "#ef4444" }}
            />

            <div className="pl-2">
              <span className="mr-2">{isCorrect ? "✨" : "💢"}</span>
              {text}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
