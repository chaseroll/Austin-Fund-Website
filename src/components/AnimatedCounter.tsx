"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Parsed =
  | { kind: "static"; value: string }
  | {
      kind: "numeric";
      target: number;
      prefix: string;
      suffix: string;
      isFloat: boolean;
    };

function parseValue(value: string): Parsed {
  const match = value.match(/[\d.]+/);
  if (!match) return { kind: "static", value };
  const numText = match[0];
  return {
    kind: "numeric",
    target: parseFloat(numText),
    prefix: value.slice(0, value.indexOf(numText)),
    suffix: value.slice(value.indexOf(numText) + numText.length),
    isFloat: numText.includes("."),
  };
}

function formatInitial(parsed: Parsed): string {
  if (parsed.kind === "static") return parsed.value;
  const zero = parsed.isFloat ? "0.0" : "0";
  return `${parsed.prefix}${zero}${parsed.suffix}`;
}

export default function AnimatedCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(() => formatInitial(parsed));

  useEffect(() => {
    if (!isInView) return;

    if (parsed.kind === "static") {
      const id = requestAnimationFrame(() => setDisplay(parsed.value));
      return () => cancelAnimationFrame(id);
    }

    const { target, prefix, suffix, isFloat } = parsed;
    const duration = 1200;
    const startTime = performance.now();
    let frame = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      const formatted = isFloat
        ? `${prefix}${current.toFixed(1)}${suffix}`
        : `${prefix}${Math.round(current)}${suffix}`;
      setDisplay(progress < 1 ? formatted : value);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [isInView, parsed, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
