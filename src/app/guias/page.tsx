import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { guides } from "@/lib/guides";
import { defaultOgImage, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guías de Office 2024, instalación y compatibilidad",
  description: "Guías en español sobre Office 2024, requisitos, ediciones, instalación offline, archivos IMG y arquitectura de 32 o 64 bits.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guías de Office 2024 e instalación | OfiVault",
    description: "Resuelve dudas sobre Office 2024, instaladores offline, archivos IMG, licencias y arquitecturas.",
    url: "/guias",
    type: "website",
    images: [defaultOgImage],
  },
};

export default function GuidesPage() {
  const guideGroups = (["Office 2024", "Instalación"] as const).map((category) => ({
    category,
    guides: guides.filter((guide) => guide.category === category),
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guías de Office 2024, instalación y compatibilidad",
    description: metadata.description,
    url: `${siteUrl}/guias`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `${siteUrl}/guias/${guide.slug}`,
      })),
    },
  };

  return (
    <main id="contenido" className="product-page guides-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Guías</span>
      </nav>

      <section className="guide-index-hero" aria-labelledby="guides-title">
        <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Centro de ayuda</p>
        <h1 id="guides-title">Entiende Office antes de instalarlo.</h1>
        <p>
          Respuestas directas sobre Office 2024, requisitos, ediciones, instaladores offline y arquitectura,
          sin confundir la descarga con la activación.
        </p>
      </section>

      {guideGroups.map((group) => {
        const groupId = group.category === "Office 2024" ? "guides-office-2024" : "guides-installation";
        return (
          <section className="guide-group" aria-labelledby={groupId} key={group.category}>
            <div className="guide-group-heading">
              <p className="eyebrow">{group.category === "Office 2024" ? "Guías destacadas" : "Ayuda práctica"}</p>
              <h2 id={groupId}>{group.category}</h2>
            </div>
            <div className="guide-index-grid">
              {group.guides.map((guide) => (
                <article className="guide-card" key={guide.slug}>
                  <ShieldCheck size={21} aria-hidden="true" />
                  <p className="eyebrow">{guide.eyebrow}</p>
                  <h3>{guide.shortTitle}</h3>
                  <p>{guide.description}</p>
                  <Link href={`/guias/${guide.slug}`}>
                    Leer la guía <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="guide-trust-note" aria-labelledby="guide-trust-title">
        <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Transparencia</p>
          <h2 id="guide-trust-title">¿Cómo se organiza el catálogo?</h2>
        <p>
          OfiVault es un catálogo independiente. Consulta los criterios de organización y los límites de la información mostrada.
        </p>
          <Link href="/sobre-ofivault">Conocer los criterios del catálogo <ArrowRight size={17} aria-hidden="true" /></Link>
      </section>

    </main>
  );
}
