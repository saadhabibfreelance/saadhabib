import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "../lib/services";
import { ArrowRight, CheckCircle2, Linkedin, Star, Zap, Shield, Clock } from "lucide-react";
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

      {/* Profile section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/40 to-navy/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-gold/60 bg-cream shadow-xl">
              <img src={saadPhoto.url} alt="Saad Habib" className="h-full w-full object-cover" />
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">Meet the founder</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              I’m Saad Habib
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A freelance professional passionate about helping businesses streamline their data and e-commerce operations. With years of hands-on experience across lead generation, list building, email marketing, and Shopify/Amazon store setup, I deliver work that’s accurate, on time, and easy to build on.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether you’re a solo entrepreneur or a growing team, I’ll take the repetitive workload off your plate so you can focus on scaling.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/saad-habib-me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saad Habib on LinkedIn"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy text-cream transition-transform hover:scale-110 hover:bg-gold hover:text-navy"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:saadhabibwebsite@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Work with me
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy px-4 py-16 text-cream sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "500+", label: "Projects delivered" },
            { value: "150+", label: "Happy clients" },
            { value: "5+", label: "Years experience" },
            { value: "24h", label: "Avg. response time" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-gold sm:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-cream/70">{s.label}</div>
            </div>
          ))}
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
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-md"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clickable services */}
      <section id="services" className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-navy">Services I offer</h2>
              <p className="mt-3 text-muted-foreground">Hover any service and click to learn more.</p>
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
                className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:bg-gold/5 hover:shadow-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-navy transition-colors group-hover:text-primary">
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

      {/* Process */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy">How we work together</h2>
            <p className="mt-3 text-muted-foreground">A simple, transparent process from first message to final delivery.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { icon: Zap, title: "1. Discuss", text: "Tell me what you need over email or a quick call." },
              { icon: Shield, title: "2. Quote", text: "I send a clear scope, price, and timeline." },
              { icon: Clock, title: "3. Deliver", text: "I execute the work with daily updates." },
              { icon: Star, title: "4. Refine", text: "Revisions until you’re fully satisfied." },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy">What clients say</h2>
            <p className="mt-3 text-muted-foreground">Trusted by entrepreneurs and small teams worldwide.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Ahmed R.", role: "E-commerce Owner", text: "Saad rebuilt my Shopify store and cleaned up thousands of product listings. The store looks great and converts better." },
              { name: "Sarah L.", role: "Sales Manager", text: "The lead list Saad built for my B2B outreach was clean, verified, and delivered on time. Highly recommend." },
              { name: "James K.", role: "Marketing Consultant", text: "Reliable, communicative, and fast. Saad is now my go-to for data entry and email list cleaning." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">“{t.text}”</p>
                <div className="mt-6">
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
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
