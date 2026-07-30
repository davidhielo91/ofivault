"use client";

import { koFiUrl, trackSupportClick } from "@/lib/analytics";

type SupportLinkProps = {
  className?: string;
  children: React.ReactNode;
};

export function SupportLink({ className, children }: SupportLinkProps) {
  return (
    <a
      className={className}
      href={koFiUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackSupportClick}
    >
      {children}
    </a>
  );
}
