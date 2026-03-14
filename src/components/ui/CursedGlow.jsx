export default function CursedGlow({ children }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Soft indigo/violet bloom behind the chapter label */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "160%", height: "260%",
        background: "radial-gradient(ellipse at center, rgba(139,92,246,0.13) 0%, rgba(99,102,241,0.07) 40%, transparent 70%)",
        filter: "blur(8px)",
        animation: "cursedPulse 4s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      {/* Thin cursed energy line under label */}
      <div style={{
        position: "absolute",
        bottom: -4, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.35),rgba(167,139,250,0.5),rgba(139,92,246,0.35),transparent)",
        animation: "cursedLine 4s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
