import { memo, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "../../lib/services";
import { useHorizontalShowcase } from "../../hooks/useHorizontalShowcase";

export const ServicesShowcase = memo(function ServicesShowcase() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { active, goTo } = useHorizontalShowcase(section, viewport, track, services.length);

  return (
    <section
      ref={section}
      id="services"
      className="relative overflow-hidden border-y border-[hsl(0_0%_100%/0.07)] bg-[#0B0B0C] py-20 text-[#EDE8E0] md:min-h-screen md:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(200,169,106,0.10),transparent_65%)]" />

      <div className="relative z-10 flex h-full flex-col justify-center gap-10 md:min-h-screen md:py-24">
        <header className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-end gap-6 px-5 sm:px-8">
          <div className="min-w-0">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[#C8A96A]">
              Fivup Leads &amp; Ecommerce
            </span>
            <h2 className="mt-3 text-4xl font-semibold leading-[0.95] tracking-tight text-[#F5F1EA] sm:text-6xl">
              Services &amp; expertise
            </h2>
            <p className="mt-4 max-w-xl text-sm text-[#9A968F] sm:text-base">
              Twenty disciplines, one accountable team. Scroll to move through the practice.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous service"
              onClick={() => goTo(active - 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-[hsl(0_0%_100%/0.12)] text-[#EDE8E0] transition-colors hover:border-[#C8A96A] hover:text-[#C8A96A]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next service"
              onClick={() => goTo(active + 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-[hsl(0_0%_100%/0.12)] text-[#EDE8E0] transition-colors hover:border-[#C8A96A] hover:text-[#C8A96A]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div
          ref={viewport}
          className="relative w-full overflow-x-auto overflow-y-hidden [perspective:1600px] [scrollbar-width:none] md:overflow-hidden md:snap-none snap-x snap-mandatory"
        >
          <div
            ref={track}
            className="flex w-max items-stretch gap-5 px-[calc(50vw-9rem)] py-8 sm:gap-8 sm:px-[calc(50vw-13rem)] [transform-style:preserve-3d]"
          >
            {services.map((service, i) => {
              const isActive = i === active;
              return (
                <article
                  key={service.id}
                  data-card
                  className={`flex w-[18rem] shrink-0 snap-center flex-col justify-between rounded-2xl border p-7 backdrop-blur-sm transition-colors duration-500 sm:w-[26rem] sm:p-9 ${
                    isActive
                      ? "border-[hsl(38_35%_60%/0.45)] bg-[hsl(40_10%_96%/0.05)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]"
                      : "border-[hsl(0_0%_100%/0.08)] bg-[hsl(0_0%_100%/0.02)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-[hsl(0_0%_100%/0.1)] bg-[hsl(0_0%_100%/0.03)] text-[#C8A96A]">
                        <service.Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="text-xs tabular-nums tracking-[0.25em] text-[#6F6B65]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold leading-tight tracking-tight text-[#F5F1EA] sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#9A968F]">{service.description}</p>
                    <ul className="mt-6 space-y-2 border-t border-[hsl(0_0%_100%/0.07)] pt-5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-[#B9B4AC]">
                          <span className="h-px w-4 shrink-0 bg-[#C8A96A]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={`/services#${service.id}`}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[#EDE8E0] transition-colors hover:text-[#C8A96A]"
                  >
                    Explore service
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
          <div className="h-px flex-1 bg-[hsl(0_0%_100%/0.08)]">
            <div
              className="h-px bg-[#C8A96A] transition-[width] duration-500 ease-out"
              style={{ width: `${((active + 1) / services.length) * 100}%` }}
            />
          </div>
          <span className="text-xs tabular-nums tracking-[0.25em] text-[#6F6B65]">
            {String(active + 1).padStart(2, "0")} / {services.length}
          </span>
        </div>
      </div>
    </section>
  );
});
