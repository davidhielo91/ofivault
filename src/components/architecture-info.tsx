import { Cpu, ExternalLink, TriangleAlert } from "lucide-react";

const microsoftGuide = "https://support.microsoft.com/en-us/office/use-the-office-offline-installer-f0a85fe7-118f-41cb-a791-d59cef96ad1c";

export function ArchitectureInfo() {
  return (
    <section className="architecture-info" aria-labelledby="architecture-title">
      <div className="architecture-heading">
        <p className="eyebrow"><Cpu size={16} aria-hidden="true" /> Arquitecturas incluidas</p>
        <h2 id="architecture-title">Una descarga para 32 y 64 bits</h2>
        <p>
          El archivo <code>.img</code> contiene ambas opciones. Después de montarlo en Windows,
          abre la carpeta <code>Office</code> y ejecuta el instalador que corresponda.
        </p>
      </div>

      <div className="architecture-options">
        <article>
          <span>Recomendado</span>
          <h3>64 bits</h3>
          <code>Setup64.exe</code>
          <p>La mejor opción para la mayoría de equipos modernos con Windows de 64 bits.</p>
        </article>
        <article>
          <span>Compatibilidad</span>
          <h3>32 bits</h3>
          <code>Setup32.exe</code>
          <p>Úsalo en Windows de 32 bits o cuando dependas de complementos antiguos de 32 bits.</p>
        </article>
      </div>

      <ol className="architecture-steps">
        <li>Descarga y abre el archivo <code>.img</code> para montar la unidad virtual.</li>
        <li>Abre la carpeta <code>Office</code> dentro de esa unidad.</li>
        <li>Ejecuta <code>Setup64.exe</code> o <code>Setup32.exe</code>.</li>
      </ol>

      <div className="architecture-warning">
        <TriangleAlert size={20} aria-hidden="true" />
        <p>
          No se pueden mezclar componentes de Office de 32 y 64 bits. Si ya tienes Office,
          elige la misma arquitectura o desinstala la versión anterior.
        </p>
      </div>

      <a className="architecture-source" href={microsoftGuide} target="_blank" rel="noreferrer">
        Consulta la guía oficial de Microsoft <ExternalLink size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
