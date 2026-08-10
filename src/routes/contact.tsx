import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone, Linkedin } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { services } from "../lib/services";

const DESCRIPTION =
  "Talk to Fivup Leads & Ecommerce about lead generation, e-commerce, data, email marketing and web or digital support.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fivup Leads & Ecommerce" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Contact — Fivup Leads & Ecommerce" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

const field =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-[#F5F1EA] outline-none transition-colors placeholder:text-white/30 focus:border-[#7FD8E8]/60";

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      service: parsed.data.service || null,
      message: parsed.data.message,
    });
    setSending(false);
    if (error) {
      toast.error("Message could not be sent. Please try again or email us directly.");
      return;
    }
    form.reset();
    setSent(true);
    toast.success("Thanks — your message has been received.");
  }

  return (
    <main className="relative isolate bg-[#060607] pb-28 pt-32 text-[#F5F1EA]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(127,216,232,0.08),transparent_65%)]"
      />
      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#7FD8E8]/80">
          Fivup Leads &amp; Ecommerce
        </span>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.03em]">
          Let’s work together.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9A968F]">
          Tell us what you need — lead generation, e-commerce operations, data work, email marketing, web and digital
          services, or anything else your business runs on. We reply with a clear scope, timeline and price.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.25em] text-white/45">Name</span>
                <input name="name" className={`mt-2 ${field}`} placeholder="Your full name" maxLength={100} />
                {errors.name && <span className="mt-1 block text-xs text-red-400">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.25em] text-white/45">Email</span>
                <input name="email" type="email" className={`mt-2 ${field}`} placeholder="you@company.com" maxLength={255} />
                {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email}</span>}
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.25em] text-white/45">Phone number</span>
                <input name="phone" className={`mt-2 ${field}`} placeholder="+1 555 000 0000" maxLength={40} />
                {errors.phone && <span className="mt-1 block text-xs text-red-400">{errors.phone}</span>}
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.25em] text-white/45">Service</span>
                <select name="service" defaultValue="" className={`mt-2 ${field}`}>
                  <option value="" className="bg-[#0B0B0C]">
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title} className="bg-[#0B0B0C]">
                      {s.title}
                    </option>
                  ))}
                  <option value="Other" className="bg-[#0B0B0C]">
                    Other / not sure yet
                  </option>
                </select>
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-xs uppercase tracking-[0.25em] text-white/45">Message</span>
              <textarea
                name="message"
                rows={6}
                maxLength={2000}
                className={`mt-2 resize-y ${field}`}
                placeholder="Tell us about your project, volumes and timeline."
              />
              {errors.message && <span className="mt-1 block text-xs text-red-400">{errors.message}</span>}
            </label>

            <button
              type="submit"
              disabled={sending}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#7FD8E8]/40 bg-[#7FD8E8]/10 px-7 py-3 text-sm font-medium tracking-wide text-[#F5F1EA] transition-colors hover:border-[#7FD8E8] hover:text-[#7FD8E8] disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send message"}
              <ArrowRight className="h-4 w-4" />
            </button>
            {sent && (
              <p className="mt-4 text-sm text-[#7FD8E8]">
                Your message is with us — we usually reply within one business day.
              </p>
            )}
          </form>

          <aside className="flex flex-col gap-4">
            <a
              href="mailto:saadhabibwebsite@gmail.com"
              className="group flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#7FD8E8]/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-[#7FD8E8]">
                <Mail className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.25em] text-white/40">Email</span>
                <span className="mt-1 block text-sm">saadhabibwebsite@gmail.com</span>
              </span>
            </a>
            <a
              href="tel:+923002019194"
              className="group flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#7FD8E8]/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-[#7FD8E8]">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.25em] text-white/40">Phone</span>
                <span className="mt-1 block text-sm">+92 300 201 9194</span>
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/saad-habib-me"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#7FD8E8]/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-[#7FD8E8]">
                <Linkedin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.25em] text-white/40">LinkedIn</span>
                <span className="mt-1 block text-sm">saad-habib-me</span>
              </span>
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
