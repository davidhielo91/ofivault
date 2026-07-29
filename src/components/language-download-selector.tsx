"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { Installer } from "@/lib/catalog";

type LanguageDownloadSelectorProps = {
  installers: Installer[];
  initialLanguage?: string;
  software: string;
  version: string;
};

export function LanguageDownloadSelector({
  installers,
  initialLanguage,
  software,
  version,
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
            <option key={installer.id} value={installer.id}>{installer.language}</option>
          ))}
        </select>
      </div>
      <div className="download-callout">
        <div aria-live="polite" aria-atomic="true">
          <p className="eyebrow">Listo para descargar</p>
          <p className="selected-language">{selectedInstaller.language}</p>
          <p>{software} {version}</p>
        </div>
        <a
          className="primary-download"
          href={selectedInstaller.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Descargar ${software} ${version} en ${selectedInstaller.language}`}
        >
          Descargar en {selectedInstaller.language} <Download size={18} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
