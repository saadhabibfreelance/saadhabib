import { memo } from "react";
import { Section } from "./Section";

const stats = [
  { value: "500+", label: "Projects delivered" },
  { value: "150+", label: "Happy clients" },
  { value: "5+", label: "Years experience" },
  { value: "24h", label: "Avg. response" },
];

const marqueeWords = [
  "Data Entry",
  "Lead Gen",
  "Shopify",
  "Amazon",
  "Email Marketing",
  "List Building",
  "Extraction",
];

export const Statistics = memo(function Statistics() {
  return (
    <Section index={2} id="stats">
      <div className="text-center text-white">
        <h2 data-reveal="mask" className="text-4xl font-black tracking-tight text-white sm:text-6xl">
          Numbers that <span className="text-[#FFEE00]">deliver</span>.
        </h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal="scale"
              data-reveal-delay={String(i * 0.07)}
              className="rounded-3xl border border-white/30 bg-white/10 p-8 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-[#FFEE00] hover:bg-white/15 hover:shadow-[0_20px_50px_-10px_rgba(255,238,0,0.35)]"
            >
              <div className="text-6xl font-black text-[#FFEE00] drop-shadow">{s.value}</div>
              <div className="mt-3 text-sm font-semibold uppercase tracking-widest text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap gap-12 text-white/60 text-xl font-bold uppercase tracking-widest">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12">
              {marqueeWords.map((w) => (
                <span key={w} className="flex items-center gap-12">
                  {w} <span className="text-[#FFEE00]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});
