import { Database, Mail, ShoppingBag, Sparkles, Target } from "lucide-react";

export type Scene = {
  eyebrow: string;
  title: string;
  paragraph: string;
  cta: string;
  href: string;
  gradient: string;
  glow1: string;
  glow2: string;
  accent: string;
  Icon: typeof Database;
  visual: "data" | "leads" | "email" | "store" | "delivery";
};

export const scenes: Scene[] = [
  {
    eyebrow: "Chapter 01 · Foundations",
    title: "Clean data is\nyour unfair advantage.",
    paragraph:
      "Bulk entry, extraction and list cleaning done at studio quality. Zero duplicates, verified fields, and a delivery you can trust in production.",
    cta: "Explore data services",
    href: "/services#data-entry",
    gradient:
      "radial-gradient(1200px 700px at 20% 20%, rgba(200,169,106,0.18), transparent 60%), radial-gradient(900px 700px at 80% 80%, rgba(200,169,106,0.18), transparent 60%), linear-gradient(135deg,#0B0B0C 0%,#111112 100%)",
    glow1: "#F5F1EA",
    glow2: "#C8A96A",
    accent: "#C8A96A",
    Icon: Database,
    visual: "data",
  },
  {
    eyebrow: "Chapter 02 · Growth",
    title: "Lead lists that\nactually convert.",
    paragraph:
      "Targeted B2B prospecting with verified emails, LinkedIn URLs and role-based filters. Built for outbound teams that measure reply rates, not vanity counts.",
    cta: "See lead generation",
    href: "/services#lead-generation",
    gradient:
      "radial-gradient(1000px 700px at 80% 20%, rgba(200,169,106,0.18), transparent 60%), radial-gradient(900px 700px at 20% 80%, rgba(200,169,106,0.18), transparent 60%), linear-gradient(135deg,#0B0B0C 0%,#111112 100%)",
    glow1: "#FF5A5A",
    glow2: "#FFC847",
    accent: "#C8A96A",
    Icon: Target,
    visual: "leads",
  },
  {
    eyebrow: "Chapter 03 · Reach",
    title: "Email that lands\nin the inbox.",
    paragraph:
      "Warm-up, cleaning, segmentation and campaigns tuned for deliverability. Your list stays healthy, your sender score climbs, your revenue follows.",
    cta: "Explore email work",
    href: "/services#email-marketing",
    gradient:
      "radial-gradient(1200px 700px at 30% 30%, rgba(200,169,106,0.18), transparent 60%), radial-gradient(900px 700px at 80% 70%, rgba(200,169,106,0.18), transparent 60%), linear-gradient(135deg,#0B0B0C 0%,#111112 100%)",
    glow1: "#B9B4AC",
    glow2: "#C8A96A",
    accent: "#B9B4AC",
    Icon: Mail,
    visual: "email",
  },
  {
    eyebrow: "Chapter 04 · Commerce",
    title: "Storefronts built\nto convert.",
    paragraph:
      "Shopify and Amazon listings that read like a brand and sell like a product team ran them. Fast, mobile-first, and set up to scale from day one.",
    cta: "See e-commerce work",
    href: "/services#ecommerce-store",
    gradient:
      "radial-gradient(1000px 700px at 20% 20%, rgba(200,169,106,0.18), transparent 60%), radial-gradient(900px 700px at 80% 80%, rgba(200,169,106,0.18), transparent 60%), linear-gradient(135deg,#0B0B0C 0%,#111112 100%)",
    glow1: "#EC4899",
    glow2: "#F5F1EA",
    accent: "#EC4899",
    Icon: ShoppingBag,
    visual: "store",
  },
  {
    eyebrow: "Chapter 05 · Delivery",
    title: "Shipped in days,\nnot quarters.",
    paragraph:
      "One senior operator, direct communication, and daily updates. No account managers, no hand-offs — just work delivered on time with the polish of a product team.",
    cta: "Start a project",
    href: "mailto:saadhabibwebsite@gmail.com",
    gradient:
      "radial-gradient(1200px 700px at 50% 20%, rgba(200,169,106,0.18), transparent 60%), radial-gradient(900px 700px at 50% 80%, rgba(200,169,106,0.18), transparent 60%), linear-gradient(135deg,#0B0B0C 0%,#111112 100%)",
    glow1: "#C8A96A",
    glow2: "#B9B4AC",
    accent: "#B9B4AC",
    Icon: Sparkles,
    visual: "delivery",
  },
];
