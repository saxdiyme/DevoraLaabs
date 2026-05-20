"use client";

import { motion } from "framer-motion";

const ROW_1 = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
] as const;

const ROW_2 = [
  "Swift",
  "Kotlin",
  "Flutter",
  "Figma",
  "AWS",
  "Docker",
  "OpenAI",
] as const;

export default function TechStack() {
  return (
    <section
      id="tech"
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
            Tech stack
          </span>
          <h2 className="mt-5 font-syne text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-dl-warm-white">Battle-tested tools, </span>
            <span className="text-brand-gradient">picked on purpose.</span>
          </h2>
          <p className="mt-5 font-inter text-base text-dl-muted md:text-lg">
            We don&apos;t chase frameworks — we use the stack that ships
            faster, scales further, and stays maintainable long after launch.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 flex flex-col gap-5"
      >
        <MarqueeRow items={ROW_1} direction="left" />
        <MarqueeRow items={ROW_2} direction="right" />
      </motion.div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: readonly string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  const animClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className="group relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-dl-deep to-transparent md:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-dl-deep to-transparent md:w-32"
      />

      <ul
        className={`flex w-max gap-4 ${animClass} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((tech, i) => (
          <li
            key={`${tech}-${i}`}
            className="shrink-0 rounded-full border border-dl-navy/40 bg-dl-slate px-5 py-2.5 font-mono text-sm text-dl-muted transition-colors duration-200 hover:border-dl-orange hover:text-dl-orange"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
