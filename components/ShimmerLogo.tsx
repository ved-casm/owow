"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * "o'wow" wordmark rendered with three.js.
 * The letters sit in a dim grey and soft light bands sweep across them
 * left → right, one after another - the next band enters before the
 * previous one has left, like torches passing over dark text.
 *
 * The canvas is rendered at a higher resolution than its CSS size so the
 * navbar can scale it up (open menu) without it going blurry.
 */

const WEIGHT = 600;
const TRACKING = 0.05; // em

/**
 * "O'WOW" set in the nav-link sans (uppercase, tracked out).
 * The apostrophe is drawn as a straight vertical tick whose top sits exactly
 * on the cap height, so it lines up with the letters instead of floating.
 */
function drawWordmark(c: HTMLCanvasElement, family: string) {
  const { width: w, height: h } = c;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";

  // --- layout at a reference size ---
  const ref = 100;
  ctx.font = `${WEIGHT} ${ref}px ${family}`;
  ctx.letterSpacing = `${TRACKING * ref}px`;
  const cap = ctx.measureText("H").actualBoundingBoxAscent;
  const stem = cap * 0.14; // matches the letters' stroke weight
  const gap = TRACKING * ref; // same rhythm as the letter spacing
  const wO = ctx.measureText("O").width; // includes trailing tracking
  const wWOW = ctx.measureText("WOW").width - gap; // drop trailing tracking
  const tickH = cap * 0.34;
  const total = wO + stem + gap + wWOW;

  // --- fit to canvas ---
  const k = Math.min((w * 0.97) / total, (h * 0.82) / cap);
  const x0 = (w - total * k) / 2;
  const base = (h + cap * k) / 2;
  const capTop = base - cap * k;

  ctx.font = `${WEIGHT} ${ref * k}px ${family}`;
  ctx.letterSpacing = `${TRACKING * ref * k}px`;

  let x = x0;
  ctx.fillText("O", x, base);
  x += wO * k;

  // apostrophe: rounded vertical tick, top flush with cap height
  const r = (stem * k) / 2;
  ctx.beginPath();
  ctx.roundRect(x, capTop, stem * k, tickH * k, r);
  ctx.fill();
  x += (stem + gap) * k;

  ctx.fillText("WOW", x, base);
}

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uMask;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float mask = texture2D(uMask, vUv).a;

    // bands travel left → right; spacing < 1 so a new band enters
    // before the previous one reaches the end
    float spacing = 0.8;
    float speed = 0.62;               // uv units per second
    float x = vUv.x + (vUv.y - 0.5) * 0.22 - uTime * speed;
    float d = (fract(x / spacing) - 0.5) * spacing;
    float core = exp(-(d * d) / 0.012);   // hot centre of the torch
    float halo = exp(-(d * d) / 0.060);   // soft spill around it

    float base = 0.42;
    float l = base + halo * 0.30 + core * 0.70;
    vec3 col = vec3(min(l, 1.0));

    gl_FragColor = vec4(col, mask);
  }
`;

type Props = {
  width?: number;
  height?: number;
  /** extra resolution headroom so the logo can be CSS-scaled up crisply */
  upscale?: number;
  className?: string;
};

export default function ShimmerLogo({
  width = 90,
  height = 21,
  upscale = 2.2,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pr = Math.min(window.devicePixelRatio || 1, 2) * upscale;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    renderer.setPixelRatio(pr);
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);

    const mask = document.createElement("canvas");
    mask.width = Math.round(width * pr);
    mask.height = Math.round(height * pr);
    const texture = new THREE.CanvasTexture(mask);
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      uniforms: {
        uMask: { value: texture },
        uTime: { value: 0 },
      },
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // draw once the nav font has loaded (family name comes from next/font)
    let alive = true;
    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--nf-sans").trim() ||
      "sans-serif";
    document.fonts
      .load(`${WEIGHT} 100px ${family}`, "OWH")
      .catch(() => { })
      .then(() => {
        if (!alive) return;
        drawWordmark(mask, family);
        texture.needsUpdate = true;
      });

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      material.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      mesh.geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [width, height, upscale]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="O’WOW"
      role="img"
      className={className}
      style={{ width, height, display: "block" }}
    />
  );
}
