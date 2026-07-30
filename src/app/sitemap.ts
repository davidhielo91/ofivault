import type { MetadataRoute } from "next";
import { getCatalogCategories } from "@/lib/catalog";
import { guides } from "@/lib/guides";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCatalogCategories();
  const entries = categories.flatMap((category) => category.entries);

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/guias`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/sobre-ofivault`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/privacidad`, changeFrequency: "yearly", priority: 0.4 },
    ...guides.map((guide) => ({
      url: `${siteUrl}/guias/${guide.slug}`,
      lastModified: guide.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
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
