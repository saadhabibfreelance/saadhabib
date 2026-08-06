import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DUR, EASE } from "../lib/motion/easing";
import { markAppReady } from "../lib/motion/loader-gate";

const MIN_DURATION = 1.8;
const MAX_DURATION = 3;

/**
 * Award-level first-load sequence.
 * Logo fade + scale → 0–100 counter → progress line → rising glow →
 * 0.3s hold → logo pop → loader fades out and releases the hero reveal.
 * Shows once per session; never blocks longer than MAX_DURATION.
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finish = () => {
      document.documentElement.style.overflow = "";
      markAppReady();
      setMounted(false);
    };

    if (sessionStorage.getItem("sh-loader")) {
      markAppReady();
      setMounted(false);
      return;
    }
    sessionStorage.setItem("sh-loader", "1");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = "hidden";

    if (reduce) {
      finish();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });

    gsap.set([logoRef.current, textRef.current, barRef.current?.parentElement ?? null], { opacity: 0 });
    gsap.set(glowRef.current, { opacity: 0.15, scale: 0.85 });

    tl.to(logoRef.current, { opacity: 1, duration: DUR.fast, ease: EASE.glide })
      .fromTo(
        logoRef.current,
        { scale: 0.92 },
        { scale: 1, duration: DUR.slow, ease: EASE.reveal },
        "<",
      )
      .to([barRef.current?.parentElement ?? null, textRef.current], { opacity: 1, duration: DUR.micro }, "-=0.6")
      .to(
        glowRef.current,
        { opacity: 0.75, scale: 1.15, duration: MIN_DURATION * 0.9, ease: EASE.none },
        "<",
      )
      .to(
        counter,
        {
          v: 100,
          duration: MIN_DURATION * 0.82,
          ease: "power1.inOut",
          onUpdate: () => {
            const val = Math.round(counter.v);
            if (numRef.current) numRef.current.textContent = String(val).padStart(3, "0");
            if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          },
        },
        "<",
      )
      .to({}, { duration: 0.3 })
      .to(logoRef.current, { scale: 1.08, duration: DUR.micro, ease: EASE.snap })
      .to(rootRef.current, { opacity: 0, duration: DUR.fast, ease: EASE.exit }, "-=0.1");

    // Hard ceiling: never hold the page longer than MAX_DURATION.
    const cap = window.setTimeout(() => {
      if (tl.isActive()) tl.progress(1);
    }, MAX_DURATION * 1000);

    return () => {
      window.clearTimeout(cap);
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#060607] text-white"
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 480px at 50% 50%, rgba(127,216,232,0.45), transparent 65%), radial-gradient(500px 380px at 65% 60%, rgba(127,216,232,0.35), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-10 px-6">
        <div ref={logoRef} className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F1EA] font-[Space_Grotesk,ui-sans-serif] text-xl font-black text-[#0B0B0C] shadow-[0_20px_50px_-10px_rgba(127,216,232,0.45)]">
            SH
          </span>
          <span className="font-[Space_Grotesk,ui-sans-serif] text-2xl font-bold tracking-tight">
            Saad Habib
          </span>
        </div>

        <div className="font-[Space_Grotesk,ui-sans-serif] text-[clamp(3.5rem,12vw,7rem)] font-extrabold leading-none tracking-[-0.04em]">
          <span ref={numRef}>000</span>
          <span className="text-white/30">%</span>
        </div>

        <div className="flex w-72 flex-col gap-3">
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              ref={barRef}
              className="h-full origin-left bg-gradient-to-r from-[#F5F1EA] via-[#C8A96A] to-[#B9B4AC]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        <div ref={textRef} className="text-[11px] uppercase tracking-[0.32em] text-white/50">
          Preparing the experience
        </div>
      </div>
    </div>
  );
}
