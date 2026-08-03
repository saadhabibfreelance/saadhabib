import { useRef, useState, type FormEvent } from "react";
import { Mail, Phone, Linkedin, Facebook, Instagram, ArrowRight, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useFooterMotion } from "../hooks/useFooterMotion";

const quickLinks = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "About", to: "/about" as const },
];

const resources = [
  { label: "Data Entry", hash: "/services" as const },
  { label: "Lead Generation", hash: "/services" as const },
  { label: "Email Marketing", hash: "/services" as const },
  { label: "E-commerce Setup", hash: "/services" as const },
];

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/saad-habib-me", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  useFooterMotion(root);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer ref={root} className="relative overflow-hidden px-4 pb-10 pt-32 sm:px-6 lg:px-8">
      {/* moving gradient wash + ending glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="ftr-wash absolute inset-0 opacity-70" />
        <div
          data-footer-glow
          className="absolute bottom-[-30%] left-1/2 h-[52vw] w-[110vw] rounded-full blur-[120px]"
          style={{
            transform: "translate3d(-50%,0,0)",
            opacity: 0.18,
            background:
              "radial-gradient(ellipse at center, color-mix(in srgb, var(--amb-b) 45%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div
        data-footer-panel
        className="ftr-border mx-auto max-w-7xl rounded-[2.5rem] p-[1px]"
      >
        <div className="rounded-[2.5rem] bg-white/[0.035] px-6 py-16 backdrop-blur-2xl sm:px-12 lg:px-16">
          {/* Brand statement */}
          <div data-footer-brand className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/45">
              Saad Habib Services
            </p>
            <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
              Clean data, real leads,
              <br />
              <span className="bg-gradient-to-r from-[#FFEE00] via-[#00C2FF] to-[#F857A6] bg-clip-text text-transparent">
                stores that convert.
              </span>
            </h2>
          </div>

          <div className="mt-20 grid gap-14 md:grid-cols-2 lg:grid-cols-12">
            {/* Newsletter */}
            <div data-footer-col className="lg:col-span-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Newsletter
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                Occasional notes on data workflows, lead quality and e-commerce growth. No noise.
              </p>
              <form onSubmit={onSubmit} className="ftr-field mt-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 transition-all duration-300">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  data-magnetic
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFEE00] px-5 py-2.5 text-sm font-bold text-[#0B0B14] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Join
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              {sent && (
                <p className="mt-3 text-sm text-[#92FE9D]">Thanks — you're on the list.</p>
              )}
            </div>

            {/* Quick links */}
            <div data-footer-col className="lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Quick Links
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="ftr-link text-white/70 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div data-footer-col className="lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Resources
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {resources.map((r) => (
                  <li key={r.label}>
                    <Link to={r.hash} className="ftr-link text-white/70 hover:text-white">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + socials */}
            <div data-footer-col className="lg:col-span-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Contact
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href="tel:+923002019194" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
                    <Phone className="h-4 w-4 text-white/40" />
                    +92 300 201 9194
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:saadhabibwebsite@gmail.com"
                    className="inline-flex items-center gap-2 break-all text-white/70 hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-white/40" />
                    saadhabibwebsite@gmail.com
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-white/50">
                  <MapPin className="h-4 w-4 text-white/40" />
                  Remote · Worldwide
                </li>
              </ul>

              <div className="mt-7 flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href === "#" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="ftr-social flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/75"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Legal + copyright */}
          <div
            data-footer-legal
            className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:justify-between"
          >
            <p>© {new Date().getFullYear()} Saad Habib Freelancing Services. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/about" className="ftr-link hover:text-white/80">
                Privacy
              </Link>
              <Link to="/about" className="ftr-link hover:text-white/80">
                Terms
              </Link>
              <Link to="/services" className="ftr-link hover:text-white/80">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
