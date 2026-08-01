import { memo, useRef } from "react";
import { useAmbientBackground } from "../hooks/useAmbientBackground";

const particles = Array.from({ length: 34 }, (_, i) => ({
  top: `${(i * 29) % 100}%`,
  left: `${(i * 61) % 100}%`,
  opacity: 0.2 + ((i * 17) % 50) / 100,
  animation: `ambFloat ${14 + (i % 9) * 2}s ease-in-out ${i * 0.35}s infinite alternate`,
}));

const beams = [
  { left: "8%", w: "22vw", delay: "0s", dur: "34s", rotate: "-14deg" },
  { left: "42%", w: "16vw", delay: "-11s", dur: "44s", rotate: "10deg" },
  { left: "74%", w: "26vw", delay: "-22s", dur: "38s", rotate: "-6deg" },
];

/**
 * Global six-layer ambient background.
 * Fixed behind all content: gradient · blobs · grid · noise · particles · beams,
 * plus a soft cursor-tracking glow.
 */
export const AmbientBackground = memo(function AmbientBackground() {
  const root = useRef<HTMLDivElement>(null);
  const blobs = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);
  const cursorGlow = useRef<HTMLDivElement>(null);

  useAmbientBackground({ root, blobs, grid, particles: particlesRef, beams: beamsRef, cursorGlow });

  return (
    <div ref={root} aria-hidden className="amb-root pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Layer 1 — dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(var(--amb-angle), #05070f 0%, #080b1c 45%, #05070f 100%)",
        }}
      />

      {/* Layer 2 — large blurred moving blobs */}
      <div ref={blobs} className="absolute inset-[-20%]" style={{ opacity: "var(--amb-intensity)" }}>
        <span
          className="absolute left-[8%] top-[10%] block h-[46vw] w-[46vw] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--amb-a), transparent 68%)",
            filter: "blur(var(--amb-blur))",
            opacity: 0.5,
            animation: "ambBlob 30s ease-in-out infinite alternate",
          }}
        />
        <span
          className="absolute right-[6%] top-[38%] block h-[40vw] w-[40vw] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--amb-b), transparent 68%)",
            filter: "blur(var(--amb-blur))",
            opacity: 0.42,
            animation: "ambBlob 42s ease-in-out -12s infinite alternate-reverse",
          }}
        />
        <span
          className="absolute bottom-[4%] left-[36%] block h-[38vw] w-[38vw] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--amb-a), transparent 70%)",
            filter: "blur(var(--amb-blur))",
            opacity: 0.3,
            animation: "ambBlob 52s ease-in-out -26s infinite alternate",
          }}
        />
      </div>

      {/* Layer 3 — subtle animated grid */}
      <div
        ref={grid}
        className="absolute inset-[-10%] opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 78%)",
          animation: "ambGrid 60s linear infinite",
        }}
      />

      {/* Layer 4 — noise texture */}
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* Layer 5 — tiny floating particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute block h-[3px] w-[3px] rounded-full bg-white/70"
            style={{ ...p, filter: "blur(0.4px)" }}
          />
        ))}
      </div>

      {/* Layer 6 — moving soft light beams */}
      <div ref={beamsRef} className="absolute inset-0 overflow-hidden">
        {beams.map((b, i) => (
          <span
            key={i}
            className="absolute -top-1/2 block h-[200%]"
            style={{
              left: b.left,
              width: b.w,
              transform: `rotate(${b.rotate})`,
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.055), transparent)",
              filter: "blur(28px)",
              animation: `ambBeam ${b.dur} ease-in-out ${b.delay} infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Cursor-following soft radial glow */}
      <div
        ref={cursorGlow}
        className="absolute left-0 top-0 h-[640px] w-[640px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--amb-b) 26%, transparent), transparent 62%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />
    </div>
  );
});
