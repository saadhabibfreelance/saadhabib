import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Large custom cursor with a lagging follower ring.
 * Reacts to [data-cursor="hover|text|image"] and any button/link/[data-magnetic].
 * Hidden on touch devices / reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotXY = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringXY = { ...dotXY };

    const dotSet = { x: gsap.quickSetter(dot, "x", "px"), y: gsap.quickSetter(dot, "y", "px") };
    const ringSet = { x: gsap.quickSetter(ring, "x", "px"), y: gsap.quickSetter(ring, "y", "px") };

    const onMove = (e: MouseEvent) => {
      dotXY.x = e.clientX;
      dotXY.y = e.clientY;
      gsap.to([dot, ring], { opacity: 1, duration: 0.4, overwrite: "auto" });
    };
    window.addEventListener("mousemove", onMove);

    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    document.addEventListener("mouseleave", onLeave);

    const raf = gsap.ticker.add(() => {
      dotSet.x(dotXY.x);
      dotSet.y(dotXY.y);
      ringXY.x += (dotXY.x - ringXY.x) * 0.18;
      ringXY.y += (dotXY.y - ringXY.y) * 0.18;
      ringSet.x(ringXY.x);
      ringSet.y(ringXY.y);
    });

    const HOVER_SELECTOR = 'a, button, [role="button"], [data-magnetic], [data-cursor]';
    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest(HOVER_SELECTOR) as HTMLElement | null;
      if (!target) return;
      const mode = target.getAttribute("data-cursor") || "hover";
      if (mode === "text") {
        gsap.to(ring, { scale: 2.6, borderColor: "rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0)", duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.25 });
      } else if (mode === "image") {
        gsap.to(ring, { scale: 3.4, borderColor: "rgba(255,255,255,0.9)", backgroundColor: "rgba(127,216,232,0.35)", duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.25 });
      } else {
        gsap.to(ring, { scale: 1.8, borderColor: "rgba(127,216,232,0.9)", backgroundColor: "rgba(127,216,232,0.15)", duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 1.4, duration: 0.25 });
      }
    };
    const onOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (related && related.closest?.(HOVER_SELECTOR)) return;
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0)", duration: 0.4, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      gsap.ticker.remove(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-10 w-10 rounded-full border border-white/60 mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}
