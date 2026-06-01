"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("locale");

  function switchTo(target: string) {
    if (target === locale) return;
    // pathname is locale-agnostic — keeps the user on the same page.
    router.replace(pathname, { locale: target });
  }

  return (
    <div
      role="group"
      aria-label={t("switchTo")}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-xs font-medium",
        tone === "light" ? "border-white/15" : "border-mist-300",
      )}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 uppercase tracking-wide transition-colors",
              active
                ? "bg-electric-500 text-white"
                : tone === "light"
                  ? "text-mist-200 hover:text-white"
                  : "text-graphite-500 hover:text-graphite-900",
            )}
          >
            {t(loc)}
          </button>
        );
      })}
    </div>
  );
}
