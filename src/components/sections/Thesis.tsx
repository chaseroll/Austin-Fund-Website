"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter";

const ov = { once: true, margin: "-100px" as const };

const fundStats = [
  { label: "Fund Size", value: "$10–15M", countValue: "$15M" },
  { label: "Stage", value: "Pre-Seed & Seed", countValue: "" },
  { label: "Avg. Check", value: "$200K", countValue: "$200K" },
  { label: "Ownership", value: "1–5%", countValue: "5%" },
];

export default function Thesis() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(44,46,32,0.06), transparent 40%)`;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 text-[#0D0E0A] md:py-36"
    >
      <motion.span
        style={{ y: numberY }}
        className="pointer-events-none absolute right-4 top-16 select-none font-extralight leading-none tracking-tight text-[#0D0E0A]/[0.03] text-[7rem] md:right-16 md:top-20 md:text-[18rem]"
      >
        02
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ov}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-center gap-4"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-8 origin-left bg-[#2C2E20]"
          />
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#2C2E20]/60">
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
          className="relative max-w-4xl overflow-hidden rounded-2xl border border-[#0D0E0A]/[0.05] bg-[#0D0E0A]/[0.01] p-10 backdrop-blur-[3px] backdrop-saturate-[1.2] md:p-16"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: isHovering ? 1 : 0,
              background,
            }}
          />

          <div className="relative flex items-center justify-between">
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase">
              Fund I
            </h3>
            <span className="flex items-center gap-2 text-[11px] font-light tracking-wider text-[#2C2E20]/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2C2E20]/40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2C2E20]" />
              </span>
              Raising
            </span>
          </div>

          <div className="relative mt-14 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {fundStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={ov}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-tight">
                  {stat.countValue ? (
                    <AnimatedCounter value={stat.countValue} />
                  ) : (
                    <span className="text-2xl md:text-3xl">{stat.value}</span>
                  )}
                </p>
                <p className="mt-3 text-[10px] font-medium tracking-[0.18em] uppercase text-[#2C2E20]/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={ov}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-14 border-t border-[#0D0E0A]/[0.06] pt-6"
          >
            <div className="flex flex-col gap-4 text-[13px] font-light text-[#0D0E0A]/40 md:flex-row md:gap-12">
              <p className="flex items-center gap-2">
                <span className="h-px w-3 bg-[#0D0E0A]/15" />
                SAFE with valuation cap & 20% discount
              </p>
              <p className="flex items-center gap-2">
                <span className="h-px w-3 bg-[#0D0E0A]/15" />
                40% reserved for follow-on
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
