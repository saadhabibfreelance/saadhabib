import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Mail, MailOpen, Package, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard" },
      { name: "description", content: "Private admin dashboard." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Admin dashboard" },
      { property: "og:description", content: "Private admin dashboard." },
    ],
  }),
  component: AdminDashboard,
});

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  external_url: string;
  cta_text: string;
  sort_order: number;
  is_visible: boolean;
};

const field =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm text-[#F5F1EA] outline-none transition-colors placeholder:text-white/30 focus:border-[#7FD8E8]/60";

function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"messages" | "products">("messages");

  const roleQuery = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", auth.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/fivup-admin", replace: true });
  }

  if (roleQuery.isLoading) {
    return <main className="grid min-h-screen place-items-center bg-[#060607] text-sm text-white/50">Loading…</main>;
  }

  if (!roleQuery.data) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#060607] px-5 text-center text-[#F5F1EA]">
        <div>
          <h1 className="text-2xl font-semibold">Not authorised</h1>
          <p className="mt-3 text-sm text-[#9A968F]">This account does not have admin access.</p>
          <button
            onClick={signOut}
            className="mt-6 rounded-full border border-white/15 px-6 py-2.5 text-sm transition-colors hover:border-[#7FD8E8]/60"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060607] px-5 pb-24 pt-32 text-[#F5F1EA] sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-[0.68rem] uppercase tracking-[0.4em] text-[#7FD8E8]/80">Private</span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Admin dashboard</h1>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8]"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-9 flex gap-2">
          <TabButton active={tab === "messages"} onClick={() => setTab("messages")} icon={<Mail className="h-4 w-4" />}>
            Contact messages
          </TabButton>
          <TabButton active={tab === "products"} onClick={() => setTab("products")} icon={<Package className="h-4 w-4" />}>
            Manage products
          </TabButton>
        </div>

        <div className="mt-9">{tab === "messages" ? <MessagesPanel /> : <ProductsPanel />}</div>
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors ${
        active ? "border-[#7FD8E8]/50 bg-[#7FD8E8]/10 text-[#7FD8E8]" : "border-white/12 text-white/60 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function MessagesPanel() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const { data, isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Message[];
    },
  });

  const toggleRead = useMutation({
    mutationFn: async (m: Message) => {
      const { error } = await supabase.from("contact_messages").update({ is_read: !m.is_read }).eq("id", m.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-messages"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Message deleted");
      qc.invalidateQueries({ queryKey: ["contact-messages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const unread = data?.filter((m) => !m.is_read).length ?? 0;

  const rows = useMemo(() => {
    let list = data ?? [];
    const term = q.trim().toLowerCase();
    if (term) {
      list = list.filter((m) =>
        [m.name, m.email, m.phone, m.service, m.message].some((v) => (v ?? "").toLowerCase().includes(term)),
      );
    }
    if (filter !== "all") list = list.filter((m) => (filter === "unread" ? !m.is_read : m.is_read));
    return [...list].sort((a, b) =>
      sort === "newest"
        ? +new Date(b.created_at) - +new Date(a.created_at)
        : +new Date(a.created_at) - +new Date(b.created_at),
    );
  }, [data, q, filter, sort]);

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#7FD8E8]/40 bg-[#7FD8E8]/10 px-4 py-2 text-xs text-[#7FD8E8]">
          {unread} unread
        </span>
        <label className="relative min-w-[14rem] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search messages"
            className={`${field} pl-9`}
          />
        </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className={`${field} w-auto`}>
          <option value="all" className="bg-[#0B0B0C]">All</option>
          <option value="unread" className="bg-[#0B0B0C]">Unread</option>
          <option value="read" className="bg-[#0B0B0C]">Read</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${field} w-auto`}>
          <option value="newest" className="bg-[#0B0B0C]">Newest first</option>
          <option value="oldest" className="bg-[#0B0B0C]">Oldest first</option>
        </select>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading && <p className="text-sm text-white/40">Loading messages…</p>}
        {!isLoading && rows.length === 0 && <p className="text-sm text-white/40">No messages found.</p>}
        {rows.map((m) => (
          <article
            key={m.id}
            className={`rounded-[22px] border p-6 transition-colors ${
              m.is_read ? "border-white/10 bg-white/[0.02]" : "border-[#7FD8E8]/30 bg-white/[0.04]"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm text-[#9A968F]">
                  {m.email}
                  {m.phone ? ` · ${m.phone}` : ""}
                  {m.service ? ` · ${m.service}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/35">{new Date(m.created_at).toLocaleString()}</span>
                <button
                  onClick={() => toggleRead.mutate(m)}
                  title={m.is_read ? "Mark as unread" : "Mark as read"}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8]"
                >
                  {m.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => remove.mutate(m.id)}
                  title="Delete"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 transition-colors hover:border-red-400/60 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#B9B4AC]">{m.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const emptyProduct = {
  name: "",
  category: "",
  description: "",
  image_url: "",
  external_url: "",
  cta_text: "Explore Tool",
  sort_order: 0,
  is_visible: true,
};

function ProductsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["products", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Product[];
    },
  });

  const save = useMutation({
    mutationFn: async (p: Partial<Product>) => {
      const payload = {
        name: p.name?.trim() ?? "",
        category: p.category?.trim() ?? "",
        description: p.description?.trim() ?? "",
        image_url: p.image_url?.trim() ? p.image_url.trim() : null,
        external_url: p.external_url?.trim() ?? "",
        cta_text: p.cta_text?.trim() || "Explore Tool",
        sort_order: Number(p.sort_order) || 0,
        is_visible: p.is_visible ?? true,
      };
      if (!payload.name || !payload.category || !payload.description || !payload.external_url) {
        throw new Error("Name, category, description and external URL are required.");
      }
      const { error } = p.id
        ? await supabase.from("products").update(payload).eq("id", p.id)
        : await supabase.from("products").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <section>
      <button
        onClick={() => setEditing({ ...emptyProduct })}
        className="rounded-full border border-[#7FD8E8]/40 bg-[#7FD8E8]/10 px-5 py-2.5 text-sm text-[#7FD8E8] transition-colors hover:border-[#7FD8E8]"
      >
        Add product
      </button>

      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(editing);
          }}
          className="mt-6 grid gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-2"
        >
          <input
            className={field}
            placeholder="Product name"
            value={editing.name ?? ""}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
          />
          <input
            className={field}
            placeholder="Category"
            value={editing.category ?? ""}
            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
          />
          <input
            className={field}
            placeholder="External URL (https://…)"
            value={editing.external_url ?? ""}
            onChange={(e) => setEditing({ ...editing, external_url: e.target.value })}
          />
          <input
            className={field}
            placeholder="Image URL (optional)"
            value={editing.image_url ?? ""}
            onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
          />
          <input
            className={field}
            placeholder="CTA text"
            value={editing.cta_text ?? ""}
            onChange={(e) => setEditing({ ...editing, cta_text: e.target.value })}
          />
          <input
            className={field}
            type="number"
            placeholder="Sort order"
            value={editing.sort_order ?? 0}
            onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
          />
          <textarea
            className={`${field} sm:col-span-2`}
            rows={4}
            placeholder="Description"
            value={editing.description ?? ""}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
          />
          <label className="flex items-center gap-3 text-sm text-[#9A968F] sm:col-span-2">
            <input
              type="checkbox"
              checked={editing.is_visible ?? true}
              onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })}
            />
            Visible on the public Products page
          </label>
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={save.isPending}
              className="rounded-full border border-[#7FD8E8]/40 bg-[#7FD8E8]/10 px-6 py-2.5 text-sm text-[#7FD8E8] disabled:opacity-50"
            >
              {save.isPending ? "Saving…" : "Save product"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-full border border-white/12 px-6 py-2.5 text-sm text-white/70"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {isLoading && <p className="text-sm text-white/40">Loading products…</p>}
        {data?.map((p) => (
          <article
            key={p.id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-[22px] border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="min-w-0">
              <span className="text-[0.62rem] uppercase tracking-[0.3em] text-[#7FD8E8]/80">{p.category}</span>
              <h3 className="mt-2 text-lg font-semibold">
                {p.name} {!p.is_visible && <span className="text-xs text-white/35">(hidden)</span>}
              </h3>
              <p className="mt-2 max-w-2xl whitespace-pre-line text-sm text-[#9A968F]">{p.description}</p>
              <a
                href={p.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-[#7FD8E8]"
              >
                {p.external_url}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(p)}
                className="rounded-full border border-white/12 px-4 py-2 text-sm transition-colors hover:border-[#7FD8E8]/60 hover:text-[#7FD8E8]"
              >
                Edit
              </button>
              <button
                onClick={() => remove.mutate(p.id)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/12 transition-colors hover:border-red-400/60 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
