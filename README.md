# OfiVault

Independent catalog of verified Microsoft Office installer links, organized by version, product, and language.

Each version and product has an indexable canonical URL at `/descargar/{version}/{product}`, with a language selector and direct download link. `sitemap.xml` and `robots.txt` are generated from Airtable catalog data.

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
