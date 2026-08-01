import { memo, type ReactNode } from "react";

const sectionPalettes = [
  "from-[#43CEA2]/65 via-[#185A9D]/65 to-[#2C5364]/65",
  "from-[#F09819]/65 via-[#FF5858]/65 to-[#8E2DE2]/65",
  "from-[#00C9FF]/65 via-[#92FE9D]/65 to-[#FFEE00]/65",
  "from-[#654EA3]/65 via-[#EAAFC8]/65 to-[#FF9A9E]/65",
  "from-[#0F2027]/65 via-[#203A43]/65 to-[#2C5364]/65",
  "from-[#F857A6]/65 via-[#FF5858]/65 to-[#FFC837]/65",
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
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-3xl animate-blob" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-black/20 blur-3xl animate-blob"
        style={{ animationDelay: "3s" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
});
