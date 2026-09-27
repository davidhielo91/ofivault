import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { getGuide, guides } from "@/lib/guides";
import { defaultOgImage, siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ guia: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ guia: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { guia: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const canonical = `/guias/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title: `${guide.title} | OfiVault`,
      description: guide.description,
      url: canonical,
      type: "article",
      images: [defaultOgImage],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { guia: slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const canonicalUrl = `${siteUrl}/guias/${guide.slug}`;
  const relatedGuides = guide.relatedSlugs
    .map((relatedSlug) => getGuide(relatedSlug))
    .filter((relatedGuide) => relatedGuide !== undefined);
  const updatedLabel = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${guide.updatedAt}T00:00:00Z`));
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.updatedAt,
      dateModified: guide.updatedAt,
      inLanguage: "es",
      isAccessibleForFree: true,
      articleSection: guide.category,
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "OfiVault", url: siteUrl },
      publisher: { "@type": "Organization", name: "OfiVault", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Guías", item: `${siteUrl}/guias` },
        { "@type": "ListItem", position: 3, name: guide.shortTitle, item: canonicalUrl },
      ],
    },
  ];

  return (
    <main id="contenido" className="product-page guide-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/guias">Guías</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{guide.shortTitle}</span>
      </nav>

      <article>
        <header className="guide-hero">
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> {guide.eyebrow}</p>
          <h1>{guide.title}</h1>
          <p className="guide-intro">{guide.intro}</p>
          <p className="guide-answer">{guide.answer}</p>
          <p className="guide-updated"><time dateTime={guide.updatedAt}>Actualizada el {updatedLabel}</time></p>
        </header>

        <section className="guide-steps" aria-labelledby="steps-title">
          <p className="eyebrow">Ruta rápida</p>
          <h2 id="steps-title">Pasos recomendados</h2>
          <ol>
            {guide.steps.map((step) => (
              <li key={step.title}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <div className="guide-sections">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {"callout" in section && section.callout && (
                <aside className={`guide-callout guide-callout-${section.callout.tone}`}>
                  <AlertTriangle size={20} aria-hidden="true" />
                  <div><strong>{section.callout.title}</strong><p>{section.callout.text}</p></div>
                </aside>
              )}
              {"codeBlocks" in section && section.codeBlocks?.map((block) => (
                <div className="guide-code-block" key={block.code}>
                  {block.label && <p className="guide-code-label">{block.label}</p>}
                  <pre><code>{block.code}</code></pre>
                  {block.note && <p className="guide-code-note">{block.note}</p>}
                </div>
              ))}
            </section>
          ))}
        </div>

        <section className="guide-faq" aria-labelledby="questions-title">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="questions-title">Respuestas rápidas</h2>
          <div>
            {guide.questions.map((item) => (
              <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>
            ))}
          </div>
        </section>

        <div className="guide-sources">
          <p className="eyebrow">Fuentes oficiales</p>
          {[guide.officialSource, ...(guide.officialSources ?? [])].map((source) => (
            <a className="guide-source" href={source.url} key={source.url} target="_blank" rel="noreferrer">
              {source.label} <ExternalLink size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </article>

      <section className="related-section" aria-labelledby="related-guides-title">
        <p className="eyebrow">Continúa aprendiendo</p>
        <h2 id="related-guides-title">Guías relacionadas</h2>
        <div className="related-grid">
          {relatedGuides.map((relatedGuide) => (
            <Link className="related-link" key={relatedGuide.slug} href={`/guias/${relatedGuide.slug}`}>
              <span>{relatedGuide.shortTitle}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="guide-catalog-cta">
        <div>
          <p className="eyebrow">Siguiente paso</p>
          <h2>{guide.category === "Office 2024" ? "Explora las descargas de Office 2024" : "Encuentra tu instalador"}</h2>
        </div>
        <Link href={guide.category === "Office 2024" ? "/descargar/office-2024" : "/"}>
          {guide.category === "Office 2024" ? "Ver Office 2024" : "Buscar Office, Project o Visio"} <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
