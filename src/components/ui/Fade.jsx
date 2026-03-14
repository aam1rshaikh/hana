import { useRef, useEffect } from "react";
import { fadeObserver } from "../../hooks/useIntersectionObserver";

export default function Fade({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !fadeObserver) return;
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    fadeObserver.observe(el);
    return () => fadeObserver.unobserve(el);
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: 0, transform: "translateY(22px) translateZ(0)", willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}
