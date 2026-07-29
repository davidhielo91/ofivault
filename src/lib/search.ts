export type SearchDestination = {
  id: string;
  kind: "category" | "product";
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter((word) => !["and", "the", "de", "y"].includes(word))
    .join(" ");
}
