import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const DESCRIPTION =
  "Notes and playbooks from Fivup Leads & Ecommerce on lead generation, data quality, e-commerce operations and email deliverability.";

const posts = [
  {
    id: "verified-lead-lists",
    category: "Lead Generation",
    title: "What makes a lead list actually worth calling",
    excerpt:
      "Volume is easy. Reachability is not. How we source, enrich and verify so a rep can dial the same morning a list lands.",
    date: "Coming soon",
  },
  {
    id: "listing-quality",
    category: "E-commerce",
    title: "Listing quality is a revenue lever, not a chore",
    excerpt:
      "Titles, bullets, attributes and imagery decide where you rank and whether the click converts. A practical checklist.",
    date: "Coming soon",
  },
  {
    id: "deliverability",
    category: "Email Marketing",
    title: "Deliverability starts before the first send",
    excerpt:
      "Cleaning, warm-up and segmentation do more for open rates than any subject line trick. Here is the order we work in.",
    date: "Coming soon",
  },
];

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs — Fivup Leads & Ecommerce" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Blogs — Fivup Leads & Ecommerce" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  return (
    <main className="relative isolate bg-[#060607] pb-28 pt-32 text-[#F5F1EA]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(127,216,232,0.07),transparent_65%)]"
      />
      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#7FD8E8]/80">Journal</span>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.03em]">
          Notes from the work.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9A968F]">
          Short, practical write-ups on the things clients ask us most — data quality, prospecting, storefronts and
          deliverability.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col rounded-[26px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-[#7FD8E8]/40"
            >
              <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[#7FD8E8]/80">{p.category}</span>
              <h2 className="mt-4 text-xl font-semibold leading-tight tracking-tight">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#9A968F]">{p.excerpt}</p>
              <span className="mt-7 text-xs uppercase tracking-[0.25em] text-white/35">{p.date}</span>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-5 rounded-[26px] border border-white/10 bg-white/[0.03] p-8">
          <p className="text-base text-[#9A968F]">Want a topic covered, or need help right now?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#7FD8E8]/40 px-6 py-3 text-sm text-[#F5F1EA] transition-colors hover:border-[#7FD8E8] hover:text-[#7FD8E8]"
          >
            Contact us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
