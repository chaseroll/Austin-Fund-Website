"use client";

import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12 md:py-8 bg-background/80 backdrop-blur-md"
    >
      <span className="text-xs font-medium tracking-[0.2em] uppercase">
        Austin Fund
      </span>

      <div className="flex items-center gap-6">
        <a
          href="/portfolio"
          className="text-xs font-light tracking-wide text-muted transition-colors hover:text-accent"
        >
          Portfolio
        </a>
        <a
          href="mailto:innovation.fund@uaustin.org"
          className="text-xs font-light tracking-wide text-muted transition-colors hover:text-accent"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
