import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper }     from "../components/layout/ScreenWrapper.jsx";
import { ScoreSummary }      from "../components/results/ScoreSummary.jsx";
import { CommentBubble }     from "../components/results/CommentBubble.jsx";
import { ConfessionScene }   from "../components/results/ConfessionScene.jsx";
import { Button }            from "../components/ui/Button.jsx";
import { getCharacterById }  from "../constants/characters.js";
import { useHistory }        from "../hooks/useHistory.js";
import { submitResult }      from "../services/gasApi.js";
import { getScoreGrade }     from "../hooks/useAffection.js";
import { QUESTION_COUNT }    from "../constants/env.js";

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
  const grade     = getScoreGrade(score, QUESTION_COUNT);
  // Confession only triggers on S or A grade (AND affection threshold met)
  const confessionEligible = confessionUnlocked && (grade === "s" || grade === "a");
  const { saveResult } = useHistory(playerName);

  const [showConfession,      setShowConfession]     = useState(false);
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
      })
      .catch((err) => {
        dispatch({ type: "SUBMISSION_ERROR", payload: err.message });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show confession after a short delay if eligible (score A/S + affection threshold)
  useEffect(() => {
    if (confessionEligible) {
      const t = setTimeout(() => setShowConfession(true), 1200);
      return () => clearTimeout(t);
    }
  }, [confessionEligible]);

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
          <div className="font-mono text-base text-gray-500 tracking-widest mb-1">結果</div>
          <h1 className="font-body font-extrabold text-4xl text-white">
            {confessionEligible ? "💕 告白成功 💕" : "闖關結果"}
          </h1>
        </motion.div>

        {/* Submission status — always reserves space to prevent layout shift */}
        <div className="mb-4 min-h-[2.5rem] flex items-center justify-center">
          {submissionError && (
            <motion.div
              className="w-full p-3 rounded-lg border border-amber-700/50 bg-amber-900/20 font-mono text-base text-amber-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ⚠ 成績上傳失敗（已儲存於本機）
            </motion.div>
          )}
          {isSubmitting && !submissionError && (
            <motion.div
              className="font-mono text-sm text-gray-600 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              儲存結果中...
            </motion.div>
          )}
        </div>

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
          <CommentBubble character={character} grade={grade} />
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
          tier={grade}
          onClose={() => setShowConfession(false)}
        />
      )}
    </ScreenWrapper>
  );
}
