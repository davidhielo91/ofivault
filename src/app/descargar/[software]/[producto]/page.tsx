import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ExternalLink, ShieldCheck } from "lucide-react";
import { getCatalogEntry, getCatalogEntries } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ software: string; producto: string }>;
  searchParams: Promise<{ idioma?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { software, producto } = await params;
  const entry = await getCatalogEntry(software, producto);

  if (!entry) return {};

  const title = `Descargar ${entry.software} ${entry.version}`;
  const description = `Descargá ${entry.software} ${entry.version} en el idioma que necesitás. Enlaces verificados y directos desde el CDN oficial.`;
  const canonical = `/descargar/${entry.softwareSlug}/${entry.versionSlug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | OfiVault`,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function DownloadPage({ params, searchParams }: PageProps) {
  const { software, producto } = await params;
  const { idioma } = await searchParams;
  const entry = await getCatalogEntry(software, producto);

  if (!entry) notFound();

  const selectedInstaller = entry.installers.find((installer) => installer.language === idioma)
    ?? entry.installers[0];
  const allEntries = await getCatalogEntries();
  const relatedEntries = allEntries
    .filter((candidate) => candidate.software === entry.software && candidate.version !== entry.version)
    .slice(0, 4);
  const canonicalUrl = `${siteUrl}/descargar/${entry.softwareSlug}/${entry.versionSlug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${entry.software} ${entry.version}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows",
    description: `Página de descarga de ${entry.software} ${entry.version} con ${entry.installers.length} idiomas disponibles.`,
    url: canonicalUrl,
  };

  return (
    <main id="contenido" className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Catálogo</Link>
        <span aria-hidden="true">/</span>
        <span>{entry.software}</span>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{entry.version}</span>
      </nav>

      <section className="product-hero" aria-labelledby="product-title">
        <div>
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Enlace verificado</p>
          <h1 id="product-title">Descargar {entry.software} {entry.version}</h1>
          <p>
            Elegí un idioma para obtener el instalador de {entry.version}. El archivo se descarga
            directamente desde el CDN oficial.
          </p>
        </div>
        <dl className="product-stat">
          <dt>{entry.installers.length}</dt>
          <dd>idiomas disponibles</dd>
        </dl>
      </section>

      <section className="download-panel" aria-labelledby="download-title">
        <div>
          <p className="eyebrow">Paso 1</p>
          <h2 id="download-title">Elegí el idioma de instalación</h2>
          <p className="panel-description">El enlace se actualiza según la selección. Asegurate de contar con una licencia válida antes de instalar.</p>
        </div>
        <form className="language-form">
          <label htmlFor="idioma">Idioma</label>
          <select id="idioma" name="idioma" defaultValue={selectedInstaller.language}>
            {entry.installers.map((installer) => (
              <option key={installer.id} value={installer.language}>{installer.language}</option>
            ))}
          </select>
          <button type="submit">Actualizar enlace</button>
        </form>
        <div className="download-callout">
          <div>
            <p className="eyebrow">Paso 2</p>
            <p className="selected-language">{selectedInstaller.language}</p>
            <p>{entry.software} {entry.version}</p>
          </div>
          <a className="primary-download" href={selectedInstaller.url} target="_blank" rel="noreferrer">
            Descargar instalador <Download size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      {relatedEntries.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <p className="eyebrow">También disponible</p>
          <h2 id="related-title">Más opciones de {entry.software}</h2>
          <div className="related-grid">
            {relatedEntries.map((related) => (
              <Link className="related-link" key={related.versionSlug} href={`/descargar/${related.softwareSlug}/${related.versionSlug}`}>
                <span>{related.version}</span>
                <ExternalLink size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="license-note" aria-label="Aviso de licencia">
        <h2>Antes de descargar</h2>
        <p>OfiVault es un catálogo independiente. Microsoft y Office son marcas del grupo de empresas Microsoft. Usá el software únicamente con una licencia válida.</p>
      </section>
    </main>
  );
}
