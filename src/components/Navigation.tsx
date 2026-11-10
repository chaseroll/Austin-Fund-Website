"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navigation() {
  const pathname = usePathname();
  const isPortfolio = pathname === "/portfolio";
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    if (isPortfolio) {
      setIsDark(true);
      return;
    }

    const lightSection = document.querySelector("[data-theme='light']");
    if (!lightSection) {
      setIsDark(true);
      return;
    }

    const rect = lightSection.getBoundingClientRect();
    setIsDark(rect.top > 60 || rect.bottom < 60);
  }, [isPortfolio]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    const initialFrame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const button = menuButtonRef.current;
    const desktop = matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        button?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []);
        const first = button, last = links.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileOpen]);

  const linkClass = (active: boolean) =>
    `nav-link relative inline-flex items-center px-1 py-1.5 transition-colors duration-[var(--dur-default)] ease-[var(--ease-standard)] ${
      active
        ? isDark
          ? "text-[#EAEAEA]"
          : "text-[#0D0E0A]"
        : isDark
          ? "text-[#EAEAEA]/65 hover:text-[#EAEAEA]"
          : "text-[#0D0E0A]/55 hover:text-[#0D0E0A]"
    }`;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-[var(--dur-slow)] ease-[var(--ease-standard)] ${
          isDark ? "text-[#EAEAEA]" : "text-[#0D0E0A]"
        }`}
      >
        {/* Scroll-triggered blur plate (ported from North Star). Near-invisible
            tint + 3px blur + a hint of saturation gives a gentle lift off
            whatever is underneath without ever reading as a solid band. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-all duration-700 ${
            scrolled
              ? isDark
                ? "bg-[#000000]/[0.04] backdrop-blur-[3px] backdrop-saturate-[1.1]"
                : "bg-[#F5F4F0]/[0.35] backdrop-blur-[3px] backdrop-saturate-[1.2]"
              : ""
          }`}
        />

        {/* Hairline at the bottom edge, fades in with the plate. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          } ${isDark ? "bg-[#EAEAEA]/[0.08]" : "bg-[#0D0E0A]/[0.1]"}`}
        />

        <div className="relative mx-auto flex items-center justify-between px-6 py-5 md:px-16 md:py-6 lg:px-24">
          <div className="flex items-baseline">
            <Link
              href="/"
              aria-label="Austin Fund Home"
              className="group inline-flex rounded-full px-2 py-1 -mx-2 -my-1 transition-opacity duration-[var(--dur-default)] ease-[var(--ease-standard)] hover:opacity-70"
            >
              <Logo variant="wordmark" />
            </Link>

          </div>

          <div className="hidden items-center gap-10 md:flex">
            <Link
              href="/portfolio"
              className={linkClass(pathname === "/portfolio")}
              aria-current={isPortfolio ? "page" : undefined}
            >
              Portfolio
              {pathname === "/portfolio" && (
                <motion.span
                  layoutId="nav-indicator"
                  aria-hidden
                  className={`absolute left-1 right-1 -bottom-px h-px ${
                    isDark ? "bg-[#EAEAEA]/45" : "bg-[#0D0E0A]/45"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <a href="mailto:info@uaustin.fund" className={linkClass(false)}>
              Contact
            </a>
          </div>

          <button
            ref={menuButtonRef}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease }}
              className={`block h-px w-5 origin-center transition-colors duration-[var(--dur-slow)] ${
                mobileOpen
                  ? "bg-[#EAEAEA]"
                  : isDark
                    ? "bg-[#EAEAEA]"
                    : "bg-[#0D0E0A]"
              }`}
            />
            <motion.span
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className={`block h-px w-5 origin-center transition-colors duration-[var(--dur-slow)] ${
                isDark ? "bg-[#EAEAEA]" : "bg-[#0D0E0A]"
              }`}
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease }}
              className={`block h-px w-5 origin-center transition-colors duration-[var(--dur-slow)] ${
                mobileOpen
                  ? "bg-[#EAEAEA]"
                  : isDark
                    ? "bg-[#EAEAEA]"
                    : "bg-[#0D0E0A]"
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
            transition={{ duration: 0.35, ease }}
            ref={menuRef}
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[#000000]/85"
              style={{
                backdropFilter: "blur(36px) saturate(1.6)",
                WebkitBackdropFilter: "blur(36px) saturate(1.6)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-[var(--color-hair-dark-strong)]"
            />

            <div className="relative flex h-full flex-col justify-between px-8 pt-28 pb-14">
              <div className="flex flex-col items-start">
                {[
                  { label: "Home", href: "/", delay: 0.1, internal: true },
                  {
                    label: "Portfolio",
                    href: "/portfolio",
                    delay: 0.15,
                    internal: true,
                  },
                  {
                    label: "Contact",
                    href: "mailto:info@uaustin.fund",
                    delay: 0.2,
                    internal: false,
                  },
                ].map((item) => {
                  const itemClass =
                    "group inline-flex items-baseline gap-3 py-3.5 text-[2.4rem] font-light leading-[1.05] tracking-[-0.025em] text-[#EAEAEA] transition-opacity duration-[var(--dur-default)] ease-[var(--ease-standard)] hover:opacity-60";
                  const indicator =
                    pathname === item.href ? (
                      <span className="inline-block h-1.5 w-1.5 translate-y-[-0.45em] rounded-full bg-[#EAEAEA]/45" />
                    ) : null;

                  const motionProps = {
                    initial: { opacity: 0, x: -24 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -16 },
                    transition: {
                      duration: 0.5,
                      delay: item.delay,
                      ease,
                    },
                    onClick: () => setMobileOpen(false),
                  };

                  if (item.internal) {
                    return (
                      <motion.div key={item.label} {...motionProps}>
                        <Link href={item.href} className={itemClass} aria-current={pathname === item.href ? "page" : undefined}>
                          {item.label}
                          {indicator}
                        </Link>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      {...motionProps}
                      className={itemClass}
                    >
                      {item.label}
                      {indicator}
                    </motion.a>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease }}
                className="flex flex-col gap-3 border-t border-[var(--color-hair-dark-strong)] pt-6"
              >
                <span className="eyebrow text-[var(--color-mute-dark-2)]">
                  Get in touch
                </span>
                <a
                  href="mailto:info@uaustin.fund"
                  className="text-[15px] font-normal text-[#EAEAEA]/90 transition-colors duration-[var(--dur-default)] hover:text-[#EAEAEA]"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  info@uaustin.fund
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
