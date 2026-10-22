// All text + data for thebakerymcr (Manchester bakery, prices in £). Design: site/DESIGN.md.
// The range includes bento cakes, vintage hearts, cookies, brownies,
// tray bakes, cake mixes, collection & postal, bespoke and wholesale.
import type { Film } from "./components/film";

const IMG = "/images/crumb";
export const img = (name: string) => `${IMG}/${name}`;

/* Films: video seconds measured on contact sheets (DESIGN.md → Video plan). Segments: play the video up to `to`
   seconds over `secs` record seconds. */
export const films = {
  // hero-build 0–6.3 s: base 1.25 · jam 2.5 · third sponge 3.4 · frosting 4.4–6.0 (6–8 s still hold: cut)
  build: {
    frames: "/frames/crumb-build",
    start: 1.3, // the scroll starts where the intro ends (the intro plays 0 → 1.3 by itself)
    poster: 6.3,
    segments: [
      { to: 2.6, secs: 1.1, label: "build-jam" },
      { to: 4.4, secs: 1.0, label: "build-layers" },
      { to: 6.0, secs: 1.2, label: "build-frosting" },
      // the finished cake holds a moment: "cake" melts in and stays sharp while the hero is still pinned
      { to: 6.3, secs: 0.9, label: "build-cake" },
    ],
  },
  // ganache-pour 0–6.8 s: pour 0.5 · drips formed 3.0 · toppings fall 3.6–4.9 · sprinkles 5.75 (jump-cut 7.63: cut)
  crown: {
    frames: "/frames/crumb-crown",
    start: 0.35, // 0–0.35 s is a still plain cake: the film starts as the jug begins to pour
    poster: 6.8,
    segments: [
      { to: 3.2, secs: 1.6, label: "crown-pour" },
      { to: 5.0, secs: 1.9, label: "crown-toppings" },
      { to: 6.8, secs: 1.0, label: "crown-sprinkles" },
    ],
  },
  // slice-cut 0–4.6 s: server in 0.25–1.75 · wedge out 2.0–4.4 (slides back after ~4.75: cut)
  slice: {
    frames: "/frames/crumb-slice",
    start: 0,
    poster: 4.6,
    segments: [
      { to: 1.9, secs: 1.1, label: "slice-server" },
      { to: 4.6, secs: 1.9, label: "slice-wedge" },
    ],
  },
  // box-close 0–4.6 s: flaps 0.8–2.0 · lid lands + tab 2.0–3.0 (the "sudden" payoff) · sticker 3.25–4.25
  box: {
    frames: "/frames/crumb-box",
    start: 0,
    poster: 4.6,
    segments: [
      { to: 2.0, secs: 1.4, label: "box-flaps" },
      { to: 3.1, secs: 0.7, label: "box-lid" },
      { to: 4.6, secs: 0.8, label: "box-sticker" },
    ],
  },
} satisfies Record<string, Film>;

/** Measured hero beats: the headline's missing word switches when the video crosses these seconds. */
export const hero = {
  lead: "Build a",
  tail: "by hand.",
  words: [
    { at: 0, word: "base" },
    { at: 2.5, word: "jam" },
    { at: 4.4, word: "crème" },
    { at: 6.0, word: "cake" },
  ],
  // layer meter (1 → 7) by video second
  layers: [1.25, 1.35, 1.9, 2.4, 2.55, 3.4, 6.0],
  copy: "Bento cakes, celebration cakes, stuffed cookies and brownies from thebakerymcr. Find your favourite, or get in touch about a bespoke cake.",
  ctas: ["Shop now", "Bespoke cakes"],
};

export const crown = {
  title: ["The House", "Cake"],
  sub: "Three sponges under warm dark chocolate, poured and dripped by hand, then crowned with macarons, berries and a little gold. Our signature for birthdays, weddings and everything in between.",
  tags: [
    { id: "pour", name: "Pour", note: "64% dark chocolate, poured to order", until: 3.2, tone: "pistachio" },
    { id: "drip", name: "Drip", note: "Every drip piped by hand", until: 4.0, tone: "pink" },
    { id: "crown", name: "Crown", note: "Macarons, berries, a little gold", until: 99, tone: "cream" },
  ],
  /** video second the berries + macarons fall into frame: the cut-outs are thrown out of the film from here */
  throwAt: 3.6,
};

export type Cake = { no: string; name: string; note: string; price: number; img: string; tone: string; size: string };
export const cakes: Cake[] = [
  { no: "01", name: "8 Inch Pink Heart Cake", note: "A pink heart cake for a special celebration", price: 85, img: "/shop-products/8-inch-pink-heart-cake-1.webp", tone: "pink", size: "8 inch" },
  { no: "02", name: "Pink Bento Piped Cake", note: "A delicately piped cake for a special occasion", price: 40, img: "/shop-products/pink-bento-piped-cake-1.webp", tone: "cream", size: "Bento" },
  { no: "03", name: "Purple Piped Bento Cake", note: "A purple piped cake, made for a special occasion", price: 40, img: "/shop-products/purple-piped-bento-cake-1.webp", tone: "pistachio", size: "Bento" },
  { no: "04", name: "Whole Rainbow Cake", note: "Six colourful vanilla layers with creamy buttercream", price: 100, img: "/shop-products/whole-rainbow-cake-1.webp", tone: "blush", size: "Whole cake" },
];
export const counterSmall = [
  { name: "Mixed Cookie Box", price: "£35" },
  { name: "Valentines Brownie Box", price: "£22" },
  { name: "Mixed Cupcake Box", price: "£20" },
  { name: "Vanilla Cake Mix", price: "£9" },
];
export const counter = {
  title: "Out of the oven at seven.",
  sub: "Pink and purple piped bento cakes, love-heart cakes, brownies and more from thebakerymcr in Manchester.",
};

