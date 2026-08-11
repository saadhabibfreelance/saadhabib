import { memo, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects } from "../../lib/projects";
import { useShowcase } from "../../hooks/useShowcase";

export const PortfolioGallery = memo(function PortfolioGallery() {
  const { index, go, goTo, stageRef, dragBind } = useShowcase(projects.length);
  const bind = dragBind();
  const featured = projects[index];
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[#060607] py-24 text-[#F5F1EA] md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-5%,rgba(120,200,220,0.07),transparent_60%)]"
      />

      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 sm:px-8">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#7FD8E8]/80">
          Selected work
        </span>
        <h2 className="max-w-3xl text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          A portfolio you move through.
        </h2>
        <p className="max-w-xl text-sm text-[#9A968F] sm:text-base">
          Scroll over the showcase, drag it, or use the arrows to step between projects.
        </p>
      </header>

      {/* cinematic horizontal showcase */}
      <div
        ref={stageRef}
        {...bind}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          cancelAnimationFrame(frame.current);
          frame.current = requestAnimationFrame(() => setParallax({ x, y }));
        }}
        onPointerOut={() => setParallax({ x: 0, y: 0 })}
        className="relative mx-auto mt-14 w-full max-w-[1600px] cursor-grab touch-pan-y select-none overflow-hidden px-5 py-6 active:cursor-grabbing sm:px-8 md:mt-20"
      >
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {projects.map((p, i) => {
            const d = i - index;
            const a = Math.abs(d);
            if (a > 2) return null;
            const active = d === 0;
            return (
              <article
                key={p.id}
                className="shrink-0 transition-[width,opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  width: active ? "min(62vw, 760px)" : "min(22vw, 240px)",
                  opacity: active ? 1 : 0.42 - (a - 1) * 0.18,
                  filter: active ? "none" : `blur(${a * 1.4}px)`,
                  transform: active
                    ? `translate3d(${parallax.x * 14}px, ${parallax.y * 10}px, 0)`
                    : `scale(${1 - a * 0.05})`,
                }}
              >
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${p.title}`}
                  className="group relative block w-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] text-left shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
                  style={{ aspectRatio: active ? "16 / 10" : "3 / 4" }}
                >
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.discipline}`}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {active && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
                      <span className="block">
                        <span className="block text-[0.62rem] uppercase tracking-[0.32em] text-[#7FD8E8]/80">
                          {p.discipline} · {p.year}
                        </span>
                        <span className="mt-2 block text-2xl font-semibold tracking-tight md:text-4xl">
                          {p.title}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-[#7FD8E8]">
                        View Project
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </span>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* caption + controls */}
      <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 items-end gap-8 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div key={featured?.id} className="min-w-0 animate-fade-in">
          <p className="max-w-xl text-base leading-relaxed text-[#9A968F]">{featured?.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <span className="text-sm tracking-wide">{featured?.metric}</span>
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
            disabled={index === 0}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8] disabled:opacity-30"
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
            disabled={index === projects.length - 1}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8] disabled:opacity-30"
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
