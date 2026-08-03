import { useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { useGsapContext, requestScrollTriggerRefresh } from "./useGsapContext";
import { DUR, EASE, STAGGER, prefersReducedMotion } from "../lib/motion/easing";

/**
 * Per-chapter scroll choreography for the cinematic story sequence.
 * All triggers live in one gsap.context, reverted on unmount.
 */
export function useStoryMotion(
  wrap: RefObject<HTMLElement | null>,
  scenes: RefObject<Array<HTMLElement | null>>,
) {
  useGsapContext(() => {
    const reduce = prefersReducedMotion();
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const list = scenes.current ?? [];

    list.forEach((el, i) => {
      if (!el) return;
      const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]");
      const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-line]"));
      const para = el.querySelector<HTMLElement>("[data-para]");
      const cta = el.querySelector<HTMLElement>("[data-cta]");
      const visual = el.querySelector<HTMLElement>("[data-visual]");
      const bg = el.querySelector<HTMLElement>("[data-bg]");

      gsap.set([eyebrow, ...lines, para, cta], { y: 40, opacity: 0 });
      gsap.set(visual, { y: 60, opacity: 0, scale: 0.95 });

      // Entrance plays on its own clock (never mid-scrub / half-visible),
      // so chapter copy is fully readable for the whole time it is on screen.
      const tl = gsap.timeline({
        defaults: { ease: EASE.glide },
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      tl.to(eyebrow, { y: 0, opacity: 1, duration: DUR.fast })
        .to(lines, { y: 0, opacity: 1, duration: DUR.base, ease: EASE.reveal, stagger: STAGGER.loose }, "-=0.32")
        .to(para, { y: 0, opacity: 1, duration: DUR.base }, "-=0.55")
        .to(cta, { y: 0, opacity: 1, duration: DUR.fast }, "-=0.55")
        .to(visual, { y: 0, opacity: 1, scale: 1, duration: DUR.slow, ease: EASE.reveal }, "-=0.95");

      // Gentle hand-off to the next chapter — desktop only, and late enough
      // that the section never sits empty while it still fills the viewport.
      if (i < list.length - 1 && !reduce && !isMobile) {
        gsap.to([eyebrow, ...lines, para, cta, visual], {
          y: -32,
          opacity: 0,
          scale: 0.98,
          ease: EASE.none,
          scrollTrigger: { trigger: el, start: "bottom 25%", end: "bottom top", scrub: 0.8 },
        });
      }

      if (!reduce) {
        gsap.fromTo(
          bg,
          { opacity: 0.4, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            ease: EASE.none,
            scrollTrigger: { trigger: el, start: "top bottom", end: "top center", scrub: 0.8 },
          },
        );
        gsap.to(visual, {
          y: "+=14",
          duration: 4 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: EASE.drift,
        });
      }
    });

    requestScrollTriggerRefresh();

    if (reduce || isMobile) return;

    // Single pointer listener for the whole sequence, rAF-throttled.
    const setters = list
      .filter(Boolean)
      .map((el) => {
        const v = el!.querySelector<HTMLElement>("[data-visual]");
        const g1 = el!.querySelector<HTMLElement>("[data-glow1]");
        const g2 = el!.querySelector<HTMLElement>("[data-glow2]");
        return {
          vx: gsap.quickTo(v, "x", { duration: 0.9, ease: EASE.glide }),
          vy: gsap.quickTo(v, "y", { duration: 0.9, ease: EASE.glide }),
          g1x: gsap.quickTo(g1, "x", { duration: 1.2, ease: EASE.glide }),
          g1y: gsap.quickTo(g1, "y", { duration: 1.2, ease: EASE.glide }),
          g2x: gsap.quickTo(g2, "x", { duration: 1.2, ease: EASE.glide }),
          g2y: gsap.quickTo(g2, "y", { duration: 1.2, ease: EASE.glide }),
        };
      });

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setters.forEach((s) => {
          s.vx(x);
          s.vy(y * 0.6);
          s.g1x(-x * 1.5);
          s.g1y(-y * 1.2);
          s.g2x(x * 1.8);
          s.g2y(y * 1.4);
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, wrap);
}

export function useSceneRefs(count: number) {
  const ref = useRef<Array<HTMLElement | null>>(new Array(count).fill(null));
  return ref;
}
