import { memo } from "react";
import { Star } from "lucide-react";
import { Section } from "./Section";

const testimonials = [
  {
    name: "Ahmed R.",
    role: "E-commerce Owner",
    text: "Saad rebuilt my Shopify store and cleaned up thousands of product listings. Looks great and converts better.",
    color: "bg-[#1A1918]",
  },
  {
    name: "Sarah L.",
    role: "Sales Manager",
    text: "The B2B lead list was clean, verified, and delivered on time. Highly recommend.",
    color: "bg-[#C8A96A] text-[#0B0B0C]",
  },
  {
    name: "James K.",
    role: "Marketing Consultant",
    text: "Reliable, communicative, and fast. My go-to for data entry and email cleaning.",
    color: "bg-[#2A2724]",
  },
];

export const Testimonials = memo(function Testimonials() {
  return (
    <Section index={5} id="testimonials">
      <div className="text-white">
        <div className="text-center">
          <h2 data-reveal="split" className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            Loved by <span className="text-[#C8A96A]">clients</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              data-reveal="scale"
              data-reveal-delay={String(i * 0.1)}
              className={`rounded-3xl p-8 shadow-2xl ${t.color} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:rotate-[-1deg] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.55)]`}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-lg font-medium leading-snug">"{t.text}"</p>
              <div className="mt-6 border-t border-current/20 pt-4">
                <p className="font-black">{t.name}</p>
                <p className="text-sm opacity-80">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});
