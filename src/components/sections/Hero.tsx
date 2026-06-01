import { useTranslations } from "next-intl";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CONTACT_ANCHOR } from "@/components/layout/nav";

export function Hero() {
  const t = useTranslations("hero");
  const trust = t.raw("trust") as string[];

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      {/* Full-screen background video with the template's dual-gradient wash.
          public/hero.{mp4,webm} is a placeholder clip — swap for real footage. */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-grid-navy opacity-40" />
        <div className="absolute -left-40 top-1/4 h-[36rem] w-[36rem] glow-electric opacity-50" />
        {/* Stronger bottom wash so the headline and trust bar stay legible */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
      </div>

      <Container className="flex min-h-[100dvh] flex-col justify-end pb-16 pt-40 lg:pb-24">
        <div className="max-w-6xl">
          <Reveal>
            <Eyebrow tone="light">{t("badge")}</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-8 text-[clamp(2.3rem,4.8vw,4.25rem)] font-medium leading-[1.06] tracking-[-0.04em] md:whitespace-nowrap">
              {t("h1")
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[62rem] text-base leading-relaxed text-mist-200 sm:text-lg">
              {t("subtitle")
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={`#${CONTACT_ANCHOR}`}
                size="lg"
                variant="light"
                className="w-full justify-between sm:w-60"
              >
                {t("ctaPrimary")}
              </Button>
              <Button
                href="#services"
                size="lg"
                variant="secondary"
                className="w-full justify-between sm:w-60"
              >
                {t("ctaSecondary")}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.26}>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md md:grid-cols-4">
            {trust.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-navy-950/70 px-5 py-5"
              >
                <CheckCircle
                  weight="fill"
                  className="h-5 w-5 shrink-0 text-electric-400"
                />
                <span className="text-sm font-medium leading-tight text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mt-7 text-xs uppercase tracking-[0.18em] text-mist-300">
            {t("credibility")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
