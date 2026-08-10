import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DESCRIPTION =
  "Digital tools built by Fivup Leads & Ecommerce — Verixa email verification, TradieBook AI booking, CafePOS ordering and BrandForge AI visuals.";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Fivup Leads & Ecommerce" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Products — Fivup Leads & Ecommerce" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductsPage,
});

export type ProductRow = {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  external_url: string;
  cta_text: string;
  sort_order: number;
};

function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id,name,category,description,image_url,external_url,cta_text,sort_order")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ProductRow[];
    },
  });

  return (
    <main className="relative isolate bg-[#060607] pb-28 pt-32 text-[#F5F1EA]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(127,216,232,0.08),transparent_65%)]"
      />
      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#7FD8E8]/80">Our tools</span>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.03em]">
          Products we build and run.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9A968F]">
          Software we designed, shipped and use ourselves — each one live and open to try.
        </p>

        <div className="mt-16 grid gap-7 sm:grid-cols-2">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[22rem] animate-pulse rounded-[26px] border border-white/10 bg-white/[0.03]" />
            ))}

          {data?.map((p) => (
            <a
              key={p.id}
              href={p.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-[transform,border-color,background-color] duration-500 [transform-style:preserve-3d] hover:-translate-y-1.5 hover:border-[#7FD8E8]/40 hover:bg-white/[0.05]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "radial-gradient(520px 260px at 50% -10%, rgba(127,216,232,0.12), transparent 70%)" }}
              />
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={`${p.name} — ${p.category}`}
                  loading="lazy"
                  decoding="async"
                  className="mb-7 h-44 w-full rounded-2xl border border-white/10 object-cover"
                />
              ) : (
                <span className="mb-7 grid h-44 w-full place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-3xl font-semibold tracking-tight text-white/25">
                  {p.name}
                </span>
              )}
              <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[#7FD8E8]/80">{p.category}</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{p.name}</h2>
              <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-[#9A968F]">{p.description}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#F5F1EA] transition-colors group-hover:text-[#7FD8E8]">
                {p.cta_text}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
