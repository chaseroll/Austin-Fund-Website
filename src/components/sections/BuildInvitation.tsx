"use client";

import { useEffect, useRef } from "react";
import { mountBuildField } from "../effects/build-field";

export default function BuildInvitation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) return mountBuildField(sectionRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="build-invitation"
      aria-labelledby="build-title"
    >
      <canvas className="build-letter-field" aria-hidden="true" />
      <div className="build-invitation-copy">
        <h2 id="build-title">What will <em>you build?</em></h2>
        <a className="contact-link" href="mailto:info@uaustin.fund">
          Get in touch
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </section>
  );
}
