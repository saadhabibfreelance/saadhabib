import { useEffect, useRef } from "react";

/**
 * Top gradient progress bar + floating percentage chip.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const chipRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let last = -1;
    const update = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - el.clientHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      const pct = Math.round(p * 100);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (pct !== last) {
        last = pct;
        if (numRef.current) numRef.current.textContent = String(pct).padStart(2, "0");
        if (chipRef.current) chipRef.current.style.opacity = pct > 2 && pct < 99 ? "1" : "0";
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/5">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-[#F5F1EA] via-[#C8A96A] to-[#B9B4AC]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div
        ref={chipRef}
        className="pointer-events-none fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-[Space_Grotesk,ui-sans-serif] text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 opacity-0 backdrop-blur-md transition-opacity duration-300"
        style={{ mixBlendMode: "difference" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#B9B4AC]" />
        <span ref={numRef}>00</span>
        <span>%</span>
      </div>
    </>
  );
}
