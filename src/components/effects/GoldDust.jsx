import { useState, useEffect, useRef, useMemo } from "react";

export default function GoldDust() {
  const particles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 3,
    dur: 14 + Math.random() * 16,
    delay: Math.random() * 20,
    drift: Math.round(-40 + Math.random() * 80) + "px",
    color: ["rgba(212,168,67,0.5)", "rgba(255,182,193,0.45)", "rgba(255,220,180,0.4)", "rgba(200,220,255,0.4)"][i % 4],
  })), []);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0 });
    obs.observe(document.body);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9990, overflow: "hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.left}%`, bottom: "-10px",
          width: p.size, height: p.size, borderRadius: "50%", background: p.color,
          "--drift": p.drift,
          animation: `dustRise ${p.dur}s ease-in-out infinite ${p.delay}s`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform, opacity",
        }} />
      ))}
    </div>
  );
}
