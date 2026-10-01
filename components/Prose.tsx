import Footer from "./Footer";
import Navbar from "./Navbar";

/**
 * Shared building blocks for the text pages (manifesto, about, partners):
 * dark page, narrow column, Exposure for display type, Suisse for body,
 * JetBrains Mono for small labels, soft highlight chips for key phrases.
 */

/** highlighted phrase - soft chip (see .hl in globals.css) */
export function Hl({ children }: { children: React.ReactNode }) {
  return <span className="hl">{children}</span>;
}

/** serif italic emphasis inside body copy */
export function Em({ children }: { children: React.ReactNode }) {
  return <em className="font-serif text-[1.12em] italic text-white">{children}</em>;
}

export function TextPage({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <main className="text-white">
      <Navbar />
      {/* rounded content card that slides up off the pinned footer (same as home) */}
      <div className="relative z-10 min-h-svh rounded-b-[28px] bg-[#0b0b0b]">
        <article className="mx-auto max-w-[832px] px-6 pb-32 pt-40 md:pt-48">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">
            {label}
          </p>
          {children}
        </article>
      </div>
      <Footer />
    </main>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-14 space-y-8 text-[18px] leading-[1.6] tracking-[-0.01em] text-white/70">
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-6 font-serif text-[clamp(38px,5vw,64px)] font-normal leading-[1.06] tracking-[-0.035em]">
      {children}
    </h1>
  );
}

export function Closing({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-20 font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.03em]">
      {children}
    </p>
  );
}

export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-white/25 pl-6 font-serif text-[clamp(22px,2.2vw,28px)] italic leading-[1.35] tracking-[-0.02em] text-white">
      {children}
    </blockquote>
  );
}
