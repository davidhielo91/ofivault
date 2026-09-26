import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Languages, MousePointerClick, Search, ShieldCheck } from "lucide-react";
import { HomeSearch } from "@/components/home-search";
import { getCatalogCategories } from "@/lib/catalog";
import { formatProductName } from "@/lib/display";
import { getGuide } from "@/lib/guides";
import type { SearchDestination } from "@/lib/search";

export const metadata: Metadata = {
  title: "Descargar Office, Project y Visio por versión",
  description: "Encuentra el instalador offline de Office, Project o Visio que buscas. Busca por versión, edición e idioma y abre el enlace IMG correspondiente.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Descargar Office, Project y Visio por versión | OfiVault",
    description: "Encuentra el instalador offline de Office, Project o Visio que buscas. Busca por versión, edición e idioma y abre el enlace IMG correspondiente.",
    url: "/",
    type: "website",
  },
};

export default async function Home() {
  const categories = await getCatalogCategories();
  const entries = categories.flatMap((category) => category.entries);
  const installers = entries.flatMap((entry) => entry.installers);
  const languages = new Set(installers.map((installer) => installer.language));
  const homeGuides = ["como-instalar-office-2024", "requisitos-office-2024", "office-2024-professional-plus"]
    .map((slug) => getGuide(slug))
    .filter((guide) => guide !== undefined);
  const productAliases: Record<string, string[]> = {
    "Office ProPlus": ["pro plus", "professional plus", "profesional plus"],
    "Office Professional": ["professional", "profesional"],
    "Home & Business": ["home business", "hogar empresas", "hogar negocio"],
    "Project Pro": ["project", "proyecto"],
    "Visio Pro": ["visio"],
    Access: ["microsoft access"],
  };
  const destinations: SearchDestination[] = categories.flatMap((category) => [
    {
      id: `category-${category.softwareSlug}`,
      kind: "category",
      title: category.software,
      description: `Ver todas las ediciones de ${category.software}`,
      href: `/descargar/${category.softwareSlug}`,
      keywords: category.software === "Office 365" ? ["Microsoft 365", "365"] : [],
    },
    ...category.entries.map((entry) => {
      const productName = formatProductName(entry.version);
      return {
        id: `product-${entry.softwareSlug}-${entry.versionSlug}`,
        kind: "product" as const,
        title: `${entry.software} ${productName}`,
        description: `${entry.installers.length} idiomas disponibles`,
        href: `/descargar/${entry.softwareSlug}/${entry.versionSlug}`,
        keywords: [entry.version, productName, ...(productAliases[entry.version] ?? [])],
      };
    }),
  ]);

  return (
    <main id="contenido" className="catalog-shell home-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Descargas organizadas</p>
          <h1 id="hero-title">Encuentra tu versión de Office.</h1>
          <p className="hero-description">
            Escribe el año o la edición de Office, Project o Visio. Te llevaremos a la página
             correcta para elegir el idioma y descargar el instalador offline correspondiente.
          </p>
          <dl className="metrics" aria-label="Resumen del catálogo">
            <div><dt>{installers.length}</dt><dd>instaladores</dd></div>
            <div><dt>{categories.length}</dt><dd>versiones</dd></div>
            <div><dt>{languages.size}</dt><dd>idiomas</dd></div>
          </dl>
        </div>
        <aside className="hero-note" aria-label="Alcance del catálogo">
          <div className="signal" aria-hidden="true"><Download size={28} /></div>
          <p className="note-label">Organizado para elegir</p>
          <p>Compara versión, edición e idioma antes de abrir el enlace de descarga.</p>
        </aside>
      </section>

      {categories.length === 0 ? (
        <section className="catalog-empty" aria-labelledby="catalog-empty-title">
          <p className="eyebrow">Sin resultados</p>
          <h2 id="catalog-empty-title">No hay instaladores disponibles en este momento.</h2>
          <p>Vuelve más tarde para consultar las versiones e idiomas publicados.</p>
        </section>
      ) : (
        <section className="home-search-panel" aria-labelledby="search-title">
          <div className="home-search-heading">
            <p className="eyebrow"><Search size={16} aria-hidden="true" /> Buscador</p>
            <h2 id="search-title">¿Qué versión necesitas?</h2>
          </div>
          <HomeSearch destinations={destinations} />
        </section>
      )}

      <section className="home-guide" aria-labelledby="guide-title">
        <div className="home-guide-heading">
          <p className="eyebrow">Cómo funciona</p>
          <h2 id="guide-title">De la búsqueda a la descarga</h2>
        </div>
        <div className="home-guide-grid">
          <article><Search size={22} aria-hidden="true" /><h3>Busca</h3><p>Escribe una versión general o una edición específica.</p></article>
          <article><MousePointerClick size={22} aria-hidden="true" /><h3>Elige</h3><p>Abre la categoría completa o selecciona un producto.</p></article>
          <article><Languages size={22} aria-hidden="true" /><h3>Descarga</h3><p>Confirma el idioma y usa el enlace correspondiente.</p></article>
        </div>
      </section>

      <section className="home-guides" aria-labelledby="home-guides-title">
        <div className="home-guide-heading">
          <p className="eyebrow"><BookOpen size={16} aria-hidden="true" /> Office 2024</p>
          <h2 id="home-guides-title">Descarga e instala con contexto</h2>
        </div>
        <div className="guide-link-grid">
          {homeGuides.map((guide) => (
            <Link key={guide.slug} href={`/guias/${guide.slug}`}>
              <span><strong>{guide.shortTitle}</strong><small>{guide.description}</small></span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="home-guides-actions">
          <Link href="/descargar/office-2024">Ver descargas de Office 2024 <ArrowRight size={17} aria-hidden="true" /></Link>
          <Link href="/guias">Explorar todas las guías</Link>
        </div>
      </section>

      <footer className="site-footer">
        <p>OfiVault es un catálogo independiente. Microsoft y Office son marcas del grupo de empresas Microsoft.</p>
        <Link href="/sobre-ofivault">Criterios del catálogo</Link>
        <Link href="/privacidad">Privacidad</Link>
      </footer>
    </main>
  );
}
