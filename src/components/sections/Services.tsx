import {
  Check,
  Lightning,
  WifiHigh,
  Stack,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CircuitCorner } from "@/components/ui/Decor";
import { CONTACT_ANCHOR } from "@/components/layout/nav";

type ServiceItem = {
  key: string;
  title: string;
  tagline: string;
  intro: string;
  points: string[];
  directions: string[];
};

const ICONS = [Lightning, WifiHigh, Stack, MagnifyingGlass];

function ServiceCard({
  item,
  index,
  cta,
  directionsTitle,
}: {
  item: ServiceItem;
  index: number;
  cta: string;
  directionsTitle: string;
}) {
  const Icon = ICONS[index] ?? Lightning;
  return (
    <Reveal
      delay={(index % 2) * 0.05}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-graphite-900/10 bg-white p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 hover:border-electric-500/40 lg:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-electric-500/0 blur-3xl transition-colors duration-500 group-hover:bg-electric-500/10" />

      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 text-white transition-colors duration-500 group-hover:bg-electric-500">
          <Icon weight="duotone" className="h-5 w-5" />
        </span>
        <span className="text-sm text-graphite-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-7 text-2xl font-medium tracking-tight text-graphite-900">
        {item.title}
      </h3>
      <p className="mt-1 text-sm text-electric-600">{item.tagline}</p>
      <p className="mt-4 text-base leading-relaxed text-graphite-700">
        {item.intro}
      </p>

      {/* Included scope */}
      <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {item.points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2.5 text-[0.95rem] text-graphite-700 transition-colors hover:text-graphite-900"
          >
            <Check weight="bold" className="mt-1 h-4 w-4 shrink-0 text-electric-500" />
            {p}
          </li>
        ))}
      </ul>

      {/* Directions — chips */}
      <div className="mt-7 border-t border-graphite-900/10 pt-6">
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-graphite-500">
          {directionsTitle}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.directions.map((d) => (
            <span
              key={d}
              className="cursor-default rounded-full border border-graphite-900/10 bg-mist-50 px-3 py-1.5 text-xs text-graphite-700 transition-colors hover:border-electric-500/40 hover:bg-electric-500/5 hover:text-electric-600"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button
          href={`#${CONTACT_ANCHOR}`}
          variant="primary"
          size="lg"
          className="w-full justify-between"
        >
          {cta}
        </Button>
      </div>
    </Reveal>
  );
}

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const cta = t("cta");
  const directionsTitle = t("directionsTitle");

  return (
    <section
      id="services"
      className="relative isolate scroll-mt-[8.5rem] overflow-hidden bg-mist-100"
    >
      <CircuitCorner className="pointer-events-none absolute right-0 top-0 -z-10 w-[46%] max-w-[600px] text-navy-700" />
      <Container className="py-20 lg:py-[7.5rem]">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {items.map((item, i) => (
            <ServiceCard
              key={item.key}
              item={item}
              index={i}
              cta={cta}
              directionsTitle={directionsTitle}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
