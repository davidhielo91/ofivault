import type { MetadataRoute } from "next";
import { getCatalogCategories } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCatalogCategories();
  const entries = categories.flatMap((category) => category.entries);

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...categories.map((category) => ({
      url: `${siteUrl}/descargar/${category.softwareSlug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...entries.map((entry) => ({
      url: `${siteUrl}/descargar/${entry.softwareSlug}/${entry.versionSlug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
