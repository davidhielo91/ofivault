# OfiVault

Independent catalog of verified Microsoft Office installer links, organized by version, product, and language. Catalog data is versioned in `src/data/installers.json` and does not depend on a runtime API.

Each version and product has an indexable canonical URL at `/descargar/{version}/{product}`, with a language selector and direct download link. `sitemap.xml` and `robots.txt` are generated from local catalog data.

The homepage uses an accessible autocomplete search over version categories and product pages. General searches such as `Office 2021` open `/descargar/office-2021`, while specific searches such as `Office 2021 ProPlus` open the corresponding product page.

Confirmed product pages from Office 2016 onward explain that each IMG contains both `Setup32.exe` and `Setup64.exe`. Office 2013 is intentionally excluded from this notice until its image contents are independently verified.

## Local setup

1. Run `npm install`.
2. Run `npm run dev`.

To update the catalog, edit `src/data/installers.json`, run `npm run lint` and `npm run build`, then deploy.

## Legal notice

OfiVault is independent and is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft and Office are trademarks of the Microsoft group of companies. Download and use software only when you have a valid license.
