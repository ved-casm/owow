"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useState } from "react";
import BrandCarousel from "./BrandCarousel";
import PlayableVideo from "./PlayableVideo";
import RollText from "./RollText";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Scroll progress `p` = scrollY / viewport height.
 * Each hero line is inside its own mask and slides up out of it over its
 * own slice of `p` — the hero itself never moves (it's sticky).
 * Ranges were measured frame-by-frame from the reference recording.
 */
const EXIT = {
  kicker: [0.03, 0.14],
  desc1: [0.07, 0.18],
  cta: [0.12, 0.3],
  headline1: [0.15, 0.38],
  desc2: [0.18, 0.32],
  brands: [0.28, 0.42],
  headline2: [0.34, 0.55],
} as const;

/** background video → image crossfade point */
const SWAP_AT = 0.6;
/** showreel title moves at (1 - this) of scroll speed */
const TITLE_PARALLAX = 0.2;

export default function HeroScroll() {
  const { scrollY } = useScroll();
  const vh = useMotionValue(900);
  const p = useTransform(() => scrollY.get() / vh.get());
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const onResize = () => vh.set(window.innerHeight);
    onResize(); // also re-evaluates `p` → swap state if we load mid-page
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scrollY, vh]);

  useMotionValueEvent(p, "change", (v) => setShowImage(v > SWAP_AT));

  // parallax for the showreel title (capped so it never drops below the card)
  const titleY = useTransform(
    () => Math.min(scrollY.get(), vh.get() * 1.4) * TITLE_PARALLAX,
  );

  return (
    <div className="relative">
      {/* ================= Sticky background + hero content ================= */}
      <div className="sticky top-0 z-0 -mb-[100svh] h-svh overflow-hidden bg-[#c9cccf]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          {/* AV1 WebM where supported (smallest), H.264 MP4 everywhere else */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video/hero-tie.webm" type='video/webm; codecs="av01.0.08M.08"' />
            <source src="/video/hero-tie.mp4" type="video/mp4" />
          </video>
          {/* dark overlay on the video only — the showreel image stays clean */}
          <div className="pointer-events-none absolute inset-0 bg-black/70" />
        </motion.div>

        {/* image that replaces the video once the showreel comes in */}
        <motion.div
          className="absolute inset-0 bg-[#b9bdc1]"
          initial={false}
          animate={{ opacity: showImage ? 1 : 0, scale: showImage ? 1 : 1.06 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* AVIF where supported, JPEG everywhere else */}
          <picture>
            <source srcSet="/img/owow-human.avif" type="image/avif" />
            <img
              src="/img/owow-human.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </motion.div>

        <HeroContent p={p} />
      </div>

      {/* spacer that gives the sticky hero its first screen of scroll */}
      <div className="h-svh" aria-hidden />

      {/* ================= Showreel ================= */}
      <section id="showreel" className="relative z-10 pb-[100px] pt-[41svh]">
        <motion.h2
          style={{ y: titleY }}
          className="absolute left-1/2 top-[9svh] z-0 -translate-x-1/2 whitespace-nowrap text-center text-[clamp(44px,5.8vw,112px)] font-serif leading-[1.02] tracking-[-0.035em] text-paper"
        >
          <LetterReveal text="We’re O’WOW." />
        </motion.h2>

        <div className="relative z-10 mx-auto aspect-[3/2] w-[88vw] overflow-hidden rounded-[8px] bg-neutral-300 md:w-[42vw]">
          <PlayableVideo
            src="/video/owow.mp4"
            webm="/video/owow.webm"
            poster="/img/card-poster.jpg"
            iconSize={90}
            className="h-full w-full"
          />
        </div>
      </section>

      {/* ================= Placeholder for the rest of the page ================= */}
      <section className="relative z-20 min-h-screen bg-white" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function HeroContent({ p }: { p: MotionValue<number> }) {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
      <Line p={p} range={EXIT.kicker} delay={0.25}>
        <p className="flex items-center gap-3 text-[clamp(16px,1.25vw,23px)] font-medium leading-[1.2] tracking-[-0.02em] text-white">
          We teach robots to tie the knot.
        </p>
      </Line>

      <h1 className="mt-[clamp(24px,4svh,44px)] font-serif text-[clamp(46px,6.4vw,124px)] font-normal leading-[1.0] tracking-[-0.035em] text-white">
        <Line p={p} range={EXIT.headline1} delay={0.35} tall>
          Data Intelligence
        </Line>
        <Line p={p} range={EXIT.headline2} delay={0.45} tall>
          for Physical AI
        </Line>
      </h1>

      <div className="mt-[clamp(20px,3.4svh,38px)] text-[clamp(15px,1.1vw,20px)] leading-[1.45] tracking-[-0.01em] text-white/90">
        <Line p={p} range={EXIT.desc1} delay={0.55}>
          Robots learn from what they’re shown. We know what’s worth showing,
        </Line>
        <Line p={p} range={EXIT.desc2} delay={0.6}>
          then capture, structure, and verify it at global scale.
        </Line>
      </div>

      <Line p={p} range={EXIT.cta} delay={0.7} className="mt-[clamp(24px,3.8svh,40px)]">
        <a
          href="#book-a-call"
          className="roll-parent flex h-[52px] items-center gap-2 rounded-full bg-[#141414] px-7 text-[14px] font-medium uppercase tracking-[0.01em] text-white transition-colors hover:bg-black"
        >
          <RollText text="BOOK A CALL" />
          <RollArrow />
        </a>
      </Line>

      <Line
        p={p}
        range={EXIT.brands}
        delay={0.85}
        className="mt-[clamp(28px,5svh,60px)] w-full max-w-[640px]"
      >
        <BrandCarousel />
      </Line>
    </div>
  );
}

/**
 * Masked line: slides in from below on load, then slides up out of its mask
 * as the page scrolls through `range`.
 */
function Line({
  p,
  range,
  delay = 0,
  tall = false,
  className = "",
  children,
}: {
  p: MotionValue<number>;
  range: readonly [number, number];
  delay?: number;
  /** extra room in the mask for descenders / italics of big type */
  tall?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const y = useTransform(p, [range[0], range[1]], ["0%", "-125%"]);
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={
        tall
          ? { padding: "0 0.08em 0.16em", margin: "0 -0.08em -0.16em" }
          : undefined
      }
    >
      <motion.div
        initial={{ y: "125%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        <motion.div style={{ y }}>{children}</motion.div>
      </motion.div>
    </div>
  );
}

/** Per-letter rise: opacity 0, y 60px, scale 0.9 → rest, staggered. */
function LetterReveal({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: i * 0.03, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** arrow that rolls with the CTA label (same mask + duplicate trick) */
function RollArrow() {
  const arrow = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-[0.1em] block">
      <path d="M1.5 7h10.5M8 2.8 12.2 7 8 11.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <span className="roll-char" style={{ "--i": 11 } as React.CSSProperties} aria-hidden>
      <span>{arrow}</span>
      <span>{arrow}</span>
    </span>
  );
}
