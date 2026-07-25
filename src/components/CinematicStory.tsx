import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Target, Mail, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Scene = {
  eyebrow: string;
  title: string;
  paragraph: string;
  cta: string;
  href: string;
  gradient: string;
  glow1: string;
  glow2: string;
  accent: string;
  Icon: typeof Database;
  visual: "data" | "leads" | "email" | "store" | "delivery";
};

const scenes: Scene[] = [
  {
    eyebrow: "Chapter 01 · Foundations",
    title: "Clean data is\nyour unfair advantage.",
    paragraph:
      "Bulk entry, extraction and list cleaning done at studio quality. Zero duplicates, verified fields, and a delivery you can trust in production.",
    cta: "Explore data services",
    href: "/services#data-entry",
    gradient:
      "radial-gradient(1200px 700px at 20% 20%, rgba(123,92,255,0.55), transparent 60%), radial-gradient(900px 700px at 80% 80%, rgba(0,194,255,0.35), transparent 60%), linear-gradient(135deg,#0B0F2A 0%,#1B0B3A 100%)",
    glow1: "#7B5CFF",
    glow2: "#00C2FF",
    accent: "#00C2FF",
    Icon: Database,
    visual: "data",
  },
  {
    eyebrow: "Chapter 02 · Growth",
    title: "Lead lists that\nactually convert.",
    paragraph:
      "Targeted B2B prospecting with verified emails, LinkedIn URLs and role-based filters. Built for outbound teams that measure reply rates, not vanity counts.",
    cta: "See lead generation",
    href: "/services#lead-generation",
    gradient:
      "radial-gradient(1000px 700px at 80% 20%, rgba(255,90,90,0.5), transparent 60%), radial-gradient(900px 700px at 20% 80%, rgba(255,200,71,0.4), transparent 60%), linear-gradient(135deg,#2A0A1F 0%,#3A1B0B 100%)",
    glow1: "#FF5A5A",
    glow2: "#FFC847",
    accent: "#FFD93D",
    Icon: Target,
    visual: "leads",
  },
  {
    eyebrow: "Chapter 03 · Reach",
    title: "Email that lands\nin the inbox.",
    paragraph:
      "Warm-up, cleaning, segmentation and campaigns tuned for deliverability. Your list stays healthy, your sender score climbs, your revenue follows.",
    cta: "Explore email work",
    href: "/services#email-marketing",
    gradient:
      "radial-gradient(1200px 700px at 30% 30%, rgba(74,222,128,0.45), transparent 60%), radial-gradient(900px 700px at 80% 70%, rgba(0,194,255,0.4), transparent 60%), linear-gradient(135deg,#062018 0%,#0A2A3A 100%)",
    glow1: "#4ADE80",
    glow2: "#00C2FF",
    accent: "#4ADE80",
    Icon: Mail,
    visual: "email",
  },
  {
    eyebrow: "Chapter 04 · Commerce",
    title: "Storefronts built\nto convert.",
    paragraph:
      "Shopify and Amazon listings that read like a brand and sell like a product team ran them. Fast, mobile-first, and set up to scale from day one.",
    cta: "See e-commerce work",
    href: "/services#ecommerce-store",
    gradient:
      "radial-gradient(1000px 700px at 20% 20%, rgba(236,72,153,0.5), transparent 60%), radial-gradient(900px 700px at 80% 80%, rgba(123,92,255,0.45), transparent 60%), linear-gradient(135deg,#2A0A22 0%,#180A2A 100%)",
    glow1: "#EC4899",
    glow2: "#7B5CFF",
    accent: "#EC4899",
    Icon: ShoppingBag,
    visual: "store",
  },
  {
    eyebrow: "Chapter 05 · Delivery",
    title: "Shipped in days,\nnot quarters.",
    paragraph:
      "One senior operator, direct communication, and daily updates. No account managers, no hand-offs — just work delivered on time with the polish of a product team.",
    cta: "Start a project",
    href: "mailto:saadhabibwebsite@gmail.com",
    gradient:
      "radial-gradient(1200px 700px at 50% 20%, rgba(0,194,255,0.5), transparent 60%), radial-gradient(900px 700px at 50% 80%, rgba(74,222,128,0.35), transparent 60%), linear-gradient(135deg,#050816 0%,#0A1830 100%)",
    glow1: "#00C2FF",
    glow2: "#4ADE80",
    accent: "#4ADE80",
    Icon: Sparkles,
    visual: "delivery",
  },
];

