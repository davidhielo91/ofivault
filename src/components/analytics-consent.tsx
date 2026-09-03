"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@/components/google-analytics";
import { analyticsConsentChangeEvent, analyticsConsentStorageKey } from "@/lib/analytics";

function getStoredConsent(): "accepted" | "denied" | "pending" {
  const storedConsent = window.localStorage.getItem(analyticsConsentStorageKey);
  return storedConsent === "accepted" || storedConsent === "denied" ? storedConsent : "pending";
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(analyticsConsentChangeEvent, callback);
  return () => window.removeEventListener(analyticsConsentChangeEvent, callback);
}

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, getStoredConsent, () => "pending");

  function chooseConsent(value: "accepted" | "denied") {
    window.localStorage.setItem(analyticsConsentStorageKey, value);
    window.dispatchEvent(new Event(analyticsConsentChangeEvent));
  }

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}
      {consent === "pending" && (
        <aside className="consent-banner" aria-labelledby="consent-title">
          <div>
            <p className="consent-title" id="consent-title">Privacidad y analítica</p>
            <p>
              Usamos Google Analytics solo si aceptas para entender qué guías y descargas resultan útiles.
              Puedes consultar los detalles en la <Link href="/privacidad">política de privacidad</Link>.
            </p>
          </div>
          <div className="consent-actions">
            <button type="button" className="consent-secondary" onClick={() => chooseConsent("denied")}>Solo necesarias</button>
            <button type="button" className="consent-primary" onClick={() => chooseConsent("accepted")}>Aceptar analítica</button>
          </div>
        </aside>
      )}
    </>
  );
}
