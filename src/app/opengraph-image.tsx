import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#FAFAF7",
          backgroundImage:
            "radial-gradient(circle at 75% 18%, rgba(14,61,46,0.10), transparent 55%), radial-gradient(circle at 8% 92%, rgba(14,61,46,0.06), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              background: "#0E3D2E",
              borderRadius: 14,
              color: "#FAFAF7",
              fontWeight: 900,
              fontSize: 30,
              letterSpacing: -1,
            }}
          >
            KX
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                background: "linear-gradient(135deg, #0E3D2E, #155F44)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1,
              }}
            >
              Devora Laabs
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#6B6B6B",
                letterSpacing: 4,
                marginTop: 8,
              }}
            >
              BY KRONYX GROUP
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 900,
              color: "#0A0A0A",
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #0E3D2E, #155F44)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              We Build Digital
            </span>
            <span>Products That Scale</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#6B6B6B" }}>
            Web · iOS · Android · UI/UX · DevOps · AI · SaaS
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
