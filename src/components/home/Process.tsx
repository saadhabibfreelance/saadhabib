import { memo } from "react";
import { Clock, Shield, Star, Zap } from "lucide-react";
import { Section } from "./Section";

const steps = [
  { icon: Zap, title: "Discuss", text: "Tell me what you need over email or a quick call.", color: "bg-[#FF6B6B]" },
  { icon: Shield, title: "Quote", text: "I send a clear scope, price, and timeline.", color: "bg-[#4ECDC4]" },
  { icon: Clock, title: "Deliver", text: "I execute the work with daily updates.", color: "bg-[#FFD93D] text-[#1A1A2E]" },
  { icon: Star, title: "Refine", text: "Revisions until you're fully satisfied.", color: "bg-[#845EC2]" },
];

export const Process = memo(function Process() {
  return (
    <Section index={4} id="process">
      <div className="text-white">
        <div className="text-center">
          <h2 data-reveal="blur" className="text-4xl font-black tracking-tight sm:text-6xl">
            How we <span className="text-[#FFD93D]">work</span>.
          </h2>
          <p data-reveal="fade" data-reveal-delay="0.16" className="mt-4 text-lg text-white/85">
            Transparent, simple, and fast — from first message to final delivery.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              data-reveal="slide"
              data-reveal-delay={String(i * 0.09)}
              className={`rounded-3xl p-8 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)] ${step.color}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 backdrop-blur">
                <step.icon className="h-7 w-7" />
              </div>
              <div className="mt-5 text-xs font-bold uppercase tracking-widest opacity-70">Step 0{i + 1}</div>
              <h3 className="mt-1 text-2xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm opacity-90">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});
