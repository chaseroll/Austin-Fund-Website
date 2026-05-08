import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Austin Fund · Pre-seed and seed venture capital for founders at the University of Austin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// General Sans isn't on Google Fonts, so we substitute Inter at the
// equivalent weights/tracking. The exact glyph set used in the layout
// is small, but we ship a generous ASCII subset so future copy tweaks
// don't silently break the render.
const FONT_TEXT =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,-·";

async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Failed to load font: ${family}`);
  return (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  const [interLight, interRegular, interMedium] = await Promise.all([
    loadGoogleFont("Inter:wght@200", FONT_TEXT),
    loadGoogleFont("Inter:wght@400", FONT_TEXT),
    loadGoogleFont("Inter:wght@500", FONT_TEXT),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px 80px",
          fontFamily: "Inter",
          color: "#F5F5F5",
          position: "relative",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: "#9A9A9A",
            textTransform: "uppercase",
          }}
        >
          Austin Fund · Fund I
        </div>

        {/* Headline + subline block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 200,
              fontWeight: 200,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              color: "#F5F5F5",
            }}
          >
            Austin Fund
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 400,
              lineHeight: 1.3,
              color: "#B8B8B8",
              maxWidth: 880,
            }}
          >
            Pre-seed and seed venture capital for founders at the University of
            Austin.
          </div>
        </div>

        {/* Bottom meta with hairline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.10)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#6E6E6E",
                textTransform: "uppercase",
              }}
            >
              Pre-seed · Seed
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 500,
                color: "#F5F5F5",
                letterSpacing: "-0.005em",
              }}
            >
              uaustin.fund
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interLight, weight: 200, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
