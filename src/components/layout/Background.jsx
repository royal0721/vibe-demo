export function Background() {
  return (
    <>
      {/* CRT scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* Animated grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,212,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.035) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
    </>
  );
}
