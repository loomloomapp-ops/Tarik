"use client";

import { useRef, useState } from "react";
import { Star, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CircuitCorner } from "@/components/ui/Decor";

type Item = { quote: string; name: string; role: string };

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Item[];
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function step() {
    const el = trackRef.current;
    if (!el) return 1;
    const card = el.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
  }

  function scrollTo(index: number) {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.max(0, Math.min(items.length - 1, index));
    el.scrollTo({ left: i * step(), behavior: "smooth" });
  }

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / step()));
  }

  return (
    <section
      id="reference"
      className="relative isolate scroll-mt-[8.5rem] overflow-hidden bg-mist-50"
    >
      <CircuitCorner className="pointer-events-none absolute right-0 top-0 -z-10 w-[46%] max-w-[600px] text-navy-700" />
      <Container className="py-20 lg:py-[7.5rem]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            lead={t("lead")}
          />
          <div className="hidden shrink-0 gap-3 md:flex">
            <button
              type="button"
              aria-label="←"
              onClick={() => scrollTo(active - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-graphite-900/15 text-graphite-900 transition-colors hover:border-electric-500 hover:bg-electric-500 hover:text-white"
            >
              <CaretLeft weight="bold" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="→"
              onClick={() => scrollTo(active + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-graphite-900/15 text-graphite-900 transition-colors hover:border-electric-500 hover:bg-electric-500 hover:text-white"
            >
              <CaretRight weight="bold" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              data-card
              key={item.name}
              className="flex w-[86%] shrink-0 snap-start flex-col rounded-[2rem] border border-graphite-900/10 bg-white p-8 sm:w-[58%] lg:w-[calc(33.333%-1rem)] lg:p-10"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} weight="fill" className="h-4 w-4 text-electric-500" />
                ))}
              </div>
              <p className="mt-6 flex-1 text-lg leading-relaxed text-graphite-900">
                {item.quote}
              </p>
              <div className="mt-7 flex items-center gap-4 border-t border-graphite-900/10 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-950 text-sm font-medium text-white">
                  {initials(item.name)}
                </span>
                <div>
                  <p className="font-medium text-graphite-900">{item.name}</p>
                  <p className="text-sm text-graphite-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === active}
              onClick={() => scrollTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-electric-500"
                  : "w-2.5 bg-graphite-900/20 hover:bg-graphite-900/40"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
