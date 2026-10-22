#!/usr/bin/env node
// Checks that every image / video / frames folder used by the site (files in site/) exists.
//   npm run check
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(f)) files.push(p);
  }
};
walk("site");
const src = files.map((f) => readFileSync(f, "utf8")).join("\n");
const paths = [...new Set([...src.matchAll(/["'(](\/(?:images|frames|videos)\/[^"')]+)["')]/g)].map((m) => m[1]))];
let ok = true;
for (const p of paths) {
  const isFrames = p.startsWith("/frames/");
  const target = isFrames ? join("public", p, "manifest.json") : join("public", p);
  if (existsSync(target)) console.log(`  ✓ ${p}`);
  else {
    ok = false;
    console.log(`  ✗ ${p}  ${isFrames ? "(no manifest.json — run: npm run frames -- <video> " + p.slice(1) + ")" : "(file missing)"}`);
  }
}
console.log(ok ? "\nAll assets found.\n" : "\nSome assets are missing.\n");
const motionHelper = readFileSync(join("lib", "gsap.ts"), "utf8");
const styles = readFileSync(join("site", "site.css"), "utf8");
const jsSupportsReducedMotion = /matchMedia\(\s*["']\(prefers-reduced-motion:\s*reduce\)["']\s*\)/.test(motionHelper);
const cssSupportsReducedMotion = /@media\s*\(prefers-reduced-motion\s*:\s*reduce\)/.test(styles);
const cssCollapsesFilmPins = /@media\s*\(prefers-reduced-motion\s*:\s*reduce\)[\s\S]*\.pin-outer\s*\{\s*height:\s*100svh\s*!important;[\s\S]*\.pin-stage\s*\{\s*position:\s*relative\s*!important;/.test(styles);
if (!jsSupportsReducedMotion || !cssSupportsReducedMotion || !cssCollapsesFilmPins) {
  console.log("✗ Reduce-motion check FAILED: motion, CSS animations and film pin layouts must honor the OS setting.");
  console.log("");
} else console.log("✓ Motion lint: JavaScript, CSS and film layouts honor the OS reduce-motion setting.\n");
process.exit(ok && jsSupportsReducedMotion && cssSupportsReducedMotion && cssCollapsesFilmPins ? 0 : 1);
