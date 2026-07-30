import { useMagnetic } from "../hooks/useMagnetic";
import { useScrollReveals } from "../hooks/useScrollReveals";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

/**
 * Global motion orchestrator — composition only.
 * All GSAP/ScrollTrigger logic lives in dedicated hooks.
 */
export function MotionProvider() {
  useSmoothScroll();
  useScrollReveals();
  useMagnetic();
  return null;
}
