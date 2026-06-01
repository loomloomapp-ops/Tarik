import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", uk: "/uk" },
    { path: "/ochrana-osobnich-udaju", uk: "/uk/ochrana-osobnich-udaju" },
  ];

  return routes.flatMap((r) => [
    {
      url: `${SITE_URL}${r.path}`,
      lastModified: new Date(),
      alternates: { languages: { cs: `${SITE_URL}${r.path}`, uk: `${SITE_URL}${r.uk}` } },
    },
    {
      url: `${SITE_URL}${r.uk}`,
      lastModified: new Date(),
    },
  ]);
}
