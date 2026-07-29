"use client";

import { useDeferredValue, useState } from "react";
import { ArrowUpRight, Download, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import type { Installer } from "@/lib/catalog";

type CatalogClientProps = {
  installers: Installer[];
};

const all = "Todos";

export function CatalogClient({ installers }: CatalogClientProps) {
  const [query, setQuery] = useState("");
  const [software, setSoftware] = useState(all);
  const [product, setProduct] = useState(all);
  const [language, setLanguage] = useState(all);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("es"));

  const softwareOptions = [...new Set(installers.map((installer) => installer.software))];
  const productOptions = [...new Set(installers.map((installer) => installer.version))];
  const languageOptions = [...new Set(installers.map((installer) => installer.language))];
  const visibleInstallers = installers.filter((installer) => {
    const matchesSearch = `${installer.software} ${installer.version} ${installer.language}`
      .toLocaleLowerCase("es")
      .includes(deferredQuery);
    return (
      matchesSearch &&
      (software === all || installer.software === software) &&
      (product === all || installer.version === product) &&
      (language === all || installer.language === language)
    );
  });

  const resetFilters = () => {
    setQuery("");
    setSoftware(all);
    setProduct(all);
    setLanguage(all);
  };

  return (
    <main id="contenido" className="catalog-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Catálogo independiente</p>
          <h1 id="hero-title">El instalador correcto, sin buscar a ciegas.</h1>
          <p className="hero-description">
            OfiVault reúne enlaces de instalación verificados por versión, producto e idioma.
            Elegí el que necesitás y descargalo desde el CDN oficial.
          </p>
          <dl className="metrics" aria-label="Resumen del catálogo">
            <div><dt>{installers.length}</dt><dd>instaladores</dd></div>
            <div><dt>{softwareOptions.length}</dt><dd>versiones</dd></div>
            <div><dt>{languageOptions.length}</dt><dd>idiomas</dd></div>
          </dl>
        </div>
        <aside className="hero-note" aria-label="Criterio de verificación">
          <div className="signal" aria-hidden="true"><Download size={28} /></div>
          <p className="note-label">Verificación</p>
          <p>Los enlaces publicados se validan contra el servidor de origen antes de entrar al catálogo.</p>
        </aside>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><SlidersHorizontal size={16} aria-hidden="true" /> Explorador</p>
            <h2 id="catalog-title">Encontrá tu instalador</h2>
          </div>
          <p className="result-count" aria-live="polite">{visibleInstallers.length} resultados</p>
        </div>

        <div className="filters" role="search">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Buscar instalador</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por versión, producto o idioma"
            />
          </label>
          <Filter label="Versión" value={software} options={softwareOptions} onChange={setSoftware} />
          <Filter label="Producto" value={product} options={productOptions} onChange={setProduct} />
          <Filter label="Idioma" value={language} options={languageOptions} onChange={setLanguage} />
          <button className="clear-button" type="button" onClick={resetFilters}>Limpiar</button>
        </div>

        {installers.length === 0 ? (
          <div className="empty-state">
            <h3>El catálogo no está disponible todavía.</h3>
            <p>Configurá la conexión segura con Airtable para mostrar los instaladores.</p>
          </div>
        ) : visibleInstallers.length === 0 ? (
          <div className="empty-state">
            <h3>No encontramos coincidencias.</h3>
            <p>Probá con otro idioma, producto o término de búsqueda.</p>
          </div>
        ) : (
          <div className="installer-grid">
            {visibleInstallers.map((installer) => (
              <article className="installer-card" key={installer.id}>
                <p className="installer-software">{installer.software}</p>
                <h3>{installer.version}</h3>
                <p className="installer-language">{installer.language}</p>
                <a className="download-link" href={installer.url} target="_blank" rel="noreferrer">
                  Descargar <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="site-footer">
        <p>OfiVault es un catálogo independiente. Microsoft y Office son marcas del grupo de empresas Microsoft.</p>
        <p>Descargá y usá software únicamente si contás con una licencia válida.</p>
      </footer>
    </main>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value={all}>{all}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
