export function GlitchText({ text, className = "" }) {
  return (
    <span
      className={`glitch-text relative ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
}
