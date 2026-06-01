import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CircuitCorner } from "@/components/ui/Decor";
import { projectMedia } from "@/content/media";
import { CONTACT_ANCHOR } from "@/components/layout/nav";

type ProjectItem = {
  title: string;
  type: string;
  location: string;
  category: string;
  scope: string;
  description: string;
  imageAlt: string;
};

export function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as ProjectItem[];
  const labels = t.raw("labels") as Record<string, string>;

  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-[8.5rem] bg-navy-900 text-white lg:overflow-hidden"
    >
      <CircuitCorner opacity={0.13} className="pointer-events-none absolute right-0 top-0 -z-10 w-[46%] max-w-[600px] text-white" />

      <Container className="py-20 lg:py-[7.5rem]">
        <SectionHeading
          tone="light"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />

        <div className="mt-14 flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-x-7 lg:gap-y-12">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 2) * 0.08}
              className="group sticky top-24 rounded-[2rem] bg-navy-950 p-3 lg:static lg:top-auto lg:rounded-none lg:bg-transparent lg:p-0"
            >
              {/* Clean rounded media card (consistent with the rest of the site) */}
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-white/10">
                <Image
                  src={projectMedia[i]?.src ?? ""}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 [filter:grayscale(0.15)_contrast(1.05)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-navy-950/80 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                  {item.type}
                </span>
                <a
                  href={`#${CONTACT_ANCHOR}`}
                  aria-label={item.title}
                  className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-950 shadow-lg transition-all duration-300 hover:bg-electric-500 hover:text-white"
                >
                  <ArrowUpRight
                    weight="bold"
                    className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45"
                  />
                </a>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-medium tracking-tight text-white">
                    {item.title}
                  </h3>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-mist-200">
                    <MapPin weight="fill" className="h-4 w-4 text-electric-400" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Meta below the card */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-200">
                {item.description}
              </p>
              <dl className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-electric-400">
                    {labels.category}
                  </dt>
                  <dd className="mt-1 text-sm text-white">{item.category}</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-electric-400">
                    {labels.scope}
                  </dt>
                  <dd className="mt-1 text-sm text-mist-200">{item.scope}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
