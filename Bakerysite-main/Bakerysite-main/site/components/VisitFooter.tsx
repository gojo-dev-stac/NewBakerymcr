"use client";

import SprinkleWord from "./SprinkleWord";
import { visit } from "../content";

// Footer "Visit" (FO07 info footer: address, hours, collection, map · Motion map M45 particle text). Chocolate block.
// A band of sprinkles gathers into THE BAKERY as soon as the footer enters and keeps a light wave running, so the last
// screen of the reel is never still (lesson 35). Under it: the post list, then four columns (shop, hours, collection &
// postal, a flat block map with a strawberry pin). "Concept website" note. Phone: columns stack, map below.
// ?static=1: the wordmark formed.

const MAP = [
  "pist", "cream", "pink", "cream", "pist", "cream",
  "cream", "pink", "cream", "pist", "cream", "pink",
  "pink", "cream", "pist", "cream", "pink", "cream",
];

export default function VisitFooter() {
  return (
    <footer id="visit" data-record-time="1.2" data-record-hold="2" data-record-label="footer" data-hold-push=".particle-word" className="relative bg-[var(--choc)] pb-8 pt-[clamp(40px,6vh,72px)] text-[color:var(--paper)]">
      <div className="step-edge" style={{ ["--step-c" as string]: "var(--choc)" }} />
      {/* a slow ticker under the stepped edge (CSS, runs from the first paint): the last screen always moves */}
      <div className="foot-ticker overflow-hidden border-y border-[rgba(255,250,243,0.18)] py-2.5" aria-hidden>
        <div className="foot-ticker-track flex w-max gap-10 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.08em] text-[color:var(--pink)]">
          {Array.from({ length: 2 }, (_, k) => (
            <span key={k} className="flex gap-10">
              {["Same-day cakes", "Posted every Thursday", "Collection from Ancoats", "Wholesale available", "Baked at five every morning", "Eggless & vegan on request"].map((t) => (
                <span key={t} className="flex items-center gap-10">
                  {t}
                  <span className="inline-block h-2 w-2 bg-[var(--straw)]" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="container-x mt-[clamp(24px,4vh,48px)]">
        <div className="relative">
          <SprinkleWord text="The Bakery" className="particle-word h-[clamp(120px,22vh,230px)] w-full" />
          {/* ?static=1: the formed wordmark as type (the particle canvas only draws with motion on) */}
          <p className="particle-static font-display absolute inset-0 hidden place-items-center text-[clamp(80px,13vw,200px)] text-[color:var(--pink)]">The Bakery</p>
        </div>

        {/* the post list (the shop's newsletter row) */}
        <div className="mt-2 flex flex-wrap items-end justify-between gap-6 border-t border-[rgba(255,250,243,0.25)] pt-7">
          <div className="max-w-[34ch]">
            <p className="label text-[color:var(--pink)]">The post list</p>
            <p className="mt-2 text-[15px] leading-snug">New collections and exclusive offers. One email a week, no more.</p>
          </div>
          <form className="foot-form flex w-full max-w-[440px] items-end gap-3 max-md:max-w-none" onSubmit={(e) => e.preventDefault()}>
            <label className="min-w-0 flex-1">
              <span className="sr-only">Email address</span>
              <input type="email" required placeholder="Email address" autoComplete="email" />
            </label>
            <button type="submit" className="btn btn-solid !px-5 !py-3 !text-[11px]">
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_1fr_1.1fr_1.3fr] gap-8 border-t border-[rgba(255,250,243,0.25)] pt-8 max-md:grid-cols-1 max-md:gap-6">
          {[
            { h: "Shop", lines: visit.studio },
            { h: "Open", lines: visit.hours },
            { h: "Collection & postal", lines: visit.counter },
          ].map((c) => (
            <div key={c.h}>
              <p className="label text-[color:var(--pink)]">{c.h}</p>
              {c.lines.map((l) => (
                <p key={l} className="mt-2 text-[15px] leading-snug">
                  {l}
                </p>
              ))}
            </div>
          ))}
          <div className="relative grid aspect-[2/1] grid-cols-6 gap-[3px] border-[1.5px] border-[var(--paper)] bg-[var(--paper)] p-[3px]" aria-label="Map: Ancoats, Manchester" role="img">
            {MAP.map((t, i) => (
              <span key={i} className={{ pist: "bg-[var(--pist)]", cream: "bg-[var(--cream)]", pink: "bg-[var(--pink)]" }[t]} />
            ))}
            <span className="absolute left-[56%] top-[38%] grid h-9 w-9 -translate-x-1/2 -translate-y-full place-items-center bg-[var(--straw)] text-[11px] font-bold text-[var(--paper)] [clip-path:polygon(0_0,100%_0,100%_75%,50%_100%,0_75%)]">
              MCR
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[13px] text-[color:rgba(255,250,243,0.75)]">
          <p>© 2026 The Bakery MCR · {visit.note}</p>
          <p className="flex flex-wrap items-center gap-5">
            <a href="#top" className="link-underline">Instagram</a>
            <a href="#top" className="link-underline">TikTok</a>
            <a href="#top" className="link-underline">Facebook</a>
            <a href="#top" className="link-underline">WhatsApp orders</a>
          </p>
        </div>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-[color:rgba(255,250,243,0.5)]">
          <span>Refund policy</span>
          <span>Privacy policy</span>
          <span>Terms of service</span>
          <span>Shipping policy</span>
        </p>
      </div>
    </footer>
  );
}
