import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper } from "../components/layout/ScreenWrapper.jsx";
import { CharacterCard } from "../components/character/CharacterCard.jsx";
import { CharacterAvatar } from "../components/character/CharacterAvatar.jsx";
import { Button } from "../components/ui/Button.jsx";
import { CHARACTERS } from "../constants/characters.js";
import { useHistory } from "../hooks/useHistory.js";
import { fetchQuestions } from "../services/gasApi.js";
import { QUESTION_COUNT, GAS_URL } from "../constants/env.js";

export function CharacterSelectScreen({ state, dispatch }) {
  const { playerName, loadingQuestions, questionsError, selectedCharacterId } =
    state;
  const { getPlayerHistory } = useHistory(playerName);
  const history = getPlayerHistory();

  // Once character is selected and questions are loaded, go to story
  const prevLoading = useRef(false);
  useEffect(() => {
    if (
      prevLoading.current &&
      !loadingQuestions &&
      !questionsError &&
      selectedCharacterId
    ) {
      dispatch({ type: "START_STORY" });
    }
    prevLoading.current = loadingQuestions;
  }, [loadingQuestions, questionsError, selectedCharacterId, dispatch]);

  async function handleSelect(characterId) {
    dispatch({ type: "SELECT_CHARACTER", payload: characterId });
    try {
      const questions = await fetchQuestions(characterId, QUESTION_COUNT);
      dispatch({ type: "QUESTIONS_LOADED", payload: questions });
    } catch (err) {
      dispatch({ type: "QUESTIONS_ERROR", payload: err.message });
    }
  }

  return (
    <ScreenWrapper screenKey="character-select">
      <div className="min-h-screen px-4 py-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="font-mono text-sm text-gray-500 tracking-widest mb-1">
            歡迎，<span className="text-neon-cyan">{playerName}</span>
          </div>
          <h1 className="font-body font-extrabold text-3xl text-white">
            選擇你的攻略對象
          </h1>
          <p className="font-body text-base text-gray-500 mt-1">
            每位帥哥都有不同的 CTF 問題類型
          </p>
        </motion.div>

        {/* Error message */}
        {questionsError && (
          <motion.div
            className="mb-4 p-3 rounded-lg border border-red-700/50 bg-red-900/20 font-mono text-sm text-red-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠ 題目載入失敗：{questionsError}
            <br />
            <span className="text-gray-500">
              請確認 .env 中的 VITE_GAS_URL 設定是否正確
            </span>
          </motion.div>
        )}

        {/* Character grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {CHARACTERS.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <CharacterCard
                character={char}
                onSelect={handleSelect}
                historyEntry={history[char.id]}
                isSelected={selectedCharacterId === char.id}
              />
            </motion.div>
          ))}
        </div>

        {/* Loading state */}
        {loadingQuestions && selectedCharacterId && (
          <motion.div
            className="text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center gap-2 font-mono text-sm text-gray-500">
              <div className="flex gap-1">
                <span className="load-dot w-2 h-2 bg-neon-cyan rounded-full" />
                <span className="load-dot w-2 h-2 bg-neon-cyan rounded-full" />
                <span className="load-dot w-2 h-2 bg-neon-cyan rounded-full" />
              </div>
              題目載入中...
            </div>
          </motion.div>
        )}

        {/* Back button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => dispatch({ type: "RESET_GAME" })}
          >
            ← 返回標題畫面
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
