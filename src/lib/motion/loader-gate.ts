/**
 * Tiny gate coordinating the intro Loader with the Hero reveal timeline.
 * The Hero builds its timeline paused and plays it once the loader is done,
 * so the reveal never starts underneath the loading screen.
 */
let ready = false;
const listeners = new Set<() => void>();

export function isAppReady() {
  return ready;
}

export function markAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

/** Runs `cb` immediately if already revealed, otherwise once the loader finishes. */
export function onAppReady(cb: () => void) {
  if (ready) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
