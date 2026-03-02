import { motion } from "framer-motion";

const LABELS = ["A", "B", "C", "D"];

export function AnswerOptions({ question, selected, onSelect, disabled, color }) {
  const options = [
    question.options.A,
    question.options.B,
    question.options.C,
    question.options.D,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((text, i) => {
        const label     = LABELS[i];
        const isSelected = selected === label;
        const isCorrect  = disabled && question.correct === label;
        const isWrong    = disabled && isSelected && !isCorrect;

        let btnClass = "answer-btn";
        if (isCorrect) btnClass += " answer-correct";
        else if (isWrong) btnClass += " answer-wrong";

        return (
          <motion.button
            key={label}
            className={`
              ${btnClass}
              relative flex items-start gap-4 p-5 rounded-xl border text-left w-full
              font-body text-lg text-gray-200 leading-snug
              transition-colors duration-200
              disabled:cursor-default
              ${!disabled && !isSelected ? "hover:border-opacity-80 hover:text-white" : ""}
            `}
            style={{
              backgroundColor: isSelected && !disabled
                ? color + "20"
                : "rgba(26,26,46,0.8)",
              borderColor: isSelected && !disabled ? color : "rgba(42,42,74,0.8)",
              boxShadow:   isSelected && !disabled ? `0 0 8px ${color}40` : "none",
            }}
            onClick={() => !disabled && onSelect(label)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.01, y: -1 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
          >
            <span
              className="font-mono text-base font-bold flex-shrink-0 w-7 h-7 rounded flex items-center justify-center mt-0.5"
              style={{
                backgroundColor: isSelected && !disabled ? color : "rgba(42,42,74,0.8)",
                color:           isSelected && !disabled ? "#000" : color,
              }}
            >
              {label}
            </span>
            <span className="flex-1">{text}</span>

            {/* Correct/wrong indicator */}
            {isCorrect && <span className="text-emerald-400 text-base ml-auto">✓</span>}
            {isWrong   && <span className="text-red-400 text-base ml-auto">✗</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
