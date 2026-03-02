import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper }  from "../components/layout/ScreenWrapper.jsx";
import { DialogueBox }    from "../components/story/DialogueBox.jsx";
import { SkipHint }       from "../components/story/SkipHint.jsx";
import { CharacterAvatar } from "../components/character/CharacterAvatar.jsx";
import { getCharacterById } from "../constants/characters.js";

export function StoryScreen({ state, dispatch }) {
  const character    = getCharacterById(state.selectedCharacterId);
  const dialogues    = character?.openingDialogue ?? [];
  const [lineIdx, setLineIdx]     = useState(0);
  const [, setTextDone]           = useState(false);

  const advance = useCallback(() => {
    if (lineIdx < dialogues.length - 1) {
      setLineIdx((i) => i + 1);
      setTextDone(false);
    } else {
      dispatch({ type: "START_QUIZ" });
    }
  }, [lineIdx, dialogues.length, dispatch]);

  // Any key / click to advance
  useEffect(() => {
    function handleKey(e) {
      if (["Enter", " ", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        advance();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [advance]);

  if (!character) {
    dispatch({ type: "RESET_GAME" });
    return null;
  }

  return (
    <ScreenWrapper screenKey="story">
      <div
        className="min-h-screen flex flex-col cursor-pointer select-none"
        onClick={advance}
        style={{ "--char-color": character.color.primary }}
      >
        {/* Skip button */}
        <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
          <SkipHint onSkip={() => dispatch({ type: "START_QUIZ" })} />
        </div>

        {/* Character sprite area — VN portrait style */}
        <div className="flex-1 flex items-center justify-center px-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1,   y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Atmospheric bottom glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width:      "320px",
                height:     "200px",
                background: `radial-gradient(ellipse at bottom, ${character.color.primary}35 0%, transparent 70%)`,
                filter:     "blur(16px)",
              }}
            />

            {/* Portrait image */}
            <CharacterAvatar
              character={character}
              size={420}
              variant="sprite"
              className="relative drop-shadow-2xl"
            />

            {/* Character name tag — below portrait */}
            <motion.div
              className="mt-3 text-center pointer-events-none"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="inline-block px-4 py-1.5 rounded-lg"
                style={{
                  backgroundColor: "rgba(13,13,26,0.75)",
                  backdropFilter:  "blur(8px)",
                  border:          `1px solid ${character.color.primary}40`,
                }}
              >
                <span className="font-body font-extrabold text-3xl text-white mr-2">
                  {character.name}
                </span>
                <span className="font-mono text-base" style={{ color: character.color.primary }}>
                  {character.specialtyLabel}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Dialogue area */}
        <motion.div
          className="px-4 pb-6 mb-12 max-w-lg mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <DialogueBox
            character={character}
            text={dialogues[lineIdx] ?? ""}
            onTextComplete={() => setTextDone(true)}
          />

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {dialogues.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i <= lineIdx ? character.color.primary : "#2a2a4a",
                  transform:       i === lineIdx ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}
