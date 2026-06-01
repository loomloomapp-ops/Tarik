import Image from "next/image";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  PhoneCall,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "./nav";
import { company } from "@/content/company";
import { privacyHref } from "@/lib/privacyHref";

const socials = [
  { href: company.social.facebook, Icon: FacebookLogo, label: "Facebook" },
  { href: company.social.instagram, Icon: InstagramLogo, label: "Instagram" },
  { href: company.social.linkedin, Icon: LinkedinLogo, label: "LinkedIn" },
];

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="bg-navy-950 text-mist-200">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 text-center lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:text-left">
          {/* Brand */}
          <div>
            <Link href="/" aria-label={company.name} className="inline-block">
              <Image
                src="/logo-ondark.png"
                alt={company.name}
                width={584}
                height={824}
                className="mx-auto h-40 w-auto lg:mx-0 lg:h-44"
              />
            </Link>
            <p className="mx-auto -mt-2 max-w-xs text-sm leading-relaxed text-mist-300 lg:mx-0">
              {t("tagline")}
            </p>
            <div className="mt-6 flex justify-center gap-3 lg:justify-start">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10"
                >
                  <Icon weight="fill" className="h-5 w-5" />
                </a>
              ))}
            </div>
            <dl className="mt-7 flex justify-center gap-8 font-mono text-xs text-mist-300 lg:justify-start">
              <div>
                <dt className="text-electric-400">IČO</dt>
                <dd className="mt-1 text-sm text-mist-100">{company.ico}</dd>
              </div>
              <div>
                <dt className="text-electric-400">DIČ</dt>
                <dd className="mt-1 text-sm text-mist-100">{company.dic}</dd>
              </div>
            </dl>
          </div>

          {/* Nav */}
          <nav aria-label={t("navTitle")}>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-electric-400">
              {t("navTitle")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className="text-mist-200 transition-colors hover:text-white"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + company */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-electric-400">
              {t("contactTitle")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start justify-center gap-3 lg:justify-start">
                <MapPin
                  weight="bold"
                  className="mt-0.5 h-4 w-4 shrink-0 text-electric-400"
                />
                <span>
                  {company.street}
                  <br />
                  {company.zip} {company.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-white"
                >
                  <PhoneCall weight="bold" className="h-4 w-4 text-electric-400" />
                  <span className="font-mono">{company.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-white"
                >
                  <EnvelopeSimple
                    weight="bold"
                    className="h-4 w-4 text-electric-400"
                  />
                  {company.email}
                </a>
              </li>
            </ul>
            <Link
              href={privacyHref(locale)}
              className="mt-5 inline-block text-sm text-mist-200 underline underline-offset-4 transition-colors hover:text-white"
            >
              {t("privacy")}
            </Link>
          </div>

          {/* Map */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-electric-400">
              {t("addressTitle")}
            </h2>
            <a
              href={company.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block overflow-hidden rounded-2xl border border-white/10"
            >
              <iframe
                src={company.mapsEmbed}
                title={company.mapsQuery}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-44 w-full grayscale"
              />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-left text-xs text-mist-300">
            © {company.name} — {t("rights")}
          </p>
          <LanguageSwitcher tone="light" />
        </div>
      </Container>
    </footer>
  );
}
