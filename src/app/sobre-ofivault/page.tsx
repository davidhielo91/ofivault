import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { SupportLink } from "@/components/support-link";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo verificamos las descargas",
  description: "Conoce cómo OfiVault revisa los registros de Office, Project y Visio y qué significa un enlace de descarga verificado.",
  alternates: { canonical: "/sobre-ofivault" },
  openGraph: {
    title: "Cómo verificamos las descargas | OfiVault",
    description: "Conoce cómo OfiVault revisa los registros de Office, Project y Visio y qué significa un enlace de descarga verificado.",
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
    name: "Cómo verificamos las descargas",
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
        <span aria-current="page">Cómo verificamos las descargas</span>
      </nav>

      <article>
        <header className="guide-hero">
          <p className="eyebrow"><ShieldCheck size={16} aria-hidden="true" /> Transparencia del catálogo</p>
          <h1>Cómo verificamos las descargas.</h1>
          <p className="guide-intro">
            OfiVault organiza instaladores de Office, Project y Visio para que puedas identificar el producto,
            la edición, el idioma y el formato antes de descargarlo.
          </p>
          <p className="guide-answer">
            Un enlace verificado significa que revisamos el registro del catálogo y su destino de distribución.
            No significa que la descarga incluya una licencia, active Office o sustituya la documentación de Microsoft.
          </p>
        </header>

        <section className="trust-section" aria-labelledby="trust-checks-title">
          <p className="eyebrow">Proceso editorial</p>
          <h2 id="trust-checks-title">Qué comprobamos</h2>
          <div className="trust-check-grid">
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Producto y versión</h3>
              <p>El registro identifica si corresponde a Office, Project o Visio y a qué versión o edición pertenece.</p>
            </article>
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Idioma y formato</h3>
              <p>Mostramos el idioma disponible y conservamos el formato de imagen IMG utilizado por estas descargas de Windows.</p>
            </article>
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Destino de distribución</h3>
              <p>Revisamos que el enlace del catálogo apunte a la infraestructura de distribución de Microsoft indicada para el producto.</p>
            </article>
            <article>
              <CheckCircle2 size={21} aria-hidden="true" />
              <h3>Arquitectura con evidencia</h3>
              <p>Solo presentamos opciones de 32 y 64 bits cuando la imagen o la fuente correspondiente lo permite.</p>
            </article>
          </div>
        </section>

        <section className="trust-section" aria-labelledby="trust-limits-title">
          <p className="eyebrow">Límites claros</p>
          <h2 id="trust-limits-title">Qué no significa “verificado”</h2>
          <ul>
            <li>No incluye una clave de producto, licencia ni activador.</li>
            <li>No garantiza que una licencia de otro canal pueda activar el producto.</li>
            <li>No convierte una instalación offline en una activación completamente offline.</li>
            <li>No significa que OfiVault sea Microsoft ni un distribuidor oficial.</li>
            <li>No reemplaza los requisitos, términos de licencia o instrucciones de Microsoft.</li>
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
            elegir después una licencia válida que corresponda al producto y al canal instalado.
          </p>
        </section>

        <section className="trust-section" aria-labelledby="trust-sources-title">
          <p className="eyebrow">Documentación de referencia</p>
          <h2 id="trust-sources-title">Fuentes oficiales</h2>
          <div className="trust-sources">
            {sources.map((source) => (
              <a className="guide-source" href={source.url} key={source.url} target="_blank" rel="noreferrer">
                {source.label} <ExternalLink size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </article>

      <section className="support-note" aria-labelledby="support-title">
        <div>
          <p className="eyebrow">Apoyo voluntario</p>
          <h2 id="support-title">¿Te resultó útil OfiVault?</h2>
          <p>Un café ayuda a mantener el catálogo y revisar sus enlaces.</p>
        </div>
        <SupportLink className="support-button">Apoyar el proyecto</SupportLink>
      </section>

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
