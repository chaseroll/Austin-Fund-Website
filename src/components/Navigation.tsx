"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.querySelector("section");
      if (!heroEl) return;
      setIsDark(heroEl.getBoundingClientRect().bottom > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-colors duration-500 md:px-12 md:py-8 ${
        isDark ? "text-white" : "text-foreground"
      }`}
    >
      <span className="text-xs font-medium tracking-[0.2em] uppercase">
        Austin Fund
      </span>

      <div className="flex items-center gap-6">
        <a
          href="/portfolio"
          className={`text-xs font-light tracking-wide transition-colors duration-500 ${
            isDark
              ? "text-white/50 hover:text-white"
              : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Portfolio
        </a>
        <a
          href="mailto:innovation.fund@uaustin.org"
          className={`text-xs font-light tracking-wide transition-colors duration-500 ${
            isDark
              ? "text-white/50 hover:text-white"
              : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
