import { useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { useGsapContext, requestScrollTriggerRefresh } from "./useGsapContext";
import { DUR, EASE, STAGGER, prefersReducedMotion } from "../lib/motion/easing";

/**
 * Global, data-attribute driven scroll reveal system.
 * `[data-reveal="fade|slide|scale|blur|mask|zoom|parallax|split"]`
 */
export function useScrollReveals() {
  const scope = useRef<HTMLElement | null>(null);

  useGsapContext(() => {
    const reduce = prefersReducedMotion();
    const nodes = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const splits: SplitType[] = [];

    nodes.forEach((el) => {
      const variant = el.dataset.reveal || "fade";
      const delay = parseFloat(el.dataset.revealDelay || "0");
      const trigger = {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse" as const,
      };

      if (reduce) {
        gsap.set(el, { opacity: 1, clearProps: "all" });
        return;
      }

      switch (variant) {
        case "slide":
          gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: DUR.slow, ease: EASE.reveal, delay, scrollTrigger: trigger });
          break;
        case "scale":
          gsap.fromTo(el, { scale: 0.9, opacity: 0, filter: "blur(8px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: DUR.slow, ease: EASE.reveal, delay, scrollTrigger: trigger });
          break;
        case "blur":
          gsap.fromTo(el, { opacity: 0, filter: "blur(16px)" }, { opacity: 1, filter: "blur(0px)", duration: DUR.slow, ease: EASE.glide, delay, scrollTrigger: trigger });
          break;
        case "mask":
          gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)", opacity: 1 }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: EASE.exit, delay, scrollTrigger: trigger });
          break;
        case "zoom":
          gsap.fromTo(el, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3, ease: EASE.reveal, delay, scrollTrigger: trigger });
          break;
        case "parallax": {
          const amt = parseFloat(el.dataset.revealAmount || "60");
          gsap.fromTo(el, { y: amt }, {
            y: -amt,
            ease: EASE.none,
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
          break;
        }
        case "split": {
          const split = new SplitType(el, { types: "lines,words" });
          splits.push(split);
          gsap.set(split.words, { yPercent: 110, opacity: 0 });
          gsap.to(split.words, {
            yPercent: 0,
            opacity: 1,
            duration: DUR.base,
            ease: EASE.reveal,
            stagger: STAGGER.tight,
            delay,
            scrollTrigger: trigger,
          });
          break;
        }
        case "fade":
        default:
          gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: DUR.base, ease: EASE.glide, delay, scrollTrigger: trigger });
      }
    });

    requestScrollTriggerRefresh();

    return () => splits.forEach((s) => s.revert());
  }, scope);
}
