import { memo, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "../../lib/services";
import { useCoverflow } from "../../hooks/useCoverflow";
import { prefersReducedMotion } from "../../lib/motion/easing";

export const ServicesShowcase = memo(function ServicesShowcase() {
  const { index, go, goTo, offsetOf, setPaused, dragBind } = useCoverflow(services.length, 4200);
  const bind = dragBind();
  const active = services[index];

  /* cursor-driven rotation: pointer left of centre spins left, right spins right */
  const stage = useRef<HTMLDivElement>(null);
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
      id="services"
      className="relative isolate overflow-hidden border-y border-white/[0.06] bg-[#08080A] py-24 text-[#F5F1EA] md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(127,216,232,0.07),transparent_65%)]"
      />

      <header className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-end gap-6 px-5 sm:px-8">
        <div className="min-w-0">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#7FD8E8]/80">
            Fivup Leads &amp; Ecommerce
          </span>
          <h2 className="mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.03em]">
            Services &amp; expertise
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#9A968F] sm:text-base">
            Move your cursor left or right of centre — the ring rotates endlessly in that direction. Drag to spin it
            yourself.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <button
            type="button"
            aria-label="Previous service"
            onClick={() => go(-1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next service"
            onClick={() => go(1)}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* rotating ring stage */}
      <div
        ref={stage}
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
          const x = (e.clientX - r.left) / (r.width || 1); // 0..1
          dir.current = (x - 0.5) * 2;
        }}
        className="relative mt-24 h-[58vh] min-h-[420px] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing [perspective:1700px] md:mt-32 md:h-[62vh]"
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {services.map((s, i) => {
            const o = offsetOf(i);
            const a = Math.min(Math.abs(o), 3.4);
            const hidden = a > 2.7;
            return (
              <article
                key={s.id}
                aria-hidden={hidden}
                className="absolute left-1/2 top-1/2 w-[76vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:w-[46vw] md:w-[26vw] md:max-w-[380px]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${o * 78}%) translateZ(${-a * 200}px) rotateY(${o * -28}deg) scale(${1 - a * 0.06})`,
                  opacity: hidden ? 0 : 1 - a * 0.3,
                  filter: `blur(${(a * 1.7).toFixed(2)}px) brightness(${1 - a * 0.15})`,
                  zIndex: 100 - Math.round(a * 10),
                  transition: "opacity 500ms ease, filter 500ms ease",
                  pointerEvents: a < 0.5 ? "auto" : "none",
                }}
              >
                <div
                  className={`group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[26px] border p-8 backdrop-blur-sm transition-colors duration-500 ${
                    a < 0.5
                      ? "border-[#7FD8E8]/30 bg-white/[0.05] shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[#7FD8E8]">
                        <s.Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="text-xs tabular-nums tracking-[0.25em] text-white/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight text-[#F5F1EA]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#9A968F]">{s.description}</p>
                    <ul className="mt-6 space-y-2 border-t border-white/[0.07] pt-5">
                      {s.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-[#B9B4AC]">
                          <span className="h-px w-4 shrink-0 bg-[#7FD8E8]/70" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={`/services#${s.id}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[#F5F1EA] transition-colors hover:text-[#7FD8E8]"
                  >
                    Explore service
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <span
          aria-hidden
          className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.35em] text-white/30 transition-opacity duration-500 ${
            hovering ? "opacity-0" : "opacity-100"
          }`}
        >
          Hover left or right to rotate
        </span>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
        <span className="text-sm text-[#F5F1EA]">{active?.title}</span>
        <div className="h-px flex-1 bg-white/10">
          <div
            className="h-px bg-[#7FD8E8] transition-[width] duration-500 ease-out"
            style={{ width: `${((index + 1) / services.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums tracking-[0.25em] text-white/40">
          {String(index + 1).padStart(2, "0")} / {services.length}
        </span>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-7xl flex-wrap items-center gap-2 px-5 sm:px-8">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Show ${s.title}`}
            onClick={() => goTo(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
              i === index ? "bg-[#7FD8E8]" : "bg-white/15"
            }`}
          />
        ))}
      </div>
    </section>
  );
});
