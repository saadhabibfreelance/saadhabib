import { memo } from "react";
import { Mail, Phone } from "lucide-react";
import { Section } from "./Section";

export const CTA = memo(function CTA() {
  return (
    <Section index={6} id="contact">
      <div
        data-reveal="scale"
        className="mx-auto max-w-4xl rounded-[2.5rem] bg-[#0B0B0C] px-6 py-16 text-center text-white shadow-2xl sm:px-12"
      >
        <h2 data-reveal="split" className="text-4xl font-black tracking-tight text-white sm:text-6xl">
          Let's ship <span className="text-[#C8A96A]">something</span>.
        </h2>
        <p data-reveal="fade" data-reveal-delay="0.18" className="mx-auto mt-6 max-w-xl text-lg text-white/85">
          Tell me about your project — I'll reply within 24 hours with scope, price, and a timeline.
        </p>
        <div data-reveal="fade" data-reveal-delay="0.3" className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            data-magnetic
            href="tel:+923002019194"
            className="inline-flex items-center gap-2 rounded-full bg-[#C8A96A] px-7 py-4 text-base font-bold text-[#0B0B0C] shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
          >
            <Phone className="h-4 w-4" />
            +92 300 201 9194
          </a>
          <a
            data-magnetic
            href="mailto:saadhabibwebsite@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-7 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-white hover:text-[#0B0B0C]"
          >
            <Mail className="h-4 w-4" />
            Email Me
          </a>
        </div>
      </div>
    </Section>
  );
});
