import { memo, useRef } from "react";
import { skillCategories } from "../../lib/skills";
import { useHorizontalShowcase } from "../../hooks/useHorizontalShowcase";

export const Skills = memo(function Skills() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { active, goTo } = useHorizontalShowcase(section, viewport, track, skillCategories.length);

  return (
    <section
      ref={section}
      id="skills"
      className="relative overflow-hidden bg-[#08080A] py-20 text-[#EDE8E0] md:min-h-screen md:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_110%,rgba(200,169,106,0.08),transparent_65%)]" />

      <div className="relative z-10 flex flex-col justify-center gap-10 md:min-h-screen md:py-24">
        <header className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[#C8A96A]">Capability map</span>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-tight text-[#F5F1EA] sm:text-6xl">
            Skills, grouped by discipline
          </h2>
        </header>

        <div
          ref={viewport}
          className="relative w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [perspective:1600px] [scrollbar-width:none] md:snap-none md:overflow-hidden"
        >
          <div
            ref={track}
            className="flex w-max items-stretch gap-5 px-[calc(50vw-9rem)] py-8 sm:gap-8 sm:px-[calc(50vw-13rem)] [transform-style:preserve-3d]"
          >
            {skillCategories.map((cat, i) => (
              <article
                key={cat.id}
                data-card
                className={`group/card relative flex w-[18rem] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border p-7 sm:w-[26rem] sm:p-9 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-1 hover:border-[hsl(190_60%_70%/0.35)] ${
                  i === active
                    ? "border-[hsl(38_35%_60%/0.45)] bg-[hsl(40_10%_96%/0.05)]"
                    : "border-[hsl(0_0%_100%/0.08)] bg-[hsl(0_0%_100%/0.02)]"
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/card:opacity-100"
                  style={{
                    background:
                      "radial-gradient(500px 260px at 50% -10%, rgba(127,216,232,0.10), transparent 70%)",
                  }}
                />
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-[hsl(0_0%_100%/0.1)] text-[#C8A96A] transition-colors duration-500 group-hover/card:text-[#7FD8E8]">
                  <cat.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-7 text-2xl font-semibold tracking-tight text-[#F5F1EA] sm:text-3xl">{cat.label}</h3>
                <p className="mt-3 text-sm text-[#9A968F]">{cat.blurb}</p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-[hsl(0_0%_100%/0.12)] px-3 py-1.5 text-xs tracking-wide text-[#B9B4AC]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-5 sm:px-8">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${cat.label}`}
              className={`h-px flex-1 transition-colors duration-500 ${
                i === active ? "bg-[#C8A96A]" : "bg-[hsl(0_0%_100%/0.12)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
