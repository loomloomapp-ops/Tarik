import { useTranslations } from "next-intl";
import { PhoneCall, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { company } from "@/content/company";

export function LeadFormSection() {
  const t = useTranslations("leadForm");

  return (
    <section id="kontakt" className="scroll-mt-[8.5rem] bg-mist-50">
      <Container className="py-20 lg:py-[7.5rem]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Intro + direct contact */}
          <div>
            <Reveal>
              <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] text-graphite-900">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite-500">
                {t("lead")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-9 space-y-4">
                <li>
                  <a
                    href={`tel:${company.phoneHref}`}
                    className="group inline-flex items-center gap-4 text-graphite-900"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-electric-600 shadow-[var(--shadow-card)] transition-colors group-hover:bg-electric-500 group-hover:text-white">
                      <PhoneCall weight="bold" className="h-5 w-5" />
                    </span>
                    <span className="text-lg">{company.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="group inline-flex items-center gap-4 text-graphite-900"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-electric-600 shadow-[var(--shadow-card)] transition-colors group-hover:bg-electric-500 group-hover:text-white">
                      <EnvelopeSimple weight="bold" className="h-5 w-5" />
                    </span>
                    {company.email}
                  </a>
                </li>
                <li className="flex items-center gap-4 text-graphite-700">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-electric-600 shadow-[var(--shadow-card)]">
                    <MapPin weight="bold" className="h-5 w-5" />
                  </span>
                  <span>
                    {company.street}, {company.zip} {company.city}
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form card */}
          <Reveal
            delay={0.1}
            className="rounded-[2rem] border border-mist-200 bg-white p-6 shadow-soft sm:p-9"
          >
            <LeadForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
