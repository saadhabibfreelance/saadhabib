import { memo, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects } from "../../lib/projects";
import { useCoverflow } from "../../hooks/useCoverflow";
import { prefersReducedMotion } from "../../lib/motion/easing";

export const PortfolioGallery = memo(function PortfolioGallery() {
  const { index, go, goTo, offsetOf, setPaused, dragBind } = useCoverflow(projects.length);
  const bind = dragBind();
  const featured = projects[index];

  /* cursor-driven endless rotation: pointer left of centre spins left, right spins right */
  const dir = useRef(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const loop = () => {
      if (Math.abs(dir.current) > 0.12) go(dir.current * 0.028);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [go]);

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[#060607] py-24 text-[#F5F1EA] md:py-32"
    >

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-5%,rgba(120,200,220,0.07),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />

      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 sm:px-8">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#7FD8E8]/80">
          Selected work
        </span>
        <h2 className="max-w-3xl text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-[#F5F1EA]">
          A portfolio you move through.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[#9A968F] sm:text-base">
          Move your cursor left or right of centre — the ring rotates endlessly in that direction. Drag to spin it
          yourself.
        </p>
      </header>

      {/* rotating ring stage */}
      <div
        {...bind}
        onPointerEnter={() => {
          setPaused(true);
          setHovering(true);
        }}
        onPointerLeave={() => {
          setPaused(false);
          setHovering(false);
          dir.current = 0;
        }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / (r.width || 1);
          dir.current = (x - 0.5) * 2;
        }}
        className="relative mt-24 h-[62vh] min-h-[420px] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing [perspective:1800px] md:mt-32 md:h-[66vh]"
      >

        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {projects.map((p, i) => {
            const o = offsetOf(i);
            const a = Math.min(Math.abs(o), 3);
            const hidden = a > 2.6;
            return (
              <article
                key={p.id}
                aria-hidden={hidden}
                className="absolute left-1/2 top-1/2 aspect-[4/5] w-[74vw] max-w-[430px] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:w-[46vw] md:w-[27vw] md:max-w-[400px]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${o * 72}%) translateZ(${-a * 190}px) rotateY(${o * -26}deg) scale(${1 - a * 0.06})`,
                  opacity: hidden ? 0 : 1 - a * 0.3,
                  filter: `blur(${(a * 1.8).toFixed(2)}px) brightness(${1 - a * 0.16})`,
                  zIndex: 100 - Math.round(a * 10),
                  transition: "opacity 500ms ease, filter 500ms ease",
                  pointerEvents: a < 0.5 ? "auto" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  tabIndex={hidden ? -1 : 0}
                  className="group relative block h-full w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#0B0B0C] text-left shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
                >
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.discipline}`}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-90 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <span className="block">
                      <span className="block text-[0.62rem] uppercase tracking-[0.32em] text-[#7FD8E8]/80">
                        {p.discipline}
                      </span>
                      <span className="mt-2 block text-2xl font-semibold tracking-tight text-[#F5F1EA]">
                        {p.title}
                      </span>
                    </span>
                    <span className="mb-1 text-[0.68rem] tracking-widest text-white/45">{p.year}</span>
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* caption + controls */}
      <div className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-1 items-end gap-8 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div key={featured?.id} className="min-w-0 animate-fade-in">
          <p className="max-w-xl text-base leading-relaxed text-[#9A968F]">{featured?.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <span className="text-sm tracking-wide text-[#F5F1EA]">{featured?.metric}</span>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm text-[#7FD8E8] transition-colors hover:text-[#F5F1EA]"
            >
              Explore the work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => go(-1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 text-[#F5F1EA] transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-xs tracking-[0.3em] text-white/40">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => go(1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 text-[#F5F1EA] transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl items-center gap-2 px-5 sm:px-8">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Show ${p.title}`}
            onClick={() => goTo(i)}
            className={`h-px flex-1 transition-colors duration-500 ${
              i === index ? "bg-[#7FD8E8]" : "bg-white/12"
            }`}
          />
        ))}
      </div>
    </section>
  );
});
