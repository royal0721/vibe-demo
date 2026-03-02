import { useState, useEffect, useRef } from "react";

export function TypewriterText({ text, speed = 20, onComplete, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);
  const idxRef                    = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setDisplayed("");
    setDone(false);

    if (!text) {
      setDone(true);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      const i = idxRef.current;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
        return;
      }
      setDisplayed(text.slice(0, i + 1));
      idxRef.current += 1;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  );
}
