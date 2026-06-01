import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cs", "uk"],
  defaultLocale: "cs",
  // Czech (default) is served without a prefix ("/"), Ukrainian under "/uk".
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
