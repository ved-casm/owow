"use client";

import { useEffect, useRef, useState } from "react";
import RollText from "./RollText";

/**
 * Footer that never moves: it is pinned to the bottom of the viewport
 * (`sticky bottom-0`, behind the content) and the hero card simply slides up
 * off it, uncovering it - as in the reference.
 *
 * The four-line headline carries photo chips: rows 1 and 3 flick through
 * famous landmarks of the places we capture data in, rows 2 and 4 hold one
 * landmark each. Photos: Wikimedia Commons, CC0 / Public Domain
 * (see /public/img/places/CREDITS.md).
 */

type Place = { key: string; name: string };

// row 1 and row 3 chips flick through these; rows 2 and 4 stay fixed
const CYCLE_A: Place[] = [
  { key: "canada", name: "Niagara Falls, Canada" },
  { key: "france", name: "Eiffel Tower, France" },
  { key: "brazil", name: "Christ the Redeemer, Brazil" },
  { key: "uk", name: "Big Ben, United Kingdom" },
  { key: "colombia", name: "Guatapé, Colombia" },
  { key: "italy", name: "Colosseum, Italy" },
  { key: "costa-rica", name: "Arenal Volcano, Costa Rica" },
];
const CYCLE_B: Place[] = [
  { key: "australia", name: "Sydney Opera House, Australia" },
  { key: "china", name: "Great Wall, China" },
  { key: "south-africa", name: "Table Mountain, South Africa" },
  { key: "dubai", name: "Burj Khalifa, Dubai" },
  { key: "nigeria", name: "Zuma Rock, Nigeria" },
  { key: "singapore", name: "Singapore skyline" },
];
const STATIC_2: Place[] = [{ key: "usa", name: "Golden Gate Bridge, USA" }];
const STATIC_4: Place[] = [{ key: "india", name: "Taj Mahal, India" }];

const LINKS = [
  { label: "Manifesto", href: "/manifesto" },
  { label: "Careers", href: "#careers" },
  { label: "Partners", href: "#partners" },
];

// TODO: real profile URLs / address
const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Email", href: "#" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  // only flick the photos while the footer is on screen
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
    <footer ref={ref} className="sticky bottom-0 z-0 overflow-hidden bg-[#111111] text-white">
      {/* spacing / type sizes measured from the reference at 390 / 768 / 1024+ */}
      <div className="px-6 pb-6 pt-12 md:px-16 md:pt-16 lg:px-[140px] lg:pb-8 lg:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-serif text-[34px] font-normal leading-[1.04] tracking-[-0.04em] sm:text-[40px] lg:text-[clamp(48px,3.6vw,56px)]">
            <Row>
              Teaching <Chip places={CYCLE_A} delay={0} speed={[280, 460]} active={active} />
            </Row>
            <Row>
              <Chip places={STATIC_2} active={active} /> machines to see
            </Row>
            <Row>
              the world, <Chip places={CYCLE_B} delay={260} speed={[750, 1100]} active={active} /> one
            </Row>
            <Row>
              <Chip places={STATIC_4} active={active} /> place at a time.
            </Row>
          </h2>

          <div className="mt-8 shrink-0 lg:mt-1 lg:w-[300px]">
            <p className="text-[17px] font-semibold tracking-[0.04em]">O’WOW</p>
            <div className="mt-8 h-px bg-white/10 lg:hidden" />
            <div className="mt-8 grid grid-cols-2 gap-x-10 text-[15px] lg:mt-12">
              <Column title="Links" items={LINKS} />
              <Column title="Social" items={SOCIALS} />
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-4 text-[13px] text-white/50 lg:mt-24">
          <p>© O’WOW 2026</p>
          <div className="flex gap-5">
            <a href="#terms" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#policy" className="transition-colors hover:text-white">
              Policy
            </a>
          </div>
          <p>Palo Alto, CA</p>
        </div>
      </div>
    </footer>
  );
}

/** one fixed headline line - never wraps, so the four rows hold on every device */
function Row({ children }: { children: React.ReactNode }) {
  return <span className="block whitespace-nowrap">{children}</span>;
}

function Column({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-white/45">{title}</p>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <a href={it.href} className="text-white">
              <RollText text={it.label} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Inline photo chip (80×48 at 56px type, like the reference). All photos are
 * stacked inside so swaps never wait on the network; only the current one is
 * visible. A chip with a single place simply stays still.
 */
function Chip({
  places,
  delay = 0,
  speed = [350, 900],
  active,
}: {
  places: Place[];
  delay?: number;
  /** [min, max] ms between swaps */
  speed?: [number, number];
  active: boolean;
}) {
  const [i, setI] = useState(0);
  const [min, max] = speed;

  useEffect(() => {
    if (!active || places.length < 2) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      setI((n) => (n + 1) % places.length);
      t = setTimeout(tick, calm ? 2400 : min + Math.random() * (max - min));
    };
    t = setTimeout(tick, calm ? 2400 : 200 + delay);
    return () => clearTimeout(t);
  }, [active, delay, places.length, min, max]);

  return (
    <span
      className="relative mx-[0.04em] inline-block h-[0.857em] w-[1.43em] overflow-hidden rounded-[0.07em] bg-white/10 align-[-0.1em]"
      role="img"
      aria-label={places[i].name}
    >
      {places.map((pl, n) => (
        <picture key={pl.key}>
          <source srcSet={`/img/places/${pl.key}.avif`} type="image/avif" />
          <img
            src={`/img/places/${pl.key}.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ visibility: n === i ? "visible" : "hidden" }}
          />
        </picture>
      ))}
    </span>
  );
}
