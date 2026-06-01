// Locale-aware path to the privacy page. Czech (default) has no prefix.
export function privacyHref(locale: string): string {
  return locale === "cs"
    ? "/ochrana-osobnich-udaju"
    : `/${locale}/ochrana-osobnich-udaju`;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+]?[\d\s()\-/]{9,}$/;

export const validators = {
  email: (v: string) => emailRe.test(v),
  phone: (v: string) => phoneRe.test(v),
  name: (v: string) => v.trim().length >= 2,
};
