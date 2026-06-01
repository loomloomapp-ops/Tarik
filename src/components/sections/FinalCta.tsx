import { useTranslations } from "next-intl";
import { PhoneCall } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CircuitLines } from "@/components/ui/Decor";
import { company } from "@/content/company";
import { CONTACT_ANCHOR } from "@/components/layout/nav";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="bg-navy-950">
      <Container className="py-20 lg:py-28">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-electric-500 px-8 py-14 text-white lg:px-16 lg:py-20">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-navy-950/20 blur-3xl" />

          {/* Delicate niche-style circuit lines */}
          <CircuitLines className="pointer-events-none absolute inset-y-0 right-0 h-full w-[62%] text-white opacity-[0.16] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_55%)] [mask-image:linear-gradient(to_right,transparent,#000_55%)]" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
                {t("desc")}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                href={`#${CONTACT_ANCHOR}`}
                variant="light"
                size="lg"
                className="w-full justify-between sm:w-auto sm:justify-center"
              >
                {t("cta")}
              </Button>
              <a
                href={`tel:${company.phoneHref}`}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/40 px-7 py-4 text-base font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                <PhoneCall weight="bold" className="h-5 w-5" />
                {t("phoneLabel")}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
