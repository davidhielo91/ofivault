"use client";

import { ExternalLink, KeyRound } from "lucide-react";
import { LicenseContactLink } from "@/components/license-contact-link";

type LicenseCtaProps = {
  productName: string;
  productTitle: string;
  productVersion: string;
  selectedLanguage?: string;
};

export function LicenseCta({ productName, productVersion, productTitle, selectedLanguage }: LicenseCtaProps) {
  return (
    <section className="license-cta" aria-labelledby="license-cta-title">
      <div className="license-cta-icon" aria-hidden="true">
        <KeyRound size={22} />
      </div>
      <div className="license-cta-content">
        <p className="eyebrow">Consulta sobre licencias</p>
        <h2 id="license-cta-title">¿Necesitas ayuda con una licencia?</h2>
        <p>
          La descarga del instalador sigue siendo el paso principal. Para consultas sobre licencias de {productTitle}, escribe por Telegram.
        </p>
        <p className="license-cta-disclosure">OfiVault no está afiliado a Microsoft.</p>
      </div>
      <LicenseContactLink
        className="license-cta-button"
        ariaLabel={`Consultar sobre licencias de ${productTitle} por Telegram (se abre en una pestaña nueva)`}
        placement="product_detail"
        productName={productName}
        productTitle={productTitle}
        productVersion={productVersion}
        selectedLanguage={selectedLanguage}
      >
        Consultar por Telegram <ExternalLink size={16} aria-hidden="true" />
      </LicenseContactLink>
    </section>
  );
}
