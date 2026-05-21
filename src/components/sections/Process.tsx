"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dig into business goals, user research, technical constraints, and the competitive landscape — and align on what to build.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes, high-fidelity mockups, and an interactive prototype — refined through tight feedback loops with your team.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Sprint-based engineering with weekly demos. Modern stacks, type safety, automated testing, and clean architecture from day one.",
  },
  {
    number: "04",
    title: "Testing",
    description:
      "QA across devices, performance benchmarks, accessibility audits, and end-to-end test coverage before launch.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Production deployment, observability setup, analytics wiring, and post-launch support to keep the product compounding.",
  },
] as const;

const LINE_DURATION = 1.6;
const LINE_START_DELAY = 0.2;
const NODE_FADE_STEP = 0.18;

const INACTIVE_NODE = {
  backgroundColor: "rgb(15, 57, 56)",
  borderColor: "rgba(255, 255, 255, 0.12)",
  color: "#D4B888",
  boxShadow: "0 0 0 rgba(230,210,168,0)",
};
const ACTIVE_NODE = {
  backgroundColor: "rgb(230, 210, 168)",
  borderColor: "rgb(230, 210, 168)",
  color: "rgb(10, 46, 45)",
  boxShadow: "0 0 26px rgba(230,210,168,0.55)",
};

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      ref={ref}
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-dl-navy/40 bg-dl-slate/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dl-peach backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-dl-orange" />
            Our process
          </span>
          <h2 className="mt-5 font-syne text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-dl-warm-white">From idea to launch in </span>
            <span className="text-brand-gradient">five tight phases.</span>
          </h2>
          <p className="mt-5 font-inter text-base text-dl-muted md:text-lg">
            A repeatable workflow that scales from MVPs to enterprise
            rebuilds — weekly demos, no surprises, and a transparent
            pipeline you can plug into.
          </p>
        </motion.div>

        <div className="mt-20 hidden md:block">
          <DesktopStepper inView={inView} />
        </div>
        <div className="mt-16 md:hidden">
          <MobileStepper inView={inView} />
        </div>
      </div>
    </section>
  );
}

function DesktopStepper({ inView }: { inView: boolean }) {
  return (
    <div className="relative">
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-[22px] h-1 w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 4"
      >
        <line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="#E6D2A8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: LINE_DURATION,
            delay: LINE_START_DELAY,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      <ol className="relative grid grid-cols-5 gap-4">
        {STEPS.map((step, i) => {
          const activationDelay =
            LINE_START_DELAY + (LINE_DURATION / STEPS.length) * i;
          return (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.45, delay: 0.2 + i * NODE_FADE_STEP }}
              className="flex flex-col items-center text-center"
            >
              <motion.span
                initial={INACTIVE_NODE}
                animate={inView ? ACTIVE_NODE : INACTIVE_NODE}
                transition={{ duration: 0.45, delay: activationDelay }}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono text-xs font-bold"
              >
                {step.number}
              </motion.span>
              <h3 className="mt-5 font-syne text-lg font-bold text-dl-warm-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[220px] font-inter text-sm leading-relaxed text-dl-muted">
                {step.description}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function MobileStepper({ inView }: { inView: boolean }) {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className="absolute bottom-2 left-[22px] top-2 w-0.5 rounded-full bg-dl-navy/30"
      />
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{
          duration: LINE_DURATION,
          delay: LINE_START_DELAY,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "top" }}
        className="absolute bottom-2 left-[22px] top-2 w-0.5 rounded-full bg-dl-orange"
      />

      {STEPS.map((step, i) => {
        const activationDelay =
          LINE_START_DELAY + (LINE_DURATION / STEPS.length) * i;
        return (
          <motion.li
            key={step.number}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.45, delay: 0.2 + i * NODE_FADE_STEP }}
            className="relative flex gap-5 pb-10 last:pb-0"
          >
            <motion.span
              initial={INACTIVE_NODE}
              animate={inView ? ACTIVE_NODE : INACTIVE_NODE}
              transition={{ duration: 0.45, delay: activationDelay }}
              className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold"
            >
              {step.number}
            </motion.span>
            <div className="pt-1">
              <h3 className="font-syne text-lg font-bold text-dl-warm-white">
                {step.title}
              </h3>
              <p className="mt-1.5 font-inter text-sm leading-relaxed text-dl-muted">
                {step.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
