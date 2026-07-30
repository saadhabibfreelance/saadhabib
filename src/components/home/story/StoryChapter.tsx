import { forwardRef, memo } from "react";
import { ArrowRight } from "lucide-react";
import type { Scene } from "./scenes";
import { StoryVisual } from "./StoryVisual";

type Props = { scene: Scene; index: number; total: number };

export const StoryChapter = memo(
  forwardRef<HTMLElement, Props>(function StoryChapter({ scene, index, total }, ref) {
    const flip = index % 2 === 1;
    const lines = scene.title.split("\n");
    return (
      <section ref={ref} className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden">
        <div data-bg aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: scene.gradient }} />
        <div
          data-glow1
          aria-hidden
          className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{ background: scene.glow1 }}
        />
        <div
          data-glow2
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-10 -z-10 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{ background: scene.glow2 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-[0.1]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />

        <div
          className={`mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 py-20 md:px-8 lg:gap-16 lg:px-20 lg:py-28 ${
            flip ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-[1.05fr_1fr]"
          } grid-cols-1`}
        >
          <div className={flip ? "lg:order-2" : ""}>
            <div
              data-eyebrow
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur"
            >
              <scene.Icon className="h-3.5 w-3.5" style={{ color: scene.accent }} />
              {scene.eyebrow}
            </div>
            <h2 className="mt-8 font-[Space_Grotesk,ui-sans-serif] text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-white">
              {lines.map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  <span data-line className="inline-block">
                    {li === lines.length - 1 ? (
                      <>
                        {line.split(" ").slice(0, -1).join(" ")}{" "}
                        <span
                          className="bg-clip-text text-transparent"
                          style={{ backgroundImage: `linear-gradient(90deg, ${scene.glow1}, ${scene.glow2})` }}
                        >
                          {line.split(" ").slice(-1)[0]}
                        </span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h2>
            <p data-para className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              {scene.paragraph}
            </p>
            <div data-cta className="mt-9">
              <a
                data-magnetic
                href={scene.href}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-white/[0.1]"
                style={{ boxShadow: `0 10px 40px -12px ${scene.accent}80` }}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full" />
                {scene.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <div data-visual className={`${flip ? "lg:order-1" : ""} will-change-transform`}>
            <StoryVisual scene={scene} />
          </div>
        </div>

        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          {Array.from({ length: total }).map((_, di) => (
            <span
              key={di}
              className="h-8 w-[2px] rounded-full transition-colors duration-300"
              style={{ background: di === index ? scene.accent : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>
      </section>
    );
  }),
);
