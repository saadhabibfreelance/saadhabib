import { memo } from "react";
import { ArrowRight, Linkedin } from "lucide-react";
import saadPhoto from "../../assets/saad-habib.png.asset.json";
import { assetUrl } from "../../lib/asset-url";
import { Section } from "./Section";

export const About = memo(function About() {
  return (
    <Section index={1} id="about">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div data-reveal="zoom" className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#FFD93D] to-[#FF6B6B] blur-2xl opacity-70" />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white/80 bg-white shadow-2xl">
            <img
              data-cursor="image"
              src={assetUrl(saadPhoto)}
              alt="Saad Habib"
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="text-white">
          <span data-reveal="fade" className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFD93D]">
            Meet the founder
          </span>
          <h2 data-reveal="split" className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">
            I'm Saad Habib.
          </h2>
          <p data-reveal="slide" data-reveal-delay="0.12" className="mt-6 text-lg text-white/90">
            A freelance professional obsessed with clean data, sharp e-commerce, and pixel-perfect delivery. Years of
            hands-on work across lead generation, list building, email marketing, and Shopify/Amazon setup.
          </p>
          <p data-reveal="fade" data-reveal-delay="0.2" className="mt-4 text-white/80">
            Solo entrepreneur or growing team — I take the repetitive workload off your plate so you can focus on
            scaling.
          </p>
          <div data-reveal="fade" data-reveal-delay="0.28" className="mt-8 flex flex-wrap items-center gap-4">
            <a
              data-magnetic
              href="https://www.linkedin.com/in/saad-habib-me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Saad Habib on LinkedIn"
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0A66C2] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:-rotate-6"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a
              data-magnetic
              href="mailto:saadhabibwebsite@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD93D] px-6 py-3.5 text-sm font-bold text-[#1A1A2E] shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
            >
              Work with me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
});
