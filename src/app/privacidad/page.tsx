import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, LockKeyhole } from "lucide-react";
import { reportUrl, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre analítica, almacenamiento local, enlaces externos y privacidad en OfiVault.",
  alternates: { canonical: "/privacidad" },
  openGraph: {
    title: "Política de privacidad | OfiVault",
    description: "Información sobre analítica, almacenamiento local, enlaces externos y privacidad en OfiVault.",
    url: "/privacidad",
    type: "article",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política de privacidad",
    description: metadata.description,
    url: `${siteUrl}/privacidad`,
    isPartOf: { "@type": "WebSite", name: "OfiVault", url: siteUrl },
  };

  return (
    <main id="contenido" className="product-page privacy-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Privacidad</span>
      </nav>

      <article>
        <header className="guide-hero">
          <p className="eyebrow"><LockKeyhole size={16} aria-hidden="true" /> Información de privacidad</p>
          <h1>Tu privacidad importa.</h1>
          <p className="guide-intro">
            OfiVault es un catálogo de instaladores. No necesitas crear una cuenta ni enviar datos personales para consultar las guías o acceder al catálogo.
          </p>
          <p className="guide-answer">
            La analítica opcional solo se activa después de que pulses “Aceptar analítica”. Si eliges “Solo necesarias”, Google Analytics no se carga.
          </p>
        </header>

        <section className="privacy-section" aria-labelledby="privacy-analytics-title">
          <p className="eyebrow">Analítica opcional</p>
          <h2 id="privacy-analytics-title">Qué mide Google Analytics</h2>
          <p>
            Si aceptas, usamos Google Analytics para conocer de forma agregada qué páginas se consultan y qué descargas reciben clics. El evento de descarga puede incluir el producto, idioma, formato, dominio de destino y URL del enlace.
          </p>
          <p>
            No enviamos nombres, correos electrónicos, claves de producto ni el contenido de tus archivos. Puedes retirar la decisión borrando el almacenamiento local del sitio y volver a elegir en el siguiente aviso.
          </p>
        </section>

        <section className="privacy-section" aria-labelledby="privacy-storage-title">
          <p className="eyebrow">Almacenamiento local</p>
          <h2 id="privacy-storage-title">Qué guarda tu navegador</h2>
          <p>
            Guardamos una única preferencia local llamada <code>ofivault-analytics-consent</code> para recordar si aceptaste o rechazaste la analítica. No es una cuenta y no contiene información personal.
          </p>
        </section>

        <section className="privacy-section" aria-labelledby="privacy-external-title">
          <p className="eyebrow">Enlaces externos</p>
          <h2 id="privacy-external-title">Microsoft, GitHub y Ko-fi</h2>
          <p>
            Las descargas enlazan con infraestructura de Microsoft. También ofrecemos un enlace para reportar información incorrecta en GitHub y un apoyo voluntario en Ko-fi. Esos servicios tienen sus propias políticas de privacidad y pueden procesar datos cuando los visitas.
          </p>
          <div className="privacy-links">
            <a className="guide-source" href={reportUrl} target="_blank" rel="noreferrer">
              Reportar un problema en GitHub <ExternalLink size={16} aria-hidden="true" />
            </a>
            <a className="guide-source" href="https://ko-fi.com/hielocode" target="_blank" rel="noreferrer">
              Visitar Ko-fi <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="privacy-section" aria-labelledby="privacy-contact-title">
          <p className="eyebrow">Cambios y consultas</p>
          <h2 id="privacy-contact-title">Información del aviso</h2>
          <p>
            Esta información describe el funcionamiento actual del sitio y se actualizará si cambia la analítica, el almacenamiento local o los servicios externos utilizados. La fecha de revisión de esta página corresponde a la versión publicada en el sitio.
          </p>
        </section>
      </article>

      <section className="guide-catalog-cta">
        <div>
          <p className="eyebrow">Transparencia</p>
          <h2>Conoce cómo revisamos las descargas</h2>
        </div>
        <Link href="/sobre-ofivault">
          Ver metodología <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
