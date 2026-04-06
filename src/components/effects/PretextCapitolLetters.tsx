"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useRef } from "react";

type PretextCapitolLettersProps = {
  className?: string;
};

type BlueprintPoint = {
  x: number;
  y: number;
  stage: number;
  order: number;
  isGrid?: boolean;
};

type Glyph = {
  char: string;
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  delay: number;
  isGrid: boolean;
  glow: number;
};

const BASE_SIZE = 500;
const FORM_DURATION_MS = 720;
const MAX_GLYPHS_DESKTOP = 3000;
const MAX_GLYPHS_MOBILE = 1700;

const GLOW_RADIUS = 180;
const GLOW_RADIUS_SQ = GLOW_RADIUS * GLOW_RADIUS;
const GLOW_PEAK = 0.65;
const LERP_IN = 0.18;
const LERP_OUT = 0.045;
const BASE_GLYPH_COLOR = "#8F8F8F";
const GLOW_GLYPH_COLOR = "#D0D0D0";

const MICRO_COPY = [
  "Austin Fund backs university-affiliated founders at the earliest stages. ",
  "Conviction before consensus with product depth and execution discipline. ",
  "Patient capital for ambitious builders from prototype through scale. ",
  "University of Austin teams building durable category-defining companies. ",
].join("");

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number): number {
  const inv = 1 - t;
  return 1 - inv * inv * inv;
}

function pushLine(
  points: BlueprintPoint[],
  stageCounts: number[],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  step: number,
  stage: number,
  isGrid = false,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const segments = Math.max(1, Math.floor(len / step));
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    points.push({
      x: x1 + dx * t,
      y: y1 + dy * t,
      stage,
      order: stageCounts[stage] ?? 0,
      isGrid,
    });
    stageCounts[stage] = (stageCounts[stage] ?? 0) + 1;
  }
}

function pushRect(
  points: BlueprintPoint[],
  stageCounts: number[],
  x: number,
  y: number,
  w: number,
  h: number,
  step: number,
  stage: number,
  isGrid = false,
) {
  pushLine(points, stageCounts, x, y, x + w, y, step, stage, isGrid);
  pushLine(points, stageCounts, x + w, y, x + w, y + h, step, stage, isGrid);
  pushLine(points, stageCounts, x + w, y + h, x, y + h, step, stage, isGrid);
  pushLine(points, stageCounts, x, y + h, x, y, step, stage, isGrid);
}

function pushQuadratic(
  points: BlueprintPoint[],
  stageCounts: number[],
  startX: number,
  startY: number,
  controlX: number,
  controlY: number,
  endX: number,
  endY: number,
  step: number,
  stage: number,
) {
  const estimatedLength =
    Math.hypot(controlX - startX, controlY - startY) +
    Math.hypot(endX - controlX, endY - controlY);
  const segments = Math.max(4, Math.floor(estimatedLength / step));
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const omt = 1 - t;
    points.push({
      x: omt * omt * startX + 2 * omt * t * controlX + t * t * endX,
      y: omt * omt * startY + 2 * omt * t * controlY + t * t * endY,
      stage,
      order: stageCounts[stage] ?? 0,
    });
    stageCounts[stage] = (stageCounts[stage] ?? 0) + 1;
  }
}

