import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Premium first-load sequence.
 * - Animated logo mark
 * - Progress percentage (fake-loaded to fixed ceiling then completes on window load)
 * - Fades away revealing the app
 * Shows once per session.
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("sh-loader");
    if (seen) {
      setMounted(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = "hidden";

    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("sh-loader", "1");
        document.documentElement.style.overflow = "";
        setMounted(false);
      },
    });

    if (reduce) {
      tl.set(rootRef.current, { opacity: 0, display: "none" });
      return () => tl.kill();
    }

    tl.from(logoRef.current, { scale: 0.6, opacity: 0, duration: 0.8, ease: "expo.out" })
      .to(obj, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.round(obj.v);
          if (numRef.current) numRef.current.textContent = String(val).padStart(3, "0");
          if (barRef.current) barRef.current.style.transform = `scaleX(${obj.v / 100})`;
        },
      }, "-=0.3")
      .to(logoRef.current, { scale: 1.05, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(rootRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#060816] text-white"
    >
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(600px 400px at 50% 50%, rgba(123,92,255,0.35), transparent 65%)",
      }} />
      <div className="relative flex flex-col items-center gap-8 px-6">
        <div ref={logoRef} className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B5CFF] to-[#00C2FF] font-[Space_Grotesk,ui-sans-serif] text-xl font-black text-white shadow-[0_20px_50px_-10px_rgba(123,92,255,0.6)]">
            SH
          </span>
          <span className="font-[Space_Grotesk,ui-sans-serif] text-2xl font-bold tracking-tight">
            Saad Habib
          </span>
        </div>
        <div className="flex w-72 flex-col gap-3">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div ref={barRef} className="h-full origin-left bg-gradient-to-r from-[#7B5CFF] via-[#00C2FF] to-[#4ADE80]" style={{ transform: "scaleX(0)" }} />
          </div>
          <div className="flex justify-between text-[11px] uppercase tracking-[0.32em] text-white/50">
            <span>Loading</span>
            <span>
              <span ref={numRef}>000</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
