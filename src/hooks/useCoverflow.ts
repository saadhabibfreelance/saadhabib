import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion/easing";

/**
 * Infinite 3D coverflow engine.
 *
 * Keeps a floating "position" value that eases toward a target index each
 * frame. Cards read their signed, wrap-aware distance from the position and
 * derive translate / rotate / depth / scale / opacity / blur from it.
 */
export function useCoverflow(count: number, autoMs = 5200) {
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const target = useRef(0);
  const pos = useRef(0);
  const paused = useRef(false);
  const dragging = useRef(false);

  const go = useCallback(
    (delta: number) => {
      target.current += delta;
    },
    [],
  );

  const goTo = useCallback(
    (i: number) => {
      const current = Math.round(target.current);
      const from = ((current % count) + count) % count;
      let diff = i - from;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      go(diff);
    },
    [count, go],
  );

  /* rAF easing loop */
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let raf = 0;
    const loop = () => {
      const diff = target.current - pos.current;
      pos.current += reduce ? diff : diff * 0.085;
      if (Math.abs(diff) < 0.0004) pos.current = target.current;
      setPosition((p) => (Math.abs(p - pos.current) < 0.0004 ? p : pos.current));
      const nearest = ((Math.round(pos.current) % count) + count) % count;
      setIndex((prev) => (prev === nearest ? prev : nearest));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  /* auto rotation */
  useEffect(() => {
    if (prefersReducedMotion() || autoMs <= 0) return;
    const id = window.setInterval(() => {
      if (!paused.current && !dragging.current && !document.hidden) go(1);
    }, autoMs);
    return () => window.clearInterval(id);
  }, [autoMs, go]);

  const setPaused = useCallback((v: boolean) => {
    paused.current = v;
  }, []);

  const cleanupWheel = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanupWheel.current?.(), []);

  /**
   * Wheel control — attach to the gallery stage.
   * Wheel down → next card, wheel up → previous. The listener lives on the
   * element itself (non-passive) so the page keeps scrolling normally
   * everywhere else; nothing global is hijacked and the body is never locked.
   */
  const wheelRef = useCallback((el: HTMLElement | null) => {
    cleanupWheel.current?.();
    cleanupWheel.current = null;
    if (!el) return;
    let snap = 0;
    const onWheel = (e: WheelEvent) => {
      const raw = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (!raw) return;
      e.preventDefault();
      const step = e.deltaMode === 1 ? raw * 16 : e.deltaMode === 2 ? raw * 400 : raw;
      target.current += Math.max(-1.1, Math.min(1.1, step / 240));
      window.clearTimeout(snap);
      snap = window.setTimeout(() => {
        target.current = Math.round(target.current);
      }, 150);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    cleanupWheel.current = () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(snap);
    };
  }, []);



  /* pointer drag */
  const dragBind = useCallback(() => {
    let startX = 0;
    let startTarget = 0;
    let width = 1;
    let moved = false;

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      target.current = startTarget - (dx / width) * 2.4;
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      target.current = Math.round(target.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    return {
      onPointerDown: (e: React.PointerEvent) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        dragging.current = true;
        moved = false;
        startX = e.clientX;
        startTarget = target.current;
        width = (e.currentTarget as HTMLElement).offsetWidth || 1;
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      },
      onClickCapture: (e: React.MouseEvent) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
    };
  }, [count]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!paused.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /** Signed, wrap-aware offset of card `i` from the current position. */
  const offsetOf = useCallback(
    (i: number) => {
      let d = i - position;
      d = ((d % count) + count) % count;
      if (d > count / 2) d -= count;
      return d;
    },
    [count, position],
  );

  return { index, position, go, goTo, offsetOf, setPaused, dragBind, wheelRef };
}
