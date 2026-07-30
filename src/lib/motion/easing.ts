import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

/**
 * Cinematic easing vocabulary.
 * One curve per intent — reused everywhere so motion feels handcrafted
 * instead of a bag of generic `power3.out` calls.
 */
let registered = false;
function register() {
  if (registered) return;
  registered = true;
  CustomEase.create("cine-reveal", "0.16,1,0.3,1"); // long, luxurious settle
  CustomEase.create("cine-glide", "0.22,1,0.36,1"); // secondary content
  CustomEase.create("cine-exit", "0.65,0,0.35,1"); // symmetrical departure
  CustomEase.create("cine-snap", "0.34,1.2,0.36,1"); // micro-interaction pop
  CustomEase.create("cine-swift", "0.4,0,0.2,1"); // UI chrome
}
register();

export const EASE = {
  reveal: "cine-reveal",
  glide: "cine-glide",
  exit: "cine-exit",
  snap: "cine-snap",
  swift: "cine-swift",
  drift: "sine.inOut",
  none: "none",
} as const;

/** Shared timing scale — keeps every timeline in the same rhythm. */
export const DUR = {
  micro: 0.35,
  fast: 0.55,
  base: 0.8,
  slow: 1.1,
  hero: 1.35,
} as const;

/** Stagger scale, tuned so groups read as one gesture. */
export const STAGGER = {
  tight: 0.045,
  base: 0.07,
  loose: 0.11,
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
