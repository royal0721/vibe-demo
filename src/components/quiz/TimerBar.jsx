import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TIMER_DURATION } from "../../constants/defaults.js";

export function TimerBar({ isActive, onExpire, characterColor = "#00f5d4", duration = TIMER_DURATION }) {
  const progress = useMotionValue(1);
  const width    = useTransform(progress, [0, 1], ["0%", "100%"]);
  const bgColor  = useTransform(progress, [0, 0.25, 0.6, 1], ["#ef4444", "#f59e0b", "#eab308", characterColor]);

  useEffect(() => {
    if (!isActive) return;
    progress.set(1);
    const controls = animate(progress, 0, {
      duration,
      ease: "linear",
      onComplete: () => onExpire?.(),
    });
    return () => controls.stop();
  }, [isActive, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ width, backgroundColor: bgColor }} />
      </div>
    </div>
  );
}
