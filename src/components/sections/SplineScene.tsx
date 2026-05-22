"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, MouseEvent as ReactMouseEvent } from "react";
import {
  Code2,
  Palette,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  type LucideIcon,
} from "lucide-react";

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE;
const ROTATION_PER_TICK = 0.3;
const ROTATION_INTERVAL = 50;
const ORBIT_RADIUS = 150;

type SplineProps = { scene: string; className?: string };

type Platform = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  relatedIds: number[];
};

const PLATFORMS: Platform[] = [
  {
    id: 1,
    title: "iOS",
    description: "Native Swift & SwiftUI apps shipped to the App Store.",
    icon: Smartphone,
    relatedIds: [2],
  },
  {
    id: 2,
    title: "Android",
    description: "Kotlin and Jetpack Compose apps for Google Play.",
    icon: TabletSmartphone,
    relatedIds: [1],
  },
  {
    id: 3,
    title: "Web",
    description: "React, Next.js, Laravel — server-rendered and type-safe.",
    icon: Code2,
    relatedIds: [4],
  },
  {
    id: 4,
    title: "AI",
    description: "LLM integrations, RAG pipelines, agentic workflows.",
    icon: Sparkles,
    relatedIds: [3],
  },
  {
    id: 5,
    title: "Design",
    description: "UI/UX design systems, Figma prototypes, pixel-perfect interfaces.",
    icon: Palette,
    relatedIds: [3],
  },
];

export default function SplineScene() {
  const [mounted, setMounted] = useState(false);
  const [Spline, setSpline] = useState<ComponentType<SplineProps> | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!SCENE_URL) return;
    let cancelled = false;
    import("@splinetool/react-spline").then((mod) => {
      if (!cancelled) setSpline(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!mounted) return <div className="relative h-full w-full" />;

  if (SCENE_URL && Spline) {
    return <Spline scene={SCENE_URL} className="!h-full !w-full" />;
  }
  return <OrbitalScene />;
}

function OrbitalScene() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [pulseIds, setPulseIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoRotate) return;
    const t = setInterval(() => {
      setRotationAngle((p) => (p + ROTATION_PER_TICK) % 360);
    }, ROTATION_INTERVAL);
    return () => clearInterval(t);
  }, [autoRotate]);

  const reset = () => {
    setActiveId(null);
    setPulseIds([]);
    setAutoRotate(true);
  };

  const handleNodeClick = (id: number) => {
    if (activeId === id) {
      reset();
      return;
    }
    const platform = PLATFORMS.find((p) => p.id === id);
    setActiveId(id);
    setPulseIds(platform?.relatedIds ?? []);
    setAutoRotate(false);
    const idx = PLATFORMS.findIndex((p) => p.id === id);
    setRotationAngle(270 - (idx / PLATFORMS.length) * 360);
  };

  const handleContainerClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      reset();
    }
  };

  const getPos = (index: number) => {
    const angle = ((index / PLATFORMS.length) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = ORBIT_RADIUS * Math.cos(radian);
    const y = ORBIT_RADIUS * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.45, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2));
    return { x, y, zIndex, opacity };
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative flex h-full w-full select-none items-center justify-center"
    >
      <div
        ref={orbitRef}
        onClick={handleContainerClick}
        className="absolute flex h-full w-full items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute h-[120%] w-[120%] rounded-full bg-brand-gradient opacity-15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute h-[360px] w-[360px] rounded-full border border-dl-orange/25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute h-[260px] w-[260px] rounded-full border border-dl-navy/40"
        />

        <div
          aria-hidden
          className="pointer-events-none relative h-32 w-32 rounded-full bg-brand-gradient shadow-[0_0_100px_rgba(230,210,168,0.55)] md:h-40 md:w-40"
        >
          <span className="absolute left-5 top-3 h-10 w-10 rounded-full bg-white/30 blur-md" />
          <span className="absolute left-3 top-2 h-4 w-4 rounded-full bg-white/70 blur-sm" />
          <span className="absolute inset-2 rounded-full ring-1 ring-inset ring-white/15" />
        </div>

        {PLATFORMS.map((p, i) => {
          const pos = getPos(i);
          const isActive = activeId === p.id;
          const isRelated = pulseIds.includes(p.id);
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              className="absolute cursor-pointer transition-all duration-700"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isActive ? 200 : pos.zIndex,
                opacity: isActive ? 1 : pos.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleNodeClick(p.id);
              }}
              role="button"
              aria-pressed={isActive}
              aria-label={`${p.title} platform — ${
                isActive ? "open" : "view details"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "scale-125 border-dl-orange bg-dl-orange text-dl-deep shadow-[0_0_24px_rgba(230,210,168,0.55)]"
                      : isRelated
                        ? "animate-pulse border-dl-orange bg-dl-slate text-dl-orange"
                        : "border-dl-navy/60 bg-dl-slate text-dl-orange"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} />
                </div>
                <span
                  className={`whitespace-nowrap rounded-full border bg-dl-slate px-3 py-1 font-mono text-xs transition-all duration-300 ${
                    isActive
                      ? "border-dl-orange text-dl-orange"
                      : "border-dl-navy/60 text-dl-orange"
                  }`}
                >
                  {p.title}
                </span>
              </div>

              {isActive && (
                <div className="absolute left-1/2 top-14 z-50 w-56 -translate-x-1/2 rounded-xl border border-dl-orange/40 bg-dl-deep/95 p-4 shadow-[0_0_36px_rgba(230,210,168,0.3)] backdrop-blur-md">
                  <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-dl-orange/60" />
                  <h4 className="font-syne text-sm font-bold text-dl-warm-white">
                    {p.title}
                  </h4>
                  <p className="mt-1 font-inter text-xs leading-relaxed text-dl-muted">
                    {p.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
