import Footer from "./Footer";
import Navbar from "./Navbar";

/**
 * Shared building blocks for the text pages (manifesto, about, partners):
 * dark page, narrow column, Exposure for display type, Suisse for all other
 * text, soft highlight chips for key phrases. Sizes / colours come from the
 * tokens in globals.css so every page (and the footer) stays consistent.
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
      <div className="relative z-10 min-h-svh rounded-b-[28px] border-b border-white/15 bg-ink">
        <article className="mx-auto max-w-[832px] px-6 pb-32 pt-40 md:pt-48">
          <p className="text-meta font-medium uppercase tracking-[0.14em] text-white/50">
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
    <div className="mt-14 space-y-8 text-body tracking-[-0.01em] text-white/70">
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-6 font-serif text-display font-normal tracking-[-0.035em]">
      {children}
    </h1>
  );
}

export function Closing({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-20 font-serif text-display-md tracking-[-0.03em]">
      {children}
    </p>
  );
}

export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-white/25 pl-6 font-serif text-display-sm italic tracking-[-0.02em] text-white">
      {children}
    </blockquote>
  );
}
