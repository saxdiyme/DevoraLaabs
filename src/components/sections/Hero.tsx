"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SplineScene from "./SplineScene";

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const STATS = [
  { value: "50+", label: "Projects" },
  { value: "5", label: "Years" },
  { value: "3", label: "Countries" },
] as const;

const BADGES = [
  { label: "iOS", style: { top: "8%", left: "0%" } },
  { label: "Android", style: { top: "30%", right: "0%" } },
  { label: "Web", style: { bottom: "18%", left: "4%" } },
  { label: "AI", style: { bottom: "6%", right: "10%" } },
] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 bg-dot-grid opacity-25 [background-size:32px_32px]"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[80vw] max-h-[900px] w-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dl-orange/10 blur-[120px]"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={FADE_UP}
            className="inline-flex items-center gap-2 self-start rounded-full border border-dl-navy/40 bg-dl-slate/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dl-peach backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-dl-orange animate-glow-pulse" />
            IT Product Studio · Kronyx Group
          </motion.span>

          <h1 className="font-syne text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <motion.span variants={FADE_UP} className="block text-brand-gradient">
              We Build Digital
            </motion.span>
            <motion.span variants={FADE_UP} className="block text-dl-warm-white">
              Products That Scale
            </motion.span>
          </h1>

          <motion.p
            variants={FADE_UP}
            className="max-w-xl font-inter text-base text-dl-muted md:text-lg"
          >
            From mobile apps and SaaS platforms to AI-powered automation —
            we partner with startups and enterprises to ship software that
            compounds revenue and trust.
          </motion.p>

          <motion.div variants={FADE_UP} className="mt-2 flex flex-wrap gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full bg-dl-orange px-6 py-3 font-inter font-semibold text-dl-deep transition-all hover:bg-dl-peach hover:shadow-[0_0_28px_rgba(255,91,4,0.45)]"
            >
              Start a Project
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border border-dl-navy/60 px-6 py-3 font-inter font-medium text-dl-warm-white transition-colors hover:border-dl-orange/60 hover:text-dl-orange"
            >
              View Our Work
            </a>
          </motion.div>

          <motion.dl
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.08, delayChildren: 0.6 }}
            className="mt-4 grid max-w-md grid-cols-3 gap-6 border-t border-dl-navy/30 pt-6"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={FADE_UP}>
                <dt className="font-syne text-3xl font-bold text-dl-orange md:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-dl-muted">
                  {s.label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="relative h-[360px] w-full sm:h-[480px] lg:h-[560px]">
          <SplineScene />

          {BADGES.map((b, i) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.12, duration: 0.5 }}
              style={{
                ...b.style,
                animationDelay: `${i * 0.6}s`,
              }}
              className="absolute rounded-full border border-dl-navy/60 bg-dl-slate px-3 py-1.5 font-mono text-xs text-dl-orange shadow-[0_8px_24px_rgba(0,0,0,0.4)] animate-float"
            >
              {b.label}
            </motion.span>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-dl-muted md:flex"
        aria-hidden
      >
        <span className="font-mono text-[10px] tracking-[0.2em]">SCROLL</span>
        <span className="h-12 w-px bg-gradient-to-b from-dl-orange to-transparent" />
      </div>
    </section>
  );
}
