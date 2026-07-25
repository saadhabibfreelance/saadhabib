import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { services } from "../lib/services";
import { ArrowRight, Linkedin, Star, Zap, Shield, Clock, Sparkles, Mail, Phone } from "lucide-react";
import saadPhoto from "../assets/saad-habib.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saad Habib — Freelance Data, Leads & E-commerce" },
      { name: "description", content: "Colorful freelance studio by Saad Habib: data entry, lead generation, email marketing, and e-commerce store design that ships fast." },
      { property: "og:title", content: "Saad Habib — Freelance Data, Leads & E-commerce" },
      { property: "og:description", content: "Colorful freelance studio by Saad Habib: data entry, lead generation, email marketing, and e-commerce store design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sectionPalettes = [
  "from-[#FF5F6D] via-[#FFC371] to-[#FFDA77]",
  "from-[#43CEA2] via-[#185A9D] to-[#2C5364]",
  "from-[#F09819] via-[#FF5858] to-[#8E2DE2]",
  "from-[#00C9FF] via-[#92FE9D] to-[#FFEE00]",
  "from-[#654EA3] via-[#EAAFC8] to-[#FF9A9E]",
  "from-[#0F2027] via-[#203A43] to-[#2C5364]",
  "from-[#F857A6] via-[#FF5858] to-[#FFC837]",
];

const cardColors = [
  { bg: "bg-[#FF6B6B]", ring: "ring-[#FFD93D]", text: "text-white" },
  { bg: "bg-[#4ECDC4]", ring: "ring-[#FF6B6B]", text: "text-white" },
  { bg: "bg-[#FFD93D]", ring: "ring-[#1A535C]", text: "text-[#1A1A2E]" },
  { bg: "bg-[#845EC2]", ring: "ring-[#FFC75F]", text: "text-white" },
  { bg: "bg-[#00C9A7]", ring: "ring-[#F9F871]", text: "text-[#0b3a34]" },
  { bg: "bg-[#F9A826]", ring: "ring-[#3A0088]", text: "text-[#2a1600]" },
  { bg: "bg-[#EF476F]", ring: "ring-[#FFD166]", text: "text-white" },
  { bg: "bg-[#06D6A0]", ring: "ring-[#EF476F]", text: "text-[#052e23]" },
  { bg: "bg-[#118AB2]", ring: "ring-[#FFD166]", text: "text-white" },
];

