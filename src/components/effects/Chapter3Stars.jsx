// Memoized so the 60 star divs are never recreated on re-renders
const chapter3Stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  w: i % 5 === 0 ? 2.5 : 1.5,
  op: (0.3 + Math.random() * 0.5).toFixed(2),
  top: (Math.random() * 100).toFixed(2),
  left: (Math.random() * 100).toFixed(2),
  dur: (2 + Math.random() * 3).toFixed(2),
  dl: (Math.random() * 4).toFixed(2),
}));

export default function Chapter3Stars() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {chapter3Stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", width: s.w, height: s.w, borderRadius: "50%",
          background: "white", opacity: s.op,
          top: `${s.top}%`, left: `${s.left}%`,
          animation: `blink ${s.dur}s ease-in-out infinite ${s.dl}s`,
        }} />
      ))}
    </div>
  );
}
