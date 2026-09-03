"use client";

import { CatalogRecovery } from "@/components/catalog-recovery";

export default function DownloadErrorPage({ reset }: { reset: () => void }) {
  return <CatalogRecovery compact reset={reset} />;
}
