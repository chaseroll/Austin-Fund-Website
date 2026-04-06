"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  onFormed?: () => void;
};

type MosaicGlyph = {
  char: string;
  fromX: number;
  fromY: number;
  finalX: number;
  finalY: number;
  baseAlpha: number;
  delay: number;
  phase: number;
  isFund: boolean;
};

const FORM_DURATION_MS = 1900;
const MAX_GLYPHS_DESKTOP = 3200;
const MAX_GLYPHS_MOBILE = 1400;

const MICRO_TEXT = [
  "Austin Fund backs university-affiliated founders at the earliest stages. ",
  "Conviction before consensus. Product velocity with disciplined execution. ",
  "Patient capital, deep technical insight, and founder-first partnership. ",
  "From first prototype to meaningful traction, we support durable companies. ",
  "University of Austin founders building category-defining products. ",
].join("");

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number): number {
  const inv = 1 - t;
  return 1 - inv * inv * inv;
}

function sampleMaskAlpha(mask: Uint8ClampedArray, width: number, x: number, y: number): number {
  if (x < 0 || y < 0) return 0;
  const px = Math.floor(x);
  const py = Math.floor(y);
  const idx = (py * width + px) * 4 + 3;
  return mask[idx] ?? 0;
}

function sampleMaskHit(
  mask: Uint8ClampedArray,
  width: number,
  x: number,
  y: number,
  dx: number,
  dy: number,
): number {
  return Math.max(
    sampleMaskAlpha(mask, width, x, y),
    sampleMaskAlpha(mask, width, x + dx * 0.26, y),
    sampleMaskAlpha(mask, width, x - dx * 0.26, y),
    sampleMaskAlpha(mask, width, x, y + dy * 0.26),
    sampleMaskAlpha(mask, width, x, y - dy * 0.26),
  );
}

