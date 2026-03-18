"use client";

import { motion } from "framer-motion";

const ov = { once: true, margin: "-80px" as const };

export default function Contact() {
  return (
    <footer className="relative bg-[#0D0E0A] text-[#EAEAE9]">
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={ov}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-left bg-[#EAEAE9]/[0.06]"
        />

        <div className="py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ov}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
                Austin Fund
              </span>
              <p className="mt-1 max-w-xs text-[13px] font-light leading-relaxed text-[#EAEAE9]/30">
                Pre-seed and seed stage investments in University of Austin
                affiliated founding teams.
              </p>
              <a
                href="mailto:innovation.fund@uaustin.org"
                className="group mt-3 inline-flex w-fit items-center gap-2 text-[13px] font-light text-[#EAEAE9]/50 transition-colors duration-500 hover:text-[#EAEAE9]/90"
              >
                <span className="relative">
                  innovation.fund@uaustin.org
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#EAEAE9]/40 transition-all duration-500 group-hover:w-full" />
                </span>
                <svg
                  className="h-3 w-3 opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
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

            <div className="flex flex-col gap-6 md:flex-row md:gap-16">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#EAEAE9]/25">
                  Navigate
                </span>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Portfolio", href: "/portfolio" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group relative w-fit text-[13px] font-light text-[#EAEAE9]/40 transition-colors duration-300 hover:text-[#EAEAE9]/90"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#EAEAE9]/40 transition-all duration-300 group-hover:w-full" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#EAEAE9]/25">
                  Connect
                </span>
                <div className="flex flex-col gap-2.5">
                  {[
                    {
                      label: "Website",
                      href: "https://fund.ilabs.uaustin.org",
                    },
                    {
                      label: "LinkedIn",
                      href: "https://linkedin.com/innovation-fund",
                    },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-fit items-center gap-1.5 text-[13px] font-light text-[#EAEAE9]/40 transition-colors duration-300 hover:text-[#EAEAE9]/90"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#EAEAE9]/40 transition-all duration-300 group-hover:w-full" />
                      </span>
                      <svg
                        className="h-2.5 w-2.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
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
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-[#EAEAE9]/[0.04] py-6">
          <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <p className="text-[10px] font-light tracking-wider text-[#EAEAE9]/25">
              &copy; {new Date().getFullYear()} Austin Fund. University of
              Austin.
            </p>
            <p className="text-[10px] font-light tracking-wider text-[#EAEAE9]/15">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
