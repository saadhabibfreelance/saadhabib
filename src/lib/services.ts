import {
  BadgeDollarSign,
  BarChart3,
  Boxes,
  Brain,
  Braces,
  Database,
  FileSpreadsheet,
  Globe,
  LayoutTemplate,
  Mail,
  Megaphone,
  MousePointerClick,
  Package,
  PenTool,
  ScanSearch,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tags,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
  category: "Ecommerce" | "Data & Leads" | "Digital" | "AI & Web";
}

/** Fivup Leads & Ecommerce — full service catalogue. */
export const services: Service[] = [
  {
    id: "amazon-store-management",
    title: "Amazon Store Management",
    description:
      "End-to-end Seller Central operations — from catalogue health to advertising — run with retail-grade discipline.",
    features: ["Listing optimisation", "A+ content", "PPC campaign management", "Inventory & FBA support"],
    Icon: Package,
    category: "Ecommerce",
  },
  {
    id: "ebay-store-management",
    title: "eBay Store Management",
    description:
      "Structured eBay storefronts with clean listings, competitive pricing and consistent seller performance.",
    features: ["Bulk listing uploads", "Title & keyword research", "Order management", "Store design"],
    Icon: Tags,
    category: "Ecommerce",
  },
  {
    id: "etsy-store-management",
    title: "Etsy Store Management",
    description:
      "Craft-led shops presented with editorial polish and search visibility that compounds month over month.",
    features: ["SEO-driven listings", "Shop branding", "Photo formatting", "Review & order handling"],
    Icon: ShoppingBag,
    category: "Ecommerce",
  },
  {
    id: "walmart-marketplace",
    title: "Walmart Marketplace Services",
    description:
      "Marketplace onboarding, catalogue setup and ongoing performance management for Walmart sellers.",
    features: ["Account setup", "Bulk catalogue feeds", "Pricing strategy", "Performance monitoring"],
    Icon: Store,
    category: "Ecommerce",
  },
  {
    id: "shopify-development",
    title: "Shopify Development",
    description:
      "Conversion-focused Shopify builds with refined theming, fast load times and clean merchandising logic.",
    features: ["Custom theme work", "App integration", "Speed optimisation", "Checkout refinement"],
    Icon: ShoppingCart,
    category: "Ecommerce",
  },
  {
    id: "woocommerce-development",
    title: "WooCommerce Development",
    description:
      "Flexible WordPress commerce engineered for control — payments, shipping, taxes and custom flows.",
    features: ["Store setup", "Payment gateways", "Custom product logic", "Plugin configuration"],
    Icon: Boxes,
    category: "Ecommerce",
  },
  {
    id: "wordpress-development",
    title: "WordPress Development",
    description:
      "Editorial-grade WordPress sites: fast, accessible, and simple for your team to maintain.",
    features: ["Theme customisation", "Page builders", "Security hardening", "Performance tuning"],
    Icon: LayoutTemplate,
    category: "AI & Web",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Modern, responsive websites and landing pages built with contemporary frontend standards.",
    features: ["Responsive builds", "Landing pages", "Technical SEO", "Analytics setup"],
    Icon: Braces,
    category: "AI & Web",
  },
  {
    id: "b2b-lead-generation",
    title: "B2B Lead Generation",
    description:
      "Verified decision-maker lists built to your ICP, ready for outbound teams that measure reply rates.",
    features: ["ICP research", "Verified emails", "LinkedIn sourcing", "CRM-ready exports"],
    Icon: UserRoundCheck,
    category: "Data & Leads",
  },
  {
    id: "data-entry",
    title: "Data Entry",
    description:
      "High-volume, high-accuracy entry across spreadsheets, CRMs and internal systems.",
    features: ["Excel & Google Sheets", "CRM updates", "Document processing", "QA-checked delivery"],
    Icon: FileSpreadsheet,
    category: "Data & Leads",
  },
  {
    id: "data-scraping",
    title: "Data Scraping",
    description:
      "Structured extraction from web sources, directories and documents — delivered production-ready.",
    features: ["Web scraping", "PDF parsing", "Scheduled extraction", "Clean structured exports"],
    Icon: ScanSearch,
    category: "Data & Leads",
  },
  {
    id: "data-annotation",
    title: "Data Annotation",
    description:
      "Careful labelling and classification for machine-learning datasets with consistent guidelines.",
    features: ["Image & text labelling", "Taxonomy design", "Quality review", "Guideline adherence"],
    Icon: Database,
    category: "Data & Leads",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description:
      "Lifecycle campaigns and sequences engineered for deliverability, not vanity open rates.",
    features: ["Campaign strategy", "Template design", "Segmentation", "Automation flows"],
    Icon: Mail,
    category: "Data & Leads",
  },
  {
    id: "facebook-ads",
    title: "Facebook Ads",
    description:
      "Paid social built around clean tracking, disciplined testing and measurable acquisition cost.",
    features: ["Campaign setup", "Audience building", "Creative testing", "Pixel & conversion tracking"],
    Icon: MousePointerClick,
    category: "Digital",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Brand-consistent visual assets for storefronts, campaigns and social — restrained and premium.",
    features: ["Brand assets", "Ad creatives", "Product graphics", "Social templates"],
    Icon: PenTool,
    category: "Digital",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Channel strategy, content and reporting joined into one accountable growth programme.",
    features: ["Channel strategy", "SEO & content", "Reporting dashboards", "Funnel optimisation"],
    Icon: Megaphone,
    category: "Digital",
  },
  {
    id: "virtual-assistant",
    title: "Virtual Assistant Services",
    description:
      "Reliable day-to-day operational support so your team can stay on the work that compounds.",
    features: ["Inbox & calendar", "Order support", "Research tasks", "Process documentation"],
    Icon: BadgeDollarSign,
    category: "Digital",
  },
  {
    id: "complete-store-management",
    title: "Complete Store Management",
    description:
      "One accountable team for the whole storefront: catalogue, ads, service and reporting.",
    features: ["Multi-channel ops", "Catalogue governance", "Ads & promotions", "Monthly reporting"],
    Icon: BarChart3,
    category: "Ecommerce",
  },
  {
    id: "cms-development",
    title: "CMS Development",
    description:
      "Content systems your editors actually enjoy — structured models, clean roles, no clutter.",
    features: ["Content modelling", "Editor workflows", "Migrations", "Role-based access"],
    Icon: Globe,
    category: "AI & Web",
  },
  {
    id: "ai-website-development",
    title: "AI Website Development / Lovable AI",
    description:
      "AI-assisted product and website builds shipped at studio quality in a fraction of the usual time.",
    features: ["Lovable AI builds", "Rapid prototyping", "AI feature integration", "Production hardening"],
    Icon: Brain,
    category: "AI & Web",
  },
];
