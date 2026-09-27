# OfiVault

Independent catalog of verified Microsoft Office installer links, organized by version, product, and language. Catalog data is versioned in `src/data/installers.json` and does not depend on a runtime API.

Each version and product has an indexable canonical URL at `/descargar/{version}/{product}`, with a language selector and direct download link. `sitemap.xml` and `robots.txt` are generated from local catalog data.

The homepage uses an accessible autocomplete search over version categories and product pages. General searches such as `Office 2021` open `/descargar/office-2021`, while specific searches such as `Office 2021 ProPlus` open the corresponding product page.

Confirmed product pages from Office 2016 onward explain that each IMG contains both `Setup32.exe` and `Setup64.exe`. Office 2013 is intentionally excluded from this notice until its image contents are independently verified.

## Local setup

1. Run `npm install`.
2. Run `npm run dev`.

To update the catalog, edit `src/data/installers.json`, run `npm run lint` and `npm run build`, then deploy.

## Catalog import

The catalog lives in `src/data/installers.json`. To maintain it from a spreadsheet instead of editing JSON by hand, keep the full catalog in an `.xlsx` or `.csv` file with four columns in this order: `Software`, `Versión`, `Idioma`, `Enlace`. A header row is optional, and empty or separator rows (such as `-----`) are ignored.

```sh
npm run catalog:import -- path/to/catalog.xlsx --dry-run   # preview changes
npm run catalog:import -- path/to/catalog.xlsx             # write installers.json
```

The script validates every row with the same rules as the build, rejects duplicates, generates installer IDs, and prints what was added, changed, or removed. If the file is missing installers that exist in the current catalog, the import stops unless you pass `--allow-removals`. CSV files exported from Excel work with either `,` or `;` separators and in UTF-8 or Windows-1252 encoding.

## Deployment

The site is deployed with Coolify from the `Dockerfile` in the repository root. Next.js builds with `output: "standalone"`, and the container runs the Node server on port `3000`. No environment variables are required.

In Coolify, create an application from this repository with the **Dockerfile** build pack, expose port `3000`, and set the domains to `https://ofivault.de,https://www.ofivault.de`. The app itself redirects `www` to the apex domain with a 308 and sends HSTS and basic security headers (see `next.config.ts`).

To test the image locally:

```sh
docker build -t ofivault .
docker run --rm -p 3000:3000 ofivault
```

## Legal notice

OfiVault is independent and is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft and Office are trademarks of the Microsoft group of companies. Download and use software only when you have a valid license.
