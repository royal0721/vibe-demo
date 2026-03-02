import { motion } from "framer-motion";
import { CharacterAvatar } from "../character/CharacterAvatar.jsx";
import { TypewriterText }  from "../ui/TypewriterText.jsx";
export function CommentBubble({ character, grade }) {
  const comment = character.finalComment[grade] ?? character.finalComment.d;

  return (
    <motion.div
      className="flex items-end gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      <div className="flex-shrink-0">
        <CharacterAvatar character={character} size={56} />
      </div>

      <div
        className="relative px-4 py-3 rounded-xl rounded-bl-none text-base font-body text-gray-100 leading-relaxed flex-1"
        style={{
          backgroundColor: character.color.primary + "15",
          border:          `1px solid ${character.color.primary}40`,
          backdropFilter:  "blur(8px)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
          style={{ backgroundColor: character.color.primary }}
        />
        <div className="pl-2 min-h-[5rem]">
          <TypewriterText text={comment} speed={25} />
        </div>
      </div>
    </motion.div>
  );
}
