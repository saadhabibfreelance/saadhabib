import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Users, Linkedin } from "lucide-react";
import saadPhoto from "../assets/saad-habib.png.asset.json";
import { assetUrl } from "../lib/asset-url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Saad Habib Freelancing Services" },
      { name: "description", content: "Meet Saad Habib and Misbah, founders of a freelance services business focused on data entry, lead generation, email marketing, and e-commerce support." },
      { property: "og:title", content: "About — Saad Habib Freelancing Services" },
      { property: "og:description", content: "Meet Saad Habib and Misbah, founders of a freelance services business focused on data entry, lead generation, email marketing, and e-commerce support." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 data-reveal="split" className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">About us</h1>
          <p data-reveal="fade" data-reveal-delay="0.2" className="mt-4 text-lg text-muted-foreground">
            A small, dedicated team delivering reliable freelance services to businesses around the world.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Saad Habib */}
            <div data-reveal="scale" className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.25)]">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-gold/40">
                <img
                  data-cursor="image"
                  src={assetUrl(saadPhoto)}
                  alt="Saad Habib, Founder"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-navy">Saad Habib</h2>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Founder</p>
              <p className="mt-4 text-muted-foreground">
                Saad manages client projects and leads the technical work. He specializes in data services, lead generation, and e-commerce operations, making sure every project is delivered accurately and on time.
              </p>
              <a
                data-magnetic
                href="https://www.linkedin.com/in/saad-habib-me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saad Habib on LinkedIn"
                className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-cream transition-colors hover:bg-gold hover:text-navy"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Misbah */}
            <div data-reveal="scale" data-reveal-delay="0.12" className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.25)]">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gold text-3xl font-bold text-navy">
                M
              </div>
              <h2 className="mt-6 text-2xl font-bold text-navy">Misbah</h2>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Founder</p>
              <p className="mt-4 text-muted-foreground">
                Misbah co-leads the business and handles client communication, project coordination, and quality control. She ensures every client gets a smooth, professional experience from start to finish.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="mt-12 rounded-2xl bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <Users className="mx-auto h-10 w-10 text-gold" />
              <h2 className="mt-4 text-2xl font-bold">Our mission</h2>
              <p className="mt-3 text-primary-foreground/90">
                We believe busy entrepreneurs and teams deserve dependable remote support. Our mission is to take care of the time-consuming work — data entry, list management, outreach, and e-commerce tasks — so you can focus on growing your business.
              </p>
            </div>
          </div>

          {/* Contact details */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <a
              href="tel:+923002019194"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-lg font-semibold text-foreground">+92 300 201 9194</p>
              </div>
            </a>
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg font-semibold text-foreground">saadhabibwebsite@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
