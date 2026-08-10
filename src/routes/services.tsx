import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "../lib/services";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Saad Habib Freelancing" },
      { name: "description", content: "Browse professional freelance services: data entry, lead generation, data extraction, list cleaning, email marketing, e-commerce listing, and store design." },
      { property: "og:title", content: "Services — Saad Habib Freelancing" },
      { property: "og:description", content: "Browse professional freelance services: data entry, lead generation, data extraction, list cleaning, email marketing, e-commerce listing, and store design." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="pt-24 text-white">
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-[#C8A96A]">Fivup Leads &amp; Ecommerce</span>
          <h1 data-reveal="split" className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Services &amp; expertise</h1>
          <p data-reveal="fade" data-reveal-delay="0.2" className="mt-4 text-lg text-white/70">
            Twenty disciplines across ecommerce, data, digital and AI — delivered by one accountable team.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <article
                key={service.id}
                id={service.id}
                data-reveal="scale"
                data-reveal-delay={String((i % 3) * 0.08)}
                className="group flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:rotate-[0.5deg] hover:border-gold hover:bg-white/[0.1] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.25)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-[hsl(0_0%_100%/0.12)] text-[#C8A96A] transition-transform duration-500 group-hover:scale-110">
                  <service.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-white">{service.title}</h2>
                <p className="mt-2 text-white/70">{service.description}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  data-magnetic
                  href={`mailto:saadhabibwebsite@gmail.com?subject=Quote request for ${service.title}`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Request this service
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 data-reveal="blur" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Why Work With Us
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Accurate & verified data", "Every record is checked before it reaches you — no guesswork, no dead ends."],
              ["Targeted research", "Lists built to your exact ICP, market and role criteria rather than generic exports."],
              ["Organized spreadsheets", "Clean columns, consistent formats and CRM-ready files you can import immediately."],
              ["Professional communication", "Clear updates, quick replies and one accountable point of contact."],
              ["Fast turnaround", "Realistic deadlines, met — with progress visible along the way."],
              ["Quality-focused delivery", "A final QA pass on every project before anything is handed over."],
            ].map(([title, copy], i) => (
              <article
                key={title}
                data-reveal="scale"
                data-reveal-delay={String((i % 3) * 0.08)}
                className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl transition-colors hover:border-[#7FD8E8]/40"
              >
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div data-reveal="scale" className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-xl text-center shadow-sm sm:p-12">
          <h2 data-reveal="blur" className="text-2xl font-bold text-white">Need a custom lead list or digital support?</h2>
          <p data-reveal="fade" data-reveal-delay="0.15" className="mt-3 text-white/70">
            Let’s discuss your project.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              data-magnetic
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              data-magnetic
              href="tel:+923002019194"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              +92 300 201 9194
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
