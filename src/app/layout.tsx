import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OfiVault | Catálogo de instaladores",
  description: "Catálogo independiente de instaladores verificados de Microsoft Office.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="OfiVault, inicio">Ofi<span>Vault</span></Link>
          <p>Biblioteca de instaladores</p>
        </header>
        {children}
      </body>
    </html>
  );
}
