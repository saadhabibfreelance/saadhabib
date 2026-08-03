import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "../../lib/services";
import { Section } from "./Section";

const cardColors = [
  { bg: "bg-[#FF6B6B]", ring: "hover:ring-[#FFD93D]", text: "text-white" },
  { bg: "bg-[#4ECDC4]", ring: "hover:ring-[#FF6B6B]", text: "text-white" },
  { bg: "bg-[#FFD93D]", ring: "hover:ring-[#1A535C]", text: "text-[#1A1A2E]" },
  { bg: "bg-[#845EC2]", ring: "hover:ring-[#FFC75F]", text: "text-white" },
  { bg: "bg-[#00C9A7]", ring: "hover:ring-[#F9F871]", text: "text-[#0b3a34]" },
  { bg: "bg-[#F9A826]", ring: "hover:ring-[#3A0088]", text: "text-[#2a1600]" },
  { bg: "bg-[#EF476F]", ring: "hover:ring-[#FFD166]", text: "text-white" },
  { bg: "bg-[#06D6A0]", ring: "hover:ring-[#EF476F]", text: "text-[#052e23]" },
  { bg: "bg-[#118AB2]", ring: "hover:ring-[#FFD166]", text: "text-white" },
];

export const Features = memo(function Features() {
  return (
    <Section index={3} id="services">
      <div className="text-[#1A1A2E]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span
              data-reveal="fade"
              className="rounded-full bg-[#1A1A2E] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFEE00]"
            >
              Services
            </span>
            <h2 data-reveal="split" className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Pick your <span className="text-white">superpower</span>.
            </h2>
          </div>
          <Link
            data-magnetic
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A1A2E] px-5 py-3 text-sm font-bold text-white hover:bg-black"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const c = cardColors[i % cardColors.length];
            return (
              <a
                key={service.id}
                href={`/services#${service.id}`}
                data-reveal="scale"
                data-reveal-delay={String((i % 3) * 0.07)}
                className={`group relative overflow-hidden rounded-3xl ${c.bg} ${c.text} p-6 ring-4 ring-transparent shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:rotate-[-1deg] ${c.ring} hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]`}
              >
                <div className="text-5xl transition-transform duration-[420ms] ease-[cubic-bezier(0.34,1.2,0.36,1)] group-hover:scale-125 group-hover:rotate-12">
                  {service.icon}
                </div>
                <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                <p className="mt-2 text-sm opacity-90">{service.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
});
