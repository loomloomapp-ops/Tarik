// Single source of truth for the public site URL. Change once here (or via
// NEXT_PUBLIC_SITE_URL) and canonical / Open Graph / sitemap follow.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://tarikinvest.cz";

export const OG_IMAGE = "/og-image.jpg"; // placeholder asset in /public
