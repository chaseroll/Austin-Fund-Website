"use client";

import { memo } from "react";

const GrainOverlay = memo(function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.025]"
      aria-hidden="true"
    >
      <svg width="100%" height="100%" className="will-change-auto">
        <filter id="grain-global">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-global)" />
      </svg>
    </div>
  );
});

export default GrainOverlay;
