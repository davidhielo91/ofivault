"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, FolderOpen, PackageOpen, Search } from "lucide-react";
import { normalizeSearchText, type SearchDestination } from "@/lib/search";

type HomeSearchProps = {
  destinations: SearchDestination[];
};

export function HomeSearch({ destinations }: HomeSearchProps) {
  const router = useRouter();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const normalizedQuery = normalizeSearchText(query);
  const results = normalizedQuery.length < 2
    ? []
    : destinations
        .map((destination) => ({ destination, score: scoreDestination(destination, normalizedQuery) }))
        .filter((result) => result.score >= 0)
        .sort((a, b) => b.score - a.score || a.destination.title.localeCompare(b.destination.title, "es"))
        .slice(0, 6)
        .map((result) => result.destination);

  function updateQuery(value: string) {
    setQuery(value);
    setActiveIndex(-1);
    setIsOpen(normalizeSearchText(value).length >= 2);
    setFeedback("");
  }

  function submitSearch() {
    if (!normalizedQuery) {
      setFeedback("Escribí una versión o edición para buscar.");
      return;
    }

    const exactMatch = results.find(
      (result) => normalizeSearchText(result.title) === normalizedQuery,
    );
    const destination = activeIndex >= 0
      ? results[activeIndex]
      : exactMatch ?? (results.length === 1 ? results[0] : undefined);

    if (destination) {
      router.push(destination.href);
      return;
    }

    if (results.length > 1) {
      setIsOpen(true);
      setFeedback("Elegí una de las opciones disponibles.");
    } else {
      setFeedback("No encontramos esa versión. Probá con un año o una edición diferente.");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1));
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <form
      className="home-search-form"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        submitSearch();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <div className="search-combobox">
        <div className="home-search-control">
          <Search size={22} aria-hidden="true" />
          <label className="sr-only" htmlFor="office-search">Buscar versión de Office</label>
          <input
            id="office-search"
            type="search"
            value={query}
            placeholder="Ejemplo: Office 2021 ProPlus"
            autoComplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={isOpen && results.length > 0}
            aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
            onChange={(event) => updateQuery(event.target.value)}
            onFocus={() => setIsOpen(normalizedQuery.length >= 2)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit">Buscar</button>
        </div>

        {isOpen && normalizedQuery.length >= 2 && (
          <div className="home-search-results" id={listboxId} role="listbox" aria-label="Resultados de búsqueda">
            {results.length > 0 ? results.map((result, index) => (
              <Link
                id={`${listboxId}-${index}`}
                className={`home-search-result${activeIndex === index ? " is-active" : ""}`}
                key={result.id}
                href={result.href}
                role="option"
                aria-selected={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setIsOpen(false)}
              >
                <span className="search-result-icon" aria-hidden="true">
                  {result.kind === "category" ? <FolderOpen size={20} /> : <PackageOpen size={20} />}
                </span>
                <span>
                  <strong>{result.title}</strong>
                  <small>{result.description}</small>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )) : (
              <p className="search-no-results">No encontramos resultados para “{query}”.</p>
            )}
          </div>
        )}
      </div>
      <p className="search-helper">Buscá por año, edición o producto. Por ejemplo: Office 2024, Visio 2019 o ProPlus 2021.</p>
      <p className="search-feedback" aria-live="polite">{feedback}</p>
    </form>
  );
}

function scoreDestination(destination: SearchDestination, query: string) {
  const title = normalizeSearchText(destination.title);
  const haystack = normalizeSearchText(`${destination.title} ${destination.keywords.join(" ")}`);
  const tokens = query.split(" ").filter(Boolean);

  if (title === query) return 1000;
  if (title.startsWith(query)) return 800 + (destination.kind === "category" ? 25 : 0);
  if (haystack.includes(query)) return 600 + (destination.kind === "category" ? 25 : 0);
  if (tokens.every((token) => haystack.includes(token))) return 400;
  return -1;
}
