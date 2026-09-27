// Checks a live deployment: redirects, security headers, every sitemap URL and 404s.
//
// Usage:
//   npm run verify:deploy                          # checks https://ofivault.de
//   npm run verify:deploy -- https://example.com   # checks another deployment
//
// Exits with code 1 if any check fails.

const base = new URL(process.argv[2] ?? "https://ofivault.de");
const origin = base.origin;
const host = base.host;
const wwwHost = host.startsWith("www.") ? host : `www.${host}`;
const permanent = [301, 308];
let failures = 0;

function report(ok, label, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
}

async function request(url) {
  try {
    return await fetch(url, { redirect: "manual", headers: { "user-agent": "ofivault-verify-deploy" } });
  } catch (error) {
    return { status: 0, headers: new Headers(), text: async () => "", error };
  }
}

async function expectRedirect(from, allowedStatus, expectedLocation) {
  const response = await request(from);
  const location = response.headers.get("location") ?? "";
  const ok = allowedStatus.includes(response.status) && (!expectedLocation || location === expectedLocation);
  report(ok, `${from} redirige permanentemente`, `${response.status || response.error?.message} → ${location || "(sin destino)"}`);
}

console.log(`Verificando ${origin}\n`);

// Redirects handled by the proxy (http → https) and by next.config.ts (www → apex).
await expectRedirect(`http://${host}/`, permanent, `https://${host}/`);
await expectRedirect(`http://${wwwHost}/`, permanent);
await expectRedirect(`https://${wwwHost}/guias?x=1`, [308], `https://${host}/guias?x=1`);

// Home page and security headers from next.config.ts.
const home = await request(`${origin}/`);
report(home.status === 200, "La página principal responde 200", String(home.status));
for (const header of ["strict-transport-security", "x-content-type-options", "referrer-policy"]) {
  report(home.headers.has(header), `Cabecera ${header}`, home.headers.get(header) ?? "falta");
}
report(!home.headers.has("x-powered-by"), "Sin cabecera x-powered-by");

// robots.txt and every URL in the sitemap.
const robots = await request(`${origin}/robots.txt`);
report(robots.status === 200 && (await robots.text()).includes("Sitemap:"), "robots.txt enlaza el sitemap");

const sitemap = await request(`${origin}/sitemap.xml`);
const locations = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
report(sitemap.status === 200 && locations.length > 0, "sitemap.xml", `${locations.length} URLs`);

const pageProblems = [];
for (let i = 0; i < locations.length; i += 8) {
  await Promise.all(locations.slice(i, i + 8).map(async (location) => {
    // The sitemap always lists the production domain; check the same path on the deployment under test.
    const url = new URL(location);
    const response = await request(`${origin}${url.pathname}${url.search}`);
    const html = response.status === 200 ? await response.text() : "";
    const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const hasOgImage = html.includes('property="og:image"');

    if (response.status !== 200) pageProblems.push(`${url.pathname}: responde ${response.status}`);
    else if (h1Count !== 1) pageProblems.push(`${url.pathname}: ${h1Count} etiquetas h1`);
    else if (canonical !== location) pageProblems.push(`${url.pathname}: canonical ${canonical ?? "ausente"}`);
    else if (!hasOgImage) pageProblems.push(`${url.pathname}: sin og:image`);
  }));
}
report(pageProblems.length === 0, "Todas las URLs del sitemap: 200, un h1, canonical y og:image", `${locations.length - pageProblems.length}/${locations.length} correctas`);
for (const problem of pageProblems) console.log(`    - ${problem}`);

// Unknown catalog and guide URLs must return a real 404.
for (const path of ["/descargar/office-9999", "/descargar/office-2024/no-existe", "/guias/no-existe"]) {
  const response = await request(`${origin}${path}`);
  report(response.status === 404, `${path} responde 404`, String(response.status));
}

console.log(failures === 0 ? "\nTodo correcto." : `\n${failures} comprobación(es) fallida(s).`);
process.exit(failures === 0 ? 0 : 1);
