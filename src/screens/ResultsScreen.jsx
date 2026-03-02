import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper }     from "../components/layout/ScreenWrapper.jsx";
import { ScoreSummary }      from "../components/results/ScoreSummary.jsx";
import { CommentBubble }     from "../components/results/CommentBubble.jsx";
import { ConfessionScene }   from "../components/results/ConfessionScene.jsx";
import { CharacterAvatar }   from "../components/character/CharacterAvatar.jsx";
import { Button }            from "../components/ui/Button.jsx";
import { getCharacterById }  from "../constants/characters.js";
import { useHistory }        from "../hooks/useHistory.js";
import { submitResult }      from "../services/gasApi.js";

export function ResultsScreen({ state, dispatch }) {
  const {
    selectedCharacterId,
    playerName,
    score,
    affection,
    confessionUnlocked,
    isSubmitting,
    submissionError,
  } = state;

  const character = getCharacterById(selectedCharacterId);
  const { saveResult } = useHistory(playerName);

  const [showConfession,     setShowConfession]    = useState(false);
  const [submissionDone,     setSubmissionDone]    = useState(false);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  // Save to localStorage and submit to GAS on mount
  useEffect(() => {
    if (!character || submissionAttempted) return;
    setSubmissionAttempted(true);

    // Save locally immediately
    saveResult(selectedCharacterId, affection, confessionUnlocked);

    // Submit to GAS (non-blocking — errors shown as banner)
    dispatch({ type: "SET_SUBMITTING", payload: true });
    submitResult({ playerName, characterId: selectedCharacterId, score, affection, confessionUnlocked })
      .then(() => {
        dispatch({ type: "SUBMISSION_SUCCESS" });
        setSubmissionDone(true);
      })
      .catch((err) => {
        dispatch({ type: "SUBMISSION_ERROR", payload: err.message });
        setSubmissionDone(true);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show confession after a short delay if unlocked
  useEffect(() => {
    if (confessionUnlocked) {
      const t = setTimeout(() => setShowConfession(true), 1200);
      return () => clearTimeout(t);
    }
  }, [confessionUnlocked]);

  if (!character) {
    dispatch({ type: "RESET_GAME" });
    return null;
  }

  return (
    <ScreenWrapper screenKey="results">
      <div
        className="min-h-screen flex flex-col px-4 py-8 max-w-lg mx-auto"
        style={{ "--char-color": character.color.primary }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="font-mono text-sm text-gray-500 tracking-widest mb-1">結果</div>
          <h1 className="font-body font-extrabold text-3xl text-white">
            {confessionUnlocked ? "💕 告白成功 💕" : "闖關結果"}
          </h1>
        </motion.div>

        {/* Submission status */}
        {submissionError && (
          <motion.div
            className="mb-4 p-3 rounded-lg border border-amber-700/50 bg-amber-900/20 font-mono text-sm text-amber-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠ 成績上傳失敗（已儲存於本機）。{submissionError}
          </motion.div>
        )}
        {isSubmitting && (
          <motion.div
            className="mb-4 font-mono text-sm text-gray-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            儲存結果中...
          </motion.div>
        )}

        {/* Score summary */}
        <div className="mb-4">
          <ScoreSummary
            score={score}
            affection={affection}
            color={character.color.primary}
          />
        </div>

        {/* Character comment */}
        <div className="mb-6">
          <CommentBubble character={character} affection={affection} />
        </div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3 mt-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            onClick={() => dispatch({ type: "BACK_TO_CHARACTER_SELECT" })}
            charColor={character.color.primary}
            className="w-full text-center"
          >
            ← 選擇其他角色
          </Button>
          <Button
            variant="ghost"
            onClick={() => dispatch({ type: "RESET_GAME" })}
            className="w-full text-center"
          >
            返回標題畫面
          </Button>
        </motion.div>
      </div>

      {/* Confession ending overlay */}
      {showConfession && (
        <ConfessionScene
          character={character}
          onClose={() => setShowConfession(false)}
        />
      )}
    </ScreenWrapper>
  );
}
