export default function DownloadLoading() {
  return (
    <main id="contenido" className="product-page" aria-busy="true">
      <section className="catalog-loading" aria-live="polite">
        <p className="eyebrow">Catálogo</p>
        <h1>Cargando la información del instalador…</h1>
      </section>
    </main>
  );
}
