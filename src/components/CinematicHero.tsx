import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowRight, Sparkles, ShieldCheck, ChevronDown } from "lucide-react";
import saadPhoto from "../assets/saad-habib.png.asset.json";
import { assetUrl } from "../lib/asset-url";

gsap.registerPlugin(ScrollTrigger);

const logos = ["Shopify", "Amazon", "HubSpot", "Klaviyo", "Notion", "Zapier"];

export function CinematicHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const logosRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Split headline into words for reveal
      const split = new SplitType(headlineRef.current!, { types: "words,chars" });
      gsap.set(split.words, { yPercent: 110, opacity: 0 });
      gsap.set([subRef.current, ctaRef.current, badgeRef.current, logosRef.current], {
        y: 24,
        opacity: 0,
      });
      gsap.set(cardRef.current, { opacity: 0, y: 40, scale: 0.96 });

      const tl = gsap.timeline({ delay: reduce ? 0 : 0.15 });
      tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
        .to(
          split.words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.35",
        )
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.55")
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(logosRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .to(
          cardRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" },
          "-=0.9",
        );

      if (!reduce) {
        // Floating card
        gsap.to(cardRef.current, {
          y: -18,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Scroll-driven fade + scale
        gsap.to(
          [headlineRef.current, subRef.current, ctaRef.current, badgeRef.current, logosRef.current],
          {
            opacity: 0,
            y: -60,
            filter: "blur(6px)",
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.to(cardRef.current, {
          scale: 1.12,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(glowRef.current, {
          opacity: 0.3,
          scale: 1.3,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Mouse parallax
      const onMove = (e: MouseEvent) => {
        if (reduce) return;
        const rect = rootRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(cardRef.current, {
          x: x * 40,
          rotationY: x * 10,
          rotationX: -y * 8,
          duration: 0.9,
          ease: "power3.out",
          transformPerspective: 1000,
        });
        gsap.to(glowRef.current, {
          x: x * 60,
          y: y * 40,
          duration: 1.2,
          ease: "power3.out",
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#060816] text-white"
    >
      {/* Animated gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 700px at 15% 20%, rgba(123,92,255,0.35), transparent 60%), radial-gradient(900px 600px at 85% 30%, rgba(0,194,255,0.28), transparent 65%), radial-gradient(1000px 700px at 60% 100%, rgba(74,222,128,0.15), transparent 60%)",
        }}
      />
      {/* Animated grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)",
        }}
      />
      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-white/70"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              opacity: 0.25 + ((i * 13) % 60) / 100,
              filter: "blur(0.5px)",
              animation: `floatY ${6 + (i % 6)}s ease-in-out ${i * 0.2}s infinite alternate`,
            }}
          />
        ))}
      </div>
      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      {/* Soft glow orb behind card */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-1/2 -z-10 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 200deg, #7B5CFF, #00C2FF, #4ADE80, #7B5CFF)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-16 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-8 lg:px-20 lg:py-32">
        {/* LEFT */}
        <div className="lg:col-span-7">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
            </span>
            Available for new projects · 2026
          </div>

          <h1
            ref={headlineRef}
            className="mt-8 font-[Space_Grotesk,ui-sans-serif] text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white"
          >
            Freelance work,{" "}
            <span className="bg-gradient-to-r from-[#7B5CFF] via-[#00C2FF] to-[#4ADE80] bg-clip-text text-transparent">
              engineered
            </span>{" "}
            for teams that ship.
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-xl text-lg leading-relaxed text-[#94A3B8] md:text-xl"
          >
            I'm Saad Habib — a senior freelance operator delivering data, leads
            and e-commerce work with the polish of a product team and the speed
            of a solo craftsman.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#7B5CFF] to-[#00C2FF] px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(123,92,255,0.7)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white/90 backdrop-blur-xl transition-colors hover:bg-white/[0.08]"
            >
              <Sparkles className="h-4 w-4 text-[#00C2FF]" />
              Get a quote
            </a>
          </div>

          <div
            ref={logosRef}
            className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-8"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50">
              <ShieldCheck className="h-4 w-4 text-[#4ADE80]" />
              Trusted by 150+ founders and teams
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {logos.map((l) => (
                <span
                  key={l}
                  className="font-[Space_Grotesk,ui-sans-serif] text-lg font-semibold text-white/40 transition-colors hover:text-white/80"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — floating glass card */}
        <div className="lg:col-span-5">
          <div
            ref={cardRef}
            className="relative mx-auto w-full max-w-md will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5A5A]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/40">
                  Live preview
                </span>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
                <img
                  src={assetUrl(saadPhoto)}
                  alt="Saad Habib, founder"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-[Space_Grotesk,ui-sans-serif] text-lg font-bold text-white">
                    Saad Habib
                  </div>
                  <div className="text-xs text-white/50">
                    Founder · Freelance Studio
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-[#4ADE80]">
                  ● Online
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { k: "500+", v: "Projects" },
                  { k: "150+", v: "Clients" },
                  { k: "24h", v: "Reply" },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
                  >
                    <div className="font-[Space_Grotesk,ui-sans-serif] text-xl font-bold text-white">
                      {s.k}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute -left-6 -top-6 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs text-white/80 backdrop-blur-xl">
              <div className="font-semibold text-white">+ New lead list</div>
              <div className="text-white/50">2,481 verified rows</div>
            </div>
            <div className="absolute -bottom-5 -right-5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs text-white/80 backdrop-blur-xl">
              <div className="flex items-center gap-2 font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#4ADE80]" /> Shopify
                store live
              </div>
              <div className="text-white/50">Deployed in 6 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      <style>{`
        @keyframes floatY {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -30px, 0); }
        }
      `}</style>
    </section>
  );
}
