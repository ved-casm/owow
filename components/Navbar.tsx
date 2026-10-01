"use client";

import { motion, type Transition } from "motion/react";
import { useState } from "react";
// MENU DISABLED - restore these imports together with the menu code below
// import { useEffect, useRef } from "react";
// import Countdown from "./Countdown";
// import PlayableVideo, { type PlayableVideoHandle } from "./PlayableVideo";
// import RollText from "./RollText";
import ShimmerLogo from "./ShimmerLogo";

/*
 * MENU DISABLED: opening / closing the navbar is switched off for now.
 * The toggle button still renders (hover animation only) but does nothing.
 * Everything needed to bring the menu back is kept in comments in this file;
 * search for "MENU DISABLED" and uncomment those blocks.
 */

// const LINKS = [
//   "Solutions",
//   "Datasets",
//   "Research",
//   "About",
//   "Careers",
//   "Contact",
//   "Book a call",
// ];

const CLOSED = { w: 190, h: 52 };
// const OPEN = { w: 720, h: 463 };
// const MOBILE_OPEN_H = 430;
const LOGO_SCALE = 2.05;

const EASE = [0.19, 1, 0.22, 1] as const;
const boxTransition: Transition = { duration: 0.55, ease: EASE };

export default function Navbar() {
  // MENU DISABLED - restore this state (and delete `const open = false`)
  // const [open, setOpen] = useState(false);
  const open = false;
  const [hover, setHover] = useState(false);

  // MENU DISABLED
  // const [vw, setVw] = useState(1440);
  // const videoRef = useRef<PlayableVideoHandle>(null);
  //
  // useEffect(() => {
  //   const onResize = () => setVw(window.innerWidth);
  //   onResize();
  //   window.addEventListener("resize", onResize);
  //   return () => window.removeEventListener("resize", onResize);
  // }, []);
  //
  // useEffect(() => {
  //   const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
  //   window.addEventListener("keydown", onKey);
  //   return () => window.removeEventListener("keydown", onKey);
  // }, []);
  //
  // // the menu video only plays on click - stop it when the menu closes
  // useEffect(() => {
  //   if (!open) videoRef.current?.pause();
  // }, [open]);
  //
  // const mobile = vw < 760;
  // const openW = Math.min(OPEN.w, vw - 24);
  // const openH = mobile ? MOBILE_OPEN_H : OPEN.h;

  return (
    <nav className="fixed left-1/2 top-[31px] z-50 -translate-x-1/2">
      <motion.div
        className="relative overflow-hidden border border-white/15 bg-ink"
        initial={false}
        // MENU DISABLED - original:
        // animate={{
        //   width: open ? openW : CLOSED.w,
        //   height: open ? openH : CLOSED.h,
        //   borderRadius: open ? 20 : 24,
        // }}
        animate={{ width: CLOSED.w, height: CLOSED.h, borderRadius: 24 }}
        transition={open ? boxTransition : { duration: 0.45, ease: EASE }}
        style={{
          boxShadow:
            "rgba(0,0,0,0.25) 0px 6px 13px 0px, rgba(0,0,0,0.21) 0px 8px 24px 0px, rgba(0,0,0,0.04) 0px -14px 10px 0px",
        }}
      >
        {/* ---------- Logo: one instance, scales between states ---------- */}
        <motion.a
          href="/"
          aria-label="O’wow home"
          className="absolute left-6 top-[15.5px] z-10 block"
          style={{ originX: 0, originY: 0 }}
          initial={false}
          animate={{
            x: open ? 8 : 0,
            y: open ? 10 : 0,
            scale: open ? LOGO_SCALE : 1,
          }}
          transition={open ? boxTransition : { duration: 0.45, ease: EASE }}
        >
          <ShimmerLogo width={90} height={21} upscale={LOGO_SCALE + 0.2} />
        </motion.a>

        {/* ---------- Toggle ---------- */}
        <motion.button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          // MENU DISABLED - restore to make the toggle work again
          // onClick={() => setOpen((o) => !o)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="absolute right-[21px] top-[14px] z-10 h-6 w-6 cursor-pointer"
          initial={false}
          animate={{ x: open ? -12 : 0, y: open ? 23 : 0 }}
          transition={open ? boxTransition : { duration: 0.45, ease: EASE }}
        >
          <Burger open={open} hover={hover} />
        </motion.button>

        {/* ---------- Menu content - MENU DISABLED, uncomment to restore ----------
                <div
          className="absolute left-0 top-0"
          style={{ width: openW, height: openH }}
          aria-hidden={!open}
        >
          [links]
          <ul className="absolute left-8 top-[112px]">
            {LINKS.map((l, i) => (
              <motion.li
                key={l}
                initial={false}
                animate={
                  open
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 8, filter: "blur(2px)" }
                }
                transition={
                  open
                    ? { duration: 0.5, delay: 0.08 + i * 0.035, ease: EASE }
                    : { duration: 0.15 }
                }
                className="h-[33px]"
              >
                <a
                  href={`#${l.toLowerCase().replaceAll(" ", "-")}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="text-ui font-medium uppercase tracking-[0.01em] text-white"
                >
                  <RollText text={l.toUpperCase()} />
                </a>
              </motion.li>
            ))}
          </ul>

          [video / image card]
          {!mobile && (
            <motion.div
              className="absolute left-[368px] top-[110px] h-[190px] w-[320px] overflow-hidden rounded-[6px] bg-neutral-900"
              initial={false}
              animate={
                open
                  ? { clipPath: "inset(0% 0% 0% 0% round 6px)", opacity: 1 }
                  : { clipPath: "inset(0% 62% 0% 0% round 6px)", opacity: 0 }
              }
              transition={
                open
                  ? {
                      clipPath: { duration: 1.1, delay: 0.12, ease: EASE },
                      opacity: { duration: 0.2, delay: 0.08 },
                    }
                  : { duration: 0.08 }
              }
            >
              <PlayableVideo
                ref={videoRef}
                src="/video/owow.mp4"
                webm="/video/owow.webm"
                poster="/img/card-poster.jpg"
                iconSize={36}
                className="h-full w-full"
              >
                <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-meta font-medium tracking-[-0.01em] text-white">
                  Our Story
                </span>
              </PlayableVideo>
            </motion.div>
          )}

          [footer]
          <motion.div
            className="absolute inset-x-8"
            style={{ top: openH - 85 }}
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={
              open ? { duration: 0.4, delay: 0.2 } : { duration: 0.12 }
            }
          >
            <div className="h-px w-full bg-white/10" />
            <div className="mt-[19px] flex items-center justify-between">
              {!mobile && (
                <p className="text-meta uppercase tracking-[0.01em] text-white/50">
                  Data intelligence for physical AI
                </p>
              )}
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-meta font-medium leading-none tracking-[-0.01em] text-white/50">
                  <span className="h-1 w-1 rounded-full bg-cream" />
                  Time Until Launch
                </span>
                <Countdown />
              </div>
            </div>
          </motion.div>
        </div>
        ---------- end of disabled menu content ---------- */}
      </motion.div>
    </nav>
  );
}

/* Three uneven lines → equal on hover → X when open */
function Burger({ open, hover }: { open: boolean; hover: boolean }) {
  const t: Transition = { duration: 0.45, ease: EASE };
  const line = "absolute left-0 h-[2px] rounded-[2px] bg-white";
  return (
    <span className="relative block h-6 w-6">
      <motion.span
        className={line}
        style={{ top: 5, originX: 0.5 }}
        initial={false}
        animate={
          open
            ? { width: 22, y: 6, x: 1, rotate: 45 }
            : { width: 24, y: 0, x: 0, rotate: 0 }
        }
        transition={t}
      />
      <motion.span
        className={line}
        style={{ top: 11 }}
        initial={false}
        animate={
          open
            ? { width: 0, opacity: 0 }
            : { width: hover ? 24 : 10, opacity: 1 }
        }
        transition={t}
      />
      <motion.span
        className={line}
        style={{ top: 17, originX: 0.5 }}
        initial={false}
        animate={
          open
            ? { width: 22, y: -6, x: 1, rotate: -45 }
            : { width: hover ? 24 : 18, y: 0, x: 0, rotate: 0 }
        }
        transition={t}
      />
    </span>
  );
}
