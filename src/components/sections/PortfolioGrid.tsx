"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-80px" as const };
const ease = [0.22, 1, 0.36, 1] as const;

const placeholders = Array.from({ length: 6 }, (_, i) => i);

export default function PortfolioGrid() {
  return (
    <section className="relative bg-[#000000] pt-12 pb-[var(--section-y)] md:pt-16 md:pb-[var(--section-y-lg)]">
      <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="mb-12 flex flex-col items-center justify-center text-center md:mb-14"
        >
          <h2 className="font-display text-[clamp(1.65rem,3.2vw,2.5rem)] font-light leading-[1.08] tracking-[-0.025em] text-[#EAEAEA]/95">
            Companies announcing soon.
          </h2>
          <p className="editorial-body mt-5 max-w-[44ch] text-[var(--color-mute-dark)]">
            We&apos;re finalizing public portfolio announcements and will share
            them here shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative"
        >
          {/* Liquid Glass surface */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[24px] bg-[#EAEAEA]/[0.025]"
            style={{
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-[var(--color-hair-dark-strong)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-[24px] bg-gradient-to-b from-[#EAEAEA]/[0.04] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -bottom-10 -top-2 rounded-[36px]"
            style={{
              boxShadow:
                "0 30px 80px -30px rgba(0, 0, 0, 0.45), 0 12px 24px -16px rgba(0, 0, 0, 0.25)",
            }}
          />

          <ul className="relative overflow-hidden rounded-[24px]">
            {placeholders.map((i) => (
              <li
                key={i}
                className={`group relative px-6 py-6 transition-colors duration-[var(--dur-default)] ease-[var(--ease-standard)] hover:bg-[#EAEAEA]/[0.025] md:px-8 md:py-7 ${
                  i !== 0 ? "border-t border-[var(--color-hair-dark)]" : ""
                }`}
                style={{
                  animation: `fadeInUp 0.5s var(--ease-emphasized) ${0.05 + i * 0.04}s both`,
                }}
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="eyebrow tabular-nums text-[var(--color-mute-dark-2)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="shimmer h-[1.125rem] w-36 rounded-md md:w-48" />
                      <div className="shimmer h-3 w-48 rounded-md opacity-70 md:w-64" />
                    </div>
                    <div className="shimmer h-5 w-16 rounded-full md:w-20" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
