"use client";

import { useTranslations } from "next-intl";
import { ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { usePopup } from "./PopupProvider";
import { company } from "@/content/company";

// Fixed bottom CTA on mobile only. Opens the popup lead form.
export function StickyMobileCta() {
  const { open } = usePopup();
  const t = useTranslations("widget");
  const tn = useTranslations("nav");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-mist-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <a
        href={`tel:${company.phoneHref}`}
        aria-label={tn("callUs")}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-mist-300 text-navy-900 transition-colors active:scale-95"
      >
        <ChatCircleText weight="bold" className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={open}
        className="flex h-12 flex-1 items-center justify-center rounded-full bg-electric-500 text-sm font-medium text-white transition-transform active:scale-[0.98]"
      >
        {t("mobileCta")}
      </button>
    </div>
  );
}
