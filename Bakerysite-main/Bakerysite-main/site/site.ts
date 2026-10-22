import type { SiteMeta, Theme } from "@/lib/site";

// Settings for thebakerymcr, a Manchester bakery. Direction + motion map: site/DESIGN.md.

export const meta: SiteMeta = {
  name: "thebakerymcr",
  title: "thebakerymcr | Cakes, Brownies & Desserts in Manchester",
  description:
    "Shop bento cakes, celebration cakes, brownies and desserts from thebakerymcr in Manchester. Same-day cakes and bespoke orders available.",
  loaderText: "thebakerymcr",
  loader: false, // site/components/LayersLoader.tsx replaces the engine loader
  cursor: true,
  record: { duration: 30 }, // only used without the section timeline (the page uses data-record-time stops)
};

export const theme: Theme = {
  bg: "#FFF8FB",
  surface: "#FFFFFF",
  text: "#33252C",
  muted: "#765E6B",
  accent: "#B83F78",
  accentText: "#FFFFFF",
  line: "#EAD2DE",
  fontDisplay: "'Bricolage Grotesque Variable', 'Arial Narrow', system-ui, sans-serif",
  fontBody: "'Onest Variable', system-ui, sans-serif",
  radius: 0,
  uppercaseHeadings: false,
  heroText: "#33252C",
};
