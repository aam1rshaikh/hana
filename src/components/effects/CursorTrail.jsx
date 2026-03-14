import { useRef, useEffect } from "react";

export default function CursorTrail() {
  const containerRef = useRef(null);
  const lastTime = useRef(0);
  const colors = ["#ffb6d9", "#fda4af", "#fde68a", "#d4a843", "#c4b5fd", "#f9a8d4"];

  useEffect(() => {
    const spawn = (x, y) => {
      const now = Date.now();
      if (now - lastTime.current < 80) return;
      lastTime.current = now;

      const el = document.createElement("div");
      const size = 14 + Math.random() * 10;
      const dx = (Math.random() - 0.5) * 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.textContent = "♡";
      el.style.cssText = `position:fixed;left:${x - size / 2}px;top:${y - size / 2}px;font-size:${size}px;color:${color};pointer-events:none;user-select:none;animation:heartFloat 1.1s ease-out forwards;--dx:${dx}px;z-index:9998;`;
      containerRef.current?.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    };

    const onMouse = (e) => { if (Math.random() > 0.35) return; spawn(e.clientX, e.clientY); };
    const onTouch = (e) => {
      Array.from(e.touches).forEach(t => { if (Math.random() > 0.55) return; spawn(t.clientX, t.clientY); });
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998, overflow: "hidden" }} />
  );
}
