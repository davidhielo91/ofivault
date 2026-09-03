"use client";

import { CatalogRecovery } from "@/components/catalog-recovery";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <CatalogRecovery reset={reset} />;
}
