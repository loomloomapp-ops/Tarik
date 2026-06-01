"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { navItems, CONTACT_ANCHOR } from "./nav";
import { Button } from "@/components/ui/Button";

export function Header() {
  const t = useTranslations("nav");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    setScrolled(y > 8);
    if (menuOpen) {
      lastY.current = y;
      return;
    }
    if (delta > 4 && y > 140) setHidden(true);
    else if (delta < -4) setHidden(false);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setHidden(false), 600);
    lastY.current = y;
  });

  const solid = scrolled || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden && !menuOpen ? "-110%" : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-colors duration-300 ${
            solid
              ? "border-b border-mist-200/80 bg-mist-50/90 backdrop-blur-lg"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-24 max-w-[2200px] items-center justify-between gap-6 px-6 sm:px-10 lg:h-32 lg:px-[90px]">
            <div className="flex items-center gap-6 lg:gap-10">
              <Logo tone={solid ? "dark" : "light"} />

              <nav className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`rounded-full px-3.5 py-2 text-base font-medium transition-colors ${
                      solid
                        ? "text-graphite-700 hover:bg-mist-100 hover:text-graphite-900"
                        : "text-mist-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {t(item.key)}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <LanguageSwitcher tone={solid ? "dark" : "light"} />
              </div>

              <Button
                href={`#${CONTACT_ANCHOR}`}
                variant={solid ? "primary" : "light"}
                className="hidden sm:inline-flex"
              >
                {t("cta")}
              </Button>

              {/* Burger */}
              <button
                type="button"
                aria-label={menuOpen ? t("close") : t("menu")}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border md:hidden ${
                  solid ? "border-mist-300" : "border-white/25"
                }`}
              >
                <span className="sr-only">{menuOpen ? t("close") : t("menu")}</span>
                <span className="relative block h-2.5 w-5">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full ${
                      solid ? "bg-graphite-900" : "bg-white"
                    }`}
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute bottom-0 left-0 block h-0.5 w-5 rounded-full ${
                      solid ? "bg-graphite-900" : "bg-white"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
