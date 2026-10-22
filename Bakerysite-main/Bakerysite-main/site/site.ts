import type { SiteMeta, Theme } from "@/lib/site";

// Settings for THIS site: The Bakery MCR, a Manchester bakery (concept edition). "Build a cake in Manchester."
// Direction + Motion map: site/DESIGN.md. Video plan + measured video times: site/DESIGN.md → "Video plan".

export const meta: SiteMeta = {
  name: "The Bakery MCR",
  title: "The Bakery MCR — Manchester's freshest desserts",
  description:
    "The Bakery MCR: bento cakes, vintage hearts, celebration cakes, stuffed cookies, brownies and tray bakes, baked in Manchester. Collection, same-day cakes and UK postal boxes.",
  loaderText: "The Bakery MCR",
  loader: false, // site/components/LayersLoader.tsx replaces the engine loader
  cursor: true,
  record: { duration: 30 }, // only used without the section timeline (the page uses data-record-time stops)
};

export const theme: Theme = {
  bg: "#F5EDE2", // measured: the cream backdrop of every film (left side), so the videos melt into the page
  surface: "#FFFFFF",
  text: "#3B2418", // chocolate ink
  muted: "#6E5243",
  accent: "#B8304C", // strawberry (the one accent: buttons, order pill, one word per section)
  accentText: "#FFF8EE",
  line: "#D9C8B8",
  fontDisplay: "'Bricolage Grotesque Variable', 'Arial Narrow', system-ui, sans-serif",
  fontBody: "'Onest Variable', system-ui, sans-serif",
  radius: 0,
  uppercaseHeadings: false,
  heroText: "#3B2418",
};
