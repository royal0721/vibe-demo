import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper }   from "../components/layout/ScreenWrapper.jsx";
import { CharacterAvatar } from "../components/character/CharacterAvatar.jsx";
import { AffectionMeter }  from "../components/character/AffectionMeter.jsx";
import { QuestionBox }     from "../components/quiz/QuestionBox.jsx";
import { AnswerOptions }   from "../components/quiz/AnswerOptions.jsx";
import { TimerBar }        from "../components/quiz/TimerBar.jsx";
import { ReactionBubble }  from "../components/quiz/ReactionBubble.jsx";
import { FloatingEffect }  from "../components/quiz/FloatingEffect.jsx";
import { getCharacterById } from "../constants/characters.js";
import { calculateAffectionDelta } from "../hooks/useAffection.js";

const REACTION_DELAY = 2200; // ms before auto-advancing

export function QuizScreen({ state, dispatch }) {
  const {
    selectedCharacterId,
    questions,
    currentQuestionIndex,
    affection,
    combo,
    score,
  } = state;

  const character = getCharacterById(selectedCharacterId);
  const question  = questions[currentQuestionIndex];

  const [selected,        setSelected]        = useState(null);
  const [answered,        setAnswered]         = useState(false);
  const [reactionText,    setReactionText]     = useState("");
  const [reactionCorrect, setReactionCorrect]  = useState(true);
  const [showFloat,       setShowFloat]        = useState(false);
  const [floatDelta,      setFloatDelta]       = useState(0);
  const [showDelta,       setShowDelta]        = useState(false);
  const [timerActive,     setTimerActive]      = useState(true);
  const latestAnswerRef   = useRef(null);
  const advanceTimer      = useRef(null);

  // Reset per question
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
    setReactionText("");
    setShowFloat(false);
    setShowDelta(false);
    setTimerActive(true);
    latestAnswerRef.current = null;
    clearTimeout(advanceTimer.current);
  }, [currentQuestionIndex]);

  // Cleanup on unmount
  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const handleAnswer = useCallback((label) => {
    if (answered) return;
    clearTimeout(advanceTimer.current);

    const isCorrect   = label === question.correct;
    const isLast      = currentQuestionIndex === questions.length - 1;
    const newScore    = isCorrect ? score + 1 : score;
    const newCombo    = isCorrect ? combo + 1 : 0;

    // Pick reaction dialogue
    const fallbackCorrect = character.defaultCorrect;
    const fallbackWrong   = character.defaultWrong;
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const reactionLine = isCorrect
      ? (question.correctDialogue || pickRandom(fallbackCorrect))
      : (question.wrongDialogue   || pickRandom(fallbackWrong));

    setSelected(label);
    setAnswered(true);
    setTimerActive(false);
    setReactionText(reactionLine);
    setReactionCorrect(isCorrect);

    // Dispatch state update
    dispatch({ type: "ANSWER_QUESTION", payload: { selected: label, isCorrect } });

    // Show floating delta
    const delta = calculateAffectionDelta({ isCorrect, newCombo, isLastQuestion: isLast, newScore });
    setFloatDelta(delta);
    setShowFloat(true);
    setShowDelta(true);
    latestAnswerRef.current = { isLast };
    setTimeout(() => setShowFloat(false), 1300);
    setTimeout(() => setShowDelta(false), 1500);

    // Auto-advance
    advanceTimer.current = setTimeout(() => {
      if (latestAnswerRef.current?.isLast) {
        dispatch({ type: "FINISH_QUIZ" });
      } else {
        dispatch({ type: "NEXT_QUESTION" });
      }
    }, REACTION_DELAY);
  }, [answered, question, currentQuestionIndex, questions.length, score, combo, character, dispatch]);

  function handleTimerExpire() {
    if (!answered) handleAnswer("__TIMEOUT__");
  }

  if (!character || !question) return null;

  const progressPct = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <ScreenWrapper screenKey={`quiz-${currentQuestionIndex}`}>
      <div
        className="min-h-screen flex flex-col"
        style={{ "--char-color": character.color.primary }}
      >
        {/* Top bar */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 mb-3">
            {/* Character info */}
            <CharacterAvatar character={character} size={40} className="flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-base font-bold" style={{ color: character.color.primary }}>
                  {character.name}
                </span>
                <span className="font-mono text-base text-gray-500">
                  {currentQuestionIndex + 1}/{questions.length}
                </span>
              </div>
              {/* Affection meter */}
              <AffectionMeter
                affection={affection}
                color={character.color.primary}
                showDelta={showDelta}
                delta={floatDelta}
              />
            </div>
          </div>

          {/* Quiz progress bar */}
          <div className="w-full h-0.5 bg-dark-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: character.color.primary + "60" }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="px-5 py-3">
          <TimerBar
            isActive={timerActive && !answered}
            onExpire={handleTimerExpire}
            characterColor={character.color.primary}
          />
        </div>

        {/* Main quiz area */}
        <div className="flex-1 px-5 pb-6 flex flex-col gap-5 overflow-y-auto">
          {/* Question */}
          <QuestionBox
            question={question}
            questionNumber={currentQuestionIndex + 1}
            total={questions.length}
            color={character.color.primary}
          />

          {/* Answer options */}
          <div className="relative">
            <AnswerOptions
              question={question}
              selected={selected}
              onSelect={handleAnswer}
              disabled={answered}
              color={character.color.primary}
            />

            {/* Floating score effect */}
            <FloatingEffect
              delta={floatDelta}
              show={showFloat}
              combo={combo}
            />
          </div>

          {/* Character reaction */}
          <ReactionBubble
            character={character}
            text={reactionText}
            isCorrect={reactionCorrect}
            visible={answered && !!reactionText}
          />
        </div>

        {/* Score chip */}
        <div
          className="absolute top-4 right-4 font-mono text-sm px-3 py-1 rounded-lg"
          style={{
            backgroundColor: character.color.primary + "15",
            color:           character.color.primary,
            border:          `1px solid ${character.color.primary}30`,
          }}
        >
          {score} 答對
        </div>
      </div>
    </ScreenWrapper>
  );
}
