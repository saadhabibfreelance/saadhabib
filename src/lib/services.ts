import {
  Building2,
  CalendarCheck,
  Database,
  FileSpreadsheet,
  Linkedin,
  Mail,
  Package,
  ScanSearch,
  ShieldCheck,
  Store,
  Users,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
  category: "Ecommerce" | "Data & Leads" | "Digital";
}

/** Fivup Leads & Ecommerce — full service catalogue. */
export const services: Service[] = [
  {
    id: "b2b-lead-generation",
    title: "B2B Lead Generation",
    description:
      "Decision-maker leads researched, verified and delivered in a format your sales team can dial the same morning.",
    features: ["ICP research", "Verified emails", "Direct & company phones", "CRM-ready exports"],
    Icon: Users,
    category: "Data & Leads",
  },
  {
    id: "data-entry",
    title: "Data Entry",
    description:
      "Accurate, structured and quality-checked data entry across spreadsheets, CRMs and back-office systems.",
    features: ["Spreadsheet & CRM entry", "Document to data", "Formatting & standardisation", "Double-pass QA"],
    Icon: FileSpreadsheet,
    category: "Data & Leads",
  },
  {
    id: "data-scraping",
    title: "Data Scraping / Web Research",
    description:
      "Targeted web research and extraction that turns scattered public sources into one clean, usable dataset.",
    features: ["Custom source lists", "Structured extraction", "De-duplication", "Scheduled refreshes"],
    Icon: ScanSearch,
    category: "Data & Leads",
  },
  {
    id: "linkedin-lead-generation",
    title: "LinkedIn Lead Generation",
    description:
      "Sales Navigator-driven prospecting that surfaces the right titles, in the right companies, at the right moment.",
    features: ["Sales Navigator targeting", "Profile & company enrichment", "Email discovery", "Outreach-ready lists"],
    Icon: Linkedin,
    category: "Data & Leads",
  },
  {
    id: "real-estate-lead-generation",
    title: "Real Estate Lead Generation",
    description:
      "Owner, investor and agent data built for real estate teams that need reachable contacts, not raw noise.",
    features: ["Owner & investor data", "Skip tracing support", "Market-level filtering", "Verified phone numbers"],
    Icon: Building2,
    category: "Data & Leads",
  },
  {
    id: "ecommerce-product-listing",
    title: "E-commerce Product Listing",
    description:
      "Search-ready listings written, formatted and uploaded across Amazon, eBay, Walmart, Shopify and more.",
    features: ["Keyword-led titles", "Bullets & descriptions", "Bulk uploads", "Variation & image setup"],
    Icon: Package,
    category: "Ecommerce",
  },
  {
    id: "ecommerce-store-management",
    title: "E-commerce Store Management",
    description:
      "Day-to-day storefront operations run with retail discipline — catalogue, orders, pricing and performance.",
    features: ["Catalogue health", "Order & inventory support", "Pricing & competitor checks", "Performance reporting"],
    Icon: Store,
    category: "Ecommerce",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description:
      "Campaigns and lifecycle flows built to reach real inboxes and earn attention rather than unsubscribes.",
    features: ["Campaign setup", "Automation flows", "Segmentation", "Deliverability care"],
    Icon: Mail,
    category: "Digital",
  },
  {
    id: "youtube-automation",
    title: "YouTube Automation",
    description:
      "Channel operations handled end to end — research, scripting support, uploads, metadata and publishing rhythm.",
    features: ["Niche & keyword research", "Upload & scheduling", "SEO titles, tags, descriptions", "Thumbnail coordination"],
    Icon: Youtube,
    category: "Digital",
  },
  {
    id: "b2b-list-building",
    title: "B2B List Building",
    description:
      "Purpose-built prospect lists assembled to your exact criteria, with every row sourced and checked by hand.",
    features: ["Custom criteria", "Company firmographics", "Contact discovery", "Organised spreadsheets"],
    Icon: Database,
    category: "Data & Leads",
  },
  {
    id: "data-cleaning-verification",
    title: "Data Cleaning & Verification",
    description:
      "Tired lists rebuilt into reliable ones — duplicates removed, formats normalised, contacts re-verified.",
    features: ["De-duplication", "Email verification", "Format standardisation", "Bounce reduction"],
    Icon: ShieldCheck,
    category: "Data & Leads",
  },
  {
    id: "appointment-contact-list-building",
    title: "Appointment / Contact List Building",
    description:
      "Contact lists shaped for booking — the right people, reachable details and notes that make the call easier.",
    features: ["Decision-maker mapping", "Direct contact details", "Timezone & region tagging", "Follow-up ready notes"],
    Icon: CalendarCheck,
    category: "Data & Leads",
  },
];
