import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <main id="contenido" className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <div className="not-found-icon" aria-hidden="true">
          <FileQuestion size={30} />
        </div>
        <p className="eyebrow">Error 404</p>
        <h1 id="not-found-title">Esta página no está disponible.</h1>
        <p className="not-found-description">
          Es posible que el enlace haya cambiado o que la versión que buscas ya no esté en esta dirección.
        </p>
        <div className="not-found-actions">
          <Link className="not-found-primary" href="/">
            Volver al catálogo <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link className="not-found-secondary" href="/guias">
            <BookOpen size={18} aria-hidden="true" /> Ver guías
          </Link>
        </div>
      </section>
    </main>
  );
}
