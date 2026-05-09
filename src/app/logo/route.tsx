import { ImageResponse } from "next/og";
import { capitolElements } from "./capitol";

export const runtime = "edge";

const FONT_URLS = {
  200: "https://fonts.cdnfonts.com/s/85793/GeneralSans-Extralight.woff",
  300: "https://fonts.cdnfonts.com/s/85793/GeneralSans-Light.woff",
  500: "https://fonts.cdnfonts.com/s/85793/GeneralSans-Medium.woff",
} as const;

async function fetchFont(weight: 200 | 300 | 500): Promise<ArrayBuffer> {
  const response = await fetch(FONT_URLS[weight]);
  if (!response.ok) {
    throw new Error(`Font fetch failed for weight ${weight}: ${response.status}`);
  }
  return response.arrayBuffer();
}

function clampSize(raw: string | null, fallback: number): number {
  const parsed = parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(2400, Math.max(64, parsed));
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const size = clampSize(searchParams.get("size"), 1200);
  const variant = searchParams.get("variant") === "light" ? "light" : "dark";
  const rawKind = searchParams.get("kind");
  const kind: "mark" | "lockup" | "banner" =
    rawKind === "lockup" ? "lockup" : rawKind === "banner" ? "banner" : "mark";
  const pattern = searchParams.get("pattern") === "capitol" ? "capitol" : "none";
  const bare = searchParams.get("bare") === "1";
  const rawRatio = parseFloat(searchParams.get("ratio") ?? "");
  const ratio =
    Number.isFinite(rawRatio) && rawRatio >= 1.5 && rawRatio <= 12
      ? rawRatio
      : 4;

  const bg = variant === "light" ? "#F5F4F0" : "#000000";
  const fg = variant === "light" ? "#0D0E0A" : "#EAEAEA";

  if (kind === "banner") {
    const [extralight, light, medium] = await Promise.all([
      fetchFont(200),
      fetchFont(300),
      fetchFont(500),
    ]);

    const height = size;
    const width = Math.round(size * ratio);
    const markFontSize = height * 0.3;
    const wordmarkFontSize = height * 0.055;
    const taglineFontSize = height * 0.034;
    const gap = height * 0.06;
    const dividerHeight = height * 0.18;
    const hairlineWidth = width * 0.04;

    const capitolHeight = height * 0.96;
    const capitolWidth = capitolHeight * (500 / 362);
    const capitolStroke = Math.max(1.4, (362 / capitolHeight) * 1.4);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: bg,
            color: fg,
            fontFamily: "General Sans",
            position: "relative",
          }}
        >
          {pattern === "capitol" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width={capitolWidth}
                height={capitolHeight}
                viewBox="0 48 500 362"
                style={{ opacity: bare ? 0.32 : 0.14 }}
              >
                {capitolElements(fg, capitolStroke)}
              </svg>
            </div>
          )}
          <div
            style={{
              display: bare ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${hairlineWidth}px`,
                height: "1px",
                background: fg,
                opacity: 0.35,
                marginBottom: `${height * 0.09}px`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontWeight: 200,
                  fontSize: `${markFontSize}px`,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  paddingBottom: `${height * 0.015}px`,
                }}
              >
                A
              </div>
              <div
                style={{
                  width: "1px",
                  height: `${dividerHeight}px`,
                  background: fg,
                  opacity: 0.25,
                  margin: `0 ${gap}px`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontWeight: 500,
                  fontSize: `${wordmarkFontSize}px`,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Austin Fund
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontWeight: 300,
                fontSize: `${taglineFontSize}px`,
                letterSpacing: "0.01em",
                marginTop: `${height * 0.085}px`,
                opacity: 0.65,
              }}
            >
              Pre-seed & seed venture capital for founders at the University of Austin.
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
        fonts: [
          { name: "General Sans", data: extralight, weight: 200, style: "normal" },
          { name: "General Sans", data: light, weight: 300, style: "normal" },
          { name: "General Sans", data: medium, weight: 500, style: "normal" },
        ],
      },
    );
  }

  if (kind === "lockup") {
    const [extralight, medium] = await Promise.all([
      fetchFont(200),
      fetchFont(500),
    ]);

    const width = Math.round(size * 2.8);
    const markFontSize = size * 0.58;
    const wordmarkFontSize = size * 0.11;
    const gap = size * 0.09;
    const dividerHeight = size * 0.3;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: bg,
            color: fg,
            fontFamily: "General Sans",
          }}
        >
          <div
            style={{
              display: "flex",
              fontWeight: 200,
              fontSize: `${markFontSize}px`,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              paddingBottom: `${size * 0.03}px`,
            }}
          >
            A
          </div>
          <div
            style={{
              width: "1px",
              height: `${dividerHeight}px`,
              background: fg,
              opacity: 0.25,
              margin: `0 ${gap}px`,
            }}
          />
          <div
            style={{
              display: "flex",
              fontWeight: 500,
              fontSize: `${wordmarkFontSize}px`,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Austin Fund
          </div>
        </div>
      ),
      {
        width,
        height: size,
        fonts: [
          { name: "General Sans", data: extralight, weight: 200, style: "normal" },
          { name: "General Sans", data: medium, weight: 500, style: "normal" },
        ],
      },
    );
  }

  const extralight = await fetchFont(200);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          color: fg,
          fontFamily: "General Sans",
          fontWeight: 200,
          fontSize: `${size * 0.58}px`,
          letterSpacing: "-0.02em",
          paddingBottom: `${size * 0.025}px`,
          lineHeight: 1,
        }}
      >
        A
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [
        { name: "General Sans", data: extralight, weight: 200, style: "normal" },
      ],
    },
  );
}