function Visual({ scene }: { scene: Scene }) {
  const { visual, accent, glow1, glow2, Icon } = scene;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* soft glow behind */}
      <div
        className="pointer-events-none absolute inset-6 rounded-full opacity-70 blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${glow1}, transparent 60%), radial-gradient(circle at 30% 70%, ${glow2}, transparent 60%)` }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5A5A]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">
            <Icon className="h-3 w-3" style={{ color: accent }} />
            Live
          </span>
        </div>

        {visual === "data" && (
          <div className="mt-5 space-y-2">
            <div className="grid grid-cols-4 gap-2 text-[10px] uppercase tracking-widest text-white/40">
              <span>Name</span><span>Email</span><span>Role</span><span>Status</span>
            </div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-2 text-[11px] text-white/80">
                <span className="truncate">{["Alex Kim","Sara Wu","Noah Patel","Ida Ortega","Yuki Sato","Mia Fischer","Leo Ross"][i]}</span>
                <span className="truncate text-white/60">{["alex@","sara@","noah@","ida@","yuki@","mia@","leo@"][i]}acme.io</span>
                <span className="text-white/70">{["CTO","VP","Head","Ops","Eng","PM","GTM"][i]}</span>
                <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />verified</span>
              </div>
            ))}
          </div>
        )}

        {visual === "leads" && (
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Campaign</div>
              <div className="mt-1 font-[Space_Grotesk,ui-sans-serif] text-lg font-bold text-white">Q3 Outbound · SaaS Founders</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[["2,481","Contacts"],["94%","Verified"],["31%","Reply"]].map(([k,v]) => (
                  <div key={v} className="rounded-lg bg-white/[0.05] p-2">
                    <div className="font-[Space_Grotesk,ui-sans-serif] text-lg font-bold" style={{ color: accent }}>{k}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/50">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            {["Series A · New York","Series B · Berlin","Bootstrapped · Remote"].map((s, i) => (
              <div key={s} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-white/80">
                <span>{s}</span>
                <span className="text-[10px]" style={{ color: accent }}>+{[482, 356, 214][i]} leads</span>
              </div>
            ))}
          </div>
        )}

        {visual === "email" && (
          <div className="mt-5 space-y-3">
            {[
              { s: "Welcome sequence · Day 1", o: "68% open · 22% click" },
              { s: "Nurture · SaaS trial", o: "54% open · 14% click" },
              { s: "Reactivation · 60d silent", o: "41% open · 9% click" },
            ].map((m) => (
              <div key={m.s} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{m.s}</div>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${accent}22`, color: accent }}>Sent</span>
                </div>
                <div className="mt-1 text-[11px] text-white/50">{m.o}</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${[70,54,41][["Welcome sequence · Day 1","Nurture · SaaS trial","Reactivation · 60d silent"].indexOf(m.s)]}%`, background: `linear-gradient(90deg, ${glow1}, ${glow2})` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {visual === "store" && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { n: "Everyday Tote", p: "$48" },
              { n: "Studio Lamp", p: "$129" },
              { n: "Minimal Chair", p: "$249" },
              { n: "Wall Clock", p: "$62" },
            ].map((p, i) => (
              <div key={p.n} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                <div className="aspect-square w-full" style={{ background: `linear-gradient(135deg, ${["#F472B6","#7B5CFF","#00C2FF","#FFD166"][i]}, ${["#FFC847","#00C2FF","#4ADE80","#EC4899"][i]})` }} />
                <div className="flex items-center justify-between p-3">
                  <div className="text-xs font-semibold text-white">{p.n}</div>
                  <div className="text-xs" style={{ color: accent }}>{p.p}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {visual === "delivery" && (
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Project</div>
              <div className="mt-1 font-[Space_Grotesk,ui-sans-serif] text-lg font-bold text-white">Shopify · Everyday Studio</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: "84%", background: `linear-gradient(90deg, ${glow1}, ${glow2})` }} />
                  </div>
                </div>
                <span className="text-xs font-bold" style={{ color: accent }}>Day 5 / 6</span>
              </div>
            </div>
            {[
              { d: "Mon", t: "Kickoff · brand brief" },
              { d: "Tue", t: "Theme scaffold · nav" },
              { d: "Wed", t: "Product listings imported" },
              { d: "Thu", t: "Checkout + payments" },
              { d: "Fri", t: "QA + soft launch ready" },
            ].map((r) => (
              <div key={r.d} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs">
                <span className="w-8 text-[10px] uppercase tracking-widest text-white/50">{r.d}</span>
                <span className="text-white/85">{r.t}</span>
                <span className="ml-auto text-[10px]" style={{ color: accent }}>done</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CinematicStory() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]");
        const lines = el.querySelectorAll<HTMLElement>("[data-line]");
        const para = el.querySelector<HTMLElement>("[data-para]");
        const cta = el.querySelector<HTMLElement>("[data-cta]");
        const visual = el.querySelector<HTMLElement>("[data-visual]");
        const bg = el.querySelector<HTMLElement>("[data-bg]");

        // Initial state
        gsap.set([eyebrow, ...Array.from(lines), para, cta], { y: 40, opacity: 0 });
        gsap.set(visual, { y: 60, opacity: 0, scale: 0.95 });

        // Enter animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "top 20%",
            scrub: reduce ? false : 1,
            toggleActions: reduce ? "play none none reverse" : undefined,
          },
        });
        tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
          .to(lines, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.12 }, "-=0.3")
          .to(para, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .to(cta, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
          .to(visual, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "expo.out" }, "-=0.9");

        // Exit — fade upward slightly scale down
        if (i < sceneRefs.current.length - 1 && !reduce) {
          gsap.to([eyebrow, ...Array.from(lines), para, cta, visual], {
            y: -50,
            opacity: 0,
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "bottom 70%",
              end: "bottom 20%",
              scrub: 1,
            },
          });
        }

        // Background parallax fade
        if (!reduce) {
          gsap.fromTo(
            bg,
            { opacity: 0.4, scale: 1.05 },
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "top center",
                scrub: 1,
              },
            },
          );
        }

        // Floating visual
        if (!reduce) {
          gsap.to(visual, {
            y: "+=14",
            duration: 4 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      // Mouse parallax
      if (!reduce && !isMobile) {
        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20;
          const y = (e.clientY / window.innerHeight - 0.5) * 20;
          sceneRefs.current.forEach((el) => {
            if (!el) return;
            const v = el.querySelector<HTMLElement>("[data-visual]");
            const g1 = el.querySelector<HTMLElement>("[data-glow1]");
            const g2 = el.querySelector<HTMLElement>("[data-glow2]");
            gsap.to(v, { x, y: y * 0.6, duration: 1.1, ease: "power3.out" });
            gsap.to(g1, { x: -x * 1.5, y: -y * 1.2, duration: 1.4, ease: "power3.out" });
            gsap.to(g2, { x: x * 1.8, y: y * 1.4, duration: 1.4, ease: "power3.out" });
          });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative bg-[#050816] text-white">
      {scenes.map((scene, i) => (
        <section
          key={i}
          ref={(el) => {
            sceneRefs.current[i] = el;
          }}
          className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
        >
          {/* Background */}
          <div data-bg aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: scene.gradient }} />
          {/* Glow blobs */}
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
          {/* Grid */}
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
          {/* Noise */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-[0.1]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
            }}
          />

          <div className={`mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 py-20 md:px-8 lg:gap-16 lg:px-20 lg:py-28 ${i % 2 === 1 ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-[1.05fr_1fr]"} grid-cols-1`}>
            {/* Text */}
            <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div
                data-eyebrow
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur"
              >
                <scene.Icon className="h-3.5 w-3.5" style={{ color: scene.accent }} />
                {scene.eyebrow}
              </div>
              <h2 className="mt-8 font-[Space_Grotesk,ui-sans-serif] text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-white">
                {scene.title.split("\n").map((line, li) => (
                  <span key={li} className="block overflow-hidden">
                    <span data-line className="inline-block">
                      {li === scene.title.split("\n").length - 1 ? (
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
                  href={scene.href}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]"
                  style={{ boxShadow: `0 10px 40px -12px ${scene.accent}80` }}
                >
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  {scene.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            {/* Visual */}
            <div data-visual className={`${i % 2 === 1 ? "lg:order-1" : ""} will-change-transform`}>
              <Visual scene={scene} />
            </div>
          </div>

          {/* Chapter indicator */}
          <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
            {scenes.map((_, di) => (
              <span
                key={di}
                className="h-8 w-[2px] rounded-full transition-colors"
                style={{ background: di === i ? scene.accent : "rgba(255,255,255,0.15)" }}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
