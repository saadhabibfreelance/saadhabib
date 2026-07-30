import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Setup = (self: gsap.Context) => void | (() => void);

/**
 * Runs GSAP setup inside a scoped `gsap.context`.
 * Every tween, timeline and ScrollTrigger created inside is reverted
 * automatically on unmount — no orphaned triggers, no leaks.
 */
export function useGsapContext(
  setup: Setup,
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => setupRef.current(self), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

let refreshQueued = false;
/**
 * Coalesces ScrollTrigger.refresh() calls into a single rAF-batched run,
 * so mounting N sections costs one layout pass instead of N.
 */
export function requestScrollTriggerRefresh() {
  if (refreshQueued || typeof window === "undefined") return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
}
