import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "../lib/motion/easing";

gsap.registerPlugin(ScrollTrigger);

type LenisLike = { scrollTo: (target: number, opts?: Record<string, unknown>) => void };

/**
 * Pinned horizontal showcase: vertical wheel/trackpad/touch scroll is converted
 * into horizontal travel while the active card stays centred and neighbours
 * fall back in scale, opacity and perspective.
 *
 * Desktop/tablet -> ScrollTrigger pin + scrub.
 * Mobile / reduced motion -> native horizontal scroll-snap (handled in markup),
 * with the same depth pass driven by the scroll container.
 */
export function useHorizontalShowcase(
  section: RefObject<HTMLElement | null>,
  viewport: RefObject<HTMLDivElement | null>,
  track: RefObject<HTMLDivElement | null>,
  count: number,
) {
  const [active, setActive] = useState(0);
  const goToRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const sectionEl = section.current;
    const viewportEl = viewport.current;
    const trackEl = track.current;
    if (!sectionEl || !viewportEl || !trackEl) return;

    const reduce = prefersReducedMotion();
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-card]"));
      if (!cards.length) return;

      /** Depth pass — runs on every scroll frame, pure transform writes. */
      const paint = () => {
        const centre = viewportEl.getBoundingClientRect().left + viewportEl.offsetWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const d = (r.left + r.width / 2 - centre) / (viewportEl.offsetWidth || 1);
          const ad = Math.min(Math.abs(d), 1.6);
          gsap.set(card, {
            scale: 1 - ad * 0.13,
            opacity: 1 - ad * 0.62,
            rotationY: reduce ? 0 : d * -9,
            z: -ad * 140,
            filter: `blur(${(ad * 2.4).toFixed(2)}px)`,
          });
          if (Math.abs(d) < bestDist) {
            bestDist = Math.abs(d);
            best = i;
          }
        });
        setActive((prev) => (prev === best ? prev : best));
      };

      if (isMobile || reduce) {
        // Native horizontal scroll-snap on touch — same depth language.
        viewportEl.addEventListener("scroll", paint, { passive: true });
        paint();
        goToRef.current = (i: number) => {
          const card = cards[Math.max(0, Math.min(cards.length - 1, i))];
          if (card) card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        };
        ctx.add(() => () => viewportEl.removeEventListener("scroll", paint));
        return;
      }

      const distance = () => Math.max(0, trackEl.scrollWidth - viewportEl.offsetWidth);

      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: () => `+=${distance() + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(trackEl, { x: -distance() * self.progress });
          paint();
        },
        onRefresh: paint,
      });

      goToRef.current = (i: number) => {
        const clamped = Math.max(0, Math.min(count - 1, i));
        const p = count > 1 ? clamped / (count - 1) : 0;
        const y = st.start + (st.end - st.start) * p;
        const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
        if (lenis) lenis.scrollTo(y, { duration: 1.1 });
        else window.scrollTo({ top: y, behavior: "smooth" });
      };

      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: EASE.reveal,
        stagger: 0.06,
        scrollTrigger: { trigger: sectionEl, start: "top 70%", once: true },
      });

      paint();
    }, sectionEl);

    return () => ctx.revert();
  }, [section, viewport, track, count]);

  const goTo = useCallback((i: number) => goToRef.current(i), []);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const r = el.getBoundingClientRect();
      const visible = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
      if (!visible) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToRef.current(activeRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToRef.current(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [section]);

  const activeRef = useRef(0);
  activeRef.current = active;

  return { active, goTo };
}
