import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Inter_Tight } from "next/font/google";
import { routing } from "@/i18n/routing";

// Template font (1:1). Cyrillic subsets included for the Ukrainian locale.
const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});
import { SITE_URL, OG_IMAGE } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { PopupProvider } from "@/components/conversion/PopupProvider";
import { LeadPopup } from "@/components/conversion/LeadPopup";
import { StickyMobileCta } from "@/components/conversion/StickyMobileCta";
import { DesktopWidget } from "@/components/conversion/DesktopWidget";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        cs: "/",
        uk: "/uk",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: "TARIK Invest s.r.o.",
      locale: locale === "cs" ? "cs_CZ" : "uk_UA",
      url: path,
      title: t("title"),
      description: t("description"),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={interTight.variable}>
      <body className="bg-mist-50">
        <Preloader />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PopupProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer locale={locale} />
            <StickyMobileCta />
            <DesktopWidget />
            <LeadPopup />
          </PopupProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
