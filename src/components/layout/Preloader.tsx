"use client";

import { useEffect, useState } from "react";

/**
 * Brand intro preloader — "energize sweep".
 * A single electric pulse charges the logo silhouette while a hairline traces
 * underneath; once webfonts are ready (and a short minimum brand beat passes)
 * the panel lifts away like a curtain. No percentage bar, no spinner.
 *
 * All visual knobs live in CSS (`.preloader` custom properties in globals.css):
 * --preloader-bg, --preloader-accent, --preloader-logo, --preloader-speed,
 * --preloader-exit.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const root = document.documentElement;

    // Show the intro once per browser session, not on every page load.
    let seen = false;
    try {
      seen = sessionStorage.getItem("tarik_intro_seen") === "1";
      sessionStorage.setItem("tarik_intro_seen", "1");
    } catch {
      seen = false;
    }
    if (seen) {
      setPhase("done");
      return;
    }

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("preloader-active");

    const MIN = reduced ? 0 : 1500;
    const start = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      root.classList.remove("preloader-active");
      setPhase(reduced ? "done" : "out");
    };

    const ready = () =>
      window.setTimeout(finish, Math.max(0, MIN - (performance.now() - start)));

    // Wait for webfonts so the revealed page has no font swap; never block on
    // heavy media (e.g. the hero video).
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.resolve(fontsReady).then(ready, ready);

    // Safety net: never hang the page if a font/promise stalls.
    const cap = window.setTimeout(finish, 4500);

    return () => {
      window.clearTimeout(cap);
      root.classList.remove("preloader-active");
    };
  }, []);

  // Guarantee removal after the lift, independent of the animationend event
  // (covers reduced-motion and any animation-name edge cases).
  useEffect(() => {
    if (phase !== "out") return;
    const t = window.setTimeout(() => setPhase("done"), 1200);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader${phase === "out" ? " is-exiting" : ""}`}
      role="presentation"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (phase === "out" && e.target === e.currentTarget) setPhase("done");
      }}
    >
      <div className="preloader__inner">
        <div className="preloader__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-ondark.png" alt="" width={248} height={78} />
          <span className="preloader__sweep" aria-hidden="true" />
        </div>
        <span className="preloader__line" aria-hidden="true" />
      </div>
    </div>
  );
}
