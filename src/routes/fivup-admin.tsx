import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

/** Private staff sign-in. Deliberately unlinked from any public navigation. */
export const Route = createFileRoute("/fivup-admin")({
  head: () => ({
    meta: [
      { title: "Staff sign in" },
      { name: "description", content: "Private staff area." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Staff sign in" },
      { property: "og:description", content: "Private staff area." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-[#F5F1EA] outline-none transition-colors placeholder:text-white/30 focus:border-[#7FD8E8]/60";

  return (
    <main className="grid min-h-screen place-items-center bg-[#060607] px-5 py-32 text-[#F5F1EA]">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[26px] border border-white/10 bg-white/[0.03] p-8">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-[#7FD8E8]">
          <Lock className="h-4 w-4" />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Staff sign in</h1>
        <p className="mt-2 text-sm text-[#9A968F]">Authorised accounts only.</p>

        <label className="mt-7 block">
          <span className="text-xs uppercase tracking-[0.25em] text-white/45">Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 ${field}`}
            required
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.25em] text-white/45">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-2 ${field}`}
            required
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="mt-7 w-full rounded-full border border-[#7FD8E8]/40 bg-[#7FD8E8]/10 px-6 py-3 text-sm text-[#F5F1EA] transition-colors hover:border-[#7FD8E8] hover:text-[#7FD8E8] disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
