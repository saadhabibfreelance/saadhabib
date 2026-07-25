import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - el.clientHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/5">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[#7B5CFF] via-[#00C2FF] to-[#4ADE80]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
