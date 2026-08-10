import { useEffect, useRef, useState } from "react";
import { Link, useMatch, useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";
import { Menu, X, Phone, Mail, Linkedin } from "lucide-react";

const SECTIONS = [
  { id: "work", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "about", label: "Founder" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Clients" },
];

const PAGES = [
  { to: "/", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
] as const;


function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * strength,
        y: (e.clientY - (r.top + r.height / 2)) * strength,
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return ref;
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  const barRef = useRef<HTMLDivElement | null>(null);
  const logoMarkRef = useRef<HTMLSpanElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayLinksRef = useRef<HTMLDivElement | null>(null);
  const closeIconRef = useRef<HTMLSpanElement | null>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);
  const burgerRef = useMagnetic<HTMLButtonElement>(0.25);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // --- scroll: colour transition + hide on down / reveal on up ---
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let last = window.scrollY;
    let hidden = false;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const delta = y - last;
        if (Math.abs(delta) > 6) {
          const shouldHide = delta > 0 && y > 140 && !open;
          if (shouldHide !== hidden) {
            hidden = shouldHide;
            gsap.to(bar, {
              yPercent: hidden ? -140 : 0,
              duration: 0.6,
              ease: hidden ? "power3.in" : "expo.out",
              overwrite: "auto",
            });
          }
          last = y;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  // --- active section spy (home only) ---
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  // --- logo idle animation ---
  useEffect(() => {
    const mark = logoMarkRef.current;
    if (!mark) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
    tl.to(mark, { rotateY: 360, duration: 1.2, ease: "expo.inOut", transformOrigin: "50% 50%" });
    return () => {
      tl.kill();
    };
  }, []);

  // --- fullscreen mobile overlay ---
  useEffect(() => {
    const overlay = overlayRef.current;
    const links = overlayLinksRef.current;
    if (!overlay || !links) return;
    const items = links.querySelectorAll<HTMLElement>("[data-nav-item]");
    const tl = gsap.timeline();

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      tl.fromTo(
        overlay,
        { clipPath: "circle(0% at 90% 6%)", opacity: 1 },
        { clipPath: "circle(150% at 90% 6%)", duration: 0.8, ease: "expo.inOut" },
      )
        .fromTo(
          items,
          { yPercent: 120, opacity: 0, rotate: 3 },
          { yPercent: 0, opacity: 1, rotate: 0, duration: 0.7, stagger: 0.07, ease: "expo.out" },
          "-=0.4",
        )
        .fromTo(closeIconRef.current, { rotate: -90, scale: 0.5, opacity: 0 }, { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.6");
    } else {
      document.body.style.overflow = "";
      tl.to(items, { yPercent: -60, opacity: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" }).to(
        overlay,
        {
          clipPath: "circle(0% at 90% 6%)",
          duration: 0.6,
          ease: "expo.inOut",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        },
        "-=0.1",
      );
    }
    return () => {
      tl.kill();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const goSection = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.href = `/#${id}`;
  };

  const navItems = isHome ? SECTIONS.map((s) => ({ ...s, kind: "section" as const })) : [];

  return (
    <>
      <div
        ref={barRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-[80] will-change-transform"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pt-3 sm:px-8 sm:pt-4">
          <div
            className={`pointer-events-auto flex items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow,padding] duration-500 sm:px-5 ${
              scrolled
                ? "border-white/12 bg-[#060607]/75 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]"
                : "border-white/8 bg-white/[0.04] shadow-none"
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              aria-label="Saad Habib — home"
              className="group flex items-center gap-2.5"
            >
              <span
                ref={logoMarkRef}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F1EA] text-sm font-extrabold text-[#0B0B0C] shadow-[0_0_24px_-4px_rgba(127,216,232,0.45)] transition-transform duration-500 group-hover:scale-110"
                style={{ fontFamily: "Space Grotesk, ui-sans-serif" }}
              >
                SH
              </span>
              <span className="hidden text-[15px] font-bold tracking-tight text-white sm:inline" style={{ fontFamily: "Space Grotesk, ui-sans-serif" }}>
                Saad Habib
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {PAGES.map((p) => (
                <NavPageLink key={p.to} to={p.to} label={p.label} />
              ))}
              {navItems.length > 0 && <span className="mx-2 h-4 w-px bg-white/15" />}
              {navItems.map((s) => (
                <button
                  key={s.id}
                  onClick={() => goSection(s.id)}
                  className="group relative px-3 py-2 text-[13px] font-medium tracking-tight text-white/60 transition-colors hover:text-white"
                >
                  {s.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-[#F5F1EA] transition-transform duration-500 ease-out ${
                      active === s.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                ref={ctaRef}
                href="mailto:saadhabibwebsite@gmail.com"
                className="relative hidden overflow-hidden rounded-xl bg-[#F5F1EA] px-5 py-2.5 text-[13px] font-semibold text-[#0B0B0C] shadow-[0_0_28px_-6px_rgba(127,216,232,0.45)] transition-shadow duration-500 hover:shadow-[0_0_46px_-4px_rgba(127,216,232,0.35)] sm:inline-flex"
              >
                <span className="relative z-10">Get in touch</span>
                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 hover:translate-x-full" />
              </a>

              <button
                ref={burgerRef}
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] hidden flex-col bg-[#060607]/90 backdrop-blur-2xl"
        style={{ display: "none" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#F5F1EA]/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#C8A96A]/20 blur-3xl" />

        <div className="relative flex items-center justify-between px-6 pt-6 sm:px-10">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Menu</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors hover:border-[#8C8377]/60 hover:bg-[#8C8377]/10"
          >
            <span ref={closeIconRef} className="block transition-transform duration-500 group-hover:rotate-90">
              <X className="h-6 w-6" />
            </span>
          </button>
        </div>

        <div ref={overlayLinksRef} className="relative flex flex-1 flex-col justify-center gap-1 px-6 sm:px-10">
          {PAGES.map((p) => (
            <div key={p.to} data-nav-item className="overflow-hidden">
              <Link
                to={p.to}
                onClick={() => setOpen(false)}
                className="block py-2 text-[13vw] font-extrabold leading-[1.05] tracking-tight text-white transition-colors hover:text-[#F5F1EA] sm:text-6xl"
                style={{ fontFamily: "Space Grotesk, ui-sans-serif" }}
              >
                {p.label}
              </Link>
            </div>
          ))}
          {isHome &&
            SECTIONS.map((s) => (
              <div key={s.id} data-nav-item className="overflow-hidden">
                <button
                  onClick={() => goSection(s.id)}
                  className={`block py-1 text-left text-lg font-medium tracking-tight transition-colors ${
                    active === s.id ? "text-[#C8A96A]" : "text-white/55 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              </div>
            ))}
        </div>

        <div data-nav-item className="relative flex flex-wrap items-center gap-3 px-6 pb-10 sm:px-10">
          <a
            href="mailto:saadhabibwebsite@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-[#F5F1EA] px-5 py-3 text-sm font-semibold text-[#0B0B0C] shadow-[0_0_30px_-6px_rgba(127,216,232,0.45)]"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href="tel:+923002019194"
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-[#0B0B0C]"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href="https://www.linkedin.com/in/saad-habib-me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-white"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </>
  );
}

function NavPageLink({ to, label }: { to: string; label: string }) {
  const match = useMatch({ from: to as never, shouldThrow: false });
  return (
    <Link
      to={to}
      className="group relative px-3 py-2 text-[13px] font-semibold tracking-tight text-white/80 transition-colors hover:text-white"
    >
      {label}
      <span
        className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-white transition-transform duration-500 ease-out ${
          match ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}
