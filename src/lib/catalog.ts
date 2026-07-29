import "server-only";

export type Installer = {
  id: string;
  software: string;
  version: string;
  language: string;
  url: string;
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
