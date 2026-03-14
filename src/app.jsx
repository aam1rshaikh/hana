import { useState, useEffect, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

// Styles
import { globalCss } from "./styles/globalStyles";

// Supabase
import { SUPABASE_URL, sbHeaders } from "./lib/supabase";

// ── Always loaded immediately (above the fold) ──
import ScrollBar from "./components/effects/ScrollBar";
import Fade from "./components/ui/Fade";
import ChapterProgress from "./components/ui/ChapterProgress";
import HeroSection from "./components/sections/HeroSection";
import SakuraHero from "./components/sections/SakuraHero";
import Chapter1 from "./components/chapters/Chapter1";

// ── Lazy loaded — effects deferred so they don't block first paint ──
const CursorTrail          = lazy(() => import("./components/effects/CursorTrail"));
const GoldDust             = lazy(() => import("./components/effects/GoldDust"));

// ── Lazy loaded — only downloaded when the browser reaches them ──
const Chapter2             = lazy(() => import("./components/chapters/Chapter2"));
const Chapter3             = lazy(() => import("./components/chapters/Chapter3"));
const Chapter4             = lazy(() => import("./components/chapters/Chapter4"));
const Chapter5             = lazy(() => import("./components/chapters/Chapter5"));
const Chapter6             = lazy(() => import("./components/chapters/Chapter6"));
const CosmicLoveSection    = lazy(() => import("./components/sections/CosmicLoveSection"));
const MemoriesSection      = lazy(() => import("./components/sections/MemoriesSection"));
const ScratchCardSection   = lazy(() => import("./components/sections/ScratchCardSection"));
const VideoSlider          = lazy(() => import("./components/interactive/VideoSlider"));
const InstagramChatSection = lazy(() => import("./components/sections/InstagramChatSection"));
const CommentsSection      = lazy(() => import("./components/sections/CommentsSection"));

// Subtle shimmer shown while a lazy section is loading
function SectionFallback() {
  return (
    <div style={{
      width: "100%",
      minHeight: 120,
      background: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s ease-in-out infinite",
    }} />
  );
}

export default function App() {
  const [customCards, setCustomCards] = useState([]);

  // Load custom dream cards from Supabase on mount
  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/dreams?select=*&order=id.asc`, { headers: sbHeaders })
      .then(r => r.ok ? r.json() : Promise.resolve([]))
      .then(data => {
        if (Array.isArray(data))
          setCustomCards(data.map(d => ({ id: d.id, title: d.title, desc: d.description, emoji: d.emoji, bgId: d.bg_id })));
      })
      .catch(() => {});
  }, []);

  // Scroll to URL hash section on load (e.g. #instagram-chat after returning from chat page)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const sectionId = hash.substring(1);
    const scrollTimeoutId = setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
    const cleanupTimeoutId = setTimeout(() => {
      const cleanUrl = window.location.origin + window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanUrl);
    }, 1500);
    return () => { clearTimeout(scrollTimeoutId); clearTimeout(cleanupTimeoutId); };
  }, []);

  return (
    <>
      <Analytics />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital@0;1&family=Special+Elite&display=swap" />
      <style>{globalCss}</style>

      {/* ScrollBar loads immediately — it's tiny */}
      <ScrollBar />
      <ChapterProgress />

      {/* ── HERO — loaded immediately, first thing user sees ── */}
      <HeroSection />
      <SakuraHero />

      {/* Effects lazy loaded — deferred until after hero is visible */}
      <Suspense fallback={null}>
        <CursorTrail />
        <GoldDust />
      </Suspense>

      {/* ── Chapter1 is eagerly imported — render it outside Suspense ── */}
      <Chapter1 />

      {/* ── Everything below is lazy loaded ── */}
      <Suspense fallback={<SectionFallback />}>

        {/* ── CHAPTERS 2–6 ── */}
        <Chapter2 />
        <Chapter3 />
        <Chapter4 />
        <Chapter5 customCards={customCards} setCustomCards={setCustomCards} />
        <Chapter6 />

        {/* ── COSMIC LOVE ── */}
        <div className="section-gpu">
          <CosmicLoveSection />
        </div>

        {/* ── MEMORIES ── */}
        <div className="section-gpu">
          <MemoriesSection />
        </div>

        {/* ── SCRATCH CARDS ── */}
        <ScratchCardSection />

        {/* ── VIDEO SLIDER ── */}
        <div className="section-gpu section-offscreen" style={{ background: "linear-gradient(180deg,#1a1a2e 0%,#16213e 100%)", padding: "60px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 420, margin: "0 auto" }}>
            <VideoSlider />
          </div>
        </div>

        {/* ── INSTAGRAM CHAT ── */}
        <InstagramChatSection />

        {/* ── COMMENTS ── */}
        <CommentsSection />

        {/* ── FOOTER ── */}
        <Fade>
          <footer style={{ textAlign: "center", padding: "60px 20px", background: "#fef9f0" }}>
            <div style={{ color: "#d4a843", fontSize: "1rem", letterSpacing: 12, marginBottom: 24, opacity: 0.45 }}>✦ ✦ ✦</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1rem", color: "#6b4c3b", textAlign: "center", marginBottom: 0 }}>
              Made with so much love,<br />and the quiet belief there is still more to come Insha Allah.<br />
              <em style={{ fontSize: "0.85rem", opacity: 0.6 }}> - Aamir 💛</em>
            </p>
          </footer>
        </Fade>

      </Suspense>
    </>
  );
}
