export const googleAnalyticsId = "G-1889M26C3V";
export const koFiUrl = "https://ko-fi.com/hielocode";
export const analyticsConsentStorageKey = "ofivault-analytics-consent";
export const analyticsConsentChangeEvent = "ofivault-consent-change";

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

type LicenseCtaEvent = {
  eventName: "license_cta_view" | "license_cta_click";
  pagePath: string;
  placement: "global_navigation" | "product_detail";
  destinationHost: string;
  productName?: string;
  productVersion?: string;
  selectedLanguage?: string;
};

function hasAnalyticsConsent() {
  return window.localStorage.getItem(analyticsConsentStorageKey) === "accepted";
}

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

export function trackLicenseCta(event: LicenseCtaEvent) {
  if (!hasAnalyticsConsent() || !window.gtag) return false;

  window.gtag("event", event.eventName, {
    page_path: event.pagePath,
    cta_placement: event.placement,
    destination_host: event.destinationHost,
    ...(event.productName && { product_name: event.productName }),
    ...(event.productVersion && { product_version: event.productVersion }),
    ...(event.selectedLanguage && { installer_language: event.selectedLanguage }),
  });

  return true;
}
