"use client";

import { useEffect, useState } from "react";

// Launch date the countdown ticks towards
const LAUNCH = new Date("2026-12-24T18:00:00Z").getTime();

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { v: Math.floor(s / 86400), l: "DAYS" },
    { v: Math.floor((s % 86400) / 3600), l: "HRS" },
    { v: Math.floor((s % 3600) / 60), l: "MIN" },
    { v: s % 60, l: "SEC" },
  ];
}

export default function Countdown() {
  // null on the server so markup never mismatches during hydration
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = now === null ? parts(0) : parts(LAUNCH - now);

  return (
    <div className="flex items-start gap-1.5 text-white">
      {items.map((it, i) => (
        <div key={it.l} className="flex items-start gap-1.5">
          <div className="flex flex-col items-center">
            <span className="font-mono text-[17px] leading-none font-medium tabular-nums tracking-[-0.04em]">
              {now === null ? "--" : pad(it.v)}
            </span>
            <span className="mt-1 font-mono text-[7px] leading-none tracking-[0.04em] text-white/40">
              {it.l}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="font-mono text-[15px] leading-none text-white/70">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
