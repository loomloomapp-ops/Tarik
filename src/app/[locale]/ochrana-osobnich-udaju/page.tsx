import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, Warning } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title"), robots: { index: false, follow: true } };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const sections = t.raw("sections") as { h: string; p: string }[];

  return (
    <article className="bg-white">
      <Container className="max-w-3xl py-32 lg:py-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-graphite-500 transition-colors hover:text-graphite-900"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
          {t("back")}
        </Link>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-graphite-900">
          {t("title")}
        </h1>

        <p className="mt-5 inline-flex items-start gap-3 rounded-2xl border border-mist-200 bg-mist-50 px-4 py-3 text-sm text-graphite-700">
          <Warning weight="fill" className="mt-0.5 h-5 w-5 shrink-0 text-electric-500" />
          {t("draftNote")}
        </p>

        <div className="mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.h}>
              <h2 className="text-xl font-semibold text-graphite-900">
                {section.h}
              </h2>
              <p className="mt-3 leading-relaxed text-graphite-700">
                {section.p}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
