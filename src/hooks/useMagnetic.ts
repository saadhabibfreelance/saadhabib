import { useEffect } from "react";
import { gsap } from "gsap";
import { EASE, prefersReducedMotion } from "../lib/motion/easing";

/** Magnetic hover for `[data-magnetic]` elements. Skipped on touch / reduced motion. */
export function useMagnetic() {
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(hover: none)").matches) return;

    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((m) => {
      const strength = parseFloat(m.dataset.magneticStrength || "0.35");
      const toX = gsap.quickTo(m, "x", { duration: 0.45, ease: EASE.glide });
      const toY = gsap.quickTo(m, "y", { duration: 0.45, ease: EASE.glide });
      const move = (e: MouseEvent) => {
        const r = m.getBoundingClientRect();
        toX((e.clientX - (r.left + r.width / 2)) * strength);
        toY((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => gsap.to(m, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      m.addEventListener("mousemove", move, { passive: true });
      m.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        m.removeEventListener("mousemove", move);
        m.removeEventListener("mouseleave", leave);
        gsap.killTweensOf(m);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);
}
