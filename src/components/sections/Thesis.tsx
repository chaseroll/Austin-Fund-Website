"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter";

const ov = { once: true, margin: "-100px" as const };

const fundStats = [
  { label: "Fund Size", value: "$10–15M", countValue: "$15M" },
  { label: "Stage", value: "Pre-Seed & Seed", countValue: "" },
  { label: "Avg. Check", value: "$200K", countValue: "$200K" },
  { label: "Ownership", value: "1–5%", countValue: "5%" },
];

export default function Thesis() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="relative py-32 md:py-44">
      <span className="pointer-events-none absolute right-8 top-24 select-none text-[12rem] font-extralight leading-none text-foreground/[0.03] md:right-16 md:text-[18rem]">
        02
      </span>

      <div className="relative px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="h-px w-8 bg-foreground/30" />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted">
            Latest
          </span>
        </motion.div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={ov}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-10 md:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: isHovering ? 1 : 0,
              background: `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(255,255,255,0.08), transparent 40%)`,
            }}
          />

          <div className="relative flex items-center justify-between">
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase">
              Fund I
            </h3>
            <span className="text-xs font-light tracking-wider text-muted">
              Raising
            </span>
          </div>

          <div className="relative mt-12 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-16">
            {fundStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={ov}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              >
                <p className="text-3xl font-light tracking-tight md:text-4xl">
                  {stat.countValue ? (
                    <AnimatedCounter value={stat.countValue} />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="mt-3 text-xs font-medium tracking-[0.15em] uppercase text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-12 flex flex-col gap-3 border-t border-foreground/8 pt-6 text-sm font-light md:flex-row md:gap-10">
            <p>SAFE with valuation cap & 20% discount</p>
            <p>40% reserved for follow-on</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
