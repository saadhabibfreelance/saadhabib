import marketplace from "../assets/work-marketplace.jpg";
import storefront from "../assets/work-storefront.jpg";
import leads from "../assets/work-leads.jpg";
import email from "../assets/work-email.jpg";
import design from "../assets/work-design.jpg";
import web from "../assets/work-web.jpg";

export interface Project {
  id: string;
  title: string;
  discipline: string;
  year: string;
  summary: string;
  metric: string;
  image: string;
  href: string;
}

/** Signature work — presented through the horizontal 3D gallery. */
export const projects: Project[] = [
  {
    id: "marketplace",
    title: "Marketplace Operations",
    discipline: "Amazon · eBay · Walmart",
    year: "2026",
    summary:
      "Catalogue health, A+ content and advertising run as one accountable operating system across three marketplaces.",
    metric: "+38% revenue in 90 days",
    image: marketplace,
    href: "/services",
  },
  {
    id: "storefront",
    title: "Storefront Design",
    discipline: "Shopify · WooCommerce",
    year: "2026",
    summary:
      "Editorial storefronts engineered for conversion — fast, restrained and merchandised with intent.",
    metric: "Launched in 6 days",
    image: storefront,
    href: "/services",
  },
  {
    id: "leads",
    title: "B2B Lead Engine",
    discipline: "Lead Generation · Data",
    year: "2025",
    summary:
      "Verified, enriched and de-duplicated pipelines outbound teams can dial the same morning they land.",
    metric: "2,481 verified rows",
    image: leads,
    href: "/services",
  },
  {
    id: "email",
    title: "Lifecycle Email",
    discipline: "Email Marketing",
    year: "2025",
    summary:
      "Flows, segmentation and list hygiene rebuilt so every send reaches a real inbox and earns its place.",
    metric: "42% open rate",
    image: email,
    href: "/services",
  },
  {
    id: "design",
    title: "Brand & Graphics",
    discipline: "Graphic Design",
    year: "2025",
    summary:
      "Identity systems, listing creative and ad assets with the discipline of a studio, not a template.",
    metric: "120+ assets shipped",
    image: design,
    href: "/services",
  },
  {
    id: "web",
    title: "Web & AI Builds",
    discipline: "Web · CMS · Lovable AI",
    year: "2026",
    summary:
      "Custom sites and AI-assisted builds delivered production-ready, with content models teams can actually run.",
    metric: "99 Lighthouse",
    image: web,
    href: "/services",
  },
];
