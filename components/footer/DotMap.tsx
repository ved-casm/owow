"use client";

import { useEffect, useMemo, useState } from "react";
import { PLACES } from "@/lib/places";
import { WORLD, WORLD_ROWS } from "@/lib/worldDots";

/**
 * Dot-matrix world map in the footer. Every place we capture in is a
 * brighter dot; one at a time pings, and an animated tooltip pops up next to
 * it with a tiny photo of the landmark.
 */

const PING_MS = 2200;

const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * WORLD.cols,
  y: ((WORLD.latTop - lat) / (WORLD.latTop - WORLD.latBottom)) * WORLD.rows,
});

export function DotMapHeadline() {
  return (
    // two lines from sm up; on narrow phones it may wrap so nothing overflows
    <h2 className="text-balance font-serif text-display-sm font-normal tracking-[-0.03em] text-white/90">
      <span className="sm:block sm:whitespace-nowrap">Teaching machines to see the world, </span>
      <span className="sm:block sm:whitespace-nowrap">one place at a time.</span>
    </h2>
  );
}

export default function DotMap({ active }: { active: boolean }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setI((n) => (n + 1) % PLACES.length), PING_MS);
    return () => clearInterval(id);
  }, [active]);

  // land dots, decoded once from the hex rows
  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    WORLD_ROWS.forEach((hex, r) => {
      const bits = BigInt("0x" + hex).toString(2).padStart(WORLD.cols, "0");
      for (let c = 0; c < WORLD.cols; c++) if (bits[c] === "1") out.push({ x: c + 0.5, y: r + 0.5 });
    });
    return out;
  }, []);

  const pins = useMemo(() => PLACES.map((p) => ({ ...p, ...project(p.lat, p.lon) })), []);
  const cur = pins[i];
  const left = (cur.x / WORLD.cols) * 100;
  const top = (cur.y / WORLD.rows) * 100;
  // keep the tooltip inside the map: open to the left in the right third,
  // below the dot in the top half and above it in the bottom half
  const flipX = left > 66;
  const flipY = top < 50;

  return (
    // fills its parent's width; the footer decides where it sits
    <div
      className="pointer-events-none relative w-full"
      style={{ aspectRatio: `${WORLD.cols} / ${WORLD.rows}` }}
    >
      {/* screen readers get the list once; the animated map is decorative */}
      <p className="sr-only">
        Places we capture data in: {PLACES.map((p) => `${p.name}, ${p.country}`).join("; ")}.
      </p>
      <svg viewBox={`0 0 ${WORLD.cols} ${WORLD.rows}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {dots.map((d, k) => (
          <circle key={k} cx={d.x} cy={d.y} r={0.28} fill="rgb(255 255 255 / 0.14)" />
        ))}
        {pins.map((p) => (
          <circle key={p.name} cx={p.x} cy={p.y} r={0.38} fill="rgb(255 255 255 / 0.55)" />
        ))}
        {/* ping on the current place — keyed so the ring restarts each time */}
        <g key={cur.name}>
          <circle cx={cur.x} cy={cur.y} r={0.5} fill="#fff" />
          <circle cx={cur.x} cy={cur.y} r={0.5} fill="none" stroke="#fff" strokeWidth={0.12} className="map-ping" />
        </g>
      </svg>

      {/* animated tooltip: just a tiny photo of the landmark */}
      <div
        key={cur.name}
        className="map-tip absolute"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          // offset from the dot; flipped near the edges
          translate: `${flipX ? "calc(-100% - 14px)" : "14px"} ${flipY ? "10px" : "calc(-100% - 10px)"}`,
          transformOrigin: `${flipX ? "right" : "left"} ${flipY ? "top" : "bottom"}`,
        }}
        aria-hidden
      >
        <div className="w-[80px] rounded-[9px] border border-white/15 bg-ink/80 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md sm:w-[104px] sm:rounded-[10px]">
          <picture>
            <source srcSet={`/img/places/${cur.photo}.avif`} type="image/avif" />
            <img
              src={`/img/places/${cur.photo}.jpg`}
              alt=""
              className="block h-[50px] w-full rounded-[6px] object-cover sm:h-[66px] sm:rounded-[7px]"
              draggable={false}
            />
          </picture>
        </div>
      </div>

      {/* warm the cache so every tooltip photo is ready before its turn */}
      <div className="hidden" aria-hidden>
        {PLACES.map((p) => (
          <picture key={p.photo}>
            <source srcSet={`/img/places/${p.photo}.avif`} type="image/avif" />
            <img src={`/img/places/${p.photo}.jpg`} alt="" />
          </picture>
        ))}
      </div>
    </div>
  );
}
