import { ImageResponse } from "next/og";

export const alt = "OfiVault, encuentra tu versión de Office, Project o Visio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f5f8f6",
          color: "#153a37",
          display: "flex",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#0a514c",
            borderRadius: "28px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            overflow: "hidden",
            padding: "58px 64px",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "#0d756d",
              borderRadius: "999px",
              height: "330px",
              position: "absolute",
              right: "-90px",
              top: "-120px",
              width: "330px",
            }}
          />
          <div style={{ alignItems: "center", display: "flex", fontSize: "34px", fontWeight: 700 }}>
            Ofi<span style={{ color: "#8ee7da" }}>Vault</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "850px" }}>
            <div
              style={{
                color: "#8ee7da",
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "3px",
                marginBottom: "22px",
                textTransform: "uppercase",
              }}
            >
              Encuentra tu versión
            </div>
            <div style={{ display: "flex", fontSize: "66px", fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.05 }}>
              Office, Project y Visio
            </div>
            <div style={{ color: "#d8f5ef", display: "flex", fontSize: "27px", marginTop: "22px" }}>
              Instaladores offline por versión, edición e idioma.
            </div>
          </div>
          <div style={{ alignItems: "center", display: "flex", gap: "18px", fontSize: "22px" }}>
            <span>Descargas IMG desde servidores de Microsoft</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
