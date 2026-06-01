import { useTranslations } from "next-intl";
import { Plus } from "@phosphor-icons/react/dist/ssr";

// Localized keyword marquee under the hero (CS / UK). The stats block was removed.
export function TrustStrip() {
  const t = useTranslations("trust");
  const keywords = t.raw("marquee") as string[];
  const loop = [...keywords, ...keywords];

  return (
    <section className="border-y border-mist-200 bg-mist-50">
      <div className="marquee-mask overflow-hidden py-6">
        <div className="marquee-track">
          {loop.map((k, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-3 text-sm uppercase tracking-wider text-graphite-700"
            >
              <Plus weight="bold" className="h-3.5 w-3.5 text-electric-500" />
              {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
