import { useMemo } from "react";

export function HeartParticles({ color = "#ff2d78", count = 16 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id:       i,
      x:        Math.random() * 100,
      size:     12 + Math.random() * 20,
      duration: 1.2 + Math.random() * 1.2,
      delay:    Math.random() * 0.8,
      rot:      -30 + Math.random() * 60,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="heart-particle absolute"
          style={{
            left:       `${p.x}%`,
            bottom:     "20%",
            fontSize:   `${p.size}px`,
            "--duration": `${p.duration}s`,
            "--delay":    `${p.delay}s`,
            "--rot":      `${p.rot}deg`,
            color,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
