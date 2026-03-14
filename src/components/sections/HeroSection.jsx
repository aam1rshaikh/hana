import { useMemo } from "react";
import AnimeCat from "../interactive/AnimeCat";

export default function HeroSection() {
  const bannerStars = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    d: (1.5 + Math.random() * 2).toFixed(1),
    dl: (Math.random() * 3).toFixed(1),
  })), []);

  return (
    <>
      {/* CAT BANNER */}
      <div style={{ width: "100%", background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)", padding: "20px 16px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", gap: 14 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {bannerStars.map(s => (
            <div key={s.id} style={{ position: "absolute", width: s.size, height: s.size, background: "white", borderRadius: "50%", top: `${s.top}%`, left: `${s.left}%`, animation: `blink ${s.d}s ease-in-out infinite ${s.dl}s` }} />
          ))}
        </div>
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <AnimeCat />
          <AnimeCat style={{ animationDelay: "0.8s" }} />
          <AnimeCat style={{ animationDelay: "1.6s" }} />
          <AnimeCat style={{ animationDelay: "0.4s" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "10px 24px", background: "rgba(255,182,193,0.07)", borderRadius: 14, border: "1px solid rgba(255,182,193,0.2)", backdropFilter: "blur(4px)" }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(0.9rem,4vw,1.1rem)", color: "white", letterSpacing: "0.06em", margin: 0, lineHeight: 1.7, textShadow: "0 0 20px rgba(255,182,193,0.6)", animation: "shimmer 3s ease-in-out infinite" }}>
            For the most precious<br />and beautiful girl 🌸
          </p>
        </div>
      </div>

      {/* HELLO HANA */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", padding: "40px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(255,182,193,0.08) 0%,transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,6vw,4rem)", fontStyle: "italic", color: "white", textShadow: "0 0 40px rgba(255,182,193,0.4)", marginBottom: 0 }}>
            Hello <span style={{ animation: "hanaSparkle 3s ease-in-out infinite", display: "inline-block" }}>Hana</span>,
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", marginTop: 12, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 0 }}>kaise ho aap? 🐱</p>
        </div>
      </div>
    </>
  );
}
