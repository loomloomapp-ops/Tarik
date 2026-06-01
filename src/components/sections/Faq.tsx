import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { CircuitCorner } from "@/components/ui/Decor";

type Item = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];

  return (
    <section
      id="faq"
      className="relative isolate scroll-mt-[8.5rem] overflow-hidden bg-mist-50"
    >
      <CircuitCorner className="pointer-events-none absolute bottom-0 left-0 -z-10 w-[40%] max-w-[480px] text-navy-700 [transform:scaleX(-1)]" />
      <Container className="py-20 lg:py-[7.5rem]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            lead={t("lead")}
          />
          <Reveal delay={0.1}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
