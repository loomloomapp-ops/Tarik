import { useTranslations } from "next-intl";
import { Check, PhoneCall, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CareerForm } from "@/components/forms/CareerForm";
import { company } from "@/content/company";

export function Careers() {
  const t = useTranslations("careers");
  const ta = useTranslations("advantages");
  const perks = (ta.raw("points") as string[]).slice(0, 4);

  return (
    <section
      id="kariera"
      className="relative scroll-mt-[8.5rem] overflow-hidden bg-navy-950 text-white"
    >
      <div className="absolute inset-0 -z-10 bg-grid-navy opacity-40" />
      <div className="absolute -left-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-electric-600/20 blur-[120px]" />

      <Container className="py-20 lg:py-[7.5rem]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow tone="light">{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-4xl">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-mist-200">
                {t("lead")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {perks.map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center gap-2.5 text-sm text-mist-200"
                  >
                    <Check weight="bold" className="h-4 w-4 text-electric-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Direct contacts under the offer */}
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:gap-8">
                <a
                  href={`tel:${company.phoneHref}`}
                  className="group inline-flex items-center gap-3 text-white"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-electric-400 ring-1 ring-white/10 transition-colors group-hover:bg-electric-500 group-hover:text-white">
                    <PhoneCall weight="bold" className="h-5 w-5" />
                  </span>
                  <span className="text-base">{company.phone}</span>
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="group inline-flex items-center gap-3 text-white"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-electric-400 ring-1 ring-white/10 transition-colors group-hover:bg-electric-500 group-hover:text-white">
                    <EnvelopeSimple weight="bold" className="h-5 w-5" />
                  </span>
                  <span className="text-base">{company.email}</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.1}
            className="rounded-3xl border border-white/10 bg-white p-6 shadow-soft sm:p-9"
          >
            <CareerForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
