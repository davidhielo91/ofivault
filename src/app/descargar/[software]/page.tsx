import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CircleHelp, ExternalLink, Layers3, ShieldCheck } from "lucide-react";
import { getCatalogCategories, getCatalogCategory } from "@/lib/catalog";
import { formatProductName } from "@/lib/display";
import { getGuide } from "@/lib/guides";
import { office2024Faqs, office2024GuideSlugs } from "@/lib/office-2024";
import { defaultOgImage, siteUrl } from "@/lib/site";
import { getVersionContent } from "@/lib/version-content";

type PageProps = {
  params: Promise<{ software: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCatalogCategories();
  return categories.map((category) => ({ software: category.softwareSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { software } = await params;
  const category = await getCatalogCategory(software);

  if (!category) return {};

  const isOffice2024 = category.softwareSlug === "office-2024";
  const title = isOffice2024
    ? "Descargar Office 2024: ProPlus, Project y Visio"
    : `Descargar ${category.software}: instaladores por edición`;
  const description = isOffice2024
    ? "Descarga Office 2024 ProPlus, Project o Visio en español y otros idiomas. Imágenes IMG para Windows por edición e idioma."
    : `Explora los instaladores offline de ${category.software} por edición. Elige español u otro idioma y descarga la imagen IMG correspondiente.`;
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
      images: [defaultOgImage],
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
  const isOffice2024 = category.softwareSlug === "office-2024";
  const office2024Guides = office2024GuideSlugs
    .map((slug) => getGuide(slug))
    .filter((guide) => guide !== undefined);
  const content = getVersionContent(category.softwareSlug);
  const contentGuides = (content?.guideSlugs ?? [])
    .map((slug) => getGuide(slug))
    .filter((guide) => guide !== undefined);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Descargar ${category.software}`,
    description: `Ediciones e instaladores offline disponibles de ${category.software}.`,
    url: canonicalUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
        { "@type": "ListItem", position: 2, name: category.software, item: canonicalUrl },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: category.entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${entry.software} ${formatProductName(entry.version)}`,
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
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Catálogo por edición</p>
          <h1 id="category-title">Descargar {category.software}</h1>
          <p>
            {isOffice2024
              ? "Elige Office 2024 ProPlus, Project o Visio. Después podrás seleccionar español u otro idioma y descargar el archivo IMG correspondiente para Windows."
              : "Elige la edición que necesitas. En la siguiente página podrás seleccionar español u otro idioma y descargar el instalador offline correspondiente."}
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
            <h2 id="editions-title">¿Cuál necesitas?</h2>
          </div>
        </div>
        <div className="edition-grid">
          {category.entries.map((entry) => (
            <article className="edition-card" key={entry.versionSlug}>
              <p>{entry.software}</p>
              <h3>{formatProductName(entry.version)}</h3>
              <span>{entry.installers.length} idiomas disponibles</span>
              <Link href={`/descargar/${entry.softwareSlug}/${entry.versionSlug}`}>
                Ver descargas <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {isOffice2024 && (
        <>
          <section className="office-2024-help" aria-labelledby="office-2024-help-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Antes de descargar</p>
                <h2 id="office-2024-help-title">Prepara la instalación de Office 2024</h2>
              </div>
              <Link href="/guias">Ver todas las guías <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <dl className="office-2024-facts" aria-label="Datos clave de las descargas de Office 2024">
              <div><dt>Plataforma</dt><dd>Windows</dd></div>
              <div><dt>Formato</dt><dd>Archivo IMG</dd></div>
              <div><dt>Arquitecturas</dt><dd>32 y 64 bits</dd></div>
              <div><dt>Formato de uso</dt><dd>Instalador</dd></div>
            </dl>
            <div className="guide-link-grid office-2024-guide-links">
              {office2024Guides.map((guide) => (
                <Link key={guide.slug} href={`/guias/${guide.slug}`}>
                  <span><strong>{guide.shortTitle}</strong><small>{guide.description}</small></span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <section className="category-faq" aria-labelledby="office-2024-faq-title">
            <div className="category-faq-heading">
              <p className="eyebrow"><CircleHelp size={16} aria-hidden="true" /> Preguntas frecuentes</p>
              <h2 id="office-2024-faq-title">Dudas sobre Office 2024</h2>
              <p>Respuestas breves sobre requisitos, ediciones, activación e instalación antes de iniciar la descarga.</p>
            </div>
            <div className="category-faq-list">
              {office2024Faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <div>
                    <p>{item.answer}</p>
                    {item.guideSlug && item.guideLabel && (
                      <Link href={`/guias/${item.guideSlug}`}>
                        {item.guideLabel} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
            <a
              className="guide-source"
              href="https://support.microsoft.com/es-es/office/lifecycle/office-2024-and-office-ltsc-2024-faq"
              target="_blank"
              rel="noreferrer"
            >
              Consultar las preguntas frecuentes de Microsoft <ExternalLink size={16} aria-hidden="true" />
            </a>
          </section>
        </>
      )}

      {content && (
        <>
          <section className="office-2024-help" aria-labelledby="version-help-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Antes de descargar</p>
                <h2 id="version-help-title">Prepara la instalación de {category.software}</h2>
              </div>
              <Link href="/guias">Ver todas las guías <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <div className="version-summary">
              {content.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <dl className="office-2024-facts" aria-label={`Datos clave de las descargas de ${category.software}`}>
              {content.facts.map((fact) => (
                <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
              ))}
            </dl>
            <div className="guide-link-grid office-2024-guide-links">
              {contentGuides.map((guide) => (
                <Link key={guide.slug} href={`/guias/${guide.slug}`}>
                  <span><strong>{guide.shortTitle}</strong><small>{guide.description}</small></span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <section className="category-faq" aria-labelledby="version-faq-title">
            <div className="category-faq-heading">
              <p className="eyebrow"><CircleHelp size={16} aria-hidden="true" /> Preguntas frecuentes</p>
              <h2 id="version-faq-title">Dudas sobre {category.software}</h2>
              <p>Respuestas breves sobre soporte, ediciones, compatibilidad e instalación antes de iniciar la descarga.</p>
            </div>
            <div className="category-faq-list">
              {content.faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <div>
                    <p>{item.answer}</p>
                    {item.guideSlug && item.guideLabel && (
                      <Link href={`/guias/${item.guideSlug}`}>
                        {item.guideLabel} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
            <a className="guide-source" href={content.source.url} target="_blank" rel="noreferrer">
              Consultar: {content.source.label} <ExternalLink size={16} aria-hidden="true" />
            </a>
          </section>
        </>
      )}

      <section className="other-categories" aria-labelledby="other-versions-title">
        <p className="eyebrow">Otras versiones</p>
        <h2 id="other-versions-title">Explora otra versión de Office</h2>
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
