import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "../components/home/Hero";

const Story = lazy(() => import("../components/home/Story").then((m) => ({ default: m.Story })));
const About = lazy(() => import("../components/home/About").then((m) => ({ default: m.About })));
const Statistics = lazy(() =>
  import("../components/home/Statistics").then((m) => ({ default: m.Statistics })),
);
const Features = lazy(() => import("../components/home/Features").then((m) => ({ default: m.Features })));
const Process = lazy(() => import("../components/home/Process").then((m) => ({ default: m.Process })));
const Testimonials = lazy(() =>
  import("../components/home/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const CTA = lazy(() => import("../components/home/CTA").then((m) => ({ default: m.CTA })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saad Habib — Freelance Data, Leads & E-commerce" },
      {
        name: "description",
        content:
          "Cinematic freelance studio by Saad Habib: data entry, lead generation, email marketing, and e-commerce store design that ships fast.",
      },
      { property: "og:title", content: "Saad Habib — Freelance Data, Leads & E-commerce" },
      {
        property: "og:description",
        content:
          "Cinematic freelance studio by Saad Habib: data entry, lead generation, email marketing, and e-commerce store design that ships fast.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<div className="min-h-[60vh] bg-[#050816]" />}>
        <Story />
        <About />
        <Statistics />
        <Features />
        <Process />
        <Testimonials />
        <CTA />
      </Suspense>
    </div>
  );
}
