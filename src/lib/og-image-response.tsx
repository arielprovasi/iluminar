import { ImageResponse } from "next/og";

const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * Dynamic Open Graph / Twitter image with visible headline and CTA for social previews.
 * Keeps this module free of heavy config imports (e.g. icon bundles).
 */
export function createOgImageResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #141414 0%, #0f4c81 45%, #0a0a0a 100%)",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#f4c025",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Iluminar
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 38,
            color: "#f8fafc",
            maxWidth: 920,
            lineHeight: 1.25,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Materiais elétricos e construção em Sorocaba
        </div>
        <div
          style={{
            marginTop: 52,
            display: "flex",
            alignItems: "center",
            background: "#f4c025",
            color: "#0a0a0a",
            fontSize: 30,
            fontWeight: 700,
            padding: "18px 36px",
            borderRadius: 10,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Fale no WhatsApp
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

export const ogImageSize = OG_SIZE;
