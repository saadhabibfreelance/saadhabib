import { memo, type ReactNode } from "react";

const sectionPalettes = [
  "from-[#0B0B0C] via-[#0E0E10] to-[#08080A]",
  "from-[#0A0A0B] via-[#111112] to-[#0B0B0C]",
  "from-[#0C0C0E] via-[#090909] to-[#101012]",
  "from-[#09090A] via-[#0F0F11] to-[#0A0A0B]",
  "from-[#0B0B0C] via-[#0A0A0B] to-[#121213]",
  "from-[#0E0E10] via-[#0A0A0B] to-[#08080A]",
];

export const Section = memo(function Section({
  index,
  id,
  children,
  className = "",
}: {
  index: number;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-gradient-to-br ${sectionPalettes[index % sectionPalettes.length]} px-4 py-24 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#C8A96A]/10 blur-3xl animate-blob" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-white/[0.04] blur-3xl animate-blob"
        style={{ animationDelay: "3s" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
});
