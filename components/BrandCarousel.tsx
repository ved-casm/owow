"use client";

import { Bot, Globe, Mic, Sparkles, type LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * Focus areas sit on a 3D cylinder that turns a full 360°.
 * Front items are bright, items at the edges get squashed by the
 * perspective, and the ones that go around the back stay visible (mirrored)
 * but very faint and slightly blurred.
 */
export type Brand = { name: string; icon: LucideIcon };

const AREAS: Brand[] = [
  { name: "Humanoid Robotics", icon: Bot },
  { name: "World Models", icon: Globe },
  { name: "Frontier AI Models", icon: Sparkles },
  { name: "Voice & Conversational AI", icon: Mic },
];

// four items → go round twice so the cylinder isn't sparse
export const BRANDS: Brand[] = [...AREAS, ...AREAS];

const SECONDS_PER_TURN = 30;

export default function BrandCarousel({
  brands = BRANDS,
  radius = 380,
}: {
  brands?: Brand[];
  radius?: number;
}) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const step = 360 / brands.length;
    let raf = 0;
    const start = performance.now();
    // reduced motion: lay the items out once, facing front, and don't spin
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (now: number) => {
      const turn = (((now - start) / 1000) * 360) / SECONDS_PER_TURN;
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const a = i * step + turn;
        const facing = Math.cos((a * Math.PI) / 180); // 1 = front, -1 = back
        const front = Math.max(0, facing);
        const opacity = facing > 0 ? 0.25 + 0.75 * front ** 1.5 : 0.1;
        const blur = facing > 0 ? (1 - front) * 1.6 : 2;
        el.style.transform = `translate(-50%, -50%) rotateY(${a}deg) translateZ(${radius}px)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `blur(${blur.toFixed(2)}px)`;
      });
      if (!calm) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [brands, radius]);

  return (
    <div
      className="relative mx-auto h-[60px] w-full max-w-[600px]"
      style={{ perspective: 1100 }}
      aria-label="Focus areas"
    >
      <div
        className="absolute left-1/2 top-1/2 h-0 w-0"
        style={{ transformStyle: "preserve-3d", transform: `translateZ(-${radius}px)` }}
      >
        {brands.map((b, i) => (
          <div
            key={`${b.name}-${i}`}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="absolute left-0 top-0 flex items-center justify-center whitespace-nowrap will-change-transform"
          >
            <span className="flex items-center gap-2.5 text-white">
              <b.icon aria-hidden className="h-[22px] w-[22px] shrink-0" strokeWidth={1.75} />
              <span className="text-body font-medium tracking-[-0.01em]">{b.name}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
