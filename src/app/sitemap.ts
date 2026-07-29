import type { MetadataRoute } from "next";
import { getCatalogEntries } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getCatalogEntries();

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...entries.map((entry) => ({
      url: `${siteUrl}/descargar/${entry.softwareSlug}/${entry.versionSlug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
