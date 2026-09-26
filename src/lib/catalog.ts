import "server-only";
import catalogData from "@/data/installers.json";
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

const installers: Installer[] = catalogData.map((installer, index) => {
  let installerUrl: URL;

  try {
    installerUrl = new URL(installer.url);
  } catch {
    throw new Error(`URL inválida en catálogo local: ${index + 1}`);
  }

  if (
    !installer.id ||
    !installer.software ||
    !installer.version ||
    !installer.language ||
    installerUrl.protocol !== "https:" ||
    installerUrl.hostname !== "officecdn.microsoft.com" ||
    !installerUrl.pathname.toLowerCase().endsWith(".img")
  ) {
    throw new Error(`Registro inválido en catálogo local: ${index + 1}`);
  }

  return installer;
});

export async function getInstallers(): Promise<Installer[]> {
  return [...installers].sort((a, b) =>
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
