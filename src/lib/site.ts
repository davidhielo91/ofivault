export const siteUrl = "https://ofivault.de";
export const telegramLicenseUsername = "rootkit_spoofer";

export function getLicenseContactUrl(productTitle?: string, selectedLanguage?: string) {
  const draft = [
    productTitle ? `Hola, tengo una consulta sobre licencias para ${productTitle}.` : "Hola, tengo una consulta sobre licencias.",
    selectedLanguage ? `Idioma del instalador seleccionado: ${selectedLanguage}.` : undefined,
  ].filter(Boolean).join(" ");

  return `https://t.me/${telegramLicenseUsername}?text=${encodeURIComponent(draft)}`;
}
