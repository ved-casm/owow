"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cycles through `words` with a vertical 3D flip: the current word tips back
 * and away while the next one flips up into place. The box is sized to the
 * longest word so the line never jumps.
 */
export default function FlipWords({
  words,
  interval = 2200,
}: {
  words: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <>
    {/* read once ("environments, tasks, motion"); the flipping word is decorative */}
    <span className="sr-only">{words.join(", ")}</span>
    <span
      className="relative inline-grid align-bottom"
      style={{ perspective: "600px" }}
      aria-hidden
    >
      {/* invisible sizer - reserves the longest word's width */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {longest}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 inline-block"
          style={{ transformOrigin: "50% 50% -0.4em", backfaceVisibility: "hidden" }}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
    </>
  );
}
