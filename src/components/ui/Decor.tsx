"use client";

import { motion } from "framer-motion";

// Decorative marks. Star = template eyebrow; Spiral = concentric accent;
// CircuitLines = full schematic (used on the final CTA band); CircuitCorner =
// minimal corner motif that fades in on scroll, kept faint so it never
// competes with content.

export function StarSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M10.34 0C10.397 5.687 14.993 10.283 20.68 10.34c-5.687.058-10.283 4.654-10.34 10.341C10.282 14.994 5.686 10.398 0 10.34 5.686 10.283 10.282 5.687 10.34 0Z" />
    </svg>
  );
}

export function SpiralRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 35 35" fill="none" aria-hidden="true" className={className}>
      <circle cx="17.5" cy="17.5" r="17.1" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />
      <circle cx="17.5" cy="17.5" r="12.73" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="17.5" cy="17.5" r="8.35" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.8" />
      <circle cx="17.5" cy="17.5" r="3.98" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

// Full schematic — thin lines, node dots, hollow rings, right-angle paths.
export function CircuitLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 360"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={className}
    >
      <g>
        <path d="M0 64 H190 V128 H380" />
        <path d="M800 56 H660 V150 H470 V96" />
        <path d="M0 232 H140 V292 H330" />
        <path d="M800 224 H690 V150 H560" />
        <path d="M380 0 V128" />
        <path d="M330 360 V292" />
      </g>
      <g className="hidden md:block">
        <path d="M380 128 H520 V206 H680 V300" />
        <path d="M140 232 H262 V300 H40" />
        <path d="M0 320 H92 V256" />
        <path d="M560 150 V230 H470" />
        <path d="M660 56 V0" />
      </g>
      <g fill="currentColor" stroke="none">
        <circle cx="190" cy="64" r="3.5" />
        <circle cx="380" cy="128" r="4" />
        <circle cx="660" cy="56" r="3.5" />
        <circle cx="470" cy="150" r="3.5" />
        <circle cx="140" cy="232" r="3.5" />
        <circle cx="330" cy="292" r="3.5" />
        <circle cx="690" cy="224" r="3.5" />
        <circle cx="560" cy="150" r="3.5" />
      </g>
      <g fill="none" strokeWidth="1.2">
        <circle cx="190" cy="128" r="7" />
        <circle cx="680" cy="150" r="7" />
        <circle cx="520" cy="206" r="6" className="hidden md:block" />
      </g>
    </svg>
  );
}

// Minimal corner accent — thin trajectories that draw themselves in on scroll
// and fade out toward the edges (mask gradient) so the ends melt into the
// design. Target opacity is animated, so the lines stay barely visible.
const EASE = [0.16, 1, 0.3, 1] as const;
const fade =
  "radial-gradient(78% 78% at 50% 42%, #000 36%, transparent 100%)";

export function CircuitCorner({
  className,
  opacity = 0.1,
}: {
  className?: string;
  opacity?: number;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity,
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  };
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: EASE } },
  };
  const pop = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <motion.svg
      viewBox="0 0 440 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
      className={className}
      style={{ WebkitMaskImage: fade, maskImage: fade }}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <motion.path variants={draw} d="M440 52 H280 V146 H150" />
      <motion.path variants={draw} d="M440 192 H346 V258 H226" />
      <motion.path variants={draw} d="M280 52 V0" />
      <motion.path variants={draw} d="M150 146 H70 V230" />
      <g fill="currentColor" stroke="none">
        <motion.circle variants={pop} cx="280" cy="146" r="3.5" />
        <motion.circle variants={pop} cx="346" cy="192" r="3.5" />
        <motion.circle variants={pop} cx="70" cy="146" r="3" />
      </g>
      <motion.circle variants={draw} cx="150" cy="146" r="6.5" fill="none" strokeWidth="1" />
      <motion.circle variants={draw} cx="280" cy="52" r="4.5" fill="none" strokeWidth="1" />
    </motion.svg>
  );
}
