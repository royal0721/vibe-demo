import { AnimatePresence } from "framer-motion";
import { Background }              from "./components/layout/Background.jsx";
import { HomeScreen }              from "./screens/HomeScreen.jsx";
import { CharacterSelectScreen }   from "./screens/CharacterSelectScreen.jsx";
import { StoryScreen }             from "./screens/StoryScreen.jsx";
import { QuizScreen }              from "./screens/QuizScreen.jsx";
import { ResultsScreen }           from "./screens/ResultsScreen.jsx";
import { useGameState }            from "./hooks/useGameState.js";
import { CHARACTERS, buildDiceBearUrl } from "./constants/characters.js";

export default function App() {
  const { state, dispatch } = useGameState();

  const screens = {
    HOME:             <HomeScreen dispatch={dispatch} />,
    CHARACTER_SELECT: <CharacterSelectScreen state={state} dispatch={dispatch} />,
    STORY:            <StoryScreen state={state} dispatch={dispatch} />,
    QUIZ:             <QuizScreen  state={state} dispatch={dispatch} />,
    RESULTS:          <ResultsScreen state={state} dispatch={dispatch} />,
  };

  return (
    <div className="relative min-h-screen bg-dark-base overflow-x-hidden">
      {/* Global background effects */}
      <Background />

      {/* Pre-load all DiceBear avatars as hidden images */}
      <div className="sr-only" aria-hidden="true">
        {CHARACTERS.map((c) => (
          <img key={c.id} src={buildDiceBearUrl(c, 200)} alt="" />
        ))}
      </div>

      {/* Screen router with animated transitions */}
      <AnimatePresence mode="wait">
        {screens[state.screen]}
      </AnimatePresence>
    </div>
  );
}
