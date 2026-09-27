// Imports the installer catalog from a spreadsheet (.xlsx or .csv) into
// src/data/installers.json.
//
// Usage:
//   npm run catalog:import -- <file.xlsx|file.csv> [--dry-run] [--allow-removals]
//
// The first sheet must have four columns, in this order:
//   Software | Versión | Idioma | Enlace
// A header row is optional. Empty rows and separator rows (e.g. "-----") are ignored.

import { readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readSheet } from "read-excel-file/node";

const catalogPath = fileURLToPath(new URL("../src/data/installers.json", import.meta.url));

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const allowRemovals = args.includes("--allow-removals");
const inputArg = args.find((arg) => !arg.startsWith("--"));

if (!inputArg) {
  fail("Indica el archivo a importar: npm run catalog:import -- <archivo.xlsx|archivo.csv>");
}

const inputPath = resolve(inputArg);
const rows = await readRows(inputPath);
const installers = parseRows(rows);
const current = JSON.parse(await readFile(catalogPath, "utf8"));
const changes = diff(current, installers);

printSummary(installers, changes);

if (changes.removed.length > 0 && !allowRemovals) {
  fail(
    `El archivo no incluye ${changes.removed.length} instalador(es) que sí están en el catálogo actual.\n` +
      "Si quieres eliminarlos, vuelve a ejecutar con --allow-removals.",
  );
}

if (dryRun) {
  console.log("\n--dry-run: no se escribió ningún cambio.");
} else if (changes.added.length + changes.updated.length + changes.removed.length === 0) {
  console.log("\nEl catálogo ya está al día.");
} else {
  await writeFile(catalogPath, `${JSON.stringify(installers, null, 2)}\n`, "utf8");
  console.log(`\nCatálogo actualizado: ${catalogPath}`);
}

async function readRows(path) {
  const extension = extname(path).toLowerCase();

  try {
    if (extension === ".xlsx") return await readSheet(path);
    if (extension === ".csv") return parseCsv(decode(await readFile(path)));
  } catch (error) {
    fail(`No se pudo leer ${path}: ${error.message}`);
  }

  fail(`Formato no soportado: "${extension}". Usa .xlsx o .csv.`);
}

// Excel saves "CSV UTF-8" with a BOM, but plain "CSV" in Windows-1252.
function decode(buffer) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer).replace(/^﻿/, "");
  } catch {
    return new TextDecoder("windows-1252").decode(buffer);
  }
}

// Excel uses ";" as the separator in Spanish locales and "," elsewhere.
function parseCsv(text) {
  const firstLine = text.split(/\r?\n/, 1)[0];
  const delimiter = firstLine.split(";").length > firstLine.split(",").length ? ";" : ",";
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === delimiter) {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function parseRows(rows) {
  const installers = [];
  const errors = [];
  const seenKeys = new Map();
  const seenUrls = new Map();
  let foundData = false;

  rows.forEach((rawRow, index) => {
    const line = index + 1;
    const cells = Array.from({ length: 4 }, (_, column) => String(rawRow[column] ?? "").trim());
    const [software, version, language, url] = cells;

    if (cells.every((value) => value === "" || /^-+$/.test(value))) return;

    // Header row: the first complete row whose "Enlace" column is not a link.
    if (!foundData && cells.every(Boolean) && !url.includes("://")) {
      foundData = true;
      return;
    }
    foundData = true;

    if (!software || !version || !language || !url) {
      errors.push(`Fila ${line}: faltan datos (${cells.map((value) => value || "∅").join(" | ")}).`);
      return;
    }

    const urlError = validateUrl(url);
    if (urlError) {
      errors.push(`Fila ${line}: ${urlError} (${url}).`);
      return;
    }

    const key = [software, version, language].join(" | ");
    if (seenKeys.has(key)) {
      errors.push(`Fila ${line}: "${key}" está repetido (ya aparece en la fila ${seenKeys.get(key)}).`);
      return;
    }
    if (seenUrls.has(url)) {
      errors.push(`Fila ${line}: el enlace está repetido (ya aparece en la fila ${seenUrls.get(url)}).`);
      return;
    }
    seenKeys.set(key, line);
    seenUrls.set(url, line);

    installers.push({ id: installerId(software, version, language, url), software, version, language, url });
  });

  if (errors.length > 0) {
    fail(`El archivo tiene ${errors.length} error(es):\n${errors.map((error) => `  - ${error}`).join("\n")}`);
  }
  if (installers.length === 0) {
    fail("El archivo no contiene instaladores.");
  }

  return installers.sort((a, b) =>
    `${a.software}-${a.version}-${a.language}`.localeCompare(`${b.software}-${b.version}-${b.language}`, "es"),
  );
}

// Same rules as src/lib/catalog.ts, so an import never produces a catalog that fails the build.
function validateUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    return "el enlace no es una URL válida";
  }

  if (url.protocol !== "https:") return "el enlace debe usar https";
  if (url.hostname !== "officecdn.microsoft.com") return "el enlace debe ser de officecdn.microsoft.com";
  if (!url.pathname.toLowerCase().endsWith(".img")) return "el enlace debe terminar en .img";
  return undefined;
}

function installerId(software, version, language, url) {
  return `installer-${Buffer.from([software, version, language, url].join("\0")).toString("base64url")}`;
}

function diff(before, after) {
  const keyOf = (installer) => [installer.software, installer.version, installer.language].join(" | ");
  const beforeByKey = new Map(before.map((installer) => [keyOf(installer), installer]));
  const afterByKey = new Map(after.map((installer) => [keyOf(installer), installer]));

  return {
    added: [...afterByKey.keys()].filter((key) => !beforeByKey.has(key)),
    updated: [...afterByKey.keys()].filter(
      (key) => beforeByKey.has(key) && beforeByKey.get(key).url !== afterByKey.get(key).url,
    ),
    removed: [...beforeByKey.keys()].filter((key) => !afterByKey.has(key)),
  };
}

function printSummary(installers, { added, updated, removed }) {
  console.log(`Instaladores en el archivo: ${installers.length}`);
  console.log(`Nuevos: ${added.length} · Enlace cambiado: ${updated.length} · Eliminados: ${removed.length}`);

  for (const [label, keys] of [["+", added], ["~", updated], ["-", removed]]) {
    for (const key of keys) console.log(`  ${label} ${key}`);
  }
}

function fail(message) {
  console.error(`\n${message}`);
  process.exit(1);
}
