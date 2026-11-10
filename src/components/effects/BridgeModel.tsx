"use client";

import { useEffect, useRef } from "react";
import { mountLetterModel } from "./letter-model";
import { buildBridge } from "./bridge-model";

export default function BridgeModel({className = ""}: {className?: string}) {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hostRef.current) return mountLetterModel(hostRef.current, {
      baseWidth: 1050,
      baseHeight: 420,
      fitHeight: .92,
      fadeStart: .65,
      fadeLength: .29,
      restYaw: .32,
      restPitch: .26,
      loadGlyphs: buildBridge,
    });
  }, []);
  return <div ref={hostRef} className={`letter-model ${className}`} aria-hidden="true"><canvas /></div>;
}
