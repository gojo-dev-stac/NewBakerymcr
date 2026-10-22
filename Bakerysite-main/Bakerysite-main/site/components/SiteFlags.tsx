"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/** Adds html.is-static when motion is disabled (after hydration, so React never sees a changed <html>). */
export default function SiteFlags() {
  useEffect(() => {
    if (prefersReducedMotion()) document.documentElement.classList.add("is-static");
  }, []);
  return null;
}
