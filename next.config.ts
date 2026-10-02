import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to `out/`, which is
  // deployed to Cloudflare Pages (build command `npm run build`, output `out`).
  // Nothing in the app needs a server (no API routes, cookies, redirects,
  // Server Actions or next/image), so every page is prerendered.
  output: "export",
};

export default nextConfig;