function Section({
  index,
  id,
  children,
  className = "",
}: {
  index: number;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`snap-section bg-gradient-to-br ${sectionPalettes[index % sectionPalettes.length]} px-4 py-24 sm:px-6 lg:px-8 ${className}`}
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-black/20 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="relative z-10 mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

function Index() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("snap");
    return () => html.classList.remove("snap");
  }, []);

  return (
    <main>
      {/* 1. HERO */}
      <Section index={0}>
        <div className="text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <Sparkles className="h-4 w-4" /> Freelance studio · Open for projects
          </span>
          <h1 className="mt-6 text-5xl font-black leading-[0.9] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] sm:text-7xl lg:text-8xl">
            Data. Leads. <br />
            <span className="text-stroke">E-commerce.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-white/95 sm:text-xl">
            Hi, I'm <b>Saad Habib</b>. I build fast, accurate freelance work that saves you hours — from lead lists to Shopify storefronts.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-[#1A1A2E] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-transparent px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#1A1A2E]"
            >
              Get a Quote
            </a>
          </div>
          <div className="mt-16 animate-bounce text-white/70 text-sm font-semibold">↓ scroll</div>
        </div>
      </Section>

      {/* 2. ABOUT / PROFILE */}
      <Section index={1}>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#FFD93D] to-[#FF6B6B] blur-2xl opacity-70" />
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white/80 bg-white shadow-2xl">
              <img src={saadPhoto.url} alt="Saad Habib" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="text-white">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFD93D]">Meet the founder</span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">
              I'm Saad Habib.
            </h2>
            <p className="mt-6 text-lg text-white/90">
              A freelance professional obsessed with clean data, sharp e-commerce, and pixel-perfect delivery. Years of hands-on work across lead generation, list building, email marketing, and Shopify/Amazon setup.
            </p>
            <p className="mt-4 text-white/80">
              Solo entrepreneur or growing team — I take the repetitive workload off your plate so you can focus on scaling.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://www.linkedin.com/in/saad-habib-me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saad Habib on LinkedIn"
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0A66C2] transition-transform hover:scale-110 hover:-rotate-6"
              >
                <Linkedin className="h-7 w-7" />
              </a>
              <a
                href="mailto:saadhabibwebsite@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFD93D] px-6 py-3.5 text-sm font-bold text-[#1A1A2E] shadow-lg transition-transform hover:-translate-y-1"
              >
                Work with me
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. MARQUEE STATS */}
      <Section index={2}>
        <div className="text-center text-white">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            Numbers that <span className="text-[#FFEE00]">deliver</span>.
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "500+", label: "Projects delivered" },
              { value: "150+", label: "Happy clients" },
              { value: "5+", label: "Years experience" },
              { value: "24h", label: "Avg. response" },
            ].map((s) => (
              <div key={s.label} className="rounded-3xl border border-white/30 bg-white/10 p-8 backdrop-blur transition-transform hover:-translate-y-2">
                <div className="text-6xl font-black text-[#FFEE00] drop-shadow">{s.value}</div>
                <div className="mt-3 text-sm font-semibold uppercase tracking-widest text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* marquee ribbon */}
        <div className="absolute inset-x-0 bottom-6 overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap gap-12 text-white/60 text-xl font-bold uppercase tracking-widest">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12">
                {["Data Entry", "Lead Gen", "Shopify", "Amazon", "Email Marketing", "List Building", "Extraction"].map((w) => (
                  <span key={w} className="flex items-center gap-12">
                    {w} <span className="text-[#FFEE00]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. SERVICES */}
      <Section index={3} id="services">
        <div className="text-[#1A1A2E]">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="rounded-full bg-[#1A1A2E] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFEE00]">Services</span>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                Pick your <span className="text-white">superpower</span>.
              </h2>
            </div>
            <Link
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
                  className={`group relative overflow-hidden rounded-3xl ${c.bg} ${c.text} p-6 ring-4 ring-transparent shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-2 hover:rotate-[-1deg] hover:${c.ring} hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]`}
                >
                  <div className="text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{service.icon}</div>
                  <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                  <p className="mt-2 text-sm opacity-90">{service.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 5. PROCESS */}
      <Section index={4}>
        <div className="text-white">
          <div className="text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">How we <span className="text-[#FFD93D]">work</span>.</h2>
            <p className="mt-4 text-lg text-white/85">Transparent, simple, and fast — from first message to final delivery.</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {[
              { icon: Zap, title: "Discuss", text: "Tell me what you need over email or a quick call.", color: "bg-[#FF6B6B]" },
              { icon: Shield, title: "Quote", text: "I send a clear scope, price, and timeline.", color: "bg-[#4ECDC4]" },
              { icon: Clock, title: "Deliver", text: "I execute the work with daily updates.", color: "bg-[#FFD93D] text-[#1A1A2E]" },
              { icon: Star, title: "Refine", text: "Revisions until you're fully satisfied.", color: "bg-[#845EC2]" },
            ].map((step, i) => (
              <div key={step.title} className={`rounded-3xl p-8 shadow-xl transition-transform hover:-translate-y-2 hover:rotate-1 ${step.color}`}>
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

      {/* 6. TESTIMONIALS */}
      <Section index={5}>
        <div className="text-white">
          <div className="text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">Loved by <span className="text-[#43CEA2]">clients</span>.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { name: "Ahmed R.", role: "E-commerce Owner", text: "Saad rebuilt my Shopify store and cleaned up thousands of product listings. Looks great and converts better.", color: "bg-[#FF6B6B]" },
              { name: "Sarah L.", role: "Sales Manager", text: "The B2B lead list was clean, verified, and delivered on time. Highly recommend.", color: "bg-[#FFD93D] text-[#1A1A2E]" },
              { name: "James K.", role: "Marketing Consultant", text: "Reliable, communicative, and fast. My go-to for data entry and email cleaning.", color: "bg-[#4ECDC4]" },
            ].map((t) => (
              <div key={t.name} className={`rounded-3xl p-8 shadow-2xl ${t.color} transition-transform hover:-translate-y-2 hover:rotate-[-1deg]`}>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
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

      {/* 7. CTA */}
      <Section index={6}>
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-[#1A1A2E] px-6 py-16 text-center text-white shadow-2xl sm:px-12">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            Let's ship <span className="text-[#FFEE00]">something</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
            Tell me about your project — I'll reply within 24 hours with scope, price, and a timeline.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+923002019194"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFEE00] px-7 py-4 text-base font-bold text-[#1A1A2E] shadow-lg transition-transform hover:-translate-y-1"
            >
              <Phone className="h-4 w-4" />
              +92 300 201 9194
            </a>
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#1A1A2E]"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
