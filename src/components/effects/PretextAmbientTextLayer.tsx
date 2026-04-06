"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useRef } from "react";

type PretextAmbientTextLayerProps = {
  className?: string;
};

type ClusterConfig = {
  snippetIndex: number;
  xRatio: number;
  yRatio: number;
  widthRatio: number;
  heightRatio: number;
  alpha: number;
  drift: number;
  phase: number;
};

type RenderCluster = {
  x: number;
  y: number;
  lineHeight: number;
  alpha: number;
  drift: number;
  phase: number;
  lines: string[];
};

const SNIPPETS = [
  "Austin Fund backs university-affiliated founders at the earliest stages. We seek conviction before consensus and partner with technical teams building durable products that reshape entire industries.",
  "Markets evolve quickly. Enduring companies still begin with unusual insight, disciplined execution, and a culture that compounds. We invest where talent and mission intersect, seeking founders with domain depth.",
  "Pre-seed and seed teams need focused support: product iteration, recruiting, and go-to-market clarity. Great outcomes emerge from clear thinking, patient capital, and founders who refuse to settle.",
  "From first prototype to meaningful traction, we support founders who are thoughtful, curious, and persistent about solving difficult problems with real-world impact across every sector.",
  "Capital alone is insufficient. The earliest stages demand conviction, taste, and trust between investor and founder. We aim to be the first call and the most useful voice at the table.",
];

const CLUSTERS: ClusterConfig[] = [
  { snippetIndex: 0, xRatio: 0.03, yRatio: 0.08, widthRatio: 0.28, heightRatio: 0.35, alpha: 0.09, drift: 5, phase: 0.0 },
  { snippetIndex: 1, xRatio: 0.55, yRatio: 0.05, widthRatio: 0.38, heightRatio: 0.28, alpha: 0.08, drift: 4, phase: 1.2 },
  { snippetIndex: 2, xRatio: 0.04, yRatio: 0.55, widthRatio: 0.35, heightRatio: 0.35, alpha: 0.1, drift: 6, phase: 2.0 },
  { snippetIndex: 3, xRatio: 0.48, yRatio: 0.6, widthRatio: 0.42, heightRatio: 0.32, alpha: 0.08, drift: 4, phase: 3.3 },
  { snippetIndex: 4, xRatio: 0.3, yRatio: 0.32, widthRatio: 0.3, heightRatio: 0.25, alpha: 0.07, drift: 3, phase: 4.1 },
];

export default function PretextAmbientTextLayer({ className }: PretextAmbientTextLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let font = "";
    let isVisible = false;
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let clusters: RenderCluster[] = [];
    let frame = 0;

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (!isVisible || clusters.length === 0) return;

      context.font = font;
      context.fillStyle = "#EAEAEA";
      context.textBaseline = "top";

      for (let ci = 0; ci < clusters.length; ci++) {
        const cluster = clusters[ci]!;
        const driftY = reduceMotion
          ? 0
          : Math.sin(time * 0.00015 + cluster.phase) * cluster.drift;

        for (let li = 0; li < cluster.lines.length; li++) {
          const line = cluster.lines[li]!;
          const pulse = reduceMotion
            ? 1
            : 0.75 + 0.25 * Math.sin(time * 0.0008 + li * 0.35 + cluster.phase);
          const jitterX = reduceMotion
            ? 0
            : Math.sin(time * 0.00035 + li * 0.25 + cluster.phase) * 1;

          context.globalAlpha = cluster.alpha * pulse * (1 - li / (cluster.lines.length * 1.6));
          context.fillText(
            line,
            cluster.x + jitterX,
            cluster.y + driftY + li * cluster.lineHeight,
          );
        }
      }

      context.globalAlpha = 1;
    };

    const loop = (time: number) => {
      frame = 0;
      draw(time);
      if (isVisible && !reduceMotion) {
        frame = requestAnimationFrame(loop);
      }
    };

    const startLoop = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;

      if (!isVisible || reduceMotion) {
        draw(performance.now());
        return;
      }

      frame = requestAnimationFrame(loop);
    };

    const recompute = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(height * devicePixelRatio));
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      isVisible = width >= 900 && height >= 380;
      if (!isVisible) {
        clusters = [];
        startLoop();
        return;
      }

      const fontSize = width > 1520 ? 11 : width > 1100 ? 10 : 9;
      const lineHeight = Math.round(fontSize * 1.55);
      font = `300 ${fontSize}px "SF Mono", Menlo, Monaco, Consolas, monospace`;

      const preparedSnippets = SNIPPETS.map((s) => prepareWithSegments(s, font));

      clusters = CLUSTERS.map((cfg) => {
        const snippet = preparedSnippets[cfg.snippetIndex]!;
        const regionWidth = Math.max(200, Math.floor(width * cfg.widthRatio));
        const regionHeight = Math.max(80, Math.floor(height * cfg.heightRatio));
        const laidOut = layoutWithLines(snippet, regionWidth, lineHeight);
        const maxLines = Math.max(1, Math.floor(regionHeight / lineHeight));

        return {
          x: Math.floor(width * cfg.xRatio),
          y: Math.floor(height * cfg.yRatio),
          lineHeight,
          alpha: cfg.alpha,
          drift: cfg.drift,
          phase: cfg.phase,
          lines: laidOut.lines.slice(0, maxLines).map((l) => l.text),
        };
      });

      startLoop();
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      startLoop();
    };

    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(canvas);

    window.addEventListener("resize", recompute, { passive: true });
    mediaQuery.addEventListener("change", handleMotionChange);
    document.fonts.ready.then(recompute).catch(() => {});
    recompute();

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", recompute);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
