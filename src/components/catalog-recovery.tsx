"use client";

import { RefreshCw } from "lucide-react";

type CatalogRecoveryProps = {
  compact?: boolean;
  reset: () => void;
};

export function CatalogRecovery({ compact = false, reset }: CatalogRecoveryProps) {
  return (
    <main id="contenido" className={`catalog-recovery${compact ? " catalog-recovery-compact" : ""}`}>
      <section className="catalog-recovery-card" aria-labelledby="catalog-recovery-title">
        <p className="eyebrow">Catálogo no disponible</p>
        <h1 id="catalog-recovery-title">No se pudo cargar el catálogo.</h1>
        <p>Vuelve a intentarlo para recuperar las versiones e idiomas disponibles.</p>
        <button type="button" onClick={reset}>
          Reintentar <RefreshCw size={17} aria-hidden="true" />
        </button>
      </section>
    </main>
  );
}
