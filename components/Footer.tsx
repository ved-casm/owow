"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DotMap, { DotMapHeadline } from "./footer/DotMap";
import RollText from "./RollText";
import ShimmerLogo from "./ShimmerLogo";

/**
 * Footer that never moves: it is pinned to the bottom of the viewport
 * (`sticky bottom-0`, behind the content) and the content card simply slides
 * up off it, uncovering it.
 *
 * Behind everything sits a dot-matrix world map: the places we capture in
 * ping one by one, each with a small photo + name tooltip.
 */

type FooterLink = { label: string; href: string; external?: boolean };

const LINKS: FooterLink[] = [
  { label: "Manifesto", href: "/manifesto" },
  // { label: "Careers", href: "#careers" },
  // { label: "Partners", href: "#partners" },
  { label: "Find work", href: "https://dash.owowtalents.com/", external: true },
];

const SOCIALS: FooterLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/owow-talents/", external: true },
  { label: "X", href: "https://x.com/OwowTalents", external: true },
  // { label: "Email", href: "#" }, 
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  // only animate while the footer is on screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "0px 0px -10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // pinned reveal only when the footer can fit the screen; on very short
    // screens (e.g. phone landscape) it scrolls normally so nothing is cut off
    <footer
      ref={ref}
      className="sticky bottom-0 z-0 overflow-hidden bg-ink text-white [@media(max-height:560px)]:relative"
    >
      <div className="px-6 pb-6 pt-12 md:px-16 md:pt-16 lg:px-[140px] lg:pb-8 lg:pt-20">
        {/*
          Brand block first: logo, then the (smaller) headline under it.
          lg+: brand + links on the left, the map on the right, so tooltips
          never cover a link. Smaller screens stack: brand, map band, links.
          The map hides on very short screens so the footer always fits the
          viewport (a sticky footer taller than the screen would lose its top).
        */}
        <div className="grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            {/* same three.js shimmer wordmark as the navbar */}
            <Link href="/" aria-label="O’WOW home" className="inline-block">
              <ShimmerLogo width={90} height={21} base={0.62} />
            </Link>
            <div className="mt-5">
              <DotMapHeadline />
            </div>

            <div className="mt-12 hidden lg:block">
              <FooterNav />
            </div>
          </div>

          <div className="mt-10 [@media(max-height:700px)]:hidden lg:mt-0">
            <DotMap active={active} />
          </div>

          <div className="mt-10 lg:hidden">
            <FooterNav />
          </div>
        </div>

        {/* phone: © + city on one row, legal links below; sm+: one row */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-meta text-white/50 lg:mt-24">
          <p className="whitespace-nowrap">© OWOW Talents Inc - 2026</p>
          <div className="order-last flex w-full gap-5 sm:order-none sm:w-auto">
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <p className="whitespace-nowrap">Palo Alto, CA</p>
        </div>
      </div>
    </footer>
  );
}

/** link columns (rendered once per breakpoint layout) */
function FooterNav() {
  return (
    <div>
      <div className="mb-6 h-px bg-white/10 lg:hidden" />
      <div className="grid max-w-[340px] grid-cols-2 gap-x-10">
        <Column title="Links" items={LINKS} />
        <Column title="Social" items={SOCIALS} />
      </div>
    </div>
  );
}

function Column({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div>
      <p className="mb-4 text-meta text-white/50">{title}</p>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="text-ui font-medium text-white"
              {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <RollText text={it.label} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
