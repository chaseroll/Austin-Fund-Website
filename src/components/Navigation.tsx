"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const isPortfolio = pathname === "/portfolio";
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 20);

    if (isPortfolio) {
      setIsDark(true);
      return;
    }

    const lightSection = document.querySelector("[data-theme='light']");
    if (!lightSection) {
      const heroEl = document.querySelector("section");
      if (heroEl) setIsDark(heroEl.getBoundingClientRect().bottom > 60);
      return;
    }

    const rect = lightSection.getBoundingClientRect();
    setIsDark(rect.top > 60 || rect.bottom < 60);
  }, [isPortfolio]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkBase = "relative text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-500";

  const linkClass = (active: boolean) =>
    `${linkBase} ${
      active
        ? isDark ? "text-[#EAEAEA]" : "text-[#0D0E0A]"
        : isDark
          ? "text-[#EAEAEA]/40 hover:text-[#EAEAEA]"
          : "text-[#0D0E0A]/40 hover:text-[#0D0E0A]"
    }`;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark ? "text-[#EAEAEA]" : "text-[#0D0E0A]"
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            scrolled
              ? isDark
                ? "bg-[#000000]/[0.04] backdrop-blur-[3px] backdrop-saturate-[1.1]"
                : "bg-[#f5f4f0]/[0.02] backdrop-blur-[3px] backdrop-saturate-[1.2]"
              : ""
          }`}
        />

        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        } ${isDark ? "bg-[#EAEAEA]/[0.06]" : "bg-[#0D0E0A]/[0.06]"}`} />

        <div className="relative mx-auto flex items-center justify-between px-6 py-5 md:px-16 md:py-6 lg:px-24">
          <a
            href="/"
            className="group text-[11px] font-medium tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-70"
          >
            Austin Fund
          </a>

          <div className="hidden items-center gap-12 md:flex">
            <a href="/portfolio" className={linkClass(pathname === "/portfolio")}>
              Portfolio
              {pathname === "/portfolio" && (
                <motion.div
                  layoutId="nav-indicator"
                  className={`absolute -bottom-1 left-0 right-0 h-px ${
                    isDark ? "bg-[#EAEAEA]/40" : "bg-[#0D0E0A]/40"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
            <a
              href="mailto:info@uaustin.fund"
              className={linkClass(false)}
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`block h-px w-5 origin-center transition-colors duration-500 ${
                mobileOpen ? "bg-[#EAEAEA]" : isDark ? "bg-[#EAEAEA]" : "bg-[#0D0E0A]"
              }`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className={`block h-px w-5 origin-center transition-colors duration-500 ${
                isDark ? "bg-[#EAEAEA]" : "bg-[#0D0E0A]"
              }`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`block h-px w-5 origin-center transition-colors duration-500 ${
                mobileOpen ? "bg-[#EAEAEA]" : isDark ? "bg-[#EAEAEA]" : "bg-[#0D0E0A]"
              }`}
            />
          </button>
        </div>

      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#000000]"
          >
            <div className="flex h-full flex-col items-start justify-center px-8">
              {[
                { label: "Home", href: "/", delay: 0.1 },
                { label: "Portfolio", href: "/portfolio", delay: 0.15 },
                { label: "Contact", href: "mailto:info@uaustin.fund", delay: 0.2 },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{
                    duration: 0.5,
                    delay: item.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group py-4 text-4xl font-light tracking-tight text-[#EAEAEA] transition-opacity hover:opacity-60"
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-[#4A4A4A]" />
                  )}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-16 border-t border-[#EAEAEA]/10 pt-6"
              >
                <p className="text-xs font-light tracking-wider text-[#EAEAEA]/30">
                  info@uaustin.fund
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
