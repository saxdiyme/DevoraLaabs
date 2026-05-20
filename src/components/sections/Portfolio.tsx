"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cases, isPlaceholder, type Case } from "@/data/cases";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Portfolio() {
  const featured = cases.find((c) => c.featured) ?? cases[0];
  const next = cases.filter((c) => c.id !== featured.id).slice(0, 2);
  const restIds = new Set([featured.id, ...next.map((c) => c.id)]);
  const rest = cases.filter((c) => !restIds.has(c.id));

  return (
    <section
      id="portfolio"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[480px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dl-orange/5 blur-[140px]"
      />

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
            Selected work
          </span>
          <h2 className="mt-5 font-syne text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-dl-warm-white">Products we&apos;ve </span>
            <span className="text-brand-gradient">shipped and scaled.</span>
          </h2>
          <p className="mt-5 font-inter text-base text-dl-muted md:text-lg">
            A glimpse of recent case studies — from MVPs that found
            product-market fit to platforms serving millions of users.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-16 grid auto-rows-[280px] grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2"
        >
          <CaseCard
            item={featured}
            large
            className="lg:col-span-2 lg:row-span-2"
          />
          {next.map((c) => (
            <CaseCard key={c.id} item={c} />
          ))}
        </motion.div>

        {rest.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.1 }}
            className="mt-6 grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((c) => (
              <CaseCard key={c.id} item={c} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CaseCard({
  item,
  large = false,
  className = "",
}: {
  item: Case;
  large?: boolean;
  className?: string;
}) {
  if (isPlaceholder(item)) {
    return <ComingSoonCard large={large} className={className} />;
  }

  const titleClass = large ? "text-2xl md:text-3xl" : "text-xl";
  const sizes = large
    ? "(min-width: 1024px) 66vw, 100vw"
    : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

  const inner = (
    <>
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-dl-deep via-dl-deep/55 to-dl-deep/10" />
      <div className="absolute inset-0 bg-dl-deep/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        {item.tags.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-dl-navy/40 bg-dl-deep/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-dl-peach backdrop-blur"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        <h3
          className={`font-syne font-bold leading-tight text-dl-warm-white ${titleClass}`}
        >
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 font-inter text-sm text-dl-muted">
          {item.description}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-2 rounded-full bg-dl-orange px-5 py-2.5 font-inter text-sm font-semibold text-dl-deep shadow-[0_0_28px_rgba(201,162,74,0.5)]">
          View Case
          <ArrowUpRight size={16} />
        </span>
      </div>
    </>
  );

  const cardClasses =
    "group relative block h-full overflow-hidden rounded-2xl border border-dl-navy/30 bg-dl-slate";

  return (
    <motion.div
      variants={FADE_UP}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClasses}
          aria-label={`View case study: ${item.title}`}
        >
          {inner}
        </a>
      ) : (
        <div className={cardClasses}>{inner}</div>
      )}
    </motion.div>
  );
}

function ComingSoonCard({
  large = false,
  className = "",
}: {
  large?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={FADE_UP}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="group relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-dl-navy/50 bg-dl-slate/30 p-6 text-center transition-all hover:border-dl-orange/40 hover:bg-dl-slate/40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30 [background-size:24px_24px]"
        />
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-dl-navy/40 bg-dl-deep text-dl-orange transition-colors group-hover:border-dl-orange/60">
          <Sparkles size={20} strokeWidth={1.5} />
        </div>
        <h3
          className={`relative z-10 font-syne font-bold text-dl-warm-white ${
            large ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          Coming Soon
        </h3>
        <p className="relative z-10 max-w-xs font-inter text-sm text-dl-muted">
          {large
            ? "A featured case study slot — populate it from src/data/cases.ts to publish."
            : "Slot reserved. Add a project to src/data/cases.ts to fill this card."}
        </p>
      </div>
    </motion.div>
  );
}
