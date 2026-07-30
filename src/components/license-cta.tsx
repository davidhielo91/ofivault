import { ExternalLink, KeyRound } from "lucide-react";
import { licenseUrl } from "@/lib/site";

type LicenseCtaProps = {
  productName: string;
};

export function LicenseCta({ productName }: LicenseCtaProps) {
  return (
    <section className="license-cta" aria-labelledby="license-cta-title">
      <div className="license-cta-icon" aria-hidden="true">
        <KeyRound size={22} />
      </div>
      <div className="license-cta-content">
        <p className="eyebrow">Opción de activación</p>
        <h2 id="license-cta-title">¿Necesitas una licencia?</h2>
        <p>
          La descarga del instalador y la activación son procesos distintos. Si todavía no tienes una licencia válida para {productName}, consulta las opciones de compra disponibles.
        </p>
      </div>
      <a className="license-cta-button" href={licenseUrl} target="_blank" rel="noopener noreferrer">
        Ver opciones de licencia <ExternalLink size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
