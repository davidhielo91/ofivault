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

The site runs as a single Docker container built from the `Dockerfile` in the repository root. Next.js builds with `output: "standalone"`, and the container runs the Node server on port `3000` with a built-in healthcheck. No environment variables or external services are required. The GA4 ID (`G-1889M26C3V`, no GTM) is in `src/lib/analytics.ts`.

### What lives in the code and what doesn't

These travel with the repository and apply on any host:

- `www` → apex redirect (308, path and query kept), HSTS, `nosniff` and `Referrer-Policy` headers: `next.config.ts`.
- Real 404s for unknown versions, products and guides: `dynamicParams = false` in the route files.
- Catalog, guides, sitemap and robots.txt: generated from `src/data` and `src/lib`.

These are platform settings and must be configured on every new host:

- Domains, DNS and TLS certificates.
- The **permanent** `http` → `https` redirect. The reverse proxy handles it before the request reaches the app. Don't move it into the app: behind Cloudflare in "Flexible" mode it would cause a redirect loop.

### Coolify

1. Create an application from this GitHub repository, branch `main`, with the **Dockerfile** build pack.
2. Set the exposed port to `3000` and the domains to `https://ofivault.de,https://www.ofivault.de`. Coolify issues a Let's Encrypt certificate per domain.
3. Enable **Auto Deploy**. A deploy takes about 5 minutes on a 2 vCPU VPS.
4. Make the `http` → `https` redirect permanent. Coolify's default is a temporary 307. In **Configuration → General → Container Labels**, add a middleware with a name unique to this app:

   ```
   traefik.http.middlewares.ofivault-redirect-https.redirectscheme.scheme=https
   traefik.http.middlewares.ofivault-redirect-https.redirectscheme.permanent=true
   ```

   Then, in the labels of the two `http` routers (`traefik.http.routers.http-<n>-<uuid>.middlewares=...`), replace `redirect-to-https` with `ofivault-redirect-https`. Leave the `https` routers unchanged. Router names include a Coolify-generated ID, so copy them from the existing labels.

   Don't set `permanent=true` on the shared `redirect-to-https` middleware. Traefik middleware names are global to the proxy, and other apps on the same server (such as kimiya-cafe) define it as temporary. Traefik then rejects the conflicting definition, and `http` requests return 404.
5. Redeploy.

### DNS (Cloudflare)

- `A` records for `@` and `www` pointing to the server IP.
- If the records are proxied (orange cloud), set SSL/TLS to **Full (strict)**. Never use "Flexible".

### Other hosts

Any platform that runs a Docker image works. Run the image, route traffic to port `3000`, and make sure the reverse proxy:

- terminates TLS for both `ofivault.de` and `www.ofivault.de`;
- redirects `http` to `https` with a 301 or 308;
- forwards the original `Host` header, which the `www` redirect needs.

To test the image locally:

```sh
docker build -t ofivault .
docker run --rm -p 3000:3000 ofivault
```

### After every deploy or migration

Run the deployment check from any machine with Node.js:

```sh
npm run verify:deploy                          # https://ofivault.de
npm run verify:deploy -- https://example.com   # another deployment
```

It checks the permanent `http` → `https` and `www` redirects, the security headers, robots.txt, that every sitemap URL returns 200 with one `h1`, a matching canonical and an `og:image`, and that unknown URLs return 404. It exits with code 1 if anything fails.

When the site moves to a new host or domain, resubmit `https://ofivault.de/sitemap.xml` in Google Search Console.

## Legal notice

OfiVault is independent and is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft and Office are trademarks of the Microsoft group of companies. Download and use software only when you have a valid license.
