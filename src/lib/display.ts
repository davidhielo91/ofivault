export function formatProductName(version: string) {
  return version.replace(/^Office\s+/i, "");
}

export function formatLanguageName(language: string) {
  if (language === "Português") return "Portugués";
  if (language === "Português (Portugal)") return "Portugués (Portugal)";
  return language;
}

export function getDownloadDetails(downloadUrl: string) {
  try {
    const url = new URL(downloadUrl);
    const encodedFileName = url.pathname.split("/").filter(Boolean).at(-1);
    const fileName = encodedFileName ? decodeURIComponent(encodedFileName) : "Instalador de Office";
    const extension = fileName.match(/\.[^.]+$/)?.[0].toUpperCase() ?? "Archivo";

    return { fileName, format: extension, source: url.hostname };
  } catch {
    return { fileName: "Instalador de Office", format: "Archivo", source: "Microsoft" };
  }
}
