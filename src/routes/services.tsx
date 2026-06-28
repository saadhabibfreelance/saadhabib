import { createFileRoute } from "@tanstack/react-router";
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
    <main>
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">Freelance services</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete range of remote support services to help your business grow without the overhead.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-4xl">{service.icon}</div>
                <h2 className="mt-4 text-2xl font-semibold text-navy">{service.title}</h2>
                <p className="mt-2 text-muted-foreground">{service.description}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:saadhabibwebsite@gmail.com?subject=Quote request for " + service.title
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

      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-card p-8 text-center shadow-sm sm:p-12">
          <h2 className="text-2xl font-bold text-navy">Need a custom package?</h2>
          <p className="mt-3 text-muted-foreground">
            Most projects combine multiple services. Send me the details and I’ll reply with a tailored quote and timeline.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Email Saad Habib
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+923002019194"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              +92 300 201 9194
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
