import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/motion/easing";

gsap.registerPlugin(ScrollTrigger);

/** Section palettes — glow colour, gradient angle, blur intensity. */
export const AMBIENT_THEMES = [
  { a: "123,92,255", b: "0,194,255", angle: 160, blur: 120 },
  { a: "0,201,255", b: "146,254,157", angle: 205, blur: 140 },
  { a: "240,152,25", b: "255,88,88", angle: 130, blur: 110 },
  { a: "101,78,163", b: "234,175,200", angle: 240, blur: 150 },
  { a: "74,222,128", b: "0,194,255", angle: 100, blur: 130 },
  { a: "248,87,166", b: "255,200,55", angle: 190, blur: 120 },
] as const;

type Refs = {
  root: RefObject<HTMLDivElement | null>;
  blobs: RefObject<HTMLDivElement | null>;
  grid: RefObject<HTMLDivElement | null>;
  particles: RefObject<HTMLDivElement | null>;
  beams: RefObject<HTMLDivElement | null>;
  cursorGlow: RefObject<HTMLDivElement | null>;
};

/**
 * Drives the global ambient background:
 * mouse parallax (single rAF), cursor glow, scroll intensity,
 * and smooth per-section palette interpolation.
 * Pauses when the tab is hidden; fully static under reduced motion.
 */
export function useAmbientBackground(refs: Refs) {
  useEffect(() => {
    const root = refs.root.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      root.style.setProperty("--amb-intensity", "0.55");
      return;
    }

    const layers: Array<{ el: HTMLElement | null; depth: number }> = [
      { el: refs.blobs.current, depth: 26 },
      { el: refs.beams.current, depth: 16 },
      { el: refs.particles.current, depth: 40 },
      { el: refs.grid.current, depth: 8 },
    ];

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const glow = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glowCurrent = { ...glow };
    let raf = 0;
    let running = true;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
      glow.x = e.clientX;
      glow.y = e.clientY;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.045;
      current.y += (target.y - current.y) * 0.045;
      glowCurrent.x += (glow.x - glowCurrent.x) * 0.08;
      glowCurrent.y += (glow.y - glowCurrent.y) * 0.08;

      for (const { el, depth } of layers) {
        if (!el) continue;
        el.style.transform = `translate3d(${current.x * depth}px, ${current.y * depth}px, 0)`;
      }
      const cg = refs.cursorGlow.current;
      if (cg) cg.style.transform = `translate3d(${glowCurrent.x - 320}px, ${glowCurrent.y - 320}px, 0)`;

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => {
      if (document.hidden) {
        stop();
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
        start();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    // Scroll intensity — background breathes as the page advances.
    const ctx = gsap.context(() => {
      gsap.to(root, {
        "--amb-intensity": 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 1.2 },
      } as gsap.TweenVars);

      // Smoothly interpolate palette per major section.
      const sections = gsap.utils.toArray<HTMLElement>("section");
      sections.forEach((section, i) => {
        const t = AMBIENT_THEMES[i % AMBIENT_THEMES.length];
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(root, {
              duration: 1.6,
              ease: "sine.inOut",
              "--amb-a": t.a,
              "--amb-b": t.b,
              "--amb-angle": `${t.angle}deg`,
              "--amb-blur": `${t.blur}px`,
            } as gsap.TweenVars);
          },
        });
      });
    }, root);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
