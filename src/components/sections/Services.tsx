"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Code2,
  Palette,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  type LucideIcon,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  Icon: LucideIcon;
  badges: readonly string[];
};

const SERVICES: readonly Service[] = [
  {
    title: "Web Development",
    description:
      "High-performance websites and web apps built on modern JS stacks with server-rendered, type-safe foundations.",
    Icon: Code2,
    badges: ["React", "Next.js", "Laravel"],
  },
  {
    title: "iOS Development",
    description:
      "Native iPhone and iPad apps shipped to the App Store with SwiftUI, Combine, and the latest Apple platform APIs.",
    Icon: Smartphone,
    badges: ["Swift", "SwiftUI", "App Store"],
  },
  {
    title: "Android Development",
    description:
      "Native Android apps built with Kotlin and Jetpack Compose, optimized for the Google Play ecosystem.",
    Icon: TabletSmartphone,
    badges: ["Kotlin", "Jetpack Compose", "Play Store"],
  },
  {
    title: "UI/UX Design",
    description:
      "Research-driven product design with high-fidelity prototypes, design systems, and motion specs ready to ship.",
    Icon: Palette,
    badges: ["Figma", "Prototyping", "Design System"],
  },
  {
    title: "DevOps & Cloud",
    description:
      "Resilient cloud infrastructure on AWS and GCP with CI/CD pipelines, containerization, and full observability.",
    Icon: Cloud,
    badges: ["AWS", "Docker", "CI/CD"],
  },
  {
    title: "AI Integration",
    description:
      "LLM-powered features and automation workflows wired into your product — chat, agents, RAG, vector search.",
    Icon: Sparkles,
    badges: ["OpenAI", "LLMs", "Automation"],
  },
] as const;

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[600px] -translate-y-1/2 bg-dl-orange/5 blur-[140px]"
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
            What we do
          </span>
          <h2 className="mt-5 font-syne text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-dl-warm-white">
              End-to-end engineering for{" "}
            </span>
            <span className="text-brand-gradient">ambitious products.</span>
          </h2>
          <p className="mt-5 font-inter text-base text-dl-muted md:text-lg">
            One studio, every layer of your product. We handle the design,
            engineering, and operations — so your team can stay focused on
            customers and the roadmap.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ title, description, Icon, badges }: Service) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const rotateX = useTransform(sy, [-1, 1], [7, -7]);
  const rotateY = useTransform(sx, [-1, 1], [-7, 7]);

  return (
    <motion.article
      variants={CARD_VARIANTS}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-dl-navy/30 bg-glass p-6 transition-all duration-300 hover:border-dl-orange/60 hover:shadow-[0_12px_32px_rgba(14,61,46,0.12)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-dl-orange/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dl-navy/40 bg-dl-deep/60 text-dl-orange transition-colors group-hover:border-dl-orange/50">
        <Icon size={22} strokeWidth={1.75} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-syne text-xl font-bold text-dl-warm-white">
          {title}
        </h3>
        <p className="font-inter text-sm leading-relaxed text-dl-muted">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.map((b) => (
          <span
            key={b}
            className="rounded-full border border-dl-navy/30 bg-dl-deep px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-dl-peach"
          >
            {b}
          </span>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 font-inter text-sm font-medium text-dl-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
        Learn more
        <ArrowRight size={14} />
      </span>
    </motion.article>
  );
}
