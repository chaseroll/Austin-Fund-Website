"use client";

import { useEffect, useRef } from "react";
import { mountCapitol } from "./capitol-model";

export default function CapitolModel() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hostRef.current) return mountCapitol(hostRef.current);
  }, []);

  return (
    <div ref={hostRef} className="capitol-model" aria-hidden="true">
      {/* This local silhouette remains visible until the first canvas frame. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/architecture/capitol.svg" alt="" />
      <canvas />
    </div>
  );
}
