import { ScreenWrapper } from "../components/layout/ScreenWrapper.jsx";
import { CharacterAvatar } from "../components/character/CharacterAvatar.jsx";
import { Button } from "../components/ui/Button.jsx";
import { getCharacterById } from "../constants/characters.js";
import { DEMO_QUESTIONS } from "../constants/demoQuestions.js";
import { useHistory } from "../hooks/useHistory.js";

export function CharacterQAScreen({ state, dispatch }) {
  const { selectedCharacterId, playerName } = state;
  const character = getCharacterById(selectedCharacterId);
  const { getPlayerHistory } = useHistory(playerName);
  const charHistory = getPlayerHistory()[selectedCharacterId];
  const previewQuestions = (DEMO_QUESTIONS[selectedCharacterId] ?? []).slice(0, 3);

  if (!character) return null;

  return (
    <ScreenWrapper screenKey="character-qa">
      <div
        className="min-h-screen flex flex-col px-4 py-10 max-w-2xl mx-auto"
        style={{ "--char-color": character.color.primary }}
      >
        {/* Character info */}
        <div className="flex items-center gap-4 mb-6">
          <CharacterAvatar character={character} size={80} />
          <div>
            <h1 className="font-body font-extrabold text-3xl text-white">{character.name}</h1>
            <div className="font-mono text-sm mt-1" style={{ color: character.color.primary }}>
              {character.specialty}
            </div>
          </div>
        </div>

        {/* History */}
        <div
          className="mb-6 p-4 rounded-xl border"
          style={{ borderColor: character.color.border, backgroundColor: character.color.secondary }}
        >
          <h2 className="font-mono text-sm text-gray-400 mb-2">歷史紀錄</h2>
          {charHistory ? (
            <div>
              <div className="font-body text-white">好感度：{charHistory.affection}</div>
              <div className="font-body text-sm text-gray-400 mt-1">
                上次遊玩：{new Date(charHistory.lastPlayed).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="font-body text-gray-500">尚未挑戰過</div>
          )}
        </div>

        {/* Question preview */}
        <div className="mb-8">
          <h2 className="font-mono text-sm text-gray-400 mb-3">題目預覽</h2>
          <ol className="flex flex-col gap-3">
            {previewQuestions.map((q, i) => (
              <li key={q.id} className="flex gap-3 p-3 rounded-lg bg-dark-card border border-dark-border">
                <span className="font-mono text-xs text-gray-500 pt-0.5 shrink-0">Q{i + 1}</span>
                <span className="font-body text-sm text-gray-300">{q.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="ghost" onClick={() => dispatch({ type: "BACK_FROM_CHARACTER_QA" })}>
            返回
          </Button>
          <Button
            variant="primary"
            charColor={character.color.primary}
            onClick={() => dispatch({ type: "SELECT_CHARACTER", payload: selectedCharacterId })}
          >
            開始挑戰！
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
