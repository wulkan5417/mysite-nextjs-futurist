import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = "OG";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export async function GET() {
  const bg = "#0B1020";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          color: "white",
          fontFamily: "Inter, system-ui, Arial",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(800px 400px at 20% 10%, rgba(59,130,246,.35), transparent), radial-gradient(800px 400px at 80% 90%, rgba(168,85,247,.35), transparent)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 28, opacity: 0.9, marginTop: 10 }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    size
  );
}