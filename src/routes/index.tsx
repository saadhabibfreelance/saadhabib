import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "../lib/services";
import { ArrowRight, CheckCircle2, Linkedin, Star, Zap, Shield, Clock, Users } from "lucide-react";
import saadPhoto from "../assets/saad-habib.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saad Habib Freelancing Services" },
      { name: "description", content: "Professional freelancing services including data entry, lead generation, email marketing, and e-commerce store design by Saad Habib." },
      { property: "og:title", content: "Saad Habib Freelancing Services" },
      { property: "og:description", content: "Professional freelancing services including data entry, lead generation, email marketing, and e-commerce store design." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-gold/20 px-4 py-1.5 text-sm font-semibold text-navy">
            Reliable Freelance Services
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Data, leads & e-commerce work done right
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Hi, I’m Saad Habib. I help businesses save time with accurate data entry, targeted lead generation, email marketing, and e-commerce store design.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy">Why work with me?</h2>
            <p className="mt-3 text-muted-foreground">
              Fast turnaround, clear communication, and results you can trust.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Fast & accurate delivery",
              "Affordable freelance pricing",
              "Clear daily communication",
              "100% data confidentiality",
              "Experienced with top tools",
              "Revisions until you’re satisfied",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clickable services */}
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-navy">Services I offer</h2>
              <p className="mt-3 text-muted-foreground">Click any service to learn more on the services page.</p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <a
                key={service.id}
                href={`/services#${service.id}`}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">{service.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-navy group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/90">
            Let’s discuss your project and deliver exactly what you need — on time and within budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+923002019194"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-semibold text-navy transition-colors hover:bg-gold-light"
            >
              Call +92 300 201 9194
            </a>
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
