"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  PhoneCall,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, CONTACT_ANCHOR } from "./nav";
import { company } from "@/content/company";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

const socials = [
  { href: company.social.facebook, Icon: FacebookLogo, label: "Facebook" },
  { href: company.social.instagram, Icon: InstagramLogo, label: "Instagram" },
  { href: company.social.linkedin, Icon: LinkedinLogo, label: "LinkedIn" },
];

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 bg-navy-950/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex h-[100dvh] flex-col px-6 pb-8 pt-24">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.05,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={`/#${item.id}`}
                    onClick={onClose}
                    className="block border-b border-white/10 py-4 text-2xl font-medium text-white transition-colors hover:text-electric-400"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-6">
              <div className="flex flex-col gap-3 text-mist-200">
                <a
                  href={`tel:${company.phoneHref}`}
                  className="inline-flex items-center gap-3 hover:text-white"
                >
                  <PhoneCall weight="bold" className="h-5 w-5 text-electric-400" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-3 hover:text-white"
                >
                  <EnvelopeSimple
                    weight="bold"
                    className="h-5 w-5 text-electric-400"
                  />
                  {company.email}
                </a>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  {socials.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                    >
                      <Icon weight="fill" className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                <LanguageSwitcher tone="light" />
              </div>

              <Button
                href={`/#${CONTACT_ANCHOR}`}
                onClick={onClose}
                size="lg"
                className="w-full justify-between"
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
