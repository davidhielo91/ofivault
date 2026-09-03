"use client";

import { useEffect, useRef } from "react";
import {
  analyticsConsentChangeEvent,
  analyticsConsentStorageKey,
  trackLicenseCta,
} from "@/lib/analytics";
import { getLicenseContactUrl } from "@/lib/site";

type LicenseContactLinkProps = {
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
  placement: "global_navigation" | "product_detail";
  productName?: string;
  productTitle?: string;
  productVersion?: string;
  selectedLanguage?: string;
};

export function LicenseContactLink({
  ariaLabel,
  children,
  className,
  placement,
  productName,
  productTitle,
  productVersion,
  selectedLanguage,
}: LicenseContactLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const hasTrackedView = useRef(false);
  const destinationUrl = getLicenseContactUrl(productTitle, selectedLanguage);
  const destinationHost = new URL(destinationUrl).host;

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    function trackView() {
      if (hasTrackedView.current) return;

      const tracked = trackLicenseCta({
        eventName: "license_cta_view",
        pagePath: window.location.pathname,
        placement,
        destinationHost,
        productName,
        productVersion,
        selectedLanguage,
      });

      if (tracked) {
        hasTrackedView.current = true;
      } else if (window.localStorage.getItem(analyticsConsentStorageKey) === "accepted") {
        retryTimer = setTimeout(trackView, 250);
      }
    }

    function observeLink() {
      if (window.localStorage.getItem(analyticsConsentStorageKey) !== "accepted" || !linkRef.current || observer) return;

      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        trackView();
        observer?.disconnect();
      }, { threshold: 0.5 });
      observer.observe(linkRef.current);
    }

    observeLink();
    window.addEventListener(analyticsConsentChangeEvent, observeLink);

    return () => {
      observer?.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
      window.removeEventListener(analyticsConsentChangeEvent, observeLink);
    };
  }, [destinationHost, placement, productName, productVersion, selectedLanguage]);

  return (
    <a
      className={className}
      aria-label={ariaLabel}
      href={destinationUrl}
      ref={linkRef}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLicenseCta({
        eventName: "license_cta_click",
        pagePath: window.location.pathname,
        placement,
        destinationHost,
        productName,
        productVersion,
        selectedLanguage,
      })}
    >
      {children}
    </a>
  );
}
