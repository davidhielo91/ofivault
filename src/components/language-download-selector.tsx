"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { trackInstallerDownload } from "@/lib/analytics";
import type { Installer } from "@/lib/catalog";
import { LicenseCta } from "@/components/license-cta";
import { formatLanguageName, getDownloadDetails } from "@/lib/display";

type LanguageDownloadSelectorProps = {
  installers: Installer[];
  initialLanguage?: string;
  productName: string;
  productTitle: string;
  productVersion: string;
};

export function LanguageDownloadSelector({
  installers,
  initialLanguage,
  productName,
  productTitle,
  productVersion,
}: LanguageDownloadSelectorProps) {
  const spanishInstaller = installers.find(
    (installer) => installer.language.localeCompare("Español", "es", { sensitivity: "base" }) === 0,
  );
  const initialInstaller = installers.find((installer) => installer.language === initialLanguage)
    ?? spanishInstaller
    ?? installers[0];
  const [selectedId, setSelectedId] = useState(initialInstaller.id);
  const selectedInstaller = installers.find((installer) => installer.id === selectedId)
    ?? initialInstaller;
  const selectedLanguage = formatLanguageName(selectedInstaller.language);
  const downloadDetails = getDownloadDetails(selectedInstaller.url);

  function selectLanguage(installerId: string) {
    const installer = installers.find((candidate) => candidate.id === installerId);
    if (!installer) return;

    setSelectedId(installer.id);

    const url = new URL(window.location.href);
    if (installer === spanishInstaller) {
      url.searchParams.delete("idioma");
    } else {
      url.searchParams.set("idioma", installer.language);
    }
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <>
      <div className="language-form">
        <label htmlFor="idioma">Idioma</label>
        <select
          id="idioma"
          name="idioma"
          value={selectedInstaller.id}
          onChange={(event) => selectLanguage(event.target.value)}
        >
          {installers.map((installer) => (
            <option key={installer.id} value={installer.id}>{formatLanguageName(installer.language)}</option>
          ))}
        </select>
      </div>
      <div className="download-callout">
        <div aria-live="polite" aria-atomic="true">
          <p className="eyebrow">Listo para descargar</p>
          <p className="selected-language">{selectedLanguage}</p>
          <p>{productTitle}</p>
        </div>
        <a
          className="primary-download"
          href={selectedInstaller.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Descargar ${productTitle} en ${selectedLanguage}`}
          onClick={() => trackInstallerDownload({
            productTitle,
            language: selectedLanguage,
            fileName: downloadDetails.fileName,
            format: downloadDetails.format,
            source: downloadDetails.source,
            url: selectedInstaller.url,
          })}
        >
          Descargar en {selectedLanguage} <Download size={18} aria-hidden="true" />
        </a>
      </div>
      <dl className="download-details" aria-label="Detalles del archivo seleccionado">
        <div><dt>Archivo</dt><dd>{downloadDetails.fileName}</dd></div>
        <div><dt>Formato</dt><dd>{downloadDetails.format}</dd></div>
        <div><dt>Origen</dt><dd>{downloadDetails.source}</dd></div>
        <div><dt>Formato de uso</dt><dd>Instalador</dd></div>
      </dl>
      <LicenseCta
        productName={productName}
        productTitle={productTitle}
        productVersion={productVersion}
        selectedLanguage={selectedLanguage}
      />
    </>
  );
}
