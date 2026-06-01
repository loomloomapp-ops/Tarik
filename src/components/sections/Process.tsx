"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, Check } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CircuitCorner } from "@/components/ui/Decor";

type Step = { title: string; desc: string; solves: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.max(0, Math.min(steps.length, Math.ceil(p * steps.length))));
  });

  return (
    <section
      id="process"
      className="relative isolate scroll-mt-[8.5rem] overflow-hidden bg-mist-100"
    >
      <CircuitCorner className="pointer-events-none absolute left-0 top-0 -z-10 w-[46%] max-w-[600px] text-navy-700 [transform:scaleX(-1)]" />
      <Container className="py-20 lg:py-[7.5rem]">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left: offer (sticky on desktop) */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              lead={t("lead")}
            />
          </div>

          {/* Right: step timeline with one continuous line + delicate frames */}
          <ol ref={ref} className="relative">
          {steps.map((step, i) => {
            const circleOn = i < active;
            const lineOn = i < active - 1;
            const isLast = i === steps.length - 1;
            return (
              <li key={step.title} className="flex gap-5 sm:gap-7">
                {/* Rail: circle + continuous connector */}
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold transition-colors duration-500 ${
                      circleOn
                        ? "bg-electric-500 text-white"
                        : "border-2 border-mist-300 bg-mist-50 text-graphite-400"
                    }`}
                  >
                    {lineOn ? <Check weight="bold" className="h-5 w-5" /> : i + 1}
                  </span>
                  {!isLast && (
                    <span
                      className={`w-[2px] flex-1 transition-colors duration-500 ${
                        lineOn ? "bg-electric-500" : "bg-mist-300"
                      }`}
                    />
                  )}
                </div>

                {/* Delicately framed step card, full width */}
                <div className={isLast ? "flex-1" : "flex-1 pb-6"}>
                  <div
                    className={`rounded-2xl border bg-white/60 p-6 transition-all duration-500 lg:p-8 ${
                      circleOn
                        ? "border-electric-500/25 bg-white shadow-[var(--shadow-card)]"
                        : "border-graphite-900/[0.07]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3
                        className={`text-lg font-bold uppercase tracking-tight transition-colors duration-500 sm:text-xl ${
                          circleOn ? "text-electric-600" : "text-graphite-900"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-500 ${
                          circleOn
                            ? "bg-electric-500/10 text-electric-600"
                            : "bg-graphite-900/[0.05] text-graphite-500"
                        }`}
                      >
                        <ShieldCheck weight="fill" className="h-4 w-4" />
                        {step.solves}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-graphite-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
