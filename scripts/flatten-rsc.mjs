// Post-build step for the static export (`output: "export"`).
//
// Next writes per-segment RSC payloads for nested routes into folders, e.g.
//   out/terms/__next.terms/__PAGE__.txt
// but the client router requests the flattened name when it prefetches:
//   /terms/__next.terms.__PAGE__.txt
// Plain static hosts (Cloudflare Pages) can't map one to the other, so the
// prefetch 404s and navigation falls back to a full page load. This copies
// every such file to the flattened name next to its folder.
import { cpSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(p, dir);
    else walk(p);
  }
}

// out/terms/__next.terms/__PAGE__.txt -> out/terms/__next.terms.__PAGE__.txt
function flatten(segDir, parent) {
  for (const name of readdirSync(segDir, { recursive: true })) {
    const src = join(segDir, name);
    if (statSync(src).isDirectory()) continue;
    const flat = [segDir.split(sep).pop(), ...String(name).split(sep)].join(".");
    cpSync(src, join(parent, flat));
    copied++;
  }
}

walk(OUT);
console.log(`flatten-rsc: ${copied} payload file(s) copied in ${relative(".", OUT)}/`);
