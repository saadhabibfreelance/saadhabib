import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/motion/easing";

/** Lenis smooth scroll, loaded lazily and wired into ScrollTrigger. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    type LenisLike = {
      destroy: () => void;
      raf: (t: number) => void;
      on: (e: string, cb: () => void) => void;
      scrollTo: (target: number, opts?: Record<string, unknown>) => void;
    };
    let lenis: LenisLike | null = null;
    let raf = 0;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }) as unknown as LenisLike;
      lenis.on("scroll", () => ScrollTrigger.update());
      (window as unknown as { __lenis?: LenisLike }).__lenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();


    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}