function buildBlueprint(step: number): BlueprintPoint[] {
  const points: BlueprintPoint[] = [];
  const stageCounts: number[] = [];

  // Dome ornament (kept unchanged)
  pushLine(points, stageCounts, 250, 60, 250, 80, step, 0);
  pushQuadratic(points, stageCounts, 254, 56, 253, 59, 250, 60, step, 0);
  pushQuadratic(points, stageCounts, 250, 60, 247, 59, 246, 56, step, 0);
  pushQuadratic(points, stageCounts, 246, 56, 247, 53, 250, 52, step, 0);
  pushQuadratic(points, stageCounts, 250, 52, 253, 53, 254, 56, step, 0);

  // Dome outer / inner (kept unchanged)
  pushQuadratic(points, stageCounts, 200, 180, 200, 100, 250, 80, step, 1);
  pushQuadratic(points, stageCounts, 250, 80, 300, 100, 300, 180, step, 1);
  pushQuadratic(points, stageCounts, 210, 180, 210, 115, 250, 95, step, 2);
  pushQuadratic(points, stageCounts, 250, 95, 290, 115, 290, 180, step, 2);

  // Dome base band
  pushRect(points, stageCounts, 190, 180, 120, 12, step, 3);
  pushRect(points, stageCounts, 185, 192, 130, 6, step, 3);

  // Upper colonnade
  pushRect(points, stageCounts, 195, 198, 110, 60, step, 4);
  for (let i = 0; i < 8; i++) {
    const x = 205 + i * 13;
    pushLine(points, stageCounts, x, 202, x, 255, step, 4);
  }

  // Entablature + pediment
  pushRect(points, stageCounts, 180, 258, 140, 8, step, 5);
  pushLine(points, stageCounts, 180, 270, 320, 270, step, 5);
  pushLine(points, stageCounts, 175, 270, 250, 240, step, 5);
  pushLine(points, stageCounts, 250, 240, 325, 270, step, 5);

  // Main columns
  for (let i = 0; i < 10; i++) {
    const x = 180 + i * 16;
    pushLine(points, stageCounts, x, 270, x, 370, step, 6);
  }

  // Main base + wider steps
  pushRect(points, stageCounts, 142, 370, 216, 6, step, 7);
  pushRect(points, stageCounts, 136, 376, 228, 4, step, 7);
  for (let i = 0; i < 4; i++) {
    pushRect(points, stageCounts, 126 - i * 16, 384 + i * 8, 248 + i * 32, 6, step, 8);
  }

  // Left wing (extra wide)
  pushRect(points, stageCounts, 6, 300, 198, 70, step, 7);
  pushRect(points, stageCounts, 0, 296, 210, 4, step, 7);
  for (let i = 0; i < 10; i++) {
    const x = 18 + i * 20;
    pushLine(points, stageCounts, x, 304, x, 368, step, 7);
  }
  // Left outer pavilion roof (slightly pointed)
  pushQuadratic(points, stageCounts, 16, 300, 34, 276, 52, 300, step, 6);
  pushQuadratic(points, stageCounts, 16, 298, 34, 282, 52, 298, step, 6);
  pushLine(points, stageCounts, 10, 300, 58, 300, step, 6);
  pushLine(points, stageCounts, 34, 276, 34, 268, step, 6);

  // Right wing (extra wide)
  pushRect(points, stageCounts, 296, 300, 198, 70, step, 7);
  pushRect(points, stageCounts, 290, 296, 210, 4, step, 7);
  for (let i = 0; i < 10; i++) {
    const x = 308 + i * 20;
    pushLine(points, stageCounts, x, 304, x, 368, step, 7);
  }
  // Right outer pavilion roof (slightly pointed)
  pushQuadratic(points, stageCounts, 448, 300, 466, 276, 484, 300, step, 6);
  pushQuadratic(points, stageCounts, 448, 298, 466, 282, 484, 298, step, 6);
  pushLine(points, stageCounts, 442, 300, 490, 300, step, 6);
  pushLine(points, stageCounts, 466, 276, 466, 268, step, 6);

  // Wing bases
  pushRect(points, stageCounts, 0, 370, 210, 6, step, 8);
  pushRect(points, stageCounts, 290, 370, 210, 6, step, 8);

  return points;
}

