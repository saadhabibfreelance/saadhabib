import { memo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "../../lib/services";
import marketplace from "../../assets/work-marketplace.jpg";
import storefront from "../../assets/work-storefront.jpg";
import leads from "../../assets/work-leads.jpg";
import email from "../../assets/work-email.jpg";
import design from "../../assets/work-design.jpg";
import web from "../../assets/work-web.jpg";

const visuals = [marketplace, leads, email, storefront, design, web];

export const ServicesShowcase = memo(function ServicesShowcase() {
  const [index, setIndex] = useState(0);
  const active = services[index];
  const Icon = active?.Icon;

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-y border-white/[0.06] bg-[#08080A] py-24 text-[#F5F1EA] md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(127,216,232,0.07),transparent_65%)]"
      />

      <header className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#7FD8E8]/80">
          Fivup Leads &amp; Ecommerce
        </span>
        <h2 className="mt-4 max-w-3xl text-[clamp(2.1rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          Services &amp; expertise
        </h2>
        <p className="mt-4 max-w-xl text-sm text-[#9A968F] sm:text-base">
          Browse the list — each service opens its own detail panel.
        </p>
      </header>

      <div className="mx-auto mt-14 grid w-full max-w-7xl gap-10 px-5 sm:px-8 md:mt-20 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14">
        {/* numbered list */}
        <ul className="min-w-0 border-t border-white/[0.08]">
          {services.map((s, i) => {
            const on = i === index;
            return (
              <li key={s.id} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onMouseEnter={() => setIndex(i)}
                  onFocus={() => setIndex(i)}
                  onClick={() => setIndex(i)}
                  aria-current={on}
                  className="group flex w-full items-center gap-4 py-4 text-left transition-colors"
                >
                  <span
                    className={`text-xs tabular-nums tracking-[0.25em] transition-colors ${
                      on ? "text-[#7FD8E8]" : "text-white/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-lg font-medium tracking-tight transition-all duration-500 sm:text-xl ${
                      on ? "translate-x-1 text-[#F5F1EA]" : "text-[#9A968F]"
                    }`}
                  >
                    {s.title}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-all duration-500 ${
                      on ? "translate-x-0 text-[#7FD8E8] opacity-100" : "-translate-x-2 opacity-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* dynamic panel */}
        <div className="min-w-0 md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                key={active?.id}
                src={visuals[index % visuals.length]}
                alt={active?.title ?? "Service"}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="h-full w-full animate-fade-in object-cover opacity-80"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/30 to-transparent" />
              <span className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-black/40 text-[#7FD8E8] backdrop-blur">
                {Icon ? <Icon className="h-5 w-5" strokeWidth={1.5} /> : null}
              </span>
              <span className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/60 backdrop-blur">
                {active?.category}
              </span>
            </div>

            <div key={active?.id} className="animate-fade-in p-6 sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{active?.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9A968F] sm:text-base">
                {active?.description}
              </p>
              <ul className="mt-6 grid gap-2 border-t border-white/[0.07] pt-5 sm:grid-cols-2">
                {active?.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#B9B4AC]">
                    <span className="h-px w-4 shrink-0 bg-[#7FD8E8]/70" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`/services#${active?.id}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors hover:text-[#7FD8E8]"
              >
                Explore service
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
