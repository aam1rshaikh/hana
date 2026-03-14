import { useRef, useEffect } from "react";
import { fadeObserver } from "../../hooks/useIntersectionObserver";

export default function ChapterBloom({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !fadeObserver) return;
    el.style.transition = "opacity 1.1s ease, transform 1.1s ease";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) translateZ(0)";
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, transform: "translateY(16px) translateZ(0)", willChange: "opacity,transform" }}>
      {children}
    </div>
  );
}
