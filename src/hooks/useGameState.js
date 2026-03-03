import { useReducer } from "react";
import { calculateAffectionDelta, clampAffection, isConfessionUnlocked } from "./useAffection.js";
import { QUESTION_COUNT } from "../constants/env.js";

const INITIAL_AFFECTION = 50;

const initialState = {
  screen:               "HOME",  // HOME | CHARACTER_SELECT | STORY | QUIZ | RESULTS
  playerName:           "",
  googleUser:           null,    // { name, email, picture }
  selectedCharacterId:  null,
  questions:            [],
  loadingQuestions:     false,
  questionsError:       null,
  currentQuestionIndex: 0,
  answers:              [],       // { questionId, selected, correct, affectionDelta, combo }
  affection:            INITIAL_AFFECTION,
  combo:                0,
  score:                0,        // correct answers count
  isSubmitting:         false,
  submissionError:      null,
  confessionUnlocked:   false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_GOOGLE_USER":
      return { ...state, googleUser: action.payload };

    case "SET_PLAYER_NAME":
      return { ...state, playerName: String(action.payload ?? "").slice(0, 20) };

    case "GO_TO_CHARACTER_SELECT":
      return { ...state, screen: "CHARACTER_SELECT" };

    case "SELECT_CHARACTER":
      return {
        ...state,
        selectedCharacterId:  action.payload,
        questions:            [],
        questionsError:       null,
        loadingQuestions:     true,
        affection:            INITIAL_AFFECTION,
        combo:                0,
        score:                0,
        answers:              [],
        currentQuestionIndex: 0,
        confessionUnlocked:   false,
        isSubmitting:         false,
        submissionError:      null,
      };

    case "QUESTIONS_LOADED":
      return { ...state, questions: action.payload, loadingQuestions: false };

    case "QUESTIONS_ERROR":
      return { ...state, questionsError: action.payload, loadingQuestions: false };

    case "START_STORY":
      return { ...state, screen: "STORY" };

    case "START_QUIZ":
      return { ...state, screen: "QUIZ", currentQuestionIndex: 0 };

    case "ANSWER_QUESTION": {
      const { selected, isCorrect } = action.payload;
      const question    = state.questions[state.currentQuestionIndex];
      const isLast      = state.currentQuestionIndex === state.questions.length - 1;
      const newScore    = isCorrect ? state.score + 1 : state.score;
      const newCombo    = isCorrect ? state.combo + 1 : 0;

      const delta  = calculateAffectionDelta({
        isCorrect,
        newCombo,
        isLastQuestion: isLast,
        newScore,
      });
      const newAffection = clampAffection(state.affection + delta);

      return {
        ...state,
        score:     newScore,
        combo:     newCombo,
        affection: newAffection,
        confessionUnlocked: isConfessionUnlocked(newAffection),
        answers: [
          ...state.answers,
          {
            questionId:     question.id,
            selected,
            correct:        question.correct,
            isCorrect,
            affectionDelta: delta,
            combo:          newCombo,
          },
        ],
      };
    }

    case "NEXT_QUESTION":
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };

    case "FINISH_QUIZ":
      return { ...state, screen: "RESULTS" };

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };

    case "SUBMISSION_ERROR":
      return { ...state, submissionError: action.payload, isSubmitting: false };

    case "SUBMISSION_SUCCESS":
      return { ...state, isSubmitting: false, submissionError: null };

    case "BACK_TO_CHARACTER_SELECT":
      return {
        ...state,
        screen:               "CHARACTER_SELECT",
        selectedCharacterId:  null,
        questions:            [],
        affection:            INITIAL_AFFECTION,
        combo:                0,
        score:                0,
        answers:              [],
        currentQuestionIndex: 0,
        confessionUnlocked:   false,
        isSubmitting:         false,
        submissionError:      null,
        questionsError:       null,
      };

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
