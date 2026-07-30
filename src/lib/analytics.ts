export const googleAnalyticsId = "G-1889M26C3V";
export const koFiUrl = "https://ko-fi.com/hielocode";

type GtagParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters?: GtagParameters) => void;
  }
}

type InstallerDownloadEvent = {
  productTitle: string;
  language: string;
  fileName: string;
  format: string;
  source: string;
  url: string;
};

export function trackInstallerDownload(event: InstallerDownloadEvent) {
  window.gtag?.("event", "installer_download", {
    product_name: event.productTitle,
    installer_language: event.language,
    file_name: event.fileName,
    file_extension: event.format.replace(/^\./, "").toLowerCase(),
    source_host: event.source,
    link_url: event.url,
  });
}

export function trackSupportClick() {
  window.gtag?.("event", "support_click", {
    support_provider: "ko-fi",
    support_url: koFiUrl,
  });
}
