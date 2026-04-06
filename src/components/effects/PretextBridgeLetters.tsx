"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useRef } from "react";

type PretextBridgeLettersProps = {
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

const BASE_WIDTH = 1000;
const BASE_HEIGHT = 360;
const FORM_DURATION_MS = 760;
const MAX_GLYPHS_DESKTOP = 3000;
const MAX_GLYPHS_MOBILE = 1700;

const GLOW_RADIUS = 180;
const GLOW_RADIUS_SQ = GLOW_RADIUS * GLOW_RADIUS;
const GLOW_PEAK = 0.56;
const LERP_IN = 0.18;
const LERP_OUT = 0.045;
const BASE_GLYPH_COLOR = "#8F8F8F";
const GLOW_GLYPH_COLOR = "#D0D0D0";

const MICRO_COPY = [
  "Austin Fund portfolio highlights ambitious teams building enduring products. ",
  "We back founders at pre-seed and seed with conviction before consensus. ",
  "From first prototype to category leadership, we partner long-term with builders. ",
  "University-affiliated founders solving meaningful problems across industries. ",
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

  const towers = [100, 260, 420, 580, 740, 900];
  const cableYTop = 110;
  const deckY = 200;
  const towerTop = 90;
  const towerBottom = 300;

  // Main deck + rail
  pushLine(points, stageCounts, 0, deckY, 1000, deckY, step, 1);
  pushLine(points, stageCounts, 0, deckY + 4, 1000, deckY + 4, step, 1);
  pushLine(points, stageCounts, 0, deckY - 8, 1000, deckY - 8, step, 2);
  for (let i = 0; i <= 80; i++) {
    const x = 12.5 * i;
    pushLine(points, stageCounts, x, deckY - 8, x, deckY, step * 1.4, 2);
  }

  // Towers
  for (let i = 0; i < towers.length; i++) {
    const tx = towers[i]!;
    pushLine(points, stageCounts, tx - 8, towerTop, tx - 8, towerBottom, step, 0);
    pushLine(points, stageCounts, tx + 8, towerTop, tx + 8, towerBottom, step, 0);
    pushLine(points, stageCounts, tx - 12, towerTop, tx + 12, towerTop, step, 0);
    pushLine(points, stageCounts, tx - 10, towerTop - 4, tx + 10, towerTop - 4, step, 0);
    pushLine(points, stageCounts, tx - 8, deckY - 20, tx + 8, deckY - 20, step, 1);
    pushLine(points, stageCounts, tx - 8, deckY + 30, tx + 8, deckY + 30, step, 1);
    pushRect(points, stageCounts, tx - 14, towerBottom - 4, 28, 8, step, 1);
    pushRect(points, stageCounts, tx - 18, towerBottom + 4, 36, 6, step, 1);
  }

  // Main suspension cables between towers
  for (let i = 0; i < towers.length - 1; i++) {
    const tx = towers[i]!;
    const nextTx = towers[i + 1]!;
    const midX = (tx + nextTx) / 2;
    const sagY = deckY - 6;
    pushQuadratic(points, stageCounts, tx, cableYTop, midX, sagY, nextTx, cableYTop, step, 3);
    pushQuadratic(
      points,
      stageCounts,
      tx,
      cableYTop + 8,
      midX,
      sagY + 6,
      nextTx,
      cableYTop + 8,
      step,
      3,
    );
  }

  // Vertical suspender cables
  for (let i = 0; i < towers.length - 1; i++) {
    const tx = towers[i]!;
    const nextTx = towers[i + 1]!;
    const span = nextTx - tx;
    const sagY = deckY - 6;
    for (let s = 1; s <= 7; s++) {
      const t = s / 8;
      const x = tx + span * t;
      const cableY =
        (1 - t) * (1 - t) * cableYTop +
        2 * (1 - t) * t * sagY +
        t * t * cableYTop;
      pushLine(points, stageCounts, x, cableY, x, deckY - 8, step * 1.4, 4);
    }
  }

  // Under-deck truss
  for (let i = 0; i < towers.length - 1; i++) {
    const tx = towers[i]!;
    const nextTx = towers[i + 1]!;
    const span = nextTx - tx;
    for (let s = 0; s < 5; s++) {
      const x1 = tx + (span * s) / 5;
      const x2 = tx + (span * (s + 1)) / 5;
      pushLine(points, stageCounts, x1, deckY + 4, x2, deckY + 20, step, 5);
      pushLine(points, stageCounts, x2, deckY + 4, x1, deckY + 20, step, 5);
    }
  }
  pushLine(points, stageCounts, 0, deckY + 20, 1000, deckY + 20, step, 5);

  // Foundation piers
  for (let i = 0; i < towers.length; i++) {
    const tx = towers[i]!;
    pushLine(points, stageCounts, tx - 12, towerBottom + 10, tx - 8, towerBottom + 50, step, 6);
    pushLine(points, stageCounts, tx + 12, towerBottom + 10, tx + 8, towerBottom + 50, step, 6);
    pushLine(points, stageCounts, tx - 8, towerBottom + 50, tx + 8, towerBottom + 50, step, 6);
  }

  return points;
}

export default function PretextBridgeLetters({ className }: PretextBridgeLettersProps) {
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

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
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

      const scale = Math.min(
        (width * 0.985) / BASE_WIDTH,
        (height * 0.92) / BASE_HEIGHT,
      );
      const offsetX = (width - BASE_WIDTH * scale) / 2;
      const offsetY = (height - BASE_HEIGHT * scale) / 2 + height * 0.02;
      const blueprint = buildBlueprint(4.8);

      const fontSize = clamp(5.1 * scale + 1.6, 5.4, 9.2);
      const lineHeight = Math.round(fontSize * 1.35);
      microFont = `400 ${fontSize}px "SF Mono", Menlo, Monaco, Consolas, monospace`;

      const prepared = prepareWithSegments(`${MICRO_COPY} `.repeat(80), microFont);
      const streamLayout = layoutWithLines(
        prepared,
        Math.max(220, Math.floor(width * 0.78)),
        lineHeight,
      );
      const stream = streamLayout.lines
        .map((line) => line.text)
        .join("")
        .replace(/[^A-Za-z]/g, "");
      if (!stream) return;

      const drafted: Glyph[] = blueprint.map((point, index) => {
        const x = offsetX + point.x * scale;
        const y = offsetY + point.y * scale;
        const fromX = x + (Math.random() - 0.5) * 3 * scale;
        const fromY = y + (point.isGrid ? 10 : 18) * scale + Math.random() * 4 * scale;
        return {
          char: stream[index % stream.length]!,
          x,
          y,
          fromX,
          fromY,
          delay: point.stage * 105 + point.order * 0.08,
          isGrid: Boolean(point.isGrid),
          glow: 0,
        };
      });

      const unique: Glyph[] = [];
      const seen = new Set<string>();
      for (let i = 0; i < drafted.length; i++) {
        const glyph = drafted[i]!;
        const key = `${Math.round(glyph.x * 1.6)}:${Math.round(glyph.y * 1.6)}`;
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
      const fadeStart = height * 0.6;
      const fadeEnd = height * 0.9;
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
        const target =
          distSq < GLOW_RADIUS_SQ
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
      const animationEnd = FORM_DURATION_MS + maxDelay + 140;
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

