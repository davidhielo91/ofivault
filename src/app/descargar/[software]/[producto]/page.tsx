import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { ArchitectureInfo } from "@/components/architecture-info";
import { LanguageDownloadSelector } from "@/components/language-download-selector";
import { getCatalogEntry, getCatalogEntries, getInstallerLocale } from "@/lib/catalog";
import { formatProductName } from "@/lib/display";
import { getGuide } from "@/lib/guides";
import { defaultOgImage, siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ software: string; producto: string }>;
  searchParams: Promise<{ idioma?: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await getCatalogEntries();
  return entries.map((entry) => ({
    software: entry.softwareSlug,
    producto: entry.versionSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { software, producto } = await params;
  const entry = await getCatalogEntry(software, producto);

  if (!entry) return {};

  const productTitle = `${entry.software} ${formatProductName(entry.version)}`;
  const title = `Descargar ${productTitle}: instalador offline`;
  const hasConfirmedArchitectures = entry.software !== "Office 2013";
  const description = hasConfirmedArchitectures
    ? `Instalador offline de ${productTitle} en español y otros idiomas, con opciones de 32 y 64 bits.`
    : `Instalador offline de ${productTitle} en español y otros idiomas.`;
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
      images: [defaultOgImage],
    },
  };
}

export default async function DownloadPage({ params, searchParams }: PageProps) {
  const { software, producto } = await params;
  const { idioma } = await searchParams;
  const entry = await getCatalogEntry(software, producto);

  if (!entry) notFound();

  const productName = formatProductName(entry.version);
  const productTitle = `${entry.software} ${productName}`;
  const hasConfirmedArchitectures = entry.software !== "Office 2013";
  const allEntries = await getCatalogEntries();
  const relatedEntries = allEntries
    .filter((candidate) => candidate.software === entry.software && candidate.version !== entry.version)
    .slice(0, 4);
  const guideSlugs = entry.software === "Office 2024"
    ? entry.versionSlug === "office-proplus"
      ? ["office-2024-professional-plus", "como-instalar-office-2024", "requisitos-office-2024"]
      : ["como-instalar-office-2024", "requisitos-office-2024", "office-32-o-64-bits"]
    : ["instalador-offline-office", "office-32-o-64-bits", "como-instalar-archivo-img-office"];
  const productGuides = guideSlugs
    .map((guideSlug) => getGuide(guideSlug))
    .filter((guide) => guide !== undefined);
  const canonicalUrl = `${siteUrl}/descargar/${entry.softwareSlug}/${entry.versionSlug}`;
  const spanishInstaller = entry.installers.find(
    (installer) => installer.language.localeCompare("Español", "es", { sensitivity: "base" }) === 0,
  );
  const structuredData = [{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productTitle,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows",
    softwareVersion: entry.software,
    downloadUrl: (spanishInstaller ?? entry.installers[0]).url,
    inLanguage: entry.installers.map(getInstallerLocale),
    description: hasConfirmedArchitectures
      ? `Instalador offline de ${productTitle} con ${entry.installers.length} idiomas y opciones de 32 y 64 bits.`
      : `Instalador offline de ${productTitle} con ${entry.installers.length} idiomas disponibles.`,
    url: canonicalUrl,
  }, {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: entry.software, item: `${siteUrl}/descargar/${entry.softwareSlug}` },
      { "@type": "ListItem", position: 3, name: productName, item: canonicalUrl },
    ],
  }];

  return (
    <main id="contenido" className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/descargar/${entry.softwareSlug}`}>{entry.software}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{productName}</span>
      </nav>

      <section className="product-hero" aria-labelledby="product-title">
        <div>
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Instalador por idioma</p>
          <h1 id="product-title">Descargar {productTitle}</h1>
          <p>
            Elige un idioma para obtener el instalador offline de {productTitle}. La imagen IMG
            está disponible mediante el enlace mostrado para ese idioma.
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
          <h2 id="download-title">Elige el idioma de instalación</h2>
          <p className="panel-description">El botón de descarga se actualiza automáticamente al seleccionar un idioma. Descarga el archivo IMG correspondiente al producto elegido.</p>
        </div>
        <LanguageDownloadSelector
          installers={entry.installers}
          initialLanguage={idioma}
          productName={entry.software}
          productTitle={productTitle}
          productVersion={productName}
        />
      </section>

      {hasConfirmedArchitectures && <ArchitectureInfo />}

      <section className="product-guides" aria-labelledby="product-guides-title">
        <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Ayuda para instalar</p>
        <h2 id="product-guides-title">Resuelve las dudas antes de empezar</h2>
        <div className="guide-link-grid">
          {productGuides.map((guide) => (
            <Link key={guide.slug} href={`/guias/${guide.slug}`}>
              <span>{guide.shortTitle}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {relatedEntries.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <p className="eyebrow">También disponible</p>
          <h2 id="related-title">Más opciones de {entry.software}</h2>
          <div className="related-grid">
            {relatedEntries.map((related) => (
              <Link className="related-link" key={related.versionSlug} href={`/descargar/${related.softwareSlug}/${related.versionSlug}`}>
                <span>{formatProductName(related.version)}</span>
                <ExternalLink size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
