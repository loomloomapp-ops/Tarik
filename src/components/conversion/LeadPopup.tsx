"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { usePopup } from "./PopupProvider";
import { PopupLeadForm } from "@/components/forms/PopupLeadForm";

export function LeadPopup() {
  const { isOpen, close } = usePopup();
  const t = useTranslations("popup");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Focus the first field for keyboard users.
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>("input:not([type='hidden']):not([aria-hidden='true'])")?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(id);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={t("close")}
            onClick={close}
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-soft sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-mist-200 text-graphite-700 transition-colors hover:bg-mist-50"
            >
              <X weight="bold" className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-semibold text-graphite-900">
              {t("title")}
            </h2>
            <p className="mt-1.5 mb-5 text-sm text-graphite-500">{t("desc")}</p>
            <PopupLeadForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
