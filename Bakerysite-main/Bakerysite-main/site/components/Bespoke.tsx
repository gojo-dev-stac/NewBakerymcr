"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { bespoke } from "../content";

// "Bespoke & wholesale" (the shop's order form, rebuilt as a printed order slip · Motion map M9 print-out line by line).
// A paper slip feeds out of the printer slot above the section: the card's clip-path steps down line by line (steps(14))
// while the fields arrive in order, so it reads like an order being printed at the counter. Left: the pitch, the
// wholesale card and the careers note. On submit the slip is stamped "Noted" (no network: a concept form).
// Phone: form below the copy, the slip feeds out the same way. ?static=1: the finished slip, stamp hidden.

export default function Bespoke() {
  const [sent, setSent] = useState(false);
  const root = useRef<HTMLElement>(null);
  const stamp = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current!;
    const slip = el.querySelector<HTMLElement>(".slip")!;
    const lines = el.querySelectorAll<HTMLElement>(".slip-line");
    gsap.set(slip, { clipPath: "inset(0 0 100% 0)", y: -14 });
    gsap.set(lines, { opacity: 0, y: 8 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap
          .timeline()
          .to(slip, { y: 0, duration: 0.32, ease: "power2.out" })
          .to(slip, { clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "steps(14)" }, 0.08)
          .to(lines, { opacity: 1, y: 0, duration: 0.3, stagger: 0.11, ease: "none" }, 0.16),
    });
    return () => st.kill();
  }, []);

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    if (prefersReducedMotion()) return;
    gsap.fromTo(stamp.current, { scale: 1.6, rotate: -14, opacity: 0 }, { scale: 1, rotate: -8, opacity: 1, duration: 0.45, ease: "back.out(2)" });
  };

  return (
    <section ref={root} id="bespoke" data-record-time="1" data-record-hold="1.4" data-record-label="bespoke" data-hold-push=".slip" className="relative bg-[var(--cream)] pb-[clamp(64px,9vh,104px)] pt-[clamp(72px,10vh,112px)]">
      <div className="step-edge" style={{ ["--step-c" as string]: "var(--cream)" }} />
      {/* daylight through the shop window: a warm pool drifts across the paper while the slip is on screen */}
      <span aria-hidden className="bespoke-sweep" />
      <div className="container-x grid relative z-[1] grid-cols-[0.92fr_1.08fr] items-start gap-[clamp(32px,5vw,90px)] max-md:grid-cols-1">
        <div>
          <p className="label text-[color:var(--straw)]">{bespoke.eyebrow}</p>
          <h2 className="shine-type font-display mt-3 text-[clamp(42px,5vw,88px)] max-md:text-[40px]">{bespoke.title}</h2>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.6] text-muted">{bespoke.copy}</p>
          <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-muted">{bespoke.note}</p>

          <div className="mt-8 grid gap-3 border-t-[1.5px] border-[var(--choc)] pt-5 max-md:mt-6">
            <div className="grid grid-cols-[120px_1fr] gap-3 max-md:grid-cols-1 max-md:gap-1">
              <p className="label pt-1 text-muted">{bespoke.wholesale.title}</p>
              <p className="text-[14px] leading-snug">{bespoke.wholesale.copy}</p>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-3 border-t border-[var(--line)] pt-3 max-md:grid-cols-1 max-md:gap-1">
              <p className="label pt-1 text-muted">Hiring</p>
              <p className="text-[14px] leading-snug">
                <span className="font-display text-[19px] leading-tight">{bespoke.careers.title}</span>
                <br />
                {bespoke.careers.copy} <a href="#bespoke" className="link-underline font-semibold">{bespoke.careers.cta}</a>
              </p>
            </div>
          </div>
        </div>

        {/* the printer slot */}
        <div className="relative">
          <div className="slip-slot relative z-[2] mx-auto flex h-[26px] w-[86%] items-center justify-between border border-[var(--choc)] bg-[var(--choc)] px-4" aria-hidden>
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[color:var(--pink)]">Order slip · MCR</span>
            <span className="flex gap-[3px]">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="block h-[10px] w-[2px] bg-[rgba(255,250,243,0.4)]" />
              ))}
            </span>
          </div>
          <form onSubmit={onSend} className="slip relative z-[1] mx-auto w-[92%] max-w-[620px] overflow-hidden bg-[var(--paper)] px-[clamp(18px,3vw,38px)] pb-[clamp(20px,3vw,34px)] pt-[clamp(18px,2.6vw,30px)] shadow-[0_26px_40px_-30px_rgba(59,36,24,0.55)]">
            <span aria-hidden className="slip-sheen" />
            <div className="slip-line flex items-baseline justify-between gap-4 border-b border-dashed border-[rgba(59,36,24,0.35)] pb-3">
              <p className="label text-muted">Bespoke enquiry</p>
              <p className="label tabular-nums text-muted">No. 2026</p>
            </div>

            <div className="slip-line mt-4 grid grid-cols-2 gap-x-4 gap-y-4 max-md:grid-cols-1">
              <label className="slip-field">
                <span>Name</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
              </label>
              <label className="slip-field">
                <span>Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
              </label>
              <label className="slip-field">
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
              </label>
              <label className="slip-field">
                <span>Date needed</span>
                <input name="date" type="text" placeholder="e.g. 14 June" />
              </label>
            </div>

            <label className="slip-field slip-line mt-4">
              <span>{bespoke.form.comment}</span>
              <textarea name="comment" rows={3} placeholder="Flavour, size, colours, a sketch of the idea…" />
            </label>

            <div className="slip-line mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-[rgba(59,36,24,0.35)] pt-4">
              <p className="max-w-[30ch] text-[12px] leading-snug text-muted">
                We answer within a day, Tuesday to Sunday. Bespoke orders need 48 hours.
              </p>
              <button type="submit" className="btn btn-solid relative" data-cursor="Send" data-mag>
                <span className="mag-label">{sent ? "Sent" : "Send"}</span>
              </button>
            </div>

            {sent && (
              <div className="slip-line mt-4 border-t border-dashed border-[rgba(59,36,24,0.35)] pt-3" role="status">
                <p className="font-display text-[22px]">{bespoke.sent}</p>
                <p className="mt-1 text-[13px] text-muted">No need to send it twice — this is a concept form, so nothing leaves the page.</p>
              </div>
            )}
            {sent && (
              <span ref={stamp} className="slip-stamp pointer-events-none absolute right-[6%] top-[34%] grid h-[92px] w-[92px] place-items-center rounded-full border-2 border-[var(--straw)] text-center text-[10px] font-bold uppercase leading-tight tracking-[0.16em] text-[color:var(--straw)]">
                Noted
                <br />
                MCR
              </span>
            )}
          </form>
        </div>
      </div>

      {/* the printer's tape: a full-width strip of the services people ask for most (supporting motion, CSS) */}
      <div className="tape mt-[clamp(28px,4vh,46px)] overflow-hidden border-y border-[rgba(59,36,24,0.35)] bg-[var(--pink)] py-3" aria-hidden>
        <div className="tape-track flex w-max gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em]">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8">
              {["Bespoke cakes · 48 hours notice", "Vintage hearts", "Children's cakes", "Cake tasters", "Cake toppers", "Online school", "Wholesale", "Corporate orders", "Ancoats, Manchester"].map((t) => (
                <span key={t} className="flex items-center gap-8">
                  {t}
                  <span className="inline-block h-1.5 w-1.5 bg-[var(--straw)]" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
