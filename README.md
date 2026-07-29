# OfiVault

Independent catalog of verified Microsoft Office installer links, organized by version, product, and language.

Each version and product has an indexable canonical URL at `/descargar/{version}/{product}`, with a language selector and direct download link. `sitemap.xml` and `robots.txt` are generated from Airtable catalog data.

The homepage uses an accessible autocomplete search over version categories and product pages. General searches such as `Office 2021` open `/descargar/office-2021`, while specific searches such as `Office 2021 ProPlus` open the corresponding product page.

Confirmed product pages from Office 2016 onward explain that each IMG contains both `Setup32.exe` and `Setup64.exe`. Office 2013 is intentionally excluded from this notice until its image contents are independently verified.

## Local setup

1. Copy `.env.example` to `.env.local` and add a read-only Airtable personal access token.
2. Run `npm install`.
3. Run `npm run dev`.

## Environment variables

- `AIRTABLE_TOKEN`: Airtable token with `data.records:read` access to the catalog base.
- `AIRTABLE_BASE_ID`: Airtable base identifier.
- `AIRTABLE_TABLE_ID`: Airtable table identifier.

## Legal notice

OfiVault is independent and is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft and Office are trademarks of the Microsoft group of companies. Download and use software only when you have a valid license.
