"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import BrandCarousel from "./BrandCarousel";
import RollText from "./RollText";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Scroll progress `p` = scrollY / viewport height.
 * Each hero line is inside its own mask and slides up out of it over its
 * own slice of `p` - the hero itself never moves (it's sticky).
 * Ranges were measured frame-by-frame from the reference recording.
 */
const EXIT = {
  kicker: [0.03, 0.14],
  desc: [0.07, 0.2],
  cta: [0.12, 0.3],
  headline1: [0.15, 0.38],
  brands: [0.28, 0.42],
  headline2: [0.15, 0.38], // leaves together with headline1
} as const;

const CALENDLY = "https://calendly.com/useowow/ds?back=1";

export default function HeroScroll() {
  // reduced motion: no zoom-in, no slide-ins, video stays on its poster frame
  const calm = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);

  // the server HTML always has `autoplay`, so the browser may start the video
  // before React knows the user's preference — stop it here explicitly
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (calm) {
      v.pause();
      v.currentTime = 0;
    } else if (v.paused) {
      v.play().catch(() => { });
    }
  }, [calm]);
  const { scrollY } = useScroll();
  const vh = useMotionValue(900);
  const p = useTransform(() => scrollY.get() / vh.get());

  useEffect(() => {
    const onResize = () => vh.set(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [vh]);

  return (
    /*
     * Content layer that slides up over the sticky footer.
     * The hero stays pinned for the first 60% of a screen (while its lines
     * exit), then the whole rounded card scrolls away to reveal the footer.
     * `overflow-clip` (not hidden) keeps `position: sticky` working.
     */
    <div className="relative z-10 overflow-clip rounded-b-[28px] border-b border-white/15 bg-ink">
      <div className="sticky top-0 -mb-[100svh] h-svh overflow-hidden bg-ink">
        <motion.div
          className="absolute inset-0"
          initial={calm ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          {/*
            AV1 WebM where supported (smallest), H.264 MP4 everywhere else.
            Portrait screens can't fit both people in a 16:9 frame, so the crop
            shifts left to keep the man (and the O'WOW suit) in view.
          */}
          <video
            ref={videoRef}
            autoPlay={!calm}
            muted
            loop
            playsInline
            preload={calm ? "none" : "auto"}
            poster="/img/hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover portrait:object-[22%_50%]"
          >
            <source src="/video/hero-tie.webm" type='video/webm; codecs="av01.0.08M.08"' />
            <source src="/video/hero-tie.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-black/70" />
        </motion.div>

        <HeroContent p={p} calm={calm} />
      </div>

      {/* scroll room: 60svh pinned for the line exits, then the card leaves */}
      <div className="h-[160svh]" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function HeroContent({ p, calm }: { p: MotionValue<number>; calm: boolean }) {
  return (
    // top padding = navbar height, so the pill never covers the first line.
    // `short:` = landscape phones (height < 500px): tighter type and spacing,
    // the focus-area carousel is dropped so tagline and CTA always fit.
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-6 pt-24 text-center short:pb-3 short:pt-[88px]">
      <Line p={p} calm={calm} range={EXIT.kicker} delay={0.25}>
        {/* frosted, see-through pill (backdrop blur over the video) */}
        <p className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-body font-normal tracking-[-0.01em] text-white backdrop-blur-md short:px-4 short:py-1 short:text-[12px]">
          We teach robots to tie the knot.
        </p>
      </Line>

      <h1 className="mt-[clamp(18px,4svh,44px)] font-serif text-hero font-normal tracking-[-0.035em] text-white short:mt-2.5 short:text-[clamp(30px,11svh,46px)]">
        <Line p={p} calm={calm} range={EXIT.headline1} delay={0.35} tall>
          Data Intelligence
        </Line>
        <Line p={p} calm={calm} range={EXIT.headline2} delay={0.45} tall>
          for Physical AI
        </Line>
      </h1>

      {/* one paragraph that wraps naturally (balanced) instead of a forced break */}
      <Line p={p} calm={calm} range={EXIT.desc} delay={0.55} className="mt-[clamp(16px,3.4svh,38px)] short:mt-2.5">
        <p className="mx-auto max-w-[36em] text-balance text-body tracking-[-0.01em] text-white/70 short:max-w-[44em] short:text-[14px] short:leading-[1.45]">
          Robots learn from what they’re shown. We know what’s worth showing, then
          capture, structure, and verify it at global scale.
        </p>
      </Line>

      <Line p={p} calm={calm} range={EXIT.cta} delay={0.7} className="mt-[clamp(20px,3.8svh,40px)] short:mt-3">
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="roll-parent flex h-[52px] items-center short:h-11 gap-2 rounded-full bg-ink px-7 text-ui font-medium uppercase tracking-[0.01em] text-white ring-1 ring-white/10 transition-colors hover:bg-black"
        >
          <RollText text="TALK TO A FOUNDER" />
          <RollArrow />
        </a>
      </Line>

      <Line
        p={p}
        calm={calm}
        range={EXIT.brands}
        delay={0.85}
        className="mt-[clamp(20px,5svh,60px)] w-full max-w-[640px] short:hidden"
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
type LineProps = {
  p: MotionValue<number>;
  range: readonly [number, number];
  delay?: number;
  /** extra room in the mask for descenders / italics of big type */
  tall?: boolean;
  className?: string;
  calm: boolean;
  children: React.ReactNode;
};

function Line({ p, range, delay = 0, tall = false, className = "", calm, children }: LineProps) {
  const y = useTransform(p, [range[0], range[1]], ["0%", "-125%"]);
  // reduced motion: lines simply fade out on scroll instead of sliding
  const opacity = useTransform(p, [range[0], range[1]], [1, 0]);
  return (
    // shrink-0: in a short viewport flexbox must not squash these masks
    // (overflow-hidden would then crop the tagline / CTA to nothing)
    <div
      className={`shrink-0 overflow-hidden ${className}`}
      style={
        tall
          ? { padding: "0 0.08em 0.16em", margin: "0 -0.08em -0.16em" }
          : undefined
      }
    >
      <motion.div
        initial={calm ? false : { y: "125%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        <motion.div style={calm ? { opacity } : { y }}>{children}</motion.div>
      </motion.div>
    </div>
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
