import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lightweight horizontal showcase controller.
 *
 * - Clamped index (no infinite ring)
 * - Wheel steps while hovering, but releases the page scroll at either end
 * - Pointer drag / touch swipe
 * - Arrow keys while hovered
 */
export function useShowcase(count: number) {
  const [index, setIndex] = useState(0);
  const hovering = useRef(false);

  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(count - 1, i))),
    [count],
  );
  const go = useCallback(
    (d: number) => setIndex((p) => Math.max(0, Math.min(count - 1, p + d))),
    [count],
  );

  const cleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanup.current?.(), []);

  const stageRef = useCallback(
    (el: HTMLElement | null) => {
      cleanup.current?.();
      cleanup.current = null;
      if (!el) return;

      let lock = 0;
      const onWheel = (e: WheelEvent) => {
        const raw = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(raw) < 2) return;
        const dir = raw > 0 ? 1 : -1;
        // let the page scroll normally once the showcase reaches an end
        setIndex((p) => {
          const next = p + dir;
          if (next < 0 || next > count - 1) return p;
          const now = Date.now();
          if (now < lock) return p;
          lock = now + 320;
          e.preventDefault();
          return next;
        });
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      cleanup.current = () => el.removeEventListener("wheel", onWheel);
    },
    [count],
  );

  const dragBind = useCallback(() => {
    let startX = 0;
    let active = false;
    let moved = false;

    const end = () => {
      active = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", end);
    };
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 60) {
        moved = true;
        go(dx < 0 ? 1 : -1);
        startX = e.clientX;
      }
    };

    return {
      onPointerDown: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        active = true;
        moved = false;
        startX = e.clientX;
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", end);
      },
      onClickCapture: (e: React.MouseEvent) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
      onPointerEnter: () => {
        hovering.current = true;
      },
      onPointerLeave: () => {
        hovering.current = false;
      },
    };
  }, [go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!hovering.current) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return { index, go, goTo, stageRef, dragBind };
}
