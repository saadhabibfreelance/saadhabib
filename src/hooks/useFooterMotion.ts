import { type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "./useGsapContext";
import { DUR, EASE, STAGGER, prefersReducedMotion } from "../lib/motion/easing";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer finale: columns rise in sequence, then the glow swells and the
 * panel brightens as the very bottom of the page is reached.
 */
export function useFooterMotion(scope: RefObject<HTMLElement | null>) {
  useGsapContext(() => {
    if (prefersReducedMotion()) return;
    const el = scope.current;
    if (!el) return;

    gsap.from(el.querySelectorAll<HTMLElement>("[data-footer-brand]"), {
      y: 60,
      opacity: 0,
      filter: "blur(14px)",
      duration: DUR.slow,
      ease: EASE.reveal,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });

    gsap.from(el.querySelectorAll<HTMLElement>("[data-footer-col]"), {
      y: 44,
      opacity: 0,
      duration: DUR.base,
      ease: EASE.glide,
      stagger: STAGGER.loose,
      scrollTrigger: { trigger: el, start: "top 80%" },
    });

    gsap.from(el.querySelectorAll<HTMLElement>("[data-footer-legal]"), {
      y: 24,
      opacity: 0,
      duration: DUR.fast,
      ease: EASE.glide,
      scrollTrigger: { trigger: el, start: "top 55%" },
    });

    // Ending swell — brightness + glow rise as the page bottoms out.
    const glow = el.querySelector<HTMLElement>("[data-footer-glow]");
    const panel = el.querySelector<HTMLElement>("[data-footer-panel]");
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        if (glow) {
          glow.style.opacity = (0.18 + p * 0.62).toFixed(3);
          glow.style.transform = `translate3d(-50%,0,0) scale(${(0.85 + p * 0.35).toFixed(3)})`;
        }
        if (panel) panel.style.filter = `brightness(${(0.92 + p * 0.16).toFixed(3)})`;
      },
    });
  }, scope, []);
}