export default function PretextLetterCanvas({ text, className, onFormed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onFormedRef = useRef(onFormed);
  onFormedRef.current = onFormed;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let microFont = "";
    let glyphs: MosaicGlyph[] = [];
    let maxDelay = 0;
    let frame = 0;
    let startTime = 0;
    let formed = false;
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rebuild = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const headlineSize = isMobile
        ? clamp(width * 0.18, 58, 84)
        : clamp(width * 0.145, 112, 198);
      const bodyFamily = window.getComputedStyle(document.body).fontFamily || "Inter, system-ui, sans-serif";
      const normalHeadlineFont = `320 ${headlineSize}px ${bodyFamily}`;
      const italicHeadlineFont = `320 italic ${headlineSize}px ${bodyFamily}`;

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const maskCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.textBaseline = "top";

      const [leftWord, rightWord] = text.split(" ");
      if (!leftWord || !rightWord) return;

      maskCtx.font = normalHeadlineFont;
      const leftWidth = maskCtx.measureText(leftWord).width;
      const spaceWidth = maskCtx.measureText(" ").width;
      maskCtx.font = italicHeadlineFont;
      const rightWidth = maskCtx.measureText(rightWord).width;

      const totalWidth = leftWidth + spaceWidth + rightWidth;
      const wordStartX = Math.floor((width - totalWidth) / 2);
      const wordTop = Math.floor(height * 0.47 - headlineSize * 0.5);
      const rightStartX = wordStartX + leftWidth + spaceWidth;

      maskCtx.fillStyle = "#ffffff";
      maskCtx.font = normalHeadlineFont;
      maskCtx.fillText(leftWord, wordStartX, wordTop);
      maskCtx.font = italicHeadlineFont;
      maskCtx.fillText(rightWord, rightStartX, wordTop);
      const fullMask = maskCtx.getImageData(0, 0, width, height).data;

      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "#ffffff";
      maskCtx.font = italicHeadlineFont;
      maskCtx.fillText(rightWord, rightStartX, wordTop);
      const fundMask = maskCtx.getImageData(0, 0, width, height).data;

      const tinySize = isMobile ? 6.4 : width > 1400 ? 8.4 : 7.7;
      const lineHeight = Math.round(tinySize * 1.32);
      microFont = `400 ${tinySize}px "SF Mono", Menlo, Monaco, Consolas, monospace`;
      ctx.font = microFont;
      ctx.textBaseline = "top";

      const preparedText = prepareWithSegments(`${MICRO_TEXT} `.repeat(140), microFont);
      const wrapped = layoutWithLines(preparedText, Math.floor(width * 0.98), lineHeight);
      const characterStream = wrapped.lines
        .map((line) => line.text)
        .join(" ")
        .replace(/\s+/g, "");
      if (!characterStream) return;

      const gridStepX = Math.max(3.3, tinySize * 0.6);
      const gridStepY = Math.max(4.1, lineHeight * 0.74);
      const scanLeft = Math.max(4, wordStartX - tinySize * 0.35);
      const scanRight = Math.min(width - 4, wordStartX + totalWidth + tinySize * 0.35);
      const scanTop = Math.max(6, wordTop - lineHeight * 0.45);
      const scanBottom = Math.min(height - 6, wordTop + headlineSize + lineHeight * 0.45);

      const drafted: MosaicGlyph[] = [];
      let streamIndex = 0;
      for (let y = scanTop; y <= scanBottom; y += gridStepY) {
        for (let x = scanLeft; x <= scanRight; x += gridStepX) {
          const fullHit = sampleMaskHit(fullMask, width, x, y, gridStepX, gridStepY);
          if (fullHit <= 24) continue;

          const fundHit = sampleMaskHit(fundMask, width, x, y, gridStepX, gridStepY);
          const char = characterStream[streamIndex % characterStream.length]!;
          streamIndex++;

          drafted.push({
            char,
            fromX: x,
            fromY: y,
            finalX: x,
            finalY: y,
            baseAlpha: fundHit > 24 ? 0.74 : 0.98,
            delay: 0,
            phase: Math.random() * Math.PI * 2,
            isFund: fundHit > 24,
          });
        }
      }

      const maxGlyphs = isMobile ? MAX_GLYPHS_MOBILE : MAX_GLYPHS_DESKTOP;
      if (drafted.length > maxGlyphs) {
        const keepRatio = maxGlyphs / drafted.length;
        const reduced: MosaicGlyph[] = [];
        for (let i = 0; i < drafted.length; i++) {
          if (Math.random() < keepRatio) reduced.push(drafted[i]!);
        }
        while (reduced.length > maxGlyphs) {
          reduced.pop();
        }
        while (reduced.length < Math.min(maxGlyphs, drafted.length)) {
          reduced.push(drafted[Math.floor(Math.random() * drafted.length)]!);
        }
        glyphs = reduced;
      } else {
        glyphs = drafted;
      }

      const scatterX = isMobile ? width * 0.34 : width * 0.48;
      const scatterY = isMobile ? height * 0.28 : height * 0.38;
      maxDelay = 0;

      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i]!;
        const xBias = (glyph.finalX / Math.max(1, width)) * 220;
        const delay = Math.random() * 420 + xBias;
        glyph.delay = delay;
        if (delay > maxDelay) maxDelay = delay;

        const spread = 0.5 + Math.random() * 0.8;
        glyph.fromX = glyph.finalX + (Math.random() - 0.5) * scatterX * spread;
        glyph.fromY = glyph.finalY + (Math.random() - 0.5) * scatterY * spread;
      }

      startTime = performance.now();
      formed = false;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = time - startTime;
      ctx.font = microFont;
      ctx.textBaseline = "top";

      for (let index = 0; index < glyphs.length; index++) {
        const glyph = glyphs[index]!;
        const t = reduceMotion
          ? 1
          : clamp((elapsed - glyph.delay) / FORM_DURATION_MS, 0, 1);
        const eased = easeOutCubic(t);
        const x = glyph.fromX + (glyph.finalX - glyph.fromX) * eased;
        const y = glyph.fromY + (glyph.finalY - glyph.fromY) * eased;

        let alpha = glyph.baseAlpha * eased;
        if (t >= 1 && !reduceMotion) {
          alpha *= 0.94 + 0.06 * Math.sin(time * 0.001 + glyph.phase);
        }
        if (alpha < 0.01) continue;

        ctx.fillStyle = glyph.isFund ? "#6B6D63" : "#EAEAE9";
        ctx.globalAlpha = alpha;
        ctx.fillText(glyph.char, x, y);
      }
      ctx.globalAlpha = 1;

      if (!formed && elapsed > FORM_DURATION_MS + maxDelay + 120) {
        formed = true;
        onFormedRef.current?.();
      }
    };

    const loop = (time: number) => {
      frame = 0;
      draw(time);
      if (!reduceMotion) {
        frame = requestAnimationFrame(loop);
      }
    };

    const start = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
      if (reduceMotion) {
        draw(startTime + FORM_DURATION_MS + maxDelay + 200);
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    rebuild();
    start();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
      start();
    };

    const observer = new ResizeObserver(() => {
      rebuild();
      start();
    });
    observer.observe(canvas);
    mediaQuery.addEventListener("change", onMotionChange);
    document.fonts.ready
      .then(() => {
        rebuild();
        start();
      })
      .catch(() => {});

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      observer.disconnect();
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, [text]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