export default function PretextCapitolLetters({ className }: PretextCapitolLettersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let startTime = 0;
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let glyphs: Glyph[] = [];
    let microFont = "";
    let maxDelay = 0;
    let settled = false;
    let mouseX = -9999;
    let mouseY = -9999;
    let hasGlow = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (settled && !hasGlow) {
        hasGlow = true;
        if (frame === 0) frame = requestAnimationFrame(glowLoop);
      }
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const smoothstep = (edge0: number, edge1: number, x: number): number => {
      const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
      return t * t * (3 - 2 * t);
    };

    const rebuild = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const scale = Math.min((width * 0.98) / BASE_SIZE, (height * 0.98) / BASE_SIZE);
      const offsetX = (width - BASE_SIZE * scale) / 2;
      const offsetY = (height - BASE_SIZE * scale) / 2;
      const blueprint = buildBlueprint(3.8);

      const fontSize = clamp(5.8 * scale + 1.6, 5.7, 9.6);
      const lineHeight = Math.round(fontSize * 1.35);
      microFont = `400 ${fontSize}px "SF Mono", Menlo, Monaco, Consolas, monospace`;

      const prepared = prepareWithSegments(`${MICRO_COPY} `.repeat(80), microFont);
      const streamLayout = layoutWithLines(prepared, Math.max(220, Math.floor(width * 0.75)), lineHeight);
      const stream = streamLayout.lines
        .map((line) => line.text)
        .join("")
        .replace(/[^A-Za-z]/g, "");
      if (!stream) return;

      const drafted: Glyph[] = blueprint.map((point, index) => {
        const x = offsetX + point.x * scale;
        const y = offsetY + point.y * scale;
        const fromX = x + (Math.random() - 0.5) * 2.4 * scale;
        const fromY = y + (point.isGrid ? 12 : 20) * scale + Math.random() * 4 * scale;
        return {
          char: stream[index % stream.length]!,
          x,
          y,
          fromX,
          fromY,
          delay: point.stage * 95 + point.order * 0.09,
          isGrid: Boolean(point.isGrid),
          glow: 0,
        };
      });

      const unique: Glyph[] = [];
      const seen = new Set<string>();
      for (let i = 0; i < drafted.length; i++) {
        const glyph = drafted[i]!;
        const key = `${Math.round(glyph.x * 1.8)}:${Math.round(glyph.y * 1.8)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        unique.push(glyph);
      }

      const maxGlyphs = width < 768 ? MAX_GLYPHS_MOBILE : MAX_GLYPHS_DESKTOP;
      if (unique.length > maxGlyphs) {
        const stride = unique.length / maxGlyphs;
        glyphs = [];
        for (let i = 0; i < maxGlyphs; i++) {
          glyphs.push(unique[Math.floor(i * stride)]!);
        }
      } else {
        glyphs = unique;
      }

      maxDelay = 0;
      for (let i = 0; i < glyphs.length; i++) {
        maxDelay = Math.max(maxDelay, glyphs[i]!.delay);
      }

      startTime = performance.now();
      settled = false;
      hasGlow = false;
    };

    const verticalFade = (y: number): number => {
      const fadeStart = height * 0.55;
      const fadeEnd = height * 0.85;
      if (y <= fadeStart) return 1;
      if (y >= fadeEnd) return 0;
      return 1 - (y - fadeStart) / (fadeEnd - fadeStart);
    };

    const drawWithGlow = (): boolean => {
      context.clearRect(0, 0, width, height);
      context.font = microFont;
      context.textBaseline = "middle";
      context.textAlign = "center";

      let anyGlowing = false;

      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i]!;
        const fade = verticalFade(glyph.y);
        if (fade <= 0) continue;

        const dx = glyph.x - mouseX;
        const dy = glyph.y - mouseY;
        const distSq = dx * dx + dy * dy;
        const target = distSq < GLOW_RADIUS_SQ
          ? smoothstep(1, 0, Math.sqrt(distSq) / GLOW_RADIUS) * GLOW_PEAK
          : 0;

        const lerpRate = target > glyph.glow ? LERP_IN : LERP_OUT;
        glyph.glow += (target - glyph.glow) * lerpRate;

        if (glyph.glow < 0.001) {
          glyph.glow = 0;
        } else {
          anyGlowing = true;
        }

        const baseAlpha = glyph.isGrid ? 0.06 : 0.24;
        const alpha = (baseAlpha + glyph.glow) * fade;

        context.globalAlpha = alpha;
        context.fillStyle = glyph.glow > 0.02 ? GLOW_GLYPH_COLOR : BASE_GLYPH_COLOR;
        context.fillText(glyph.char, glyph.x, glyph.y);
      }

      context.globalAlpha = 1;
      return anyGlowing || mouseX > -999;
    };

    const glowLoop = (_time: number) => {
      frame = 0;
      const keepGoing = drawWithGlow();
      if (keepGoing && !reduceMotion) {
        frame = requestAnimationFrame(glowLoop);
      }
    };

    const drawStatic = () => {
      context.clearRect(0, 0, width, height);
      context.font = microFont;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillStyle = BASE_GLYPH_COLOR;

      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i]!;
        const fade = verticalFade(glyph.y);
        if (fade <= 0) continue;
        context.globalAlpha = (glyph.isGrid ? 0.06 : 0.24) * fade;
        context.fillText(glyph.char, glyph.x, glyph.y);
      }
      context.globalAlpha = 1;
    };

    const drawEntrance = (time: number): boolean => {
      const elapsed = time - startTime;
      const animationEnd = FORM_DURATION_MS + maxDelay + 120;
      if (settled || elapsed >= animationEnd) {
        settled = true;
        drawStatic();
        return false;
      }

      context.clearRect(0, 0, width, height);
      context.font = microFont;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillStyle = BASE_GLYPH_COLOR;

      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i]!;
        const t = reduceMotion ? 1 : clamp((elapsed - glyph.delay) / FORM_DURATION_MS, 0, 1);
        if (t <= 0) continue;

        const eased = easeOutCubic(t);
        const x = glyph.fromX + (glyph.x - glyph.fromX) * eased;
        const y = glyph.fromY + (glyph.y - glyph.fromY) * eased;
        const fade = verticalFade(y);
        if (fade <= 0) continue;
        context.globalAlpha = (glyph.isGrid ? 0.07 : 0.26) * eased * fade;
        context.fillText(glyph.char, x, y);
      }
      context.globalAlpha = 1;
      return true;
    };

    const entranceLoop = (time: number) => {
      frame = 0;
      const keepAnimating = drawEntrance(time);
      if (!reduceMotion && keepAnimating) {
        frame = requestAnimationFrame(entranceLoop);
      }
    };

    const start = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
      if (reduceMotion) {
        settled = true;
        drawStatic();
        return;
      }
      frame = requestAnimationFrame(entranceLoop);
    };

    rebuild();
    start();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      start();
    };

    const resizeObserver = new ResizeObserver(() => {
      rebuild();
      start();
    });
    resizeObserver.observe(canvas);
    mediaQuery.addEventListener("change", onMotionChange);
    document.fonts.ready
      .then(() => {
        rebuild();
        start();
      })
      .catch(() => {});

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

