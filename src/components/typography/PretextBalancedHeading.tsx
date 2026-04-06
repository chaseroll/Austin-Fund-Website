"use client";

import { layoutWithLines, prepareWithSegments, type LayoutLine } from "@chenglou/pretext";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ViewportConfig = {
  once?: boolean;
  margin?: string;
};

type PretextBalancedHeadingProps = {
  text: string;
  className?: string;
  viewport?: ViewportConfig;
  center?: boolean;
  minWidthRatio?: number;
  shrinkStep?: number;
};

const headingContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
};

const headingLine = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type BalancedResult = {
  lines: string[];
  maxWidth: number | null;
};

function parsePx(value: string, fallback: number): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getFontFromComputedStyle(styles: CSSStyleDeclaration): string {
  const style = styles.fontStyle || "normal";
  const variant = styles.fontVariant || "normal";
  const weight = styles.fontWeight || "400";
  const size = styles.fontSize || "16px";
  const family = styles.fontFamily || "sans-serif";
  return `${style} ${variant} ${weight} ${size} ${family}`;
}

function arraysEqual(left: string[], right: string[]): boolean {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index++) {
    if (left[index] !== right[index]) return false;
  }
  return true;
}

function scoreLayout(lines: LayoutLine[], fullWidth: number, candidateWidth: number): number {
  const widths = lines.map((line) => line.width);
  const widestLine = Math.max(...widths);
  const narrowestLine = Math.min(...widths);
  const lastLineWidth = widths[widths.length - 1] ?? widestLine;

  const raggedness = widestLine - narrowestLine;
  const shortLastLinePenalty = Math.max(0, widestLine * 0.55 - lastLineWidth);
  const squeezePenalty = Math.max(0, fullWidth - candidateWidth) * 0.09;

  return raggedness + shortLastLinePenalty * 1.4 + squeezePenalty;
}

function computeBalancedLines(
  text: string,
  font: string,
  availableWidth: number,
  lineHeight: number,
  minWidthRatio: number,
  shrinkStep: number,
): BalancedResult {
  const safeWidth = Math.max(1, Math.floor(availableWidth));
  const prepared = prepareWithSegments(text, font);
  const baseline = layoutWithLines(prepared, safeWidth, lineHeight);
  if (baseline.lines.length <= 1) {
    return {
      lines: baseline.lines.map((line) => line.text.trimEnd()),
      maxWidth: safeWidth,
    };
  }

  const minWidth = Math.max(220, Math.floor(safeWidth * minWidthRatio));
  let bestLines = baseline.lines;
  let bestWidth = safeWidth;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let width = safeWidth; width >= minWidth; width -= shrinkStep) {
    const candidate = layoutWithLines(prepared, width, lineHeight);
    if (candidate.lines.length !== baseline.lines.length) continue;

    const score = scoreLayout(candidate.lines, safeWidth, width);
    if (score < bestScore) {
      bestScore = score;
      bestLines = candidate.lines;
      bestWidth = width;
    }
  }

  return {
    lines: bestLines.map((line) => line.text.trimEnd()),
    maxWidth: bestWidth,
  };
}

export default function PretextBalancedHeading({
  text,
  className,
  viewport,
  center = false,
  minWidthRatio = 0.68,
  shrinkStep = 6,
}: PretextBalancedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [balanced, setBalanced] = useState<BalancedResult>({
    lines: [text],
    maxWidth: null,
  });

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const width = heading.parentElement?.clientWidth ?? heading.clientWidth;
      if (width <= 0) return;

      const styles = window.getComputedStyle(heading);
      const fontSize = parsePx(styles.fontSize, 16);
      const lineHeight = styles.lineHeight === "normal"
        ? Math.round(fontSize * 1.15)
        : Math.round(parsePx(styles.lineHeight, fontSize * 1.15));
      const font = getFontFromComputedStyle(styles);

      const next = computeBalancedLines(
        text,
        font,
        width,
        lineHeight,
        minWidthRatio,
        shrinkStep,
      );

      setBalanced((previous) => {
        if (previous.maxWidth === next.maxWidth && arraysEqual(previous.lines, next.lines)) {
          return previous;
        }
        return next;
      });
    };

    const scheduleMeasure = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(heading);

    const fonts = document.fonts;
    fonts.ready.then(scheduleMeasure).catch(() => {});

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [text, minWidthRatio, shrinkStep]);

  const headingStyle = balanced.maxWidth === null
    ? undefined
    : center
      ? { maxWidth: `${balanced.maxWidth}px`, marginInline: "auto" as const }
      : { maxWidth: `${balanced.maxWidth}px` };

  return (
    <motion.h2
      ref={headingRef}
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      style={headingStyle}
    >
      {balanced.lines.map((line, index) => (
        <motion.span
          key={`${line}-${index}`}
          variants={headingLine}
          className="block"
        >
          {line}
        </motion.span>
      ))}
    </motion.h2>
  );
}
