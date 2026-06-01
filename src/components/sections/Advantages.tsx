import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  SealCheck,
  UsersThree,
  Receipt,
  Cpu,
  Check,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whyChooseImage } from "@/content/media";
import { company } from "@/content/company";
import { CONTACT_ANCHOR } from "@/components/layout/nav";

type Highlight = { title: string; desc: string };

const icons = [SealCheck, UsersThree, Receipt, Cpu];

export function Advantages() {
  const t = useTranslations("advantages");
  const tn = useTranslations("nav");
  const highlights = t.raw("highlights") as Highlight[];
  const points = t.raw("points") as string[];

  return (
    <section
      id="advantages"
      className="relative isolate scroll-mt-[8.5rem] overflow-hidden bg-navy-900 text-white"
    >
      <div className="absolute -left-32 bottom-0 -z-10 hidden h-[30rem] w-[30rem] glow-electric opacity-40 lg:block" />

      <Container className="py-20 lg:py-[7.5rem]">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-16 lg:gap-y-9">
          {/* Heading — first on mobile, top-right on desktop */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
            <Reveal>
              <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] text-white">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-200">
                {t("lead")}
              </p>
            </Reveal>
          </div>

          {/* Media with stat overlay — second on mobile, left column on desktop */}
          <Reveal className="relative order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">
              <Image
                src={whyChooseImage.src}
                alt={t("title")}
                width={1100}
                height={1300}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover [filter:grayscale(0.3)_contrast(1.05)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-navy-950/80 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-electric-400">
                  IČO {company.ico}
                </p>
                <p className="mt-1 text-sm text-mist-200">{company.city}</p>
              </div>
              <span className="rounded-full bg-electric-500 px-4 py-2 text-xs font-medium text-white">
                s.r.o.
              </span>
            </div>
          </Reveal>

          {/* Content — third on mobile, bottom-right on desktop */}
          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2">
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {highlights.map((item, i) => {
                const Icon = icons[i] ?? SealCheck;
                return (
                  <Reveal key={item.title} delay={(i % 2) * 0.07} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric-500/15 text-electric-400">
                      <Icon weight="duotone" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mist-200">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Supporting points — under the text block, above the CTA */}
            <Reveal delay={0.12}>
              <ul className="mt-9 flex flex-wrap gap-2.5 border-t border-white/10 pt-7">
                {points.map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-mist-200"
                  >
                    <Check weight="bold" className="h-4 w-4 text-electric-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <Button
                href={`#${CONTACT_ANCHOR}`}
                size="lg"
                variant="primary"
                className="mt-8 w-full justify-between lg:w-auto lg:justify-center"
              >
                {tn("cta")}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