/** The shop's collections, as a rail above the counter (supporting marquee inside the counter's motion code). */
export const collections = [
  { name: "Bespoke cakes", price: "£18–100", note: "pink heart, rainbow, Valentine" },
  { name: "Bento cakes", price: "£40", note: "pink or purple piped" },
  { name: "Cake boxes", price: "£15–35", note: "birthday, mixed, pick your own" },
  { name: "Brownie boxes", price: "£20–30", note: "Biscoff, Oreo, mixed, Valentine" },
  { name: "Tray bakes", price: "£5.49", note: "Biscoff or old-school" },
  { name: "Cupcakes", price: "£20–30", note: "mixed or Valentine boxes" },
  { name: "Cookie boxes", price: "£24–35", note: "mixed cookie boxes" },
  { name: "Cake & brownie mixes", price: "£6.99–9", note: "bake at home" },
];

export const inside = {
  metric: "7",
  metricLabel: "hours",
  title: "Inside the box.",
  copy: "Cut it and count: two sponges, a biscoff crumb, brownie chunks and a fudge centre, cut into four or six and packed the morning it is posted.",
  figures: [
    { v: "2", label: "sponges, layered" },
    { v: "3", label: "fillings" },
    { v: "4", label: "to a box" },
    { v: "6", label: "in a box of six" },
  ],
};

export const builder = {
  title: "Build your cake.",
  sub: "Bento, heart or square. Four choices, piped the morning you collect — from £40.",
  steps: [
    { id: "shape", name: "Shape", options: ["Round", "Heart", "Square"], add: [0, 15, 10] },
    { id: "sponge", name: "Sponge", options: ["Vanilla", "Chocolate", "Red Velvet"], add: [0, 0, 5] },
    { id: "finish", name: "Finish", options: ["Piped cream", "Chocolate drip", "Berry crown"], add: [0, 5, 10] },
    { id: "size", name: "Size", options: ["Bento 4″", "Heart 8″", "Celebration 10″"], mult: [1, 1.4, 2.2] },
  ],
  base: 40, // per bento
  /** auto-demo (record mode): the choices it makes, in order */
  demo: [
    ["shape", 1],
    ["sponge", 2],
    ["finish", 2],
    ["size", 1],
  ] as [string, number][],
};

export const boxed = {
  title: "Boxed by four.",
  sub: "Boxed the morning it is baked. Collect from the counter in Manchester, or have it posted UK-wide every Thursday.",
  features: [
    { name: "Same-day Manchester", note: "Order before 11, collect from 3" },
    { name: "Posted every Thursday", note: "Tracked, in a sturdy box" },
    { name: "Wholesale available", note: "Cafés, offices, events" },
    { name: "Vegan & gluten free", note: "On request, same price" },
  ],
  cta: "Order a box",
};

export const orders = {
  title: "Just ordered.",
  today: 186,
  rows: [
    { name: "Amara", what: "Pink Bento Cake, vanilla", quote: "for mum's birthday", when: "now" },
    { name: "Josh", what: "Brownie Box of 6", quote: "the biscoff ones!!", when: "1 min" },
    { name: "Priya", what: "Vintage Heart Cake, 8 inch", quote: "she said yes", when: "3 min" },
    { name: "Tom", what: "Mixed Cookie Box", quote: "posted to Leeds", when: "4 min" },
    { name: "Elle", what: "Chocolate Drip Cake", quote: "same day, please", when: "6 min" },
  ],
};

/** Bespoke + wholesale + careers (the shop's order form, rebuilt as a printed order slip). */
export const bespoke = {
  eyebrow: "Bespoke & wholesale",
  title: "Order your bespoke cake.",
  copy: "A birthday, a wedding, a graduation — or just a reason. Tell us the flavour, the size and the colours, and we'll come back with a sketch and a price within a day.",
  note: "Order 48 hours ahead for bespoke. Same-day cakes in Manchester, posted boxes UK-wide, and wholesale for cafés, offices and events.",
  form: { name: "Name", email: "Email", phone: "Phone", comment: "What are you celebrating?" },
  sent: "Noted. We'll be in touch today.",
  wholesale: {
    title: "Wholesale",
    copy: "Standing orders for cafés, offices and events, from £60 a week. Ask us about our wholesale cakes.",
  },
  careers: {
    title: "Think you've got what it takes to be a baker?",
    copy: "We're always looking for good hands. Send a note and a photo of something you baked.",
    cta: "Say hello",
  },
};

export const visit = {
  studio: ["thebakerymcr", "Manchester"],
  ordering: ["Same-day cakes available", "Bespoke cake enquiries welcome"],
  counter: ["Collection available", "Postal boxes available"],
};

export const announce = {
  left: "thebakerymcr · Manchester",
  centre: "Manchester's best cakes",
  right: "Same-day cakes · Bespoke orders",
};

export const nav = {
  links: [
    { label: "Home", href: "#top" },
    { label: "Shop", href: "#counter" },
    { label: "Cakes", href: "#crown" },
    { label: "Collection & postal", href: "#boxed" },
    { label: "Bespoke", href: "#bespoke" },
  ],
  modes: ["Collection", "Postal"],
};

export const toppings = Array.from({ length: 8 }, (_, i) => img(`top-${i + 1}.webp`));
/** pounds, grouped the UK way: £1,450 (no decimals for whole pounds) */
export const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
