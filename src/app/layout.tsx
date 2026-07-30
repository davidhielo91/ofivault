import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OfiVault",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  description: "Catálogo independiente de instaladores offline de Office, Project y Visio.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OfiVault | Instaladores offline de Office",
    template: "%s | OfiVault",
  },
  description: "Catálogo independiente de instaladores offline verificados de Office, Project y Visio en español y otros idiomas.",
  applicationName: "OfiVault",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="OfiVault, inicio">Ofi<span>Vault</span></Link>
          <div className="header-meta">
            <p>Biblioteca de instaladores</p>
            <Link href="/guias">Guías</Link>
          </div>
        </header>
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
