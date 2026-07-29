import type { Metadata } from "next";
import { Download, Languages, MousePointerClick, Search, ShieldCheck } from "lucide-react";
import { HomeSearch } from "@/components/home-search";
import { getCatalogCategories } from "@/lib/catalog";
import type { SearchDestination } from "@/lib/search";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buscar y descargar instaladores de Office",
  description: "Encontrá instaladores verificados de Microsoft Office por año y edición. Buscá tu versión y descargala en español desde su página correspondiente.",
};

export default async function Home() {
  const categories = await getCatalogCategories();
  const entries = categories.flatMap((category) => category.entries);
  const installers = entries.flatMap((entry) => entry.installers);
  const languages = new Set(installers.map((installer) => installer.language));
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
      const productName = entry.version.replace(/^Office\s+/i, "");
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
          <h1 id="hero-title">Encontrá tu versión de Office.</h1>
          <p className="hero-description">
            Escribí el año o la edición que necesitás. Te llevaremos a la página correcta para
            elegir el idioma y descargar el instalador verificado.
          </p>
          <dl className="metrics" aria-label="Resumen del catálogo">
            <div><dt>{installers.length}</dt><dd>instaladores</dd></div>
            <div><dt>{categories.length}</dt><dd>versiones</dd></div>
            <div><dt>{languages.size}</dt><dd>idiomas</dd></div>
          </dl>
        </div>
        <aside className="hero-note" aria-label="Criterio de verificación">
          <div className="signal" aria-hidden="true"><Download size={28} /></div>
          <p className="note-label">Enlaces verificados</p>
          <p>Los instaladores apuntan al servidor de origen y están organizados por versión, edición e idioma.</p>
        </aside>
      </section>

      <section className="home-search-panel" aria-labelledby="search-title">
        <div className="home-search-heading">
          <p className="eyebrow"><Search size={16} aria-hidden="true" /> Buscador</p>
          <h2 id="search-title">¿Qué versión necesitás?</h2>
        </div>
        <HomeSearch destinations={destinations} />
      </section>

      <section className="home-guide" aria-labelledby="guide-title">
        <div className="home-guide-heading">
          <p className="eyebrow">Cómo funciona</p>
          <h2 id="guide-title">De la búsqueda a la descarga</h2>
        </div>
        <div className="home-guide-grid">
          <article><Search size={22} aria-hidden="true" /><h3>Buscá</h3><p>Escribí una versión general o una edición específica.</p></article>
          <article><MousePointerClick size={22} aria-hidden="true" /><h3>Elegí</h3><p>Abrí la categoría completa o seleccioná un producto.</p></article>
          <article><Languages size={22} aria-hidden="true" /><h3>Descargá</h3><p>Confirmá el idioma y usá el enlace correspondiente.</p></article>
        </div>
      </section>

      <footer className="site-footer">
        <p>OfiVault es un catálogo independiente. Microsoft y Office son marcas del grupo de empresas Microsoft.</p>
        <p>Descargá y usá software únicamente si contás con una licencia válida.</p>
      </footer>
    </main>
  );
}
