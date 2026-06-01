"use client";

import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { usePopup } from "./PopupProvider";

// Floating widget, desktop only. Appears after the user scrolls past the hero —
// noticeable but not aggressive. Opens the popup lead form.
export function DesktopWidget() {
  const { open } = usePopup();
  const t = useTranslations("widget");
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.16 && v < 0.96);
  });

  return (
    <div className="pointer-events-none fixed bottom-7 right-7 z-50 hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={open}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="group pointer-events-auto flex items-center gap-3 rounded-full bg-navy-900 py-3 pl-3 pr-5 text-white shadow-soft ring-1 ring-white/10 transition-colors hover:bg-navy-800"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-500">
              <ChatCircleText weight="bold" className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">{t("label")}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
