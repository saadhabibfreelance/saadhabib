import { useRef, type RefObject } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { useGsapContext, requestScrollTriggerRefresh } from "./useGsapContext";
import { DUR, EASE, STAGGER, prefersReducedMotion } from "../lib/motion/easing";
import { onAppReady } from "../lib/motion/loader-gate";


export type HeroRefs = {
  root: RefObject<HTMLElement | null>;
  headline: RefObject<HTMLHeadingElement | null>;
  sub: RefObject<HTMLParagraphElement | null>;
  cta: RefObject<HTMLDivElement | null>;
  badge: RefObject<HTMLDivElement | null>;
  logos: RefObject<HTMLDivElement | null>;
  card: RefObject<HTMLDivElement | null>;
  glow: RefObject<HTMLDivElement | null>;
};

export function useHeroRefs(): HeroRefs {
  return {
    root: useRef<HTMLElement | null>(null),
    headline: useRef<HTMLHeadingElement | null>(null),
    sub: useRef<HTMLParagraphElement | null>(null),
    cta: useRef<HTMLDivElement | null>(null),
    badge: useRef<HTMLDivElement | null>(null),
    logos: useRef<HTMLDivElement | null>(null),
    card: useRef<HTMLDivElement | null>(null),
    glow: useRef<HTMLDivElement | null>(null),
  };
}

/** Cinematic hero entrance + scroll exit + pointer parallax. */
export function useHeroMotion(refs: HeroRefs) {
  useGsapContext(() => {
    const reduce = prefersReducedMotion();
    const { headline, sub, cta, badge, logos, card, glow, root } = refs;
    if (!headline.current || !root.current) return;

    const split = new SplitType(headline.current, { types: "lines,words" });
    const text = [sub.current, cta.current, badge.current, logos.current];

    gsap.set(split.words, { yPercent: 110, opacity: 0 });
    gsap.set(text, { y: 24, opacity: 0 });
    gsap.set(card.current, { opacity: 0, y: 40, scale: 0.96 });
    gsap.set(glow.current, { opacity: 0, scale: 0.9 });

    // One master timeline: background → headline → product → copy → CTA → logos.
    const tl = gsap.timeline({ defaults: { ease: EASE.glide }, paused: true });
    tl.to(glow.current, { opacity: 0.7, scale: 1, duration: DUR.slow, ease: EASE.reveal })
      .to(badge.current, { y: 0, opacity: 1, duration: DUR.fast }, "-=0.85")
      .to(
        split.words,
        { yPercent: 0, opacity: 1, duration: DUR.slow, ease: EASE.reveal, stagger: STAGGER.base },
        "-=0.3",
      )
      .to(
        card.current,
        { opacity: 1, y: 0, scale: 1, duration: DUR.hero, ease: EASE.reveal },
        "-=0.85",
      )
      .to(sub.current, { y: 0, opacity: 1, duration: DUR.base }, "-=0.95")
      .to(cta.current, { y: 0, opacity: 1, duration: DUR.fast }, "-=0.55")
      .to(logos.current, { y: 0, opacity: 1, duration: DUR.fast }, "-=0.35");

    const unsubscribe = onAppReady(() => tl.play(reduce ? tl.duration() : 0));


    if (!reduce) {
      gsap.to(card.current, {
        y: -18,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: EASE.drift,
      });

      const scrub = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      } as const;

      gsap.to([headline.current, ...text], {
        opacity: 0,
        y: -60,
        filter: "blur(6px)",
        ease: EASE.none,
        scrollTrigger: scrub,
      });
      gsap.to(card.current, { scale: 1.12, y: -40, ease: EASE.none, scrollTrigger: scrub });
      gsap.to(glow.current, { opacity: 0.3, scale: 1.3, ease: EASE.none, scrollTrigger: scrub });
    }

    requestScrollTriggerRefresh();

    if (reduce)
      return () => {
        unsubscribe();
        split.revert();
      };


    // Pointer parallax — quickTo avoids allocating a tween per mousemove.
    const cardX = gsap.quickTo(card.current, "x", { duration: 0.7, ease: EASE.glide });
    const cardRY = gsap.quickTo(card.current, "rotationY", { duration: 0.7, ease: EASE.glide });
    const cardRX = gsap.quickTo(card.current, "rotationX", { duration: 0.7, ease: EASE.glide });
    const glowX = gsap.quickTo(glow.current, "x", { duration: 1.1, ease: EASE.glide });
    const glowY = gsap.quickTo(glow.current, "y", { duration: 1.1, ease: EASE.glide });
    gsap.set(card.current, { transformPerspective: 1000 });

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = root.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        cardX(x * 40);
        cardRY(x * 10);
        cardRX(-y * 8);
        glowX(x * 60);
        glowY(y * 40);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      unsubscribe();
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      split.revert();
    };

  }, refs.root);
}
