"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-80px" as const };

const placeholders = Array.from({ length: 6 }, (_, i) => i);

export default function PortfolioGrid() {
  return (
    <section className="relative bg-[#0A0A0A] pb-24 pt-8 md:pb-32 md:pt-12">
      <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={ov}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10 flex items-center justify-center gap-4"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-6 origin-center bg-[#EAEAEA]/10"
          />
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#EAEAEA]/50">
            Investments
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-6 origin-center bg-[#EAEAEA]/10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col items-center justify-center text-center"
        >
          <p className="text-lg font-light tracking-tight text-[#EAEAEA]/70 md:text-xl">
            Companies announcing soon.
          </p>
          <p className="mt-3 max-w-md text-sm font-light leading-[1.8] tracking-wide text-[#EAEAEA]/55">
            We&apos;re finalizing public portfolio announcements and will share
            them here shortly.
          </p>
        </motion.div>

        <div className="space-y-0">
          {placeholders.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: 0.05 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-[#EAEAEA]/[0.06] py-7 md:py-8"
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="text-[11px] font-light tabular-nums tracking-wider text-[#EAEAEA]/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="h-[1.125rem] w-36 rounded bg-[#EAEAEA]/[0.04] md:w-48" />
                    <div className="h-3 w-48 rounded bg-[#EAEAEA]/[0.025] md:w-64" />
                  </div>
                  <div className="h-5 w-16 rounded-full bg-[#EAEAEA]/[0.03] md:w-20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
