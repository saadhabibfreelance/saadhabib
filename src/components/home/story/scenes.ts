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
      "radial-gradient(1200px 700px at 20% 20%, rgba(123,92,255,0.55), transparent 60%), radial-gradient(900px 700px at 80% 80%, rgba(0,194,255,0.35), transparent 60%), linear-gradient(135deg,#0B0F2A 0%,#1B0B3A 100%)",
    glow1: "#7B5CFF",
    glow2: "#00C2FF",
    accent: "#00C2FF",
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
      "radial-gradient(1000px 700px at 80% 20%, rgba(255,90,90,0.5), transparent 60%), radial-gradient(900px 700px at 20% 80%, rgba(255,200,71,0.4), transparent 60%), linear-gradient(135deg,#2A0A1F 0%,#3A1B0B 100%)",
    glow1: "#FF5A5A",
    glow2: "#FFC847",
    accent: "#FFD93D",
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
      "radial-gradient(1200px 700px at 30% 30%, rgba(74,222,128,0.45), transparent 60%), radial-gradient(900px 700px at 80% 70%, rgba(0,194,255,0.4), transparent 60%), linear-gradient(135deg,#062018 0%,#0A2A3A 100%)",
    glow1: "#4ADE80",
    glow2: "#00C2FF",
    accent: "#4ADE80",
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
      "radial-gradient(1000px 700px at 20% 20%, rgba(236,72,153,0.5), transparent 60%), radial-gradient(900px 700px at 80% 80%, rgba(123,92,255,0.45), transparent 60%), linear-gradient(135deg,#2A0A22 0%,#180A2A 100%)",
    glow1: "#EC4899",
    glow2: "#7B5CFF",
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
      "radial-gradient(1200px 700px at 50% 20%, rgba(0,194,255,0.5), transparent 60%), radial-gradient(900px 700px at 50% 80%, rgba(74,222,128,0.35), transparent 60%), linear-gradient(135deg,#050816 0%,#0A1830 100%)",
    glow1: "#00C2FF",
    glow2: "#4ADE80",
    accent: "#4ADE80",
    Icon: Sparkles,
    visual: "delivery",
  },
];
