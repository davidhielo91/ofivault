import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Layers3, ShieldCheck } from "lucide-react";
import { getCatalogCategories, getCatalogCategory } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ software: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { software } = await params;
  const category = await getCatalogCategory(software);

  if (!category) return {};

  const title = `Descargar ${category.software}: todas las ediciones`;
  const description = `Explorá todas las ediciones disponibles de ${category.software} y elegí el instalador que necesitás en español u otros idiomas.`;
  const canonical = `/descargar/${category.softwareSlug}`;

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

export default async function CategoryPage({ params }: PageProps) {
  const { software } = await params;
  const category = await getCatalogCategory(software);

  if (!category) notFound();

  const categories = await getCatalogCategories();
  const otherCategories = categories.filter(
    (candidate) => candidate.softwareSlug !== category.softwareSlug,
  );
  const languages = new Set(
    category.entries.flatMap((entry) => entry.installers.map((installer) => installer.language)),
  );
  const canonicalUrl = `${siteUrl}/descargar/${category.softwareSlug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Descargar ${category.software}`,
    description: `Ediciones e instaladores disponibles de ${category.software}.`,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: category.entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${entry.software} ${entry.version}`,
        url: `${canonicalUrl}/${entry.versionSlug}`,
      })),
    },
  };

  return (
    <main id="contenido" className="product-page category-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{category.software}</span>
      </nav>

      <section className="category-hero" aria-labelledby="category-title">
        <div>
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Catálogo verificado</p>
          <h1 id="category-title">Descargar {category.software}</h1>
          <p>
            Elegí la edición que necesitás. En la siguiente página podrás seleccionar español
            u otro idioma disponible y descargar el instalador correspondiente.
          </p>
        </div>
        <dl className="category-stats" aria-label={`Resumen de ${category.software}`}>
          <div><dt>{category.entries.length}</dt><dd>ediciones</dd></div>
          <div><dt>{languages.size}</dt><dd>idiomas</dd></div>
        </dl>
      </section>

      <section className="category-products" aria-labelledby="editions-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><Layers3 size={16} aria-hidden="true" /> Ediciones disponibles</p>
            <h2 id="editions-title">¿Cuál necesitás?</h2>
          </div>
        </div>
        <div className="edition-grid">
          {category.entries.map((entry) => (
            <article className="edition-card" key={entry.versionSlug}>
              <p>{entry.software}</p>
              <h3>{entry.version}</h3>
              <span>{entry.installers.length} idiomas disponibles</span>
              <Link href={`/descargar/${entry.softwareSlug}/${entry.versionSlug}`}>
                Ver descargas <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="other-categories" aria-labelledby="other-versions-title">
        <p className="eyebrow">Otras versiones</p>
        <h2 id="other-versions-title">Explorá otra versión de Office</h2>
        <div>
          {otherCategories.map((candidate) => (
            <Link key={candidate.softwareSlug} href={`/descargar/${candidate.softwareSlug}`}>
              {candidate.software}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
