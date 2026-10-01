"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * Inertia-style smooth scrolling (like the Framer reference).
 * Lenis drives the real window scroll, so motion's useScroll keeps working.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // reduced motion: keep the browser's native (instant) scrolling
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
