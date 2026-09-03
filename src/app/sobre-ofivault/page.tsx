import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Criterios del catálogo",
  description: "Conoce cómo OfiVault organiza los registros de Office, Project y Visio y los límites de la información mostrada.",
  alternates: { canonical: "/sobre-ofivault" },
  openGraph: {
    title: "Criterios del catálogo | OfiVault",
    description: "Conoce cómo OfiVault organiza los registros de Office, Project y Visio y los límites de la información mostrada.",
    url: "/sobre-ofivault",
    type: "article",
  },
};

const sources = [
  {
    label: "Preguntas frecuentes sobre Office 2024 y Office LTSC 2024",
    url: "https://support.microsoft.com/es-es/office/lifecycle/office-2024-and-office-ltsc-2024-faq",
  },
  {
    label: "Descargar, instalar o reinstalar Office 2024",
    url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/download-install-or-reinstall-microsoft-365-or-office-2024-on-a-pc-or-mac",
  },
  {
    label: "Elegir entre Office de 32 o 64 bits",
    url: "https://support.microsoft.com/es-es/office/lifecycle/officeinstall/choose-between-the-64-bit-or-32-bit-version-of-office",
  },
];

export default function AboutOfiVaultPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Criterios del catálogo",
    description: metadata.description,
    url: `${siteUrl}/sobre-ofivault`,
    about: { "@type": "Organization", name: "OfiVault", url: siteUrl },
  };

  return (
    <main id="contenido" className="product-page trust-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Criterios del catálogo</span>
      </nav>

      <article>
        <header className="guide-hero">
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Transparencia del catálogo</p>
          <h1>Criterios del catálogo.</h1>
          <p className="guide-intro">
            OfiVault organiza instaladores de Office, Project y Visio para que puedas identificar el producto,
             la edición, el idioma y el formato que muestra cada registro antes de descargarlo.
          </p>
          <p className="guide-answer">
             Los datos del catálogo describen el producto, la edición, el idioma y el formato indicados en cada registro.
             No constituyen una comprobación en tiempo real del enlace ni una promesa sobre licencias, activación o compatibilidad.
          </p>
        </header>

        <section className="trust-section" aria-labelledby="trust-checks-title">
          <p className="eyebrow">Proceso editorial</p>
          <h2 id="trust-checks-title">Qué muestra cada registro</h2>
          <div className="trust-check-grid">
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Producto y versión</h3>
              <p>El registro indica si corresponde a Office, Project o Visio y la versión o edición con la que se publica.</p>
            </article>
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Idioma y formato</h3>
              <p>Mostramos el idioma y el formato de imagen IMG indicados para estas descargas de Windows.</p>
            </article>
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Enlace de descarga</h3>
              <p>El registro incluye un enlace de descarga asociado al producto y al idioma mostrados.</p>
            </article>
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Arquitectura indicada</h3>
              <p>Cuando se muestra, la información de 32 y 64 bits se limita al alcance descrito en la página del producto.</p>
            </article>
          </div>
        </section>

        <section className="trust-section" aria-labelledby="trust-limits-title">
          <p className="eyebrow">Límites claros</p>
          <h2 id="trust-limits-title">Límites de la información</h2>
          <ul>
            <li>Un instalador no incluye una clave de producto, licencia ni activador.</li>
            <li>La información mostrada no confirma si una licencia podrá activar un producto o canal concretos.</li>
            <li>La instalación offline no describe por sí misma los requisitos de activación.</li>
            <li>OfiVault es un catálogo independiente y no representa a Microsoft.</li>
            <li>La página no sustituye los requisitos, términos de licencia o instrucciones del fabricante.</li>
          </ul>
        </section>

        <section className="trust-section" aria-labelledby="trust-scope-title">
          <p className="eyebrow">Alcance</p>
          <h2 id="trust-scope-title">Qué encontrarás en el catálogo</h2>
          <p>
            El catálogo está orientado a instaladores para Windows. Office para Mac utiliza paquetes, requisitos y
            procesos de licencia diferentes, por lo que no debes intentar instalar estas imágenes IMG en un Mac.
          </p>
          <p>
            Las páginas separan la descarga de la activación para que puedas comprobar primero la compatibilidad y
             resolver después cualquier consulta de licencia según el producto y canal instalados.
          </p>
        </section>

        <section className="trust-section" aria-labelledby="trust-sources-title">
          <p className="eyebrow">Documentación de referencia</p>
          <h2 id="trust-sources-title">Documentación de referencia</h2>
          <div className="trust-sources">
            {sources.map((source) => (
              <a className="guide-source" href={source.url} key={source.url} target="_blank" rel="noreferrer">
                {source.label} <ExternalLink size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </article>

      <section className="guide-catalog-cta">
        <div>
          <p className="eyebrow">Siguiente paso</p>
          <h2>Consulta las guías antes de instalar</h2>
        </div>
        <Link href="/guias">
          Ver guías <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
