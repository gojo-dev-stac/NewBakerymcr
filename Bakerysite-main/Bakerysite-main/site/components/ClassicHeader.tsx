"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { announce, nav } from "../content";
import { basket, order } from "../cart";
import Basket, { BasketToast } from "./Basket";
import { onReveal } from "./LayersLoader";

// Classic shop header (Motion map M8 line draw-on): a chocolate announcement bar, then one cream bar with the
// navigation left, the wordmark under a drawn ornament in the centre and the order basket right. It is a bakery
// counter sign rather than an app bar: hairline rules, wide-tracked capitals, no pills.
// On scroll the announcement bar folds away and the bar tightens (CSS transitions, so it works in ?static=1 too).
// Phone: menu button · wordmark · basket; the menu opens a cream sheet with the same links.
export default function ClassicHeader() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [bag, setBag] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pill = useRef<HTMLButtonElement>(null);
  const head = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // the menu sheet and the basket drawer hold the page still and close on Escape, like a shop door
  useEffect(() => {
    const held = open || bag;
    const lenis = window.__lenis;
    if (held) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle("menu-open", open);
    document.documentElement.classList.toggle("basket-open", bag);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      if (bag) basket.close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, bag]);

  useEffect(() => basket.subscribe(setBag), []);

  useEffect(
    () =>
      order.subscribe((n, added) => {
        setCount(n);
        if (added && pill.current && !prefersReducedMotion())
          gsap.fromTo(pill.current, { scale: 1.08 }, { scale: 1, duration: 0.6, ease: "expo.out" });
      }),
    [],
  );

  // M8 line draw-on, on the loader's exit: the two hairlines draw out from the left, the ornament unfolds between
  // them, then the links and the utilities settle (one group, 50 ms apart).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = head.current!;
    const rules = el.querySelectorAll<HTMLElement>("[data-draw]");
    const ornament = el.querySelector<HTMLElement>(".hf-orn");
    gsap.set(rules, { scaleX: 0 });
    gsap.set(el.querySelectorAll(".hf-in"), { opacity: 0, y: 10 });
    if (ornament) gsap.set(ornament, { scaleX: 0, opacity: 0 });
    return onReveal(() => {
      gsap.to(rules, { scaleX: 1, duration: 1.1, ease: "expo.inOut", stagger: 0.1, delay: 0.15 });
      if (ornament)
        gsap.to(ornament, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.45 });
      gsap.to(el.querySelectorAll(".hf-in"), { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.05, delay: 0.35 });
    });
  }, []);

  return (
    <>
      <header ref={head} className={`classic-head fixed inset-x-0 top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}>
      <div className="announce">
        <div className="container-x flex h-full items-center justify-between gap-6">
          <p className="hf-in truncate max-lg:hidden">{announce.left}</p>
          <a
            href={pathname.startsWith("/collections/") ? "#top" : "#counter"}
            className="hf-in group mx-auto flex items-center gap-2 whitespace-nowrap max-lg:mx-0"
          >
            <span>{announce.centre}</span>
            <span aria-hidden className="announce-arrow">→</span>
          </a>
          <p className="hf-in truncate max-lg:hidden">{announce.right}</p>
        </div>
      </div>

      <div className="head-bar">
        <span aria-hidden data-draw className="head-rule top" />
        <div className="container-x grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* nav left */}
          <nav aria-label="Main" className="flex items-center gap-6 max-lg:hidden">
          {nav.links.map((l, i) => {
            const href =
              l.label === "Shop"
                ? "/collections/all"
                : pathname.startsWith("/collections/")
                  ? `/${l.href}`
                  : l.href;
            const isCurrentPage = l.label === "Shop" ? pathname.startsWith("/collections/") : pathname === "/";
            return (
              <a
                key={l.href}
                href={href}
                className={`nav-link hf-in ${isCurrentPage ? "is-here" : ""}`}
              >
                {l.label}
              </a>
            );
          })}
          </nav>
          <button
            type="button"
            className="nav-burger hf-in hidden items-center gap-2 max-lg:flex"
            aria-expanded={open}
            aria-controls="menu-sheet"
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="burger-lines">
              <span />
              <span />
            </span>
            <span className="label">{open ? "Close" : "Menu"}</span>
          </button>

          {/* the bakery's supplied logo */}
          <a href="/#top" className="wordmark hf-in group" aria-label="thebakerymcr home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Mcr_products/Logo.svg" alt="thebakerymcr" className="word-logo" />
          </a>

          {/* utilities right */}
          <div className="flex items-center justify-end gap-5">
            <span className="hf-in hidden text-right max-md:!hidden lg:block">
              <span className="label block text-muted">Freshly baked</span>
              <span className="text-[13px] leading-tight">Same-day cakes</span>
            </span>
            <button
              ref={pill}
              type="button"
              onClick={() => basket.toggle()}
              aria-haspopup="dialog"
              aria-expanded={bag}
              className="order-pill btn btn-solid !px-4 !py-3 !text-[12px] !tracking-[0.12em]"
              data-cursor={bag ? "Close" : "Basket"}
            >
              <span className="max-sm:hidden">Basket</span>
              <span className="sm:hidden">Bag</span>
              <span className="pill-count">({count})</span>
            </button>
          </div>
        </div>
        <span aria-hidden data-draw className="head-rule bottom" />
      </div>

      {/* phone sheet */}
      <div id="menu-sheet" className={`menu-sheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="container-x grid h-full grid-rows-[1fr_auto] pb-8 pt-[calc(var(--head-h)+26px)]">
          <nav aria-label="Menu" className="flex flex-col justify-center">
            {nav.links.map((l, i) => (
              <a
                key={l.href}
                href={
                  l.label === "Shop"
                    ? "/collections/all"
                    : pathname.startsWith("/collections/")
                      ? `/${l.href}`
                      : l.href
                }
                onClick={() => setOpen(false)}
                className="menu-link"
                style={{ transitionDelay: open ? `${0.05 + i * 0.045}s` : "0s" }}
              >
                <span className="menu-no">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-end justify-between gap-4 border-t border-[var(--line)] pt-4">
            <p className="max-w-[26ch] text-[13px] leading-snug text-muted">
              {visitLine}
            </p>
            <button type="button" className="btn btn-ink" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
      {/* the "added" slip hangs under the bar (inside the header, so it follows both header states) */}
      <BasketToast />
      </header>
      <Basket />
    </>
  );
}

const visitLine = "Manchester · Same-day cakes · Collection & postal";
