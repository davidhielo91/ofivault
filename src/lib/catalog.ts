import "server-only";
import { toSlug } from "@/lib/slug";

export type Installer = {
  id: string;
  software: string;
  version: string;
  language: string;
  url: string;
};

export type CatalogEntry = {
  software: string;
  softwareSlug: string;
  version: string;
  versionSlug: string;
  installers: Installer[];
};

export type CatalogCategory = {
  software: string;
  softwareSlug: string;
  entries: CatalogEntry[];
};

type AirtableResponse = {
  records: Array<{
    id: string;
    fields: {
      Software?: string;
      "Versión"?: string;
      Idioma?: string;
      Enlace?: string;
    };
  }>;
  offset?: string;
};

const baseId = process.env.AIRTABLE_BASE_ID ?? "appIix15QoC2lLNM6";
const tableId = process.env.AIRTABLE_TABLE_ID ?? "tblmcaYIOgs70S4TD";

export async function getInstallers(): Promise<Installer[]> {
  const token = process.env.AIRTABLE_TOKEN;

  if (!token) {
    return [];
  }

  const installers: Installer[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudo leer el catálogo de instaladores.");
    }

    const page = (await response.json()) as AirtableResponse;
    for (const record of page.records) {
      const { Software, "Versión": version, Idioma, Enlace } = record.fields;
      if (Software && version && Idioma && Enlace) {
        installers.push({
          id: record.id,
          software: Software,
          version,
          language: Idioma,
          url: Enlace,
        });
      }
    }

    offset = page.offset;
  } while (offset);

  return installers.sort((a, b) =>
    `${a.software}-${a.version}-${a.language}`.localeCompare(
      `${b.software}-${b.version}-${b.language}`,
      "es",
    ),
  );
}

export async function getCatalogEntries(): Promise<CatalogEntry[]> {
  const installers = await getInstallers();
  const entries = new Map<string, CatalogEntry>();

  for (const installer of installers) {
    const softwareSlug = toSlug(installer.software);
    const versionSlug = toSlug(installer.version);
    const key = `${softwareSlug}/${versionSlug}`;
    const entry = entries.get(key);

    if (entry) {
      entry.installers.push(installer);
    } else {
      entries.set(key, {
        software: installer.software,
        softwareSlug,
        version: installer.version,
        versionSlug,
        installers: [installer],
      });
    }
  }

  return [...entries.values()].sort((a, b) =>
    `${a.software}-${a.version}`.localeCompare(`${b.software}-${b.version}`, "es"),
  );
}

export async function getCatalogEntry(softwareSlug: string, versionSlug: string) {
  const entries = await getCatalogEntries();
  return entries.find(
    (entry) => entry.softwareSlug === softwareSlug && entry.versionSlug === versionSlug,
  );
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const entries = await getCatalogEntries();
  const categories = new Map<string, CatalogCategory>();

  for (const entry of entries) {
    const category = categories.get(entry.softwareSlug);

    if (category) {
      category.entries.push(entry);
    } else {
      categories.set(entry.softwareSlug, {
        software: entry.software,
        softwareSlug: entry.softwareSlug,
        entries: [entry],
      });
    }
  }

  return [...categories.values()].sort((a, b) =>
    a.software.localeCompare(b.software, "es"),
  );
}

export async function getCatalogCategory(softwareSlug: string) {
  const categories = await getCatalogCategories();
  return categories.find((category) => category.softwareSlug === softwareSlug);
}
