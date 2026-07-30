import { memo } from "react";
import type { Scene } from "./scenes";

const rows = [
  ["Alex Kim", "alex@", "CTO"],
  ["Sara Wu", "sara@", "VP"],
  ["Noah Patel", "noah@", "Head"],
  ["Ida Ortega", "ida@", "Ops"],
  ["Yuki Sato", "yuki@", "Eng"],
  ["Mia Fischer", "mia@", "PM"],
  ["Leo Ross", "leo@", "GTM"],
];

const campaigns = [
  { s: "Welcome sequence · Day 1", o: "68% open · 22% click", w: 70 },
  { s: "Nurture · SaaS trial", o: "54% open · 14% click", w: 54 },
  { s: "Reactivation · 60d silent", o: "41% open · 9% click", w: 41 },
];

const products = [
  { n: "Everyday Tote", p: "$48", a: "#F472B6", b: "#FFC847" },
  { n: "Studio Lamp", p: "$129", a: "#7B5CFF", b: "#00C2FF" },
  { n: "Minimal Chair", p: "$249", a: "#00C2FF", b: "#4ADE80" },
  { n: "Wall Clock", p: "$62", a: "#FFD166", b: "#EC4899" },
];

const timeline = [
  { d: "Mon", t: "Kickoff · brand brief" },
  { d: "Tue", t: "Theme scaffold · nav" },
  { d: "Wed", t: "Product listings imported" },
  { d: "Thu", t: "Checkout + payments" },
  { d: "Fri", t: "QA + soft launch ready" },
];

export const StoryVisual = memo(function StoryVisual({ scene }: { scene: Scene }) {
  const { visual, accent, glow1, glow2, Icon } = scene;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div
        className="pointer-events-none absolute inset-6 rounded-full opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glow1}, transparent 60%), radial-gradient(circle at 30% 70%, ${glow2}, transparent 60%)`,
        }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5A5A]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">
            <Icon className="h-3 w-3" style={{ color: accent }} />
            Live
          </span>
        </div>

        {visual === "data" && (
          <div className="mt-5 space-y-2">
            <div className="grid grid-cols-4 gap-2 text-[10px] uppercase tracking-widest text-white/40">
              <span>Name</span><span>Email</span><span>Role</span><span>Status</span>
            </div>
            {rows.map(([n, e, r]) => (
              <div key={n} className="grid grid-cols-4 items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-2 text-[11px] text-white/80">
                <span className="truncate">{n}</span>
                <span className="truncate text-white/60">{e}acme.io</span>
                <span className="text-white/70">{r}</span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />verified
                </span>
              </div>
            ))}
          </div>
        )}

        {visual === "leads" && (
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Campaign</div>
              <div className="mt-1 font-[Space_Grotesk,ui-sans-serif] text-lg font-bold text-white">Q3 Outbound · SaaS Founders</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[["2,481", "Contacts"], ["94%", "Verified"], ["31%", "Reply"]].map(([k, v]) => (
                  <div key={v} className="rounded-lg bg-white/[0.05] p-2">
                    <div className="font-[Space_Grotesk,ui-sans-serif] text-lg font-bold" style={{ color: accent }}>{k}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/50">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            {["Series A · New York", "Series B · Berlin", "Bootstrapped · Remote"].map((s, i) => (
              <div key={s} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-white/80">
                <span>{s}</span>
                <span className="text-[10px]" style={{ color: accent }}>+{[482, 356, 214][i]} leads</span>
              </div>
            ))}
          </div>
        )}

        {visual === "email" && (
          <div className="mt-5 space-y-3">
            {campaigns.map((m) => (
              <div key={m.s} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{m.s}</div>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${accent}22`, color: accent }}>Sent</span>
                </div>
                <div className="mt-1 text-[11px] text-white/50">{m.o}</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${m.w}%`, background: `linear-gradient(90deg, ${glow1}, ${glow2})` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {visual === "store" && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.n} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                <div className="aspect-square w-full" style={{ background: `linear-gradient(135deg, ${p.a}, ${p.b})` }} />
                <div className="flex items-center justify-between p-3">
                  <div className="text-xs font-semibold text-white">{p.n}</div>
                  <div className="text-xs" style={{ color: accent }}>{p.p}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {visual === "delivery" && (
          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Project</div>
              <div className="mt-1 font-[Space_Grotesk,ui-sans-serif] text-lg font-bold text-white">Shopify · Everyday Studio</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: "84%", background: `linear-gradient(90deg, ${glow1}, ${glow2})` }} />
                  </div>
                </div>
                <span className="text-xs font-bold" style={{ color: accent }}>Day 5 / 6</span>
              </div>
            </div>
            {timeline.map((r) => (
              <div key={r.d} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs">
                <span className="w-8 text-[10px] uppercase tracking-widest text-white/50">{r.d}</span>
                <span className="text-white/85">{r.t}</span>
                <span className="ml-auto text-[10px]" style={{ color: accent }}>done</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
