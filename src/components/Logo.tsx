import type { CSSProperties } from "react";

type LogoVariant = "mark" | "lockup" | "wordmark";

type LogoProps = {
  variant?: LogoVariant;
  markSize?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Logo({
  variant = "lockup",
  markSize = 22,
  className,
  style,
}: LogoProps) {
  const mark = (
    <span
      aria-hidden={variant === "lockup"}
      style={{
        fontWeight: 200,
        fontSize: `${markSize}px`,
        lineHeight: 1,
        letterSpacing: "-0.03em",
        display: "inline-block",
      }}
    >
      A
    </span>
  );

  const wordmark = (
    <span className="text-[11px] font-medium uppercase tracking-[0.22em] leading-none">
      Austin Fund
    </span>
  );

  if (variant === "mark") {
    return (
      <span
        aria-label="Austin Fund"
        role="img"
        className={className}
        style={style}
      >
        {mark}
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={className} style={style}>
        {wordmark}
      </span>
    );
  }

  return (
    <span
      aria-label="Austin Fund"
      role="img"
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      style={style}
    >
      {mark}
      <span
        aria-hidden
        className="inline-block h-[16px] w-px bg-current opacity-25"
      />
      {wordmark}
    </span>
  );
}
