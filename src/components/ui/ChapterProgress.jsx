import { useState, useEffect, useRef } from "react";

const CHAPTERS = [
  { id: "chapter-1", label: "Chapter One · How it all began" },
  { id: "chapter-2", label: "Chapter Two · A Sound Like Falling Into Something Warm" },
  { id: "chapter-3", label: "Chapter Three · A Good Omen" },
  { id: "chapter-4", label: "Chapter Four · Everything the Quiet Holds" },
  { id: "chapter-5", label: "Chapter Five · Dreams" },
  { id: "chapter-6", label: "Chapter Six · What I want to say to you" },
];

export default function ChapterProgress() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Toast state
  const [toastLabel, setToastLabel] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);
  const prevIndexRef = useRef(-1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateActive = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const midpoint = scrollY + windowHeight * 0.4;

      let newActive = -1;
      CHAPTERS.forEach((chapter, i) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + scrollY;
        if (midpoint >= top) newActive = i;
      });

      const firstEl = document.getElementById(CHAPTERS[0].id);
      if (firstEl) {
        const firstTop = firstEl.getBoundingClientRect().top + scrollY;
        setVisible(scrollY + windowHeight * 0.5 >= firstTop);
      }

      setActiveIndex(newActive);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  // Show toast on mobile when chapter changes
  useEffect(() => {
    if (!isMobile) return;
    if (activeIndex === -1) return;
    if (activeIndex === prevIndexRef.current) return;

    prevIndexRef.current = activeIndex;
    setToastLabel(CHAPTERS[activeIndex].label);
    setToastVisible(true);

    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  }, [activeIndex, isMobile]);

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop dots */}
      <div style={{
        position: "fixed",
        right: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9000,
        display: isMobile ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
        pointerEvents: visible ? "auto" : "none",
      }}>
        {CHAPTERS.map((chapter, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          const isHovered = i === hoveredIndex;

          return (
            <div
              key={chapter.id}
              style={{ position: "relative", display: "flex", alignItems: "center" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{
                position: "absolute",
                right: 22,
                whiteSpace: "nowrap",
                background: "rgba(44,24,16,0.88)",
                color: "#fef9f0",
                fontSize: "0.7rem",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                letterSpacing: "0.04em",
                padding: "5px 10px",
                borderRadius: 6,
                pointerEvents: "none",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateX(0)" : "translateX(6px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
                boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                border: "1px solid rgba(212,168,67,0.25)",
              }}>
                {chapter.label}
              </div>

              <button
                onClick={() => scrollToChapter(chapter.id)}
                aria-label={chapter.label}
                style={{
                  width: isActive ? 10 : isPast ? 7 : 6,
                  height: isActive ? 10 : isPast ? 7 : 6,
                  borderRadius: "50%",
                  border: isActive
                    ? "1.5px solid #d4a843"
                    : isPast
                    ? "1px solid rgba(212,168,67,0.5)"
                    : "1px solid rgba(212,168,67,0.3)",
                  background: isActive
                    ? "#d4a843"
                    : isPast
                    ? "rgba(212,168,67,0.45)"
                    : "transparent",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.4s ease",
                  boxShadow: isActive ? "0 0 8px rgba(212,168,67,0.5)" : "none",
                  outline: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Mobile toast */}
      <div style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9000,
        display: isMobile ? "block" : "none",
        pointerEvents: "none",
      }}>
        <div style={{
          background: "rgba(44,24,16,0.88)",
          color: "#fef9f0",
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "0.78rem",
          letterSpacing: "0.04em",
          padding: "8px 18px",
          borderRadius: 20,
          border: "1px solid rgba(212,168,67,0.3)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          whiteSpace: "nowrap",
          opacity: toastVisible ? 1 : 0,
          transform: toastVisible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>
          {toastLabel}
        </div>
      </div>
    </>
  );
}
