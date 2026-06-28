export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: "data-entry",
    title: "Data Entry",
    description: "Accurate, fast, and reliable manual data entry for spreadsheets, CRMs, databases, and forms.",
    features: ["Excel & Google Sheets", "CRM updates", "Form submissions", "Error-free typing"],
    icon: "⌨️",
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    description: "Build targeted prospect lists with verified contact details to fuel your sales pipeline.",
    features: ["B2B prospecting", "Email & phone research", "LinkedIn sourcing", "Verified contacts"],
    icon: "🎯",
  },
  {
    id: "data-extraction",
    title: "Data Extraction",
    description: "Extract structured data from websites, PDFs, and documents into usable formats.",
    features: ["Web scraping", "PDF parsing", "Document conversion", "Structured exports"],
    icon: "🔍",
  },
  {
    id: "list-cleaning",
    title: "List Cleaning",
    description: "Remove duplicates, fix formatting, and validate your contact lists for better deliverability.",
    features: ["Duplicate removal", "Format standardization", "Validation checks", "Deduplication"],
    icon: "🧹",
  },
  {
    id: "list-building",
    title: "List Building",
    description: "Create custom, segmented lists for marketing, outreach, or research campaigns.",
    features: ["Custom criteria", "Segmented lists", "Targeted audiences", "Ready-to-use formats"],
    icon: "📋",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description: "Set up and manage email campaigns, templates, and sequences that drive engagement.",
    features: ["Campaign setup", "Template design", "Audience segmentation", "Automation sequences"],
    icon: "✉️",
  },
  {
    id: "email-cleaning",
    title: "Email Cleaning",
    description: "Validate and clean email lists to reduce bounces and protect sender reputation.",
    features: ["Bounce detection", "Invalid email removal", "Syntax verification", "Domain checks"],
    icon: "🧽",
  },
  {
    id: "ecommerce-listing",
    title: "E-commerce Product Listing",
    description: "Upload and optimize product listings across Shopify, Amazon, eBay, and more.",
    features: ["Shopify & Amazon", "SEO titles & descriptions", "Image uploads", "Inventory updates"],
    icon: "🛒",
  },
  {
    id: "ecommerce-design",
    title: "E-commerce Store Designing",
    description: "Design and customize attractive, conversion-focused e-commerce storefronts.",
    features: ["Store themes", "Product pages", "Logo & branding", "Responsive design"],
    icon: "🎨",
  },
];
