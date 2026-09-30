"use client";

import { useEffect, useRef } from "react";

/**
 * Logos sit on a 3D cylinder that turns a full 360°.
 * Front logos are big and bright, logos at the edges get squashed by the
 * perspective, and the ones that go around the back stay visible (mirrored)
 * but very faint and slightly blurred.
 *
 * Logos live in /public/img/brands. Everything is shown in white (same as
 * the type): dark SVGs are inverted, icon-only marks get their name beside.
 */
export type Brand = {
  name: string;
  src: string;
  /** rendered height of the <img> in px */
  height: number;
  /** negative vertical margin to trim empty space in the SVG's viewBox */
  trim?: number;
  /** invert a black logo to white */
  invert?: boolean;
  /** show the brand name next to an icon-only logo */
  label?: boolean;
};

const LOGOS: Brand[] = [
  { name: "Figure", src: "/img/brands/Figure.svg", height: 28, invert: true, label: true },
  { name: "Fish Audio", src: "/img/brands/Fish-Audio.svg", height: 84, trim: -28, invert: true, label: true },
  { name: "Ringg.AI", src: "/img/brands/Ring.svg", height: 28 },
];

// only three brands → go round twice so the cylinder isn't sparse
export const BRANDS: Brand[] = [...LOGOS, ...LOGOS];

const SECONDS_PER_TURN = 30;

export default function BrandCarousel({
  brands = BRANDS,
  radius = 300,
}: {
  brands?: Brand[];
  radius?: number;
}) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const step = 360 / brands.length;
    let raf = 0;
    const start = performance.now();

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
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [brands, radius]);

  return (
    <div
      className="relative mx-auto h-[60px] w-full max-w-[600px]"
      style={{ perspective: 1100 }}
      aria-label="Trusted by"
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
            <span className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.src}
                alt={b.label ? "" : b.name}
                draggable={false}
                className="w-auto max-w-none select-none"
                style={{
                  height: b.height,
                  margin: b.trim ? `${b.trim}px 0` : undefined,
                  filter: b.invert ? "invert(1)" : undefined,
                }}
              />
              {b.label && (
                <span className="text-[26px] font-semibold tracking-[-0.03em] text-white">
                  {b.name}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
