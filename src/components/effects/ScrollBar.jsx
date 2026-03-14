import { useRef, useEffect } from "react";

export default function ScrollBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      if (barRef.current) barRef.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={barRef} style={{
      position: "fixed", top: 0, left: 0, zIndex: 9999,
      width: "0%", height: 3,
      background: "linear-gradient(90deg,#e8a0a0,#d4a843,#a0c4a0)",
      boxShadow: "0 0 8px rgba(212,168,67,0.6)",
      pointerEvents: "none", willChange: "width",
    }} />
  );
}
