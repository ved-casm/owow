"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

/**
 * Video that never autoplays: shows its poster with a dotted play button,
 * starts (with sound) only when the user clicks, and toggles pause on click.
 */
export type PlayableVideoHandle = { pause: () => void };

type Props = {
  /** H.264 MP4 — plays on every device (fallback) */
  src: string;
  /** optional AV1 WebM — smaller, used wherever the browser supports it */
  webm?: string;
  poster?: string;
  className?: string;
  /** size of the dotted play icon in px */
  iconSize?: number;
  children?: React.ReactNode;
};

const PlayableVideo = forwardRef<PlayableVideoHandle, Props>(function PlayableVideo(
  { src, webm, poster, className = "", iconSize = 84, children },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    pause: () => videoRef.current?.pause(),
  }));

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      v.play().catch(() => {
        // browser refused sound — fall back to muted playback
        v.muted = true;
        v.play().catch(() => {});
      });
    } else {
      v.pause();
    }
  };

  return (
    <div className={`group relative cursor-pointer ${className}`} onClick={toggle}>
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="h-full w-full object-cover"
      >
        {webm && <source src={webm} type='video/webm; codecs="av01.0.08M.08"' />}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-0" : "opacity-100"
        }`}
      >
        <DotPlay size={iconSize} />
      </button>
      {children}
    </div>
  );
});

export default PlayableVideo;

/**
 * Play triangle built from six small dots (3 · 2 · 1 columns).
 * Geometry measured from the reference: r = 10, columns 32px apart,
 * rows offset by 17.5px — airy, not packed.
 */
const DOTS: [number, number][] = [
  [0, 0], [0, 35], [0, 70],
  [32, 17.5], [32, 52.5],
  [64, 35],
];

function DotPlay({ size }: { size: number }) {
  return (
    <svg
      width={(size * 84) / 90}
      height={size}
      viewBox="-10 -10 84 90"
      aria-hidden
      className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
    >
      {DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={10} fill="#fff" />
      ))}
    </svg>
  );
}
