import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global motion orchestrator.
 * - Lenis smooth scroll (site-wide)
 * - Scroll reveal system via [data-reveal="fade|slide|scale|blur|split|mask|zoom|parallax"]
 * - Magnetic buttons via [data-magnetic]
 * Runs once per route change.
 */
export function MotionProvider() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    // --- Lenis smooth scroll ---
    let lenis: { destroy: () => void; raf: (t: number) => void; on: (e: string, cb: () => void) => void } | null = null;
    let raf = 0;
    let cancelled = false;

    (async () => {
      if (reduce) return;
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }) as unknown as typeof lenis;
      lenis?.on("scroll", () => ScrollTrigger.update());
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    // --- Scroll reveals ---
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const splits: SplitType[] = [];

      nodes.forEach((el) => {
        const variant = el.dataset.reveal || "fade";
        const delay = parseFloat(el.dataset.revealDelay || "0");
        const trigger = { trigger: el, start: "top 85%", toggleActions: "play none none reverse" as const };

        if (reduce) {
          gsap.set(el, { opacity: 1, clearProps: "all" });
          return;
        }

        switch (variant) {
          case "slide":
            gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay, scrollTrigger: trigger });
            break;
          case "scale":
            gsap.fromTo(el, { scale: 0.9, opacity: 0, filter: "blur(8px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "expo.out", delay, scrollTrigger: trigger });
            break;
          case "blur":
            gsap.fromTo(el, { opacity: 0, filter: "blur(16px)" }, { opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out", delay, scrollTrigger: trigger });
            break;
          case "mask":
            gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)", opacity: 1 }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.inOut", delay, scrollTrigger: trigger });
            break;
          case "zoom":
            gsap.fromTo(el, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: "expo.out", delay, scrollTrigger: trigger });
            break;
          case "parallax": {
            const amt = parseFloat(el.dataset.revealAmount || "60");
            gsap.fromTo(el, { y: amt }, {
              y: -amt,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
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
              duration: 1,
              ease: "expo.out",
              stagger: 0.05,
              delay,
              scrollTrigger: trigger,
            });
            break;
          }
          case "fade":
          default:
            gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay, scrollTrigger: trigger });
        }
      });

      // --- Magnetic buttons ---
      if (!isTouch && !reduce) {
        const magnets = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
        magnets.forEach((m) => {
          const strength = parseFloat(m.dataset.magneticStrength || "0.35");
          const move = (e: MouseEvent) => {
            const r = m.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width / 2)) * strength;
            const y = (e.clientY - (r.top + r.height / 2)) * strength;
            gsap.to(m, { x, y, duration: 0.5, ease: "power3.out" });
          };
          const leave = () => gsap.to(m, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
          m.addEventListener("mousemove", move);
          m.addEventListener("mouseleave", leave);
          (m as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
            m.removeEventListener("mousemove", move);
            m.removeEventListener("mouseleave", leave);
          };
        });
      }

      // let ScrollTrigger settle after images/fonts
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        splits.forEach((s) => s.revert());
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((m) => {
          (m as HTMLElement & { _cleanup?: () => void })._cleanup?.();
        });
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      ctx.revert();
    };
  }, []);

  return null;
}
