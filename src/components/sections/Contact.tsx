"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-60px" as const };

export default function Contact() {
  return (
    <footer className="relative bg-[#0A0A0A] text-[#EAEAEA]">
      <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <div className="border-t border-[#EAEAEA]/[0.06] py-10 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="flex max-w-md flex-col items-center gap-2.5 text-center">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#EAEAEA]">
                Austin Fund
              </span>
              <p className="max-w-sm text-[13px] font-light leading-relaxed text-[#EAEAEA]/75">
                Pre-seed and seed stage venture capital backing
                university-affiliated founders.
              </p>
              <a
                href="mailto:info@uaustin.fund"
                className="group mt-1 inline-flex w-fit items-center gap-2 text-[13px] font-light text-[#EAEAEA]/70 transition-colors duration-500 hover:text-[#EAEAEA]"
              >
                <span className="relative">
                  info@uaustin.fund
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#EAEAEA]/50 transition-all duration-500 group-hover:w-full" />
                </span>
                <svg
                  className="h-3 w-3 opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </footer>
  );
}
