import type { LucideIcon } from "lucide-react";
import { Boxes, Cpu, Database, Sparkles } from "lucide-react";

export interface SkillCategory {
  id: string;
  label: string;
  blurb: string;
  Icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ecommerce",
    label: "Ecommerce",
    blurb: "Marketplace and storefront operations run end to end.",
    Icon: Boxes,
    skills: [
      "Amazon",
      "eBay",
      "Etsy",
      "Walmart",
      "Shopify",
      "WooCommerce",
      "WordPress",
      "Store Management",
    ],
  },
  {
    id: "leads-data",
    label: "Lead Generation & Data",
    blurb: "Clean, verified pipelines that outbound teams can trust.",
    Icon: Database,
    skills: [
      "B2B Lead Generation",
      "Data Entry",
      "Data Scraping",
      "Data Annotation",
      "Email Marketing",
    ],
  },
  {
    id: "digital",
    label: "Digital Services",
    blurb: "Design, media and support that keep growth compounding.",
    Icon: Cpu,
    skills: [
      "Web Development",
      "Graphic Design",
      "Digital Marketing",
      "Facebook Ads",
      "Virtual Assistant Services",
    ],
  },
  {
    id: "ai-tools",
    label: "AI & Modern Tools",
    blurb: "Modern build stacks that ship in days, not quarters.",
    Icon: Sparkles,
    skills: ["Lovable AI", "AI Website Development", "CMS Development"],
  },
];
